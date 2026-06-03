// Root redirect: visitors to / land on the prelaunch page (the current
// live site). The old /design-l preview tree has been retired.

import { redirect } from 'next/navigation'

export default function RootRedirect() {
  redirect('/prelaunch')
}
