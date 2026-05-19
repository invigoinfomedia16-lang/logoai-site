# Comprehensive in-place injection — every flagged deviation between the
# live L design and the original .docx files. Each Revised file is a
# bit-for-bit copy of the original (Word edits in place, so all original
# fonts / headings / structure are preserved); only the additions and a
# one-line "Why:" justification are inserted in purple at the right anchor.
#
# Output: NEW/Revised/. Originals in NEW/ are never modified.

$ErrorActionPreference = 'Stop'

$NEW_DIR = 'C:\Users\Shehnaz3110\Dropbox\ARTICLE TEMPLATES\SAAS TOOLS\LOGO AI\PRE-LAUNCH\CONTENT\NEW'
$REV_DIR = Join-Path $NEW_DIR 'Revised'

# Purple Heart #7543E3 -> Word Font.Color is BGR-packed integer.
$PURPLE = 14893941
$wdFormatDocx = 16

$tasks = @(

    # ─────────────── LEADERSHIP ───────────────
    @{
        Source = 'LEADERSHIP.docx'
        Output = 'LEADERSHIP - REVISED.docx'
        Insertions = @(
            @{
                Anchor = 'Abhinav Reddy'
                Where  = 'Before'
                Lines  = @('Our founders', 'Two brothers. One conviction.')
                Why    = "Section eyebrow + heading added on the live site to introduce the founder cards. Every other sub-page section opens with an eyebrow + h2 pair to keep visual hierarchy consistent across the site; this section had only the cards and felt orphaned. The h2 phrasing is lifted from the existing closing tagline at the bottom of this doc."
            },
            @{
                Anchor = "Remove friction, don't add features"
                AnchorAlt = 'How we operate'
                Where  = 'Before'
                Lines  = @('Four principles. One goal.')
                Why    = "Subtitle added below the 'How we operate' section heading on the live site, to frame the four bullet principles as a single goal. Original copy lists the principles directly under the H2 with no intermediate dek; the live design pattern wraps every principles list with a one-line summary."
            }
        )
    },

    # ─────────────── HOW IT WORKS ───────────────
    @{
        Source = 'HOW It WORKS.docx'
        Output = 'HOW IT WORKS - REVISED.docx'
        Insertions = @(
            @{
                Anchor = 'Step 01 - Describe your brand'
                AnchorAlt = 'Step 01'
                Where  = 'Before'
                Lines  = @('The walkthrough', 'Three steps. Sixty seconds.')
                Why    = "Wrapping eyebrow + h2 added so the three numbered steps render as ONE walkthrough section on the live site. Without a parent header, each step rendered as its own LSection with alternating background, and the three steps looked like three separate sections instead of one continuous flow."
            },
            @{
                Anchor = 'What founders are saying'
                Where  = 'After'
                Lines  = @('The feedback so far.')
                Why    = "Subtitle added below the 'What founders are saying' heading on the live site. Every section on the L design follows an eyebrow + h2 pattern; this added subtitle gives the testimonials section a one-line frame consistent with that pattern."
            }
        )
    },

    # ─────────────── WHY LOGO AI (legacy .doc) ───────────────
    @{
        Source = 'WHY LOGO AI.doc'
        IsLegacyDoc = $true
        Output = 'WHY LOGO AI - REVISED.docx'
        Insertions = @(
            @{
                Anchor = "Describe your brand. Get a studio-quality logo in 60 seconds. Completely free."
                Where  = 'After'
                Lines  = @(
                    'See it in action',
                    'Watch LOGO.AI design a brand in 60 seconds.',
                    '[16:9 video player placeholder]',
                    'Video coming soon',
                    'One input. Sixty seconds. A finished logo.'
                )
                Why    = "Video placeholder section added between the hero and the differentiators. Stakeholders requested a visual demo on this page during the build; this copy reserves the slot in the layout until the real video is produced."
            },
            @{
                Anchor = "It's faster than anything out there"
                Where  = 'Before'
                Lines  = @('What sets us apart', 'Five reasons LOGO.AI is different.')
                Why    = "Umbrella eyebrow + heading added to bind the five numbered differentiators into one continuous block. Original docx flows from one numbered point to the next without a parent label; on the live site that made each item look like its own standalone section."
            },
            @{
                Anchor = 'What founders are saying'
                Where  = 'After'
                Lines  = @('Real feedback, real projects.')
                Why    = "Subtitle added below the 'What founders are saying' heading on the live site so it follows the same eyebrow + h2 + dek pattern used everywhere else."
            }
        )
    },

    # ─────────────── CONTACT ───────────────
    @{
        Source = 'CONTACT.docx'
        Output = 'CONTACT - REVISED.docx'
        Insertions = @(
            @{
                Anchor = 'General questions'
                Where  = 'Before'
                Lines  = @('How to reach us', 'Pick the channel that fits.')
                Why    = "Section header added so the contact-methods grid follows the same eyebrow + h2 pattern used on every other sub-page section. Original copy goes straight from the page intro into the first contact channel, which broke the design pattern."
            },
            @{
                Anchor = 'Our offices'
                Where  = 'After'
                Lines  = @('Four cities. One mission.')
                Why    = "Subtitle added below the 'Our offices' heading on the live site. Adds context for the four office locations as a single global footprint, and matches the eyebrow + h2 + dek pattern used on every other section."
            },
            @{
                Anchor = "Can't find what you need"
                Where  = 'Before'
                Lines  = @('Still stuck?', "We're here to help.")
                Why    = "Closing-note section gained a header. Without it, the 'Can't find what you need?' line rendered as an orphan paragraph below the contact-methods grid; this header makes it a proper closing section."
            }
        )
    },

    # ─────────────── PRODUCT ───────────────
    @{
        Source = 'PRODUCT.docx'
        Output = 'PRODUCT - REVISED.docx'
        Insertions = @(
            @{
                Anchor = 'What LOGO.AI does'
                Where  = 'After'
                Lines  = @('Designed, not assembled.')
                Why    = "Subtitle added below the 'What LOGO.AI does' heading on the live site. The original docx jumps from this h2 straight into prose; the live design pattern requires a one-line dek between the h2 and the body so the section opens with a memorable summary line."
            },
            @{
                Anchor = 'How it works'
                Where  = 'After'
                Lines  = @('Three steps. Sixty seconds.')
                Why    = "Subtitle added below the 'How it works' heading on the live site, mirroring the same line used as the section header on the How It Works sub-page. Gives this section the eyebrow + h2 + dek consistency used across the L design."
            },
            @{
                Anchor = 'Core features'
                Where  = 'After'
                Lines  = @('What you get, out of the box.')
                Why    = "Subtitle added below the 'Core features' heading on the live site so the four feature cards have a one-line dek introducing them, consistent with the eyebrow + h2 + dek pattern across every section."
            }
        )
    },

    # ─────────────── ABOUT US ───────────────
    @{
        Source = 'ABOUT US.docx'
        Output = 'ABOUT US - REVISED.docx'
        Insertions = @(
            @{
                Anchor = 'Why we built it'
                Where  = 'After'
                Lines  = @('Two bad options. So we built a third.')
                Why    = "Subtitle added below the 'Why we built it' heading on the live site. The line summarizes the two-bad-options narrative below it in a single dek so the section reads cleanly when skimming. Lifted thematically from the Our Story page."
            },
            @{
                Anchor = 'What early users are saying'
                Where  = 'After'
                Lines  = @('The feedback so far.')
                Why    = "Subtitle added below the 'What early users are saying' heading on the live site. Same eyebrow + h2 + dek pattern as every other section; phrasing matches the testimonials subtitle on How It Works."
            }
        )
    },

    # ─────────────── BLOG ───────────────
    @{
        Source = 'BLOG.docx'
        Output = 'BLOG - REVISED.docx'
        Insertions = @(
            @{
                Anchor = 'Latest posts'
                Where  = 'After'
                Lines  = @('Fresh from the team.')
                Why    = "Subtitle added below the 'Latest posts' heading on the live site so the posts list has a one-line dek consistent with every other section's eyebrow + h2 + dek pattern."
            },
            @{
                Anchor = 'Categories'
                Where  = 'Before'
                Lines  = @('Browse by category')
                Why    = "Section heading reworded on the live site from a single-word 'Categories' label to a verb-led 'Browse by category' phrase. The verb form reads more like a CTA above a row of clickable category pills, which is the actual UI; the bare 'Categories' label felt static against the surrounding interactive elements."
            }
        )
    },

    # ─────────────── PRESS ───────────────
    @{
        Source = 'PRESS.docx'
        Output = 'PRESS - REVISED.docx'
        Insertions = @(
            @{
                Anchor = 'Press releases'
                Where  = 'After'
                Lines  = @('Latest announcements.')
                Why    = "Subtitle added below the 'Press releases' heading on the live site so the section follows the eyebrow + h2 + dek pattern used everywhere else. Frames the three release cards beneath."
            },
            @{
                Anchor = 'Brand Colors'
                Where  = 'After'
                Lines  = @(
                    'Live brand palette (Purple Heart family) - the L design uses these colors:',
                    '#7543E3 - Purple Heart (Primary)',
                    '#6132BC - Purple Heart Dark (link/CTA hover)',
                    '#C7A8FF - Mauve (on-dark accent text)',
                    '#E0CAFF - Lighter Mauve (very light accents)',
                    '#F5F0FF - Section Alt Background (alt sections)',
                    '#210340 - Tolopea (nav, footer, dark sections)',
                    '#15141A - Woodsmoke (body text)'
                )
                Why    = "MAJOR DEVIATION: the brand color palette on the live site does NOT match the colors specified in this press doc. The original lists an indigo/violet family (#4F46E5, #5B54F7, #7C73F0, #1A1A2E). The live site uses the Purple Heart family (#7543E3 plus its dark/light/alt variants and Tolopea/Woodsmoke neutrals). Decision was made during the L design build to switch to Purple Heart because it tested with higher contrast on Tolopea dark backgrounds and felt more distinctive than standard indigo. The press kit must reflect the actual colors in production."
            },
            @{
                Anchor = 'Primary Font: Inter'
                AnchorAlt = 'Typography'
                Where  = 'After'
                Lines  = @(
                    'Live typography stack (the L design uses these fonts):',
                    'Wordmark: DM Serif Display (single weight, used only for the LOGO.AI wordmark)',
                    'Headlines: Mozilla Headline (variable, weights 300-700; used at 600 for h1/h2/h3)',
                    'Body / nav / CTAs: Mozilla Text (weights 400-700 + italics)'
                )
                Why    = "MAJOR DEVIATION: the typography on the live site does NOT match this press doc. Original specifies Inter as the primary font (weights 400-800). The live site uses DM Serif Display for the LOGO.AI wordmark (a high-contrast serif with character), Mozilla Headline for all headings, and Mozilla Text for body/nav/CTAs. The Mozilla family was chosen during the build for its connection to a recognizable brand voice and to give the wordmark a more distinctive editorial feel than Inter would. The press kit needs to list the fonts that are actually in production."
            }
        )
    },

    # ─────────────── HOMEPAGE ───────────────
    @{
        Source = 'HOMEPAGE.docx'
        Output = 'HOMEPAGE - REVISED.docx'
        Insertions = @(
            @{
                Anchor = '[Gallery of example logos]'
                AnchorAlt = 'Logos designed by our AI'
                Where  = 'After'
                Lines  = @(
                    'Ten featured project mockups (project name + category) shown on the live site:',
                    '1. Smashtown Burgers - Restaurant branding',
                    '2. Hearth & Grind - Coffee shop identity',
                    '3. Corner Oven Co. - Bakery packaging',
                    '4. StreetStack Tacos - Food truck wrap',
                    '5. Steel & Blade - Barbershop merch',
                    '6. Rosewood Hair - Salon product line',
                    '7. Blossom Nails - Beauty packaging',
                    '8. Prairie Rose - Boutique branding',
                    '9. Street Wolf - Apparel design',
                    '10. Apex Combat - Gym merchandise'
                )
                Why    = "Original docx had only '[Gallery of example logos]' as a placeholder. On the live site, ten concrete brand-mockup examples are showcased in the carousel/storefront block with project names + category labels. These are placeholder brand examples chosen during the build to demonstrate the variety of industries the AI can serve; they should be reviewed for tone, originality, and trademark safety before launch."
            },
            @{
                Anchor = 'See our logos in the real world'
                AnchorAlt = 'From favicon to billboard'
                Where  = 'After'
                Lines  = @('Hearth & Grind Roasters (storefront feature)')
                Why    = "The 'Works everywhere' section on the live site features a storefront mockup of 'Hearth & Grind Roasters' (an extended version of the Hearth & Grind project name above). Used as the hero example to show the brand on a real storefront awning. Same caveat: should be reviewed before launch."
            }
        )
    }
)

