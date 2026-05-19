'use client'

// useLiveSuggestions — generic drop-in hook for any AI-tailored step.
// Returns the static fallback array immediately, then replaces it with
// API-generated suggestions when they arrive. Memoises by context key so
// we don't re-fetch on every re-render. If the API errors or is slow, the
// static array stays — user never sees an error state.
//
// Works with any item type T: strings (description/tagline/impression) or
// objects (palette objects, style objects). The hook trusts the caller to
// pass a `validate` predicate that confirms each AI-returned item is the
// right shape; bad shapes fall back to static silently.

import { useEffect, useRef, useState } from 'react'

export type SuggestKind = 'description' | 'tagline' | 'impression' | 'palette' | 'style'

interface Ctx<T> {
  kind: SuggestKind
  brand: string
  industry?: string | null
  niche?: string
  description?: string
  fallback: T[]
  // Whether to actually call the API. Pass false to suppress (e.g. when the
  // user hasn't filled in brand name yet, or the step is not visible).
  enabled?: boolean
  // Predicate that each AI-returned item must satisfy to be accepted.
  // Items that fail validation are filtered out. If too few survive,
  // we fall back to the static array.
  validate: (item: unknown) => item is T
  // Minimum count of valid items to accept the AI response. Default 3.
  minCount?: number
}

interface Result<T> {
  suggestions: T[]
  loading: boolean
  source: 'static' | 'live'
}

// Module-level cache so multi-component re-mounts share fetched results.
const cache = new Map<string, unknown[]>()

function ctxKey<T>(c: Ctx<T>): string {
  return [
    c.kind,
    c.brand.trim().toLowerCase(),
    c.industry ?? '',
    c.niche ?? '',
    c.description ?? '',
  ].join('|')
}

export function useLiveSuggestions<T>(ctx: Ctx<T>): Result<T> {
  const enabled = ctx.enabled !== false && ctx.brand.trim().length > 0
  const key = ctxKey(ctx)
  const cached = cache.get(key) as T[] | undefined
  const minCount = ctx.minCount ?? 3

  const [suggestions, setSuggestions] = useState<T[]>(cached ?? ctx.fallback)
  const [loading, setLoading] = useState<boolean>(enabled && !cached)
  const [source, setSource] = useState<'static' | 'live'>(cached ? 'live' : 'static')

  const reqRef = useRef(0)

  useEffect(() => {
    if (!enabled) {
      setSuggestions(ctx.fallback)
      setLoading(false)
      setSource('static')
      return
    }
    if (cached) {
      setSuggestions(cached)
      setLoading(false)
      setSource('live')
      return
    }

    const reqId = ++reqRef.current
    setLoading(true)
    setSource('static')

    const controller = new AbortController()
    fetch('/api/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: ctx.kind,
        brand: ctx.brand.trim(),
        industry: ctx.industry ?? undefined,
        niche: ctx.niche ?? undefined,
        description: ctx.description ?? undefined,
      }),
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data: { suggestions?: unknown[] }) => {
        if (reqRef.current !== reqId) return
        const raw = Array.isArray(data.suggestions) ? data.suggestions : []
        const validated = raw.filter(ctx.validate) as T[]
        if (validated.length >= minCount) {
          cache.set(key, validated)
          setSuggestions(validated)
          setSource('live')
        }
        setLoading(false)
      })
      .catch(() => {
        if (reqRef.current !== reqId) return
        setLoading(false)
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled])

  return { suggestions, loading, source }
}

// Common validators for the supported item shapes.

export const isString = (x: unknown): x is string => typeof x === 'string' && x.trim().length > 0

export interface PaletteShape {
  name: string
  hint: string
  colors: { name: string; hex: string; desc: string }[]
}

export const isPalette = (x: unknown): x is PaletteShape => {
  if (!x || typeof x !== 'object') return false
  const p = x as Record<string, unknown>
  if (typeof p.name !== 'string' || typeof p.hint !== 'string') return false
  if (!Array.isArray(p.colors) || p.colors.length !== 3) return false
  for (const c of p.colors) {
    if (!c || typeof c !== 'object') return false
    const co = c as Record<string, unknown>
    if (typeof co.name !== 'string' || typeof co.desc !== 'string') return false
    if (typeof co.hex !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(co.hex)) return false
  }
  return true
}

export interface StyleShape {
  name: string
  pct: number
  desc: string
  ex: string
}

const VALID_STYLE_NAMES = new Set([
  'Wordmark',
  'Combination Mark',
  'Abstract Mark',
  'Lettermark',
  'Brandmark',
  'Emblem',
])

export const isStyle = (x: unknown): x is StyleShape => {
  if (!x || typeof x !== 'object') return false
  const s = x as Record<string, unknown>
  if (typeof s.name !== 'string' || !VALID_STYLE_NAMES.has(s.name)) return false
  if (typeof s.pct !== 'number') return false
  if (typeof s.desc !== 'string' || typeof s.ex !== 'string') return false
  return true
}
