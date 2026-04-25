// Stakeholder preview: redirect / to /design-l so visitors land on the new L
// design. The original Freepik homepage is preserved in git history (one
// commit prior on this branch). Revert this single commit to restore Freepik
// at the root URL.

import { redirect } from 'next/navigation'

export default function RootRedirect() {
  redirect('/design-l')
}