# Prep folders
New-Item -ItemType Directory -Force -Path $REV_DIR | Out-Null

# Close any Word instances and clear old Revised files
Get-Process WINWORD -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Milliseconds 800
Get-ChildItem $REV_DIR -Filter '*.docx' -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue

# Single Word instance for the whole batch
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0  # wdAlertsNone

function Open-And-Copy {
    param([string]$src, [string]$dst, [bool]$isLegacy)
    if ($isLegacy) {
        # Convert .doc -> .docx via Word SaveAs
        $tmp = Join-Path $env:TEMP ([System.IO.Path]::GetFileName($src))
        Copy-Item -Path $src -Destination $tmp -Force
        $tmpDoc = $word.Documents.Open($tmp)
        $tmpDoc.SaveAs([ref]$dst, [ref]$wdFormatDocx)
        $tmpDoc.Close()
        Remove-Item $tmp -Force -ErrorAction SilentlyContinue
        return $word.Documents.Open($dst)
    } else {
        Copy-Item -Path $src -Destination $dst -Force
        return $word.Documents.Open($dst)
    }
}

function Find-Anchor {
    param($doc, $anchorText, $anchorAlt)
    foreach ($try in @($anchorText, $anchorAlt) | Where-Object { $_ -ne $null -and $_ -ne '' }) {
        $find = $doc.Content.Find
        $find.ClearFormatting()
        $find.Text = $try
        $find.Forward = $true
        $find.MatchCase = $false
        $find.Wrap = 1  # wdFindContinue
        if ($find.Execute()) {
            return $find.Parent.Duplicate
        }
    }
    return $null
}

