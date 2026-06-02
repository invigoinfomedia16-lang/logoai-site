// MLpFooter — shared site footer used by the main /prelaunch page AND
// every subpage (via MLpSubpageShell). Wordmark on top, 8-section link
// grid in the middle, badges + copyright at the bottom. Styling lives
// in MLpNavStyles so the footer matches the home page visually on
// every page automatically.

import { Check } from 'lucide-react'
import MLpLogo from './MLpLogo'

const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
  { title: 'Popular Industries', links: ['Restaurant Logos', 'Coffee Shop Logos', 'Bakery Logos', 'Boutique Logos', 'Gym Logos'] },
  { title: 'Popular Styles',     links: ['Minimalist Logos', 'Vintage Logos', 'Monogram Logos', 'Wordmark Logos', 'Modern Logos'] },
  { title: 'Popular Symbols',    links: ['Crown Logos', 'Animal Logos', 'Leaf Logos', 'Mountain Logos', 'Star Logos'] },
  { title: 'Popular Colors',     links: ['Black & White Logos', 'Blue Logos', 'Gold Logos', 'Green Logos', 'Pink Logos'] },
  { title: 'Quick Links',        links: ['Gallery', 'How It Works', 'FAQ', 'Blog', "Who It's For", 'Free Logo Generator'] },
  { title: 'Company',            links: ['About Us', 'Our Story', 'Team', 'Why LOGO.AI', 'Press', 'Manifesto', 'Contact Support'] },
  { title: 'Explore',            links: ['Before & After', 'Wall of Love', '$0 Brand Playbook', 'AI vs Designer', 'Science Behind the Logo'] },
  { title: 'Legal',              links: ['Terms of Use', 'Privacy Policy', 'Refund Policy', 'Security Policy', 'Commercial License', 'Cookie Policy'] },
]

export default function MLpFooter() {
  return (
    <footer className="lp-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="brand" aria-label="LOGO.AI">
            <MLpLogo />
          </div>
          <p className="tag">Free logos for the first 2,000,000 users</p>
        </div>

        <div className="footer-cols">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="badges">
            <span><Check size={14} strokeWidth={2.5} /> SSL Secure</span>
            <span><Check size={14} strokeWidth={2.5} /> Stripe Payments</span>
            <span><Check size={14} strokeWidth={2.5} /> Your data is safe</span>
          </div>
          <div className="copy">Copyright © 2026 LOGO.AI. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