function Inject {
    param($doc, $anchorRange, $where, $lines, $why)
    if ($where -eq 'Before') {
        $insertPoint = $anchorRange.Paragraphs.Item(1).Range.Start
    } else {
        $insertPoint = $anchorRange.Paragraphs.Item(1).Range.End
    }
    # Build payload
    $payload = ''
    foreach ($line in $lines) { $payload += $line + "`r" }
    $payload += '[Why: ' + $why + ']' + "`r"

    $insertRange = $doc.Range($insertPoint, $insertPoint)
    $insertRange.Text = $payload
    $totalLen = $payload.Length
    $contentEnd = $insertPoint + $totalLen
    $whyLine = '[Why: ' + $why + ']'
    $whyStart = $contentEnd - $whyLine.Length - 1
    $whyEnd   = $contentEnd - 1

    $allRange = $doc.Range($insertPoint, $contentEnd)
    $allRange.Font.Color = $PURPLE

    $linesRange = $doc.Range($insertPoint, $whyStart)
    $linesRange.Font.Bold = $true

    $whyRange = $doc.Range($whyStart, $whyEnd)
    $whyRange.Font.Italic = $true
    $whyRange.Font.Bold = $false
}

$summary = @()
foreach ($task in $tasks) {
    $src = Join-Path $NEW_DIR $task.Source
    $dst = Join-Path $REV_DIR $task.Output
    $isLegacy = $false
    if ($task.ContainsKey('IsLegacyDoc')) { $isLegacy = $task.IsLegacyDoc }

    if (-not (Test-Path $src)) {
        $summary += [PSCustomObject]@{ Source=$task.Source; Output='-'; Injected=0; Missed=0; Result='MISSING' }
        continue
    }

    Write-Host "Processing $($task.Source) -> $($task.Output)"
    $doc = Open-And-Copy -src $src -dst $dst -isLegacy $isLegacy

    $injected = 0
    $missed   = 0
    foreach ($ins in $task.Insertions) {
        $alt = if ($ins.ContainsKey('AnchorAlt')) { $ins.AnchorAlt } else { '' }
        $r = Find-Anchor -doc $doc -anchorText $ins.Anchor -anchorAlt $alt
        if ($r -eq $null) {
            Write-Host "  -- anchor NOT FOUND: $($ins.Anchor)"
            $missed += 1
            continue
        }
        Inject -doc $doc -anchorRange $r -where $ins.Where -lines $ins.Lines -why $ins.Why
        Write-Host "  ++ injected $($ins.Lines.Count) line(s) at: $($ins.Anchor)"
        $injected += 1
    }

    $doc.Save()
    $doc.Close()

    $summary += [PSCustomObject]@{
        Source = $task.Source
        Output = $task.Output
        Injected = $injected
        Missed = $missed
    }
}

$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
[GC]::Collect() | Out-Null
[GC]::WaitForPendingFinalizers() | Out-Null

Write-Host ""
Write-Host "=== Summary ==="
$summary | Format-Table -AutoSize
Write-Host ""
Write-Host "Output: $REV_DIR"
Get-ChildItem $REV_DIR -Filter '*.docx' | Select-Object Name, Length
