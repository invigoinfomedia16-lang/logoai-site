# Page-by-Page Side-by-Side Review

For each page: ORIGINAL .docx text on the left, SITE-extracted text on the right (deduped, in order).

---

## HOMEPAGE  →  page.tsx

### ORIGINAL (.docx)
```
TOP NAVIGATION
LOGO.AI (logo/wordmark, links to homepage)
Nav items:
Product
How it works
Examples
Why LOGO.AI
Who it's for
Company ▾
About us
Our story
Leadership
Press
Contact
Blog
Right side: [ Get my free logo → ]
HERO
The world's best AI logo generator
Get your free logo in seconds
Free for the first 2,000,000 users. Claim yours before they're gone.
[ Enter your email address ] [→ Get my free logo]
No credit card required.
1,834,527 of 2,000,000 free logos remaining 32 days until launch
Section 1 — Real examples
🎨 Real examples
Logos designed by our AI
Every logo below was designed in under 60 seconds. All original. All unique.
[Gallery of example logos]
[→ See all examples]
Section 2 — Works everywhere
🌐 Works everywhere
From favicon to billboard
See our logos in the real world — on business cards, websites, packaging, signage, and every size in between.
Section 3 — Simple as 1-2-3
⚡ Simple as 1-2-3
No design skills needed
Describe your brand. Watch AI design it. Download and launch.
STEP 01 — Describe your brand Enter your business name and a short description. Our AI uses this to understand your brand's personality and audience.
STEP 02 — Watch AI design it In under 60 seconds, our AI generates original logo concepts — choosing the right style, colors, and typography for you.
STEP 03 — Download and launch Pick your favorite, then download print-ready and web-ready files instantly.
[→ See full walkthrough]
Section 4 — How we compare
⚖️ How we compare
Outperforms the templates. Replaces the designer.
On speed, cost, quality, and everything that matters — here's how LOGO.AI stacks up against the alternatives.
LOGO.AI
AI-generated, instant
Traditional Designer
Hire an agency or freelancer
Other AI Logo Makers
Template-based generators
Cost
Free (first 2M users)
$5K–$50K+ per project
$20–$100/month
Time to logo
60 seconds
3–6 weeks
1–3 hours of trial and error
Quality
Professional, consistent
High (depends on designer)
Generic, inconsistent
Revisions
None needed
Multiple rounds
Trial and error
Brand understanding
Automatic
Manual briefing
Limited
Consistency
Built-in
Depends on the team
Limited
Effort from you
Minimal — AI handles it
High
Medium
Section 5 — Going fast
🔥 Going fast
165,473 logos already claimed. 1,834,527 free logos left.
165,473
60s
1,834,527
Logos claimed
Average generation time
Free logos left
[→ Claim yours now]
Section 6 — FAQ
💬 FAQ
Got questions? We've got answers.
Pricing. Privacy. Trademarks. The works.
[→ See all questions]
Section 7 — Insights
📚 Insights
Tips, trends, and inspiration
Fresh takes on branding, AI design, and what makes a logo actually work.
[→ Read the blog]
Section 8 — Final CTA
Get your free logo in seconds
1,834,527 free logos left. Claim yours before they're gone.
[ Enter your email address ] [→ Claim my free logo]
No credit card required.
FOOTER
LOGO.AI
Get your free AI-generated logo in seconds. Original designs, no templates – crafted for your brand. Free for the first 2,000,000 users.
Product
Why LOGO.AI
Product
How it works
Examples
Who it's for
FAQ
Blog
Company
About us
Our story
Leadership
Press
Contact
Legal
Privacy policy
Terms of service
Cookie policy
Follow us: [Twitter/X] · [LinkedIn] · [Instagram]
© 2026 LOGO.AI, Inc. LOGO.AI is an independent service.
```

### SITE (page.tsx extracted strings)
```
85), far-left strip (x
Get my free logo
No credit card required.
${half},${sw} ${s - sw},${half} ${half},${s - sw} ${sw},${half}
url(#${s.gradId})
url(#${maskId})
Go to slide ${i + 1}
Smashtown Burgers
Restaurant branding
Hearth & Grind
Coffee shop identity
Corner Oven Co.
Bakery packaging
StreetStack Tacos
Food truck wrap
Steel & Blade
Barbershop merch
Rosewood Hair
Salon product line
Blossom Nails
Beauty packaging
Prairie Rose
Boutique branding
Street Wolf
Apparel design
Apex Combat
Gym merchandise
${s}px
${m.size}px
${sz}px
${item.x}%
${p.size}px
Diagonals Symmetric
Diagonals Converge
Sync Noir
Sync Figure
Sync Grain
Sync Spotlight
Sync Deep
Sync Mesh
Live Glow
Main Site
Editorial Mono
Enter your email address
Describe your brand
Watch AI design it
Download and launch
LOGO.AI
Time to logo: 60 seconds
Quality: Professional, consistent
Brand understanding: Automatic
Effort from you: Minimal — AI handles it
Traditional Designer
Time to logo: 3–6 weeks
Quality: High (depends on designer)
Brand understanding: Manual briefing
Consistency: Depends on the team
Effort from you: High
Other AI Logo Makers
Time to logo: 1–3 hours of trial and error
Quality: Generic, inconsistent
Brand understanding: Limited
Effort from you: Medium
Logos claimed
Average generation time
Free logos left
Hearth & Grind Roasters
blur(8px)
${g.size}px
huge-grad-${i}
${item.y}%
invert(1)
1px solid rgba(0,0,0,0.35)
1px solid rgba(0,0,0,0.12)
diagonalsSymmetric
diagonalsConverge
dk-eyebrow inline-block mb-5 px-3 py-1 rounded-full
Enter your business name and a short description. Our AI uses this to understand your brand
In under 60 seconds, our AI generates original logo concepts — choosing the right style, colors, and typography for you.
Pick your favorite, then download print-ready and web-ready files instantly.
AI-generated, instant
first 2M users
Hire an agency or freelancer
per project
Template-based generators
per month
1px solid ${sideCardBorder}
1px solid ${sideCardDivider}
dk-eyebrow inline-block text-white/80 mb-5 px-3 py-1 rounded-full bg-white/10
1px solid ${t.borderSubtle}
bg-[#F5F5F5] open:bg-white open:ring-black/10
bg-black/10 group-open:bg-black
bg-black group-open:bg-white
deg)
url(#
/* Typography + font imports + all .dk-* classes now live in
           app/design-l/layout.tsx (scoped to .l-theme). This file only holds
           homepage-specific animations and one-off utilities. */

        /* cmp-nowrap: force a specific h2 to stay on one line at desktop */
        @media (min-width: 768px) {
          .cmp-nowrap { white-space: nowrap; }
        }

        /* Cycling logo cards — fade-up in sequence */
        @keyframes dk-card-fade {
          0%   { opacity: 0; transform: translateY(16px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dk-card-cycle {
          animation: dk-card-fade 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Gallery logo fade-in on category switch */
        @keyframes dkLogoFade {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
0 4px 20px
s forwards
Go to slide
rounded-2xl p-8 lg:p-10 text-left relative
1px solid
deg) scale(1)
group rounded-2xl overflow-hidden open:shadow-md open:ring-1 transition-all
w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors relative
block w-3 h-[2px]
block absolute w-[2px] h-3 group-open:rotate-90 transition-transform
```

---

## PRODUCT  →  product/page.tsx

### ORIGINAL (.docx)
```
PRODUCT
Everything LOGO.AI can do for your brand
An original logo in 60 seconds. A full brand kit designed around it. All powered by AI trained on real design principles.
What LOGO.AI does
LOGO.AI generates professional, original logos from a single brand description — in under a minute. No templates. No clip art. No design experience needed.
Behind every logo is AI trained like a design student — color theory, typography pairing, negative space, grid systems, visual hierarchy. Not a library of pre-made assets to recombine.
The result: a logo that looks designed, not assembled. At every size, in every context.
How it works
STEP 01 — Describe your brand Enter your business name and a short description. Our AI uses this to understand your brand's personality and audience.
STEP 02 — Watch AI design it In under 60 seconds, our AI generates original logo concepts — choosing the right style, colors, and typography for you.
STEP 03 — Download and launch Pick your favorite, then download print-ready and web-ready files instantly.
[→ See full walkthrough]
Core features
⚡ Ready in seconds No waiting days or weeks. No revisions. Just a finished logo, ready to use.
💸 Completely free No hidden fees. No watermarks. No credit card. Your logo is yours — forever.
🧠 AI that understands your brand You don't need design skills. The AI reads your industry, tone, and style — and handles every design choice for you.
🌐 Works everywhere Built for web, print, and apps — so your brand stays consistent at every size, in every context.
How our AI is different
Trained to design, not to assemble
Our AI was trained on the same principles real designers use — color theory, typography pairing, negative space, grid systems, visual hierarchy.
The result is a logo that doesn't just look beautiful. It works beautifully.
Studio-quality typography. Pixel-perfect balance. Colors that communicate. And a design that holds up:
On a business card. On a website. On a billboard. On a favicon.
At every size, in every context.
What you get
Your logo is free. The rest of your brand comes with it.
Most founders need more than a logo. So we built everything else too — business cards, social assets, app icons, mockups, the works. All designed to match your logo.
The logo is free. The rest is a paid upgrade.
Free
Logo Files — High-res PNG with transparent background. SVG, JPG, and PDF coming soon.
Brand Kit — paid upgrade
App Icons — App Store and Google Play ready, iOS + Android.
Social Kit — Profiles, covers, stories. Sized perfectly for every platform.
Brand Colors — HEX, RGB, CMYK. Web and print.
Font Guide — Matched fonts for headlines, body, and accents.
Brand Guide — Usage rules, spacing, do's and don'ts.
Business Card — Print-ready front and back.
Web Assets — Favicons, OG images, optimized graphics.
Email Signature — Branded with your logo, colors, and links.
Letterhead — Proposals, contracts, letters.
Invoice Design — A layout that makes you look established from day one.
Mockups — Your logo on shirts, cards, signage, and more.
Ready to see what your logo looks like?
Join 165,000+ founders who've already claimed their spot. Two million free logos at launch — first come, first served.
[→ Claim your free logo]
Launching June 2026
```

### SITE (page.tsx extracted strings)
```
Logo Files
Everything to launch your brand
Describe your brand
Enter your business name and a short description. Our AI uses this to understand your brand's personality and audience.
Watch AI design it
In under 60 seconds, our AI generates original logo concepts — choosing the right style, colors, and typography for you.
Download and launch
Pick your favorite, then download print-ready and web-ready files instantly.
Ready in seconds
No waiting days or weeks. No revisions. Just a finished logo, ready to use.
Completely free
No hidden fees. No watermarks. No credit card. Your logo is yours — forever.
AI that understands your brand
You don't need design skills. The AI reads your industry, tone, and style — and handles every design choice for you.
Works everywhere
Built for web, print, and apps — so your brand stays consistent at every size, in every context.
App Icons
App Store and Google Play ready, iOS + Android.
Social Kit
Profiles, covers, stories. Sized perfectly for every platform.
Brand Colors
HEX, RGB, CMYK. Web and print.
Font Guide
Matched fonts for headlines, body, and accents.
Brand Guide
Usage rules, spacing, do's and don'ts.
Business Card
Print-ready front and back.
Web Assets
Favicons, OG images, optimized graphics.
Email Signature
Branded with your logo, colors, and links.
Proposals, contracts, letters.
Invoice Design
A layout that makes you look established from day one.
Your logo on shirts, cards, signage, and more.
What LOGO.AI does
Designed, not assembled.
How it works
Three steps. Sixty seconds.
Core features
What you get, out of the box.
How our AI is different
Trained to design, not to assemble
What you get
Your logo is free. The rest of your brand comes with it.
Ready to see what your logo looks like?
Enter your business name and a short description. Our AI uses this to understand your brand
You don
Usage rules, spacing, do
2px solid #7543E3
+ founders who've already claimed their spot. Two million free logos at launch — first come, first served.
```

---

## HOW It WORKS  →  how-it-works/page.tsx

### ORIGINAL (.docx)
```
HOW IT WORKS
From idea to logo in 60 seconds
Three steps. One input from you. Zero design skills required.
Here's exactly what happens when you use LOGO.AI.
Step 01 — Describe your brand
Tell us who you are in two sentences.
Enter your business name. Add a short description — what you do, who you serve, and the feeling you want your brand to convey.
That's it. No color pickers. No style quizzes. No 40-question brand briefs.
What the AI is doing: Reading your description the way a creative director reads a brief. Identifying your industry. Parsing your tone. Inferring your audience. Mapping everything to design decisions — which typefaces will suit you, which color palettes fit your category, which visual styles match your personality.
In seconds, the AI builds a mental picture of your brand. The kind a designer would take two meetings to form.
Step 02 — Watch AI design it
In under 60 seconds, the AI generates original logo concepts — each one designed specifically for your brand.
No loading spinners. No "please wait three business days." Just real-time generation.
What the AI is doing: Applying the same principles a professional designer uses — color theory, typography pairing, negative space, grid systems, visual hierarchy.
It's not pulling shapes from a library. It's not swapping in clip art. It's designing — making decisions about proportion, balance, contrast, and meaning.
You'll see multiple directions: different styles, different layouts, different moods. All original. All built for your brand.
Step 03 — Download and launch
Pick your favorite. Download instantly.
High-resolution PNG with a transparent background. Ready for your website, your social media, your business cards, your signage — everywhere your brand needs to show up.
No account setup. No credit card. No watermark.
What you get: A real logo. An original design. Yours to use anywhere, forever.
Want more? The full brand kit — business cards, app icons, social templates, mockups — is available as a paid upgrade whenever you're ready.
Behind the scenes
What makes LOGO.AI different from other AI tools
Most AI logo makers recombine pre-made templates and stock assets. They're essentially clip-art shufflers with a machine-learning coat of paint.
LOGO.AI is different.
Our AI was trained on the same principles real designers use — studying iconic logos, breaking down what makes them work, learning the invisible grids and ratios behind great design.
It doesn't assemble a logo. It designs one. From scratch. Every time.
What founders are saying
"Sixty seconds. One of them was better than the six my agency sent after three weeks." Daniel Walsh — Founder, Clearline (Fintech)
"I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio." Sarah Mitchell — Founder, Greenleaf Co. (E-commerce)
"One input. One minute. Real design. I honestly didn't think this existed yet." Megan Foster — Founder, Saltline Studio (Creative agency)
Your logo is sixty seconds away
165,000+ founders have already claimed their spot. 1,834,527 free logos left.
[→ Claim your free logo]
Launching June 2026
```

### SITE (page.tsx extracted strings)
```
How It Works
Tell us who you are in two sentences.
Enter your business name. Add a short description — what you do, who you serve, and the feeling you want your brand to convey.
That's it. No color pickers. No style quizzes. No 40-question brand briefs.
What the AI is doing
Reading your description the way a creative director reads a brief. Identifying your industry. Parsing your tone. Inferring your audience. Mapping everything to design decisions — which typefaces will suit you, which color palettes fit your category, which visual styles match your personality.
In seconds, the AI builds a mental picture of your brand. The kind a designer would take two meetings to form.
In under 60 seconds, the AI generates original logo concepts — each one designed specifically for your brand.
No loading spinners. No "please wait three business days." Just real-time generation.
Applying the same principles a professional designer uses — color theory, typography pairing, negative space, grid systems, visual hierarchy.
It's not pulling shapes from a library. It's not swapping in clip art. It's designing — making decisions about proportion, balance, contrast, and meaning. You'll see multiple directions: different styles, different layouts, different moods. All original. All built for your brand.
Pick your favorite. Download instantly.
High-resolution PNG with a transparent background. Ready for your website, your social media, your business cards, your signage — everywhere your brand needs to show up.
No account setup. No credit card. No watermark.
What you get
A real logo. An original design. Yours to use anywhere, forever.
Want more? The full brand kit — business cards, app icons, social templates, mockups — is available as a paid upgrade whenever you\'re ready.
Sixty seconds. One of them was better than the six my agency sent after three weeks.
Daniel Walsh
Founder, Clearline (Fintech)
I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio.
Sarah Mitchell
Founder, Greenleaf Co. (E-commerce)
One input. One minute. Real design. I honestly didn't think this existed yet.
Megan Foster
Founder, Saltline Studio (Creative agency)
The walkthrough
Three steps. Sixty seconds.
3px solid #7543E3
Behind the scenes
What makes LOGO.AI different from other AI tools
What founders are saying
The feedback so far.
Your logo is sixty seconds away
No loading spinners. No
Want more? The full brand kit — business cards, app icons, social templates, mockups — is available as a paid upgrade whenever you\
One input. One minute. Real design. I honestly didn
+ founders have already claimed their spot.
free logos left.
```

---

## EXAMPLES  →  examples/page.tsx

### ORIGINAL (.docx)
```
EXAMPLES
See what LOGO.AI designs
Every logo below was generated by AI in under 60 seconds. No human touch-ups. No templates. No stock assets.
Just AI, trained on real design principles, designing for real brands.
By industry
Explore logos across categories
The blind test
Can you tell which ones are AI?
Every logo on this page was generated by LOGO.AI in under 60 seconds.
We showed these to professional designers and asked them to pick which ones were AI-generated. The results: they guessed at roughly chance — no better than flipping a coin.
That's the bar we set. That's the bar we cleared.
What's next for your brand
Every logo starts the same way — with your brand name and a short description.
In 60 seconds, you'll have logos designed specifically for your business. Just like the ones above.
[→ Claim your free logo]
165,000+ founders have already claimed their spot. Two million free logos at launch — first come, first served.
Launching June 2026
```

### SITE (page.tsx extracted strings)
```
By industry
Explore logos across categories
The blind test
Can you tell which ones are AI?
Every logo starts the same way — with your brand name and a short description.
@keyframes lLogoFade {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
s forwards
+ founders have already claimed their spot. Two million free logos at launch — first come, first served.
```

---

## WHY LOGO AI  →  why-logo-ai/page.tsx

### ORIGINAL (.docx)
```
WHY LOGO.AI
The fastest way to a professional logo
No designers. No templates. No cost.
Describe your brand. Get a studio-quality logo in 60 seconds. Completely free.
1. It's faster than anything out there
60 seconds. Not 6 weeks. Not 2 hours of trial and error.
Designers take three to six weeks. Other AI tools take hours of back-and-forth. LOGO.AI generates a finished, professional logo in under a minute.
One input. One minute. One logo you can actually use.
2. It's free where others charge
$0. Not $20,000. Not $100 a month.
Hiring a designer costs $5K–$50K+. Other AI logo makers charge monthly subscriptions. LOGO.AI is completely free — no hidden fees, no watermarks, no credit card.
You own your logo. Forever.
3. It designs. It doesn't assemble.
Every logo is original. Not recombined from templates.
Most AI logo makers shuffle clip art and call it design. LOGO.AI was trained on real design principles — color theory, typography pairing, negative space, grid systems, visual hierarchy.
The AI doesn't pick pieces from a library. It makes design decisions.
4. It gives you more than a logo
Most tools stop at the logo. LOGO.AI doesn't.
Other logo makers hand you a file and walk away. LOGO.AI gives you a full brand system — business cards, social assets, app icons, mockups, the works. All designed to match.
The logo is free. The brand kit is a paid upgrade, ready the moment you need it.
5. It holds up everywhere
On a business card. On a billboard. On a favicon. At every size.
A great logo isn't just pretty. It works at 16 pixels and at 16 feet. LOGO.AI is built for every screen, every surface, every format — so your brand stays consistent as it scales.
How LOGO.AI compares
Here's the side-by-side.
LOGO.AI
Hire a Designer
Other AI Logo Makers
Cost
Free
$5K–$50K+
$20–$100/mo
Time to logo
60 seconds
3–6 weeks
2–4 hours
Approach
AI-designed
Human process
Templates
Output quality
Professional, consistent
High (depends)
Generic, inconsistent
Originality
✓
✓
✗
Trained on real design principles
✓
N/A
✗
Understands your brand
✓
✓
✗
Full brand system
✓
Custom quote
✗
Revisions needed
None
Multiple rounds
Trial and error
What founders are saying
"Sixty seconds. One of them was better than the six my agency sent after three weeks." Daniel Walsh — Founder, Clearline (Fintech)
"I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio." Sarah Mitchell — Founder, Greenleaf Co. (E-commerce)
"I showed three options to my team. They couldn't tell which one was AI. Neither could I." Michael Reyes — Co-Founder, Beacon Labs (AI tools)
"I've rebranded three companies. This was the only one that didn't take six weeks." Chris Donovan — Founder, Bright Harbor (Consulting)
"The typography alone looks like it came from a $15K studio. Then I saw the price." Alex Rivera — Founder, Stack & Field (SaaS)
"One input. One minute. Real design. I honestly didn't think this existed yet." Megan Foster — Founder, Saltline Studio (Creative agency)
Your logo is sixty seconds away
Join 165,000+ founders who've already claimed their spot. Two million free logos at launch — first come, first served.
[→ Claim yours now]
Launching June 2026
```

### SITE (page.tsx extracted strings)
```
Why LOGO.AI
LOGO.AI
Hire a Designer
Other AI Logo Makers
It's faster than anything out there
60 seconds. Not 6 weeks. Not 2 hours of trial and error.
Designers take three to six weeks. Other AI tools take hours of back-and-forth. LOGO.AI generates a finished, professional logo in under a minute.
One input. One minute. One logo you can actually use.
It's free where others charge
Hiring a designer costs $5K–$50K+. Other AI logo makers charge monthly subscriptions. LOGO.AI is completely free — no hidden fees, no watermarks, no credit card.
You own your logo. Forever.
It designs. It doesn't assemble.
Every logo is original. Not recombined from templates.
Most AI logo makers shuffle clip art and call it design. LOGO.AI was trained on real design principles — color theory, typography pairing, negative space, grid systems, visual hierarchy.
The AI doesn't pick pieces from a library. It makes design decisions.
It gives you more than a logo
Most tools stop at the logo. LOGO.AI doesn't.
Other logo makers hand you a file and walk away. LOGO.AI gives you a full brand system — business cards, social assets, app icons, mockups, the works. All designed to match.
The logo is free. The brand kit is a paid upgrade, ready the moment you need it.
It holds up everywhere
On a business card. On a billboard. On a favicon. At every size.
A great logo isn't just pretty. It works at 16 pixels and at 16 feet. LOGO.AI is built for every screen, every surface, every format — so your brand stays consistent as it scales.
Time to logo
Output quality
Trained on real design principles
Understands your brand
Full brand system
Revisions needed
Sixty seconds. One of them was better than the six my agency sent after three weeks.
Daniel Walsh
Founder, Clearline (Fintech)
I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio.
Sarah Mitchell
Founder, Greenleaf Co. (E-commerce)
I showed three options to my team. They couldn't tell which one was AI. Neither could I.
Michael Reyes
Co-Founder, Beacon Labs (AI tools)
I've rebranded three companies. This was the only one that didn't take six weeks.
Chris Donovan
Founder, Bright Harbor (Consulting)
The typography alone looks like it came from a $15K studio. Then I saw the price.
Alex Rivera
Founder, Stack & Field (SaaS)
One input. One minute. Real design. I honestly didn't think this existed yet.
Megan Foster
Founder, Saltline Studio (Creative agency)
See it in action
Watch LOGO.AI design a brand in 60 seconds.
22px solid #FFFFFF
What sets us apart
Five reasons LOGO.AI is different.
How LOGO.AI compares
Here's the side-by-side.
What founders are saying
Real feedback, real projects.
Your logo is sixty seconds away
Claim yours now
It designs. It doesn
The AI doesn
Most tools stop at the logo. LOGO.AI doesn
A great logo isn
60 seconds
3–6 weeks
2–4 hours
Human process
Professional, consistent
High (depends)
Generic, inconsistent
N/A
Custom quote
Multiple rounds
Trial and error
I showed three options to my team. They couldn
One input. One minute. Real design. I honestly didn
blur(8px)
14px solid transparent
2px solid #7543E3
+ founders who've already claimed their spot. Two million free logos at launch — first come, first served.
```

---

## WHO IT'S FOR  →  who-its-for/page.tsx

### ORIGINAL (.docx)
```
WHO IT'S FOR
Great design, for everyone starting something
Whether you're launching a startup, naming your side project, or branding your new business — LOGO.AI is built for you.
No design skills. No budget. No problem.
For startup founders
You're moving fast. Your logo shouldn't slow you down.
Three weeks on a logo is three weeks you're not building. Three months on a brand identity is three months your competitors are shipping.
LOGO.AI designs a logo that looks like you paid for a studio — in sixty seconds. Describe your startup in a sentence or two, and you'll have professional concepts ready to use on your pitch deck, your landing page, your Product Hunt launch.
Why founders choose LOGO.AI:
60 seconds vs. 6 weeks of agency back-and-forth
Free instead of $20,000+
Looks investor-ready from day one
Works everywhere — pitch deck, website, app icon, socials
"Sixty seconds. One of them was better than the six my agency sent after three weeks." Daniel Walsh — Founder, Clearline (Fintech)
[→ Claim your free logo]
For small businesses
Look established from day one.
Your customers don't care how long you've been in business. They care whether you look like you know what you're doing.
LOGO.AI gives small businesses — restaurants, consultancies, retail shops, service providers — a logo that signals "we're the real deal." Professional typography. Clean design. A brand that holds up on your sign, your storefront, your invoices, your social media.
Why small businesses choose LOGO.AI:
No $5K design bill before you've made your first sale
Same quality a local agency would deliver
Ready for print, web, and signage
Full brand kit available when you're ready to scale
"I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio." Sarah Mitchell — Founder, Greenleaf Co. (E-commerce)
[→ Claim your free logo]
For creators and side projects
Your side project deserves a real logo.
Your podcast, your Substack, your YouTube channel, your indie app, your weekend idea that might turn into something — they all deserve to look the part.
LOGO.AI gives creators professional-grade logos without the professional-grade price tag. Whether it's a personal brand, a content series, or a passion project that's not ready for a five-figure design budget, you can have something that looks intentional in under a minute.
Why creators choose LOGO.AI:
Free means you can actually afford to have one
Every project you launch gets a unique logo
Ready for YouTube thumbnails, podcast art, Twitter banners, app icons
As serious about design as you are about the work
"Finally. A logo tool that doesn't feel like a logo tool." Lauren Brooks — Founder, Habit House (Consumer wellness)
[→ Claim your free logo]
For e-commerce brands
Your brand lives on packaging, social, and screens. It needs to work everywhere.
A DTC brand's logo doesn't get one moment to shine — it shows up on product labels, Instagram grids, Shopify storefronts, shipping boxes, ads, and email headers. If it doesn't scale, it doesn't work.
LOGO.AI is built for scale. Every logo is designed to look sharp at every size, on every surface — from a Shopify favicon to a retail shelf label.
Why e-commerce brands choose LOGO.AI:
Works at 16 pixels and at 16 inches
Transparent PNG ready for any background
Brand kit includes social templates, packaging-ready assets, and mockups
Original design — so your brand doesn't look like every other DTC store
"I've rebranded three companies. This was the only one that didn't take six weeks." Chris Donovan — Founder, Bright Harbor (Consulting)
[→ Claim your free logo]
For agencies and freelancers
Deliver faster. Charge more. Keep the quality bar high.
Most agencies spend 20–40 hours on early logo exploration — rounds of sketches, revisions, client back-and-forth. That's billable time you could spend on higher-value work.
LOGO.AI lets agencies and freelancers generate dozens of strong, original logo directions in minutes. Use them as starting points, variations, or client-presentation options. Keep the strategic and creative work where the margin is — skip the grinding iteration.
Why agencies use LOGO.AI:
Explore 10 logo directions in 10 minutes
Save 20+ hours per client on early-stage design
Present more options without burning your team
White-label-friendly for your workflow
"One input. One minute. Real design. I honestly didn't think this existed yet." Megan Foster — Founder, Saltline Studio (Creative agency)
[→ Claim your free logo]
Not sure where you fit?
You don't have to be a founder, a small business, or a creator. You just have to be starting something.
If you have a name and an idea, LOGO.AI has a logo for you.
Your logo is sixty seconds away
165,000+ people have already claimed their spot. 1,834,527 free logos left.
[→ Claim your free logo]
Launching June 2026
```

### SITE (page.tsx extracted strings)
```
Who It&apos;s For
For startup founders
You're moving fast. Your logo shouldn't slow you down.
Three weeks on a logo is three weeks you're not building. Three months on a brand identity is three months your competitors are shipping.
LOGO.AI designs a logo that looks like you paid for a studio — in sixty seconds. Describe your startup in a sentence or two, and you'll have professional concepts ready to use on your pitch deck, your landing page, your Product Hunt launch.
Sixty seconds. One of them was better than the six my agency sent after three weeks.
For small businesses
Look established from day one.
Your customers don't care how long you've been in business. They care whether you look like you know what you're doing.
LOGO.AI gives small businesses — restaurants, consultancies, retail shops, service providers — a logo that signals "we\'re the real deal." Professional typography. Clean design. A brand that holds up on your sign, your storefront, your invoices, your social media.
I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio.
For creators and side projects
Your side project deserves a real logo.
Your podcast, your Substack, your YouTube channel, your indie app, your weekend idea that might turn into something — they all deserve to look the part.
LOGO.AI gives creators professional-grade logos without the professional-grade price tag. Whether it's a personal brand, a content series, or a passion project that's not ready for a five-figure design budget, you can have something that looks intentional in under a minute.
Finally. A logo tool that doesn't feel like a logo tool.
For e-commerce brands
Your brand lives on packaging, social, and screens. It needs to work everywhere.
A DTC brand's logo doesn't get one moment to shine — it shows up on product labels, Instagram grids, Shopify storefronts, shipping boxes, ads, and email headers. If it doesn't scale, it doesn't work.
LOGO.AI is built for scale. Every logo is designed to look sharp at every size, on every surface — from a Shopify favicon to a retail shelf label.
I've rebranded three companies. This was the only one that didn't take six weeks.
For agencies and freelancers
Deliver faster. Charge more. Keep the quality bar high.
Most agencies spend 20–40 hours on early logo exploration — rounds of sketches, revisions, client back-and-forth. That's billable time you could spend on higher-value work.
LOGO.AI lets agencies and freelancers generate dozens of strong, original logo directions in minutes. Use them as starting points, variations, or client-presentation options. Keep the strategic and creative work where the margin is — skip the grinding iteration.
One input. One minute. Real design. I honestly didn't think this existed yet.
3px solid #7543E3
Not sure where you fit?
You just have to be starting something.
Your logo is sixty seconds away
Three weeks on a logo is three weeks you
LOGO.AI designs a logo that looks like you paid for a studio — in sixty seconds. Describe your startup in a sentence or two, and you
Why founders choose LOGO.AI:
Daniel Walsh — Founder, Clearline (Fintech)
Your customers don
LOGO.AI gives small businesses — restaurants, consultancies, retail shops, service providers — a logo that signals
Why small businesses choose LOGO.AI:
Sarah Mitchell — Founder, Greenleaf Co. (E-commerce)
LOGO.AI gives creators professional-grade logos without the professional-grade price tag. Whether it
Why creators choose LOGO.AI:
Finally. A logo tool that doesn
Lauren Brooks — Founder, Habit House (Consumer wellness)
A DTC brand
Why e-commerce brands choose LOGO.AI:
Chris Donovan — Founder, Bright Harbor (Consulting)
Most agencies spend 20–40 hours on early logo exploration — rounds of sketches, revisions, client back-and-forth. That
Why agencies use LOGO.AI:
One input. One minute. Real design. I honestly didn
Megan Foster — Founder, Saltline Studio (Creative agency)
+ people have already claimed their spot.
free logos left.
```

---

## ABOUT US  →  about/page.tsx

### ORIGINAL (.docx)
```
ABOUT US
Great design. For everyone.
We believe every founder, creator, and side project deserves a logo that looks like it came from a top-tier studio.
So we built one that doesn't cost a thing.
<60s generation · 100% original · 2M free logos at launch · $0 no credit card
Why we built it
For thirty years, founders have had two bad options: spend $20,000 and six weeks on a designer, or use a template tool and get a logo that looks like ten thousand others.
We built a third option — AI that designs original logos from scratch, in seconds, for free.
→ Read the full story
Our mission
Make professional branding free.
Every idea deserves a logo worthy of it. Not six weeks later. Not twenty thousand dollars later. Now.
We built LOGO.AI to make that possible — no fees, no waiting, no design degree required. A beautiful, original logo, available to anyone with an idea and an internet connection.
What early users are saying
"This can't be real. I've paid agencies $20K for worse." Jake Thompson — Founder, Northstack (B2B SaaS)
"I've used every logo tool out there. This is the first one that actually looks designed, not assembled." Emily Carter — Founder, Rowan & Rye (DTC)
"Sixty seconds. One of them was better than the six my agency sent after three weeks." Daniel Walsh — Founder, Clearline (Fintech)
"I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio." Sarah Mitchell — Founder, Greenleaf Co. (E-commerce)
"I showed three options to my team. They couldn't tell which one was AI. Neither could I." Michael Reyes — Co-Founder, Beacon Labs (AI tools)
"Finally. A logo tool that doesn't feel like a logo tool." Lauren Brooks — Founder, Habit House (Consumer wellness)
Our vision
A future where design reads your mind.
Today, you describe your brand in words. Tomorrow, you won't have to.
We're building toward a world where AI understands a brand the way a founder feels it — through intent, emotion, and instinct. Voice. Image. Memory. Eventually, thought itself.
Imagine launching a company the moment you imagine it. Picture it — and your logo, your site, your product, your entire brand identity exists. Fully designed. Pixel-perfect. Instantly.
No prompts. No briefs. No wait.
A world where the only thing between an idea and a brand is a thought.
Ready to see what your logo looks like?
Over 165,000 logos already claimed. Two million free logos — first come, first served.
[→ Claim your free logo]
Launching June 2026
```

### SITE (page.tsx extracted strings)
```
About Us
This can't be real. I've paid agencies $20K for worse.
Jake Thompson
Founder, Northstack (B2B SaaS)
I've used every logo tool out there. This is the first one that actually looks designed, not assembled.
Emily Carter
Founder, Rowan & Rye (DTC)
Sixty seconds. One of them was better than the six my agency sent after three weeks.
Daniel Walsh
Founder, Clearline (Fintech)
I'm not a designer. I didn't have to be. The logo just showed up looking like it came from a studio.
Sarah Mitchell
Founder, Greenleaf Co. (E-commerce)
I showed three options to my team. They couldn't tell which one was AI. Neither could I.
Michael Reyes
Co-Founder, Beacon Labs (AI tools)
Finally. A logo tool that doesn't feel like a logo tool.
Lauren Brooks
Founder, Habit House (Consumer wellness)
Why we built it
Two bad options. So we built a third.
Our mission
Make professional branding free.
What early users are saying
The feedback so far.
Our vision
A future where design reads your mind.
Ready to see what your logo looks like?
This can
I showed three options to my team. They couldn
Finally. A logo tool that doesn
logos already claimed. Two million free logos — first come, first served.
```

---

## OUR STORY  →  our-story/page.tsx

### ORIGINAL (.docx)
```
OUR STORY
Thirty years. Same broken process.
Every company we've built, backed, or advised needed a logo. And every time, it was the same story: too slow, too expensive, or too generic.
So we fixed it.
The problem
Two bad options. For thirty years.
Hire a designer. Six weeks. Tens of thousands of dollars. Rounds of revisions. And often, a result you don't love.
Use a DIY logo maker. Fast and cheap — but built from the same templates as everyone else's logo. Yours ends up looking like ten thousand others.
There was no third option. So we built one ourselves.
AI that designs original logos — in seconds.
The turning point
Late 2023. AI was suddenly writing code, generating photorealistic images, composing music.
Our founders asked the same question out loud:
"Why can't it design a logo?"
They tried. It couldn't. Warped text, random symbols, zero understanding of what a brand actually is.
But the capability was there — it just hadn't been taught. The models were generating. They weren't designing.
That was the unlock. We stopped trying to prompt AI. We started teaching it.
How we built it
We trained AI the way a design school trains a student.
Study the masters. We broke down the logos that have stood for decades — color, type, spacing, negative space, the invisible grid behind every iconic mark.
No templates. No shortcuts. Custom models trained on design principles, not stock assets. The AI learns composition, not recombination.
Pass the blind test. Our bar: a professional designer can't tell our output from theirs. We didn't launch until it cleared that bar — consistently.
From warped text to real design
Two and a half years of progress, side by side.
[Before/After visual block — 3–4 image pairs showing the same brand prompt across training milestones]
2023 → 2026
Proof isn't a demo video. It's the logos.
The numbers behind it
2+ years in R&D · 100,000+ logos analyzed · Thousands of training hours · 4 countries
San Francisco (HQ) · Singapore · Tallinn · Dubai
The name
LOGO.AI. One of the most sought-after two-word domains in design.
We didn't start with the name — we earned it. Only after the product worked did we take it. Not for credibility. Because the product finally deserved it.
A name should mean something.
Where we are now
A product that designs real logos. A team that believes design should be instant. And two million free logos, ready to go.
One of them is yours.
→ Meet the team behind it
```

### SITE (page.tsx extracted strings)
```
4px solid #7543E3
A · Long-form Editorial
B · Sticky Timeline
C · Zigzag Alternating
D · Chapter Cards
E · Marketing Hero
F · Illustrated (hand-drawn SVG)
G · AI-illustrated (Replicate)
repeat(auto-fit, minmax(260px, 1fr))
0 auto 20px
repeat(auto-fit, minmax(200px, 1fr))
1px solid #7543E3
```

---

## LEADERSHIP  →  leadership/page.tsx

### ORIGINAL (.docx)
```
LEADERSHIP
The team behind LOGO.AI
Abhinav Reddy — Co-Founder, Product & Technology Building AI that disappears. The kind you stop noticing because it just gets it right.
Ashwin Reddy — Co-Founder, Strategy & Growth The best growth strategy is a product people can't stop talking about. Everything else is a distant second.
Three decades. Two brothers. One conviction: If people don't love the product, nothing else matters.
Before LOGO.AI
We built AI systems long before AI was cool — personality chatbots, website assistants, game AI that learned how you played, recommendation engines, and algorithmic trading systems.
And we shipped products across a dozen industries:
Media platforms reaching tens of millions — stock photos, comics, and creator communities
Education platforms spanning hundreds of programs and structured learning paths
Productivity tools used by founders, job seekers, and professionals worldwide
Some stayed niche. Others scaled to millions. Three decades. Multiple exits. Billions of users reached.
The team
Twelve people. Four countries. Obsessed with getting it right.
Engineers who left big tech. Designers who left top agencies. AI researchers who'd rather build than publish.
They all showed up for the same reason — to prove AI can design as well as a human. And the stubbornness to not ship until it does.
How we operate
Remove friction, don't add features
Make the complicated feel simple
Let the system do the work
Ship only what people will love
One belief, unchanged:
If the product isn't something people love, nothing else matters.
That's what we built LOGO.AI to prove.
```

### SITE (page.tsx extracted strings)
```
Abhinav Reddy
Co-Founder, Product & Technology
Building AI that disappears. The kind you stop noticing because it just gets it right.
Ashwin Reddy
Co-Founder, Strategy & Growth
The best growth strategy is a product people can't stop talking about. Everything else is a distant second.
Our founders
Two brothers. One conviction.
Before LOGO.AI
The team
Twelve people. Four countries. Obsessed with getting it right.
How we operate
Four principles. One goal.
If the product isn't something people love, nothing else matters.
That's what we built LOGO.AI to prove.
See what we built
The best growth strategy is a product people can
```

---

## PRESS  →  press/page.tsx

### ORIGINAL (.docx)
```
PRESS & MEDIA
Everything you need to cover LOGO.AI
Brand assets, company facts, press releases, and media guidelines — all in one place.
For press inquiries: press@logo.ai (response within 24 hours)
Company overview
Quick facts
Founded: 2024
Headquarters: San Francisco
Additional teams: Singapore, Tallinn, Dubai
Stage: Pre-launch (claims open)
Launch: June 2026
Press releases
Live Now ✅ LOGO.AI Opens Claims for 2,000,000 Free AI-Generated Logos LOGO.AI is now accepting claims for two million free logos ahead of its June 2026 launch. Each logo is uniquely generated by AI — not pulled from a template library. The largest free logo giveaway in design history, available first-come, first-served. Over 165,000 founders have already claimed their spot.
Live Now ✅ LOGO.AI Secures Premium Domain as AI Design Category Heats Up The acquisition of LOGO.AI signals growing confidence in AI-first design tools — and the company's commitment to owning the category.
Coming at Launch How LOGO.AI Is Redefining Brand Identity for Startups A look at the technology behind LOGO.AI — and why founders are choosing AI-generated logos over traditional design agencies.
Press kit descriptions
Drop these straight into your article. Short for briefs, medium for standard coverage, full for features.
Short version LOGO.AI is an AI-powered logo generator launching June 2026. It designs professional, original logos in under sixty seconds. 2,000,000 free logos available to claim now. No credit card required.
Medium version LOGO.AI is an AI-powered logo generator launching June 2026. Unlike template-based tools, it's trained on real design principles — color theory, typography pairing, negative space — to generate original, studio-quality logos in 60 seconds. 2,000,000 free logos available at launch, with a paid brand kit for founders who want the full package.
Full version LOGO.AI is an AI logo generator launching June 2026, with claims open now. The platform designs professional, original logos in under sixty seconds using proprietary AI trained on real design principles — color theory, typography pairing, negative space, and visual hierarchy. Unlike traditional logo makers that recombine templates, LOGO.AI generates unique designs tailored to each brand. The company is headquartered in San Francisco, with teams in Singapore, Tallinn, and Dubai. 2,000,000 free logos are being offered at launch on a first-come, first-served basis, with a full paid brand kit — app icons, social kits, business cards, letterhead, mockups, and more — available alongside.
In a sentence: "LOGO.AI creates professional logos in seconds."
Pull quotes
Ready-to-use quotes from our founders. Attribution included.
"Every brand deserves to look like a million bucks on day one. That's not a nice-to-have anymore — it's table stakes. We just made it free." Ashwin Reddy — Co-Founder
"Most people don't need a brand agency. They need one great logo and the confidence to move forward. That's the unlock we're building." Abhinav Reddy — Co-Founder
Brand assets
Logo, colors, and typography
Official brand assets for editorial use. All files print- and web-ready.
Logo Files Official wordmark in Barlow Condensed 900 Italic. Dark and light variants with transparent backgrounds.
Brand Colors
#4F46E5 — Primary
#5B54F7 — Primary Light
#7C73F0 — Primary Lighter
#1A1A2E — Dark Background
#000000 — Black
#FFFFFF — White
Typography
Primary Font: Inter
Weights: Regular (400), Medium (500), Semi Bold (600), Bold (700), Extra Bold (800)
Usage guidelines
How to use our brand
Please follow these guidelines when featuring LOGO.AI in editorial or media contexts.
How to write our name
Always write as LOGO.AI — all caps, period between LOGO and AI.
✅ LOGO.AI ❌ LogoAI · logoai · Logo AI · Logo.ai · Logo.Ai
Do
Use the official logo files from our press kit
Maintain clear space around the logo equal to the height of the 'L'
Use the white logo on dark backgrounds
Use the dark logo on light backgrounds
Link back to logo.ai when featuring the brand
Don't
Alter the logo colors or apply gradients
Stretch, rotate, or distort the logo
Add drop shadows, outlines, or effects
Place the logo on busy or low-contrast backgrounds
Use the logo to imply endorsement without permission
Media contact
For interview requests, embargoed materials, early product access, or custom brand assets — our media team is here to help.
press@logo.ai — Response within 24 hours
```

### SITE (page.tsx extracted strings)
```
Press &amp; Media
press@logo.ai
&ldquo;LOGO.AI creates professional logos in seconds.&rdquo;
Logo Files
Brand Colors
Wordmark:
Headlines:
Body:
How to write our name
LOGO.AI
Additional teams
LOGO.AI Opens Claims for 2,000,000 Free AI-Generated Logos
LOGO.AI is now accepting claims for two million free logos ahead of its June 2026 launch. Each logo is uniquely generated by AI — not pulled from a template library. The largest free logo giveaway in design history, available first-come, first-served. Over ${claimed} founders have already claimed their spot.
LOGO.AI Secures Premium Domain as AI Design Category Heats Up
The acquisition of LOGO.AI signals growing confidence in AI-first design tools — and the company's commitment to owning the category.
How LOGO.AI Is Redefining Brand Identity for Startups
A look at the technology behind LOGO.AI — and why founders are choosing AI-generated logos over traditional design agencies.
Short version
LOGO.AI is an AI-powered logo generator launching June 2026. It designs professional, original logos in under sixty seconds. 2,000,000 free logos available to claim now. No credit card required.
Medium version
LOGO.AI is an AI-powered logo generator launching June 2026. Unlike template-based tools, it's trained on real design principles — color theory, typography pairing, negative space — to generate original, studio-quality logos in 60 seconds. 2,000,000 free logos available at launch, with a paid brand kit for founders who want the full package.
Full version
LOGO.AI is an AI logo generator launching June 2026, with claims open now. The platform designs professional, original logos in under sixty seconds using proprietary AI trained on real design principles — color theory, typography pairing, negative space, and visual hierarchy. Unlike traditional logo makers that recombine templates, LOGO.AI generates unique designs tailored to each brand. The company is headquartered in San Francisco, with teams in Singapore, Tallinn, and Dubai. 2,000,000 free logos are being offered at launch on a first-come, first-served basis, with a full paid brand kit — app icons, social kits, business cards, letterhead, mockups, and more — available alongside.
Every brand deserves to look like a million bucks on day one. That's not a nice-to-have anymore — it's table stakes. We just made it free.
Most people don't need a brand agency. They need one great logo and the confidence to move forward. That's the unlock we're building.
Purple Heart · Primary
Purple Heart Dark
Lighter Mauve
Section Alt BG
Tolopea · Dark BG
Woodsmoke · Body
Company overview
Quick facts
Press releases
Latest announcements
Press kit descriptions
Drop these straight into your article
Pull quotes
Ready-to-use quotes from our founders
3px solid #7543E3
Brand assets
Logo, colors, and typography
Usage guidelines
How to use our brand
For interview requests, embargoed materials, early product access, or custom brand assets
Our media team is here to help.
Response within 24 hours
San Francisco
Singapore, Tallinn, Dubai
Pre-launch (claims open)
June 2026
Live Now
The acquisition of LOGO.AI signals growing confidence in AI-first design tools — and the company
Coming at Launch
LOGO.AI is an AI-powered logo generator launching June 2026. Unlike template-based tools, it
Every brand deserves to look like a million bucks on day one. That
Ashwin Reddy — Co-Founder
Most people don
Abhinav Reddy — Co-Founder
repeat(auto-fit, minmax(320px, 1fr))
LOGO.AI is now accepting claims for two million free logos ahead of its June 2026 launch. Each logo is uniquely generated by AI — not pulled from a template library. The largest free logo giveaway in design history, available first-come, first-served. Over
founders have already claimed their spot.
```

---

## CONTACT  →  contact/page.tsx

### ORIGINAL (.docx)
```
CONTACT
Let's talk
However you want to reach us — we're listening.
General questions
Have a question about LOGO.AI? Want to share feedback? Just want to say hi?
hello@logo.ai Response within 48 hours
Support
Need help with your account, a logo, or the brand kit?
support@logo.ai Response within 24 hours
Press
Writing about LOGO.AI? Looking for brand assets, interviews, or embargoed materials?
press@logo.ai Response within 24 hours
→ Visit our Press page for media kit and resources
Partnerships
Want to work with us? Integration partner, affiliate, or business opportunity?
partnerships@logo.ai Response within 3 business days
Legal
Privacy requests, DMCA notices, or other legal inquiries?
legal@logo.ai
Our offices
San Francisco (HQ) [Street address, San Francisco, CA]
Singapore [Office address]
Tallinn [Office address]
Dubai [Office address]
Can't find what you need? Send us a note at hello@logo.ai and we'll route it to the right team.
```

### SITE (page.tsx extracted strings)
```
hello@logo.ai
mailto:${m.email}
General questions
Have a question about LOGO.AI? Want to share feedback? Just want to say hi?
Need help with your account, a logo, or the brand kit?
Writing about LOGO.AI? Looking for brand assets, interviews, or embargoed materials?
Visit our Press page for media kit and resources
Want to work with us? Integration partner, affiliate, or business opportunity?
Privacy requests, DMCA notices, or other legal inquiries?
How to reach us
Pick the channel that fits.
Our offices
Four cities. One mission.
Still stuck?
We're here to help.
Response within 48 hours
support@logo.ai
Response within 24 hours
press@logo.ai
partnerships@logo.ai
Response within 3 business days
legal@logo.ai
San Francisco
(HQ)
[Street address, San Francisco, CA]
[Office address]
mailto:
```

---

## BLOG  →  blog/page.tsx

### ORIGINAL (.docx)
```
INSIGHTS
INSIGHTS
Tips, trends, and inspiration
Fresh takes on branding, AI design, and what makes a logo work — straight from the team building the future of logo design.
Featured
Why your first logo matters more than you think The difference between a forgettable startup and one people remember often comes down to the first visual impression. Here's why your founding logo is a bigger decision than most founders treat it as.
8 min read · By the LOGO.AI team
→ Read more
Latest posts
How AI learned to design a logo Two and a half years. 100,000+ logos analyzed. Thousands of training hours. Here's the inside story of teaching AI to design the way real designers do.
12 min read · By Abhinav Reddy, Co-Founder
→ Read more
The real cost of a bad logo Most founders don't realize they're paying twice — once for the logo they don't love, and again when they have to rebrand 18 months later. Here's how to avoid it.
6 min read · By the LOGO.AI team
→ Read more
What makes a logo actually work (not just look nice) A pretty logo and a functional logo aren't the same thing. Here's the difference — and why only one of them holds up at 16 pixels and 16 feet.
10 min read · By the LOGO.AI team
→ Read more
How to describe your brand to an AI The quality of your logo depends on the quality of your prompt. Here's how to write a brand description that helps AI nail it on the first try.
5 min read · By the LOGO.AI team
→ Read more
The six-week logo is dead For thirty years, the industry pretended six weeks of back-and-forth was the "right" amount of time to design a logo. AI just proved otherwise.
7 min read · By Ashwin Reddy, Co-Founder
→ Read more
Categories
[Branding] · [AI Design] · [Founder Stories] · [How-To Guides] · [Industry News]
Get new posts in your inbox
One email a week. Branding tips, design principles, and behind-the-scenes from the LOGO.AI team. No spam.
[Enter your email address] [→ Subscribe]
```

### SITE (page.tsx extracted strings)
```
Browse by category
Why your first logo matters more than you think
The difference between a forgettable startup and one people remember often comes down to the first visual impression. Here's why your founding logo is a bigger decision than most founders treat it as.
8 min read · By the LOGO.AI team
How AI learned to design a logo
Two and a half years. 100,000+ logos analyzed. Thousands of training hours. Here's the inside story of teaching AI to design the way real designers do.
12 min read · By Abhinav Reddy, Co-Founder
The real cost of a bad logo
Most founders don't realize they're paying twice — once for the logo they don't love, and again when they have to rebrand 18 months later. Here's how to avoid it.
6 min read · By the LOGO.AI team
What makes a logo actually work (not just look nice)
A pretty logo and a functional logo aren't the same thing. Here's the difference — and why only one of them holds up at 16 pixels and 16 feet.
10 min read · By the LOGO.AI team
How to describe your brand to an AI
The quality of your logo depends on the quality of your prompt. Here's how to write a brand description that helps AI nail it on the first try.
5 min read · By the LOGO.AI team
The six-week logo is dead
For thirty years, the industry pretended six weeks of back-and-forth was the \"right\" amount of time to design a logo. AI just proved otherwise.
7 min read · By Ashwin Reddy, Co-Founder
Latest posts
Fresh from the team
Enter your email address
The difference between a forgettable startup and one people remember often comes down to the first visual impression. Here
Two and a half years. 100,000+ logos analyzed. Thousands of training hours. Here
Most founders don
A pretty logo and a functional logo aren
The quality of your logo depends on the quality of your prompt. Here
For thirty years, the industry pretended six weeks of back-and-forth was the \
1px solid #7543E3
```

---

## FAQ  →  faq/page.tsx

### ORIGINAL (.docx)
```
FAQ
The basics
Is it really free? Yes — free to create, free to download. No hidden fees, no credit card, no catch.
Why are you offering this for free? Because the best marketing is a product people can't stop showing off. Try it, love it, tell a friend — that's the plan. We're also betting that most founders will upgrade to the paid brand kit once they see what it does for their launch.
Will my logo be unique? Every logo is designed from scratch for your brand. No templates. No reused assets. Every logo built for your brand, not pulled from a library.
How is this different from other AI logo makers? Most AI logo makers stitch together templates and stock elements. LOGO.AI designs from scratch using real design principles — so what you get is original, intentional, and yours alone.
When does LOGO.AI launch? June 2026. Claim your free logo now — before all 2,000,000 free spots are gone.
How many free logos are left? We're giving away 2,000,000 free logos at launch. Over 165,000 have already been claimed.
About the logo
Will I see multiple logo options? Yes — you'll get several directions to choose from. Pick the one that fits your brand best.
Can I edit or customize the logo? Not at launch — what you generate is what you download. We wanted to get the AI's design right before adding edit tools. Customization features are on the roadmap.
Using the logo
Do I own my logo? Yes — once you download it, it's yours. Full commercial and personal rights, no strings attached.
Can I use my logo for my business? Absolutely — personal, commercial, digital, print, everywhere. Once you download it, there are no restrictions, no royalties, no attribution required.
Is my logo trademark-safe? Every logo is designed to be original and distinct. We can't guarantee trademark clearance though — if you plan to register it, run a quick legal check first.
What file formats will I get? High-resolution PNG with a transparent background at launch. SVG and PDF coming soon.
Pricing & brand kit
How much does the Brand Kit cost? Pricing will be announced at launch. The logo itself stays free forever — the brand kit is an optional paid upgrade for founders who want the full package: app icons, social assets, business cards, letterhead, mockups, and more.
The process
Do I need design experience? No. You describe your brand, and the AI makes every design decision for you — style, colors, typography, layout. In under 60 seconds, you'll have finished logo concepts to choose from.
What happens after I claim my logo? Nothing changes — we just save your spot. We'll email you once when we launch, and that's it. No spam, no charges, no follow-up marketing. When you're ready, you create your logo.
When will I get my logo? Claim your spot now. We'll email you the moment we launch. Sixty seconds later, you'll have your logo.
Is my business info safe? Yes. We don't sell your data or share it with anyone. It's used only to generate your logo.
Will you actually launch in June? On track for June 2026. The product is built and tested. We'll update you if anything changes.
```

### SITE (page.tsx extracted strings)
```
The basics
Is it really free?
Yes — free to create, free to download. No hidden fees, no credit card, no catch.
Why are you offering this for free?
Because the best marketing is a product people can't stop showing off. Try it, love it, tell a friend — that's the plan. We're also betting that most founders will upgrade to the paid brand kit once they see what it does for their launch.
Will my logo be unique?
Every logo is designed from scratch for your brand. No templates. No reused assets. Every logo built for your brand, not pulled from a library.
How is this different from other AI logo makers?
Most AI logo makers stitch together templates and stock elements. LOGO.AI designs from scratch using real design principles — so what you get is original, intentional, and yours alone.
When does LOGO.AI launch?
June 2026. Claim your free logo now — before all 2,000,000 free spots are gone.
How many free logos are left?
We're giving away 2,000,000 free logos at launch. Over ${claimed} have already been claimed.
About the logo
Will I see multiple logo options?
Yes — you'll get several directions to choose from. Pick the one that fits your brand best.
Can I edit or customize the logo?
Not at launch — what you generate is what you download. We wanted to get the AI's design right before adding edit tools. Customization features are on the roadmap.
Using the logo
Do I own my logo?
Yes — once you download it, it's yours. Full commercial and personal rights, no strings attached.
Can I use my logo for my business?
Absolutely — personal, commercial, digital, print, everywhere. Once you download it, there are no restrictions, no royalties, no attribution required.
Is my logo trademark-safe?
Every logo is designed to be original and distinct. We can't guarantee trademark clearance though — if you plan to register it, run a quick legal check first.
What file formats will I get?
High-resolution PNG with a transparent background at launch. SVG and PDF coming soon.
Pricing & brand kit
How much does the Brand Kit cost?
Pricing will be announced at launch. The logo itself stays free forever — the brand kit is an optional paid upgrade for founders who want the full package: app icons, social assets, business cards, letterhead, mockups, and more.
The process
Do I need design experience?
No. You describe your brand, and the AI makes every design decision for you — style, colors, typography, layout. In under 60 seconds, you'll have finished logo concepts to choose from.
What happens after I claim my logo?
Nothing changes — we just save your spot. We'll email you once when we launch, and that's it. No spam, no charges, no follow-up marketing. When you're ready, you create your logo.
When will I get my logo?
Claim your spot now. We'll email you the moment we launch. Sixty seconds later, you'll have your logo.
Is my business info safe?
Yes. We don't sell your data or share it with anyone. It's used only to generate your logo.
Will you actually launch in June?
On track for June 2026. The product is built and tested. We'll update you if anything changes.
Because the best marketing is a product people can
Yes — you
Not at launch — what you generate is what you download. We wanted to get the AI
Yes — once you download it, it
Every logo is designed to be original and distinct. We can
No. You describe your brand, and the AI makes every design decision for you — style, colors, typography, layout. In under 60 seconds, you
Nothing changes — we just save your spot. We
Claim your spot now. We
Yes. We don
On track for June 2026. The product is built and tested. We
0 clamp(16px,4vw,24px) clamp(16px,3vw,20px) clamp(16px,4vw,24px)
We're giving away 2,000,000 free logos at launch. Over
have already been claimed.
```

---

## PRIVACY POLICY  →  privacy/page.tsx

### ORIGINAL (.docx)
```
PRIVACY POLICY
Last updated: May 1, 2026
At LOGO.AI, your privacy isn't an afterthought — it's how we operate. This Privacy Policy explains what data we collect, why we collect it, and how we keep it safe.
We've written this in plain English. If anything is unclear, reach out at privacy@logo.ai.
1. Who we are
LOGO.AI is operated by LOGO.AI, Inc., headquartered in San Francisco, California, with teams in Singapore, Tallinn, and Dubai.
For the purposes of GDPR, we are the data controller of the personal information you share with us.
2. What we collect
We collect only the data we need to deliver our service.
You give us:
Email address — to let you claim your free logo and send you account updates
Brand description — the business name and short description you enter to generate your logo
Logo preferences — any choices you make during the design process
We automatically collect:
Device and browser information — IP address, browser type, operating system
Usage data — pages viewed, features used, time spent on site
Cookies and similar technologies — see our Cookie Policy for details
We do not collect:
Payment information (not until you purchase the paid brand kit)
Social security numbers, government IDs, or financial account details
Data from other accounts unless you explicitly share it
3. How we use your data
We use your data only to:
Generate and deliver your logo
Send you account and service updates
Improve our AI and product based on aggregated, anonymized patterns
Respond to your support requests
Comply with legal obligations
What we will never do:
Sell your personal data to third parties
Use your logo or brand description to train third-party AI models
Share your contact information with advertisers
Track you across the web for advertising purposes
4. Who we share it with
We share data only with carefully chosen partners who help us run LOGO.AI:
Cloud hosting providers — to store and serve our product
Email service providers — to send account and support emails
Analytics providers — to understand how our product is used (anonymized where possible)
Payment processors — if and when you purchase the paid brand kit
All partners are contractually bound to protect your data and use it only for the specific services they provide to us.
5. How long we keep it
Account data — for as long as you have an account, plus 30 days after deletion
Generated logos — stored for your access for the life of your account
Usage data — up to 24 months, then anonymized or deleted
Legal records — as required by applicable law
You can request deletion of your data at any time by emailing privacy@logo.ai.
6. Your rights
Depending on where you live, you have the right to:
Access the personal data we hold about you
Correct inaccurate information
Delete your data (right to be forgotten)
Export your data in a portable format
Object to certain uses of your data
Withdraw consent at any time
To exercise any of these rights, email privacy@logo.ai. We'll respond within 30 days.
California residents: You have additional rights under the California Consumer Privacy Act (CCPA). See Section 8 below.
7. How we protect it
Encryption in transit (HTTPS/TLS) and at rest
Access controls limiting internal data access to authorized personnel
Regular security audits and penetration testing
Incident response protocols for any data breach
No system is perfect, but we treat your data as seriously as we'd treat our own.
8. California residents (CCPA)
California residents have the right to:
Know what personal information we collect, use, disclose, and sell
Delete personal information we collect
Opt out of the sale of personal information (we don't sell your data)
Non-discrimination for exercising these rights
To exercise these rights, email privacy@logo.ai with "CCPA Request" in the subject line.
9. European residents (GDPR)
European residents have full rights under the General Data Protection Regulation (GDPR). This includes all rights listed in Section 6, plus the right to lodge a complaint with your local data protection authority.
10. Children's privacy
LOGO.AI is not intended for users under 13. We do not knowingly collect data from children. If you believe a child has provided us data, email privacy@logo.ai and we will delete it promptly.
11. International data transfers
Your data may be transferred to and processed in countries outside your own — including the United States. We use Standard Contractual Clauses and other approved mechanisms to ensure your data receives adequate protection wherever it's processed.
12. Changes to this policy
We'll update this policy as our product evolves. We'll email you about any material changes. Continued use of LOGO.AI after an update means you accept the revised policy.
13. Contact us
Questions, concerns, or requests about your privacy?
privacy@logo.ai
Or by mail: LOGO.AI, Inc. [Street Address] San Francisco, CA [ZIP] United States
```

### SITE (page.tsx extracted strings)
```
LOGO.AI is operated by LOGO.AI, Inc., headquartered in San Francisco, California, with teams in Singapore, Tallinn, and Dubai.
For the purposes of GDPR, we are the data controller of the personal information you share with us.
We collect only the data we need to deliver our service.
You give us:
Email address
— to let you claim your free logo and send you account updates
Brand description
— the business name and short description you enter to generate your logo
Logo preferences
— any choices you make during the design process
We automatically collect:
Device and browser information
— IP address, browser type, operating system
Usage data
— pages viewed, features used, time spent on site
Cookies and similar technologies
— see our Cookie Policy for details
We do not collect:
Payment information (not until you purchase the paid brand kit)
Social security numbers, government IDs, or financial account details
Data from other accounts unless you explicitly share it
We use your data only to:
Generate and deliver your logo
Send you account and service updates
Improve our AI and product based on aggregated, anonymized patterns
Respond to your support requests
Comply with legal obligations
What we will never do:
Sell your personal data to third parties
Use your logo or brand description to train third-party AI models
Share your contact information with advertisers
Track you across the web for advertising purposes
We share data only with carefully chosen partners who help us run LOGO.AI:
Cloud hosting providers
— to store and serve our product
Email service providers
— to send account and support emails
Analytics providers
— to understand how our product is used (anonymized where possible)
Payment processors
— if and when you purchase the paid brand kit
All partners are contractually bound to protect your data and use it only for the specific services they provide to us.
Account data
— for as long as you have an account, plus 30 days after deletion
Generated logos
— stored for your access for the life of your account
— up to 24 months, then anonymized or deleted
Legal records
— as required by applicable law
You can request deletion of your data at any time by emailing
privacy@logo.ai
Depending on where you live, you have the right to:
Access the personal data we hold about you
Correct inaccurate information
Delete your data (right to be forgotten)
Export your data in a portable format
Object to certain uses of your data
Withdraw consent at any time
To exercise any of these rights, email
. We&apos;ll respond within 30 days.
California residents:
You have additional rights under the California Consumer Privacy Act (CCPA). See Section 8 below.
Encryption in transit (HTTPS/TLS) and at rest
Access controls limiting internal data access to authorized personnel
Regular security audits and penetration testing
Incident response protocols for any data breach
No system is perfect, but we treat your data as seriously as we&apos;d treat our own.
California residents have the right to:
Know what personal information we collect, use, disclose, and sell
Delete personal information we collect
Opt out of the sale of personal information (we don&apos;t sell your data)
Non-discrimination for exercising these rights
To exercise these rights, email
with &ldquo;CCPA Request&rdquo; in the subject line.
European residents have full rights under the General Data Protection Regulation (GDPR). This includes all rights listed in Section 6, plus the right to lodge a complaint with your local data protection authority.
LOGO.AI is not intended for users under 13. We do not knowingly collect data from children. If you believe a child has provided us data, email
and we will delete it promptly.
Your data may be transferred to and processed in countries outside your own — including the United States. We use Standard Contractual Clauses and other approved mechanisms to ensure your data receives adequate protection wherever it&apos;s processed.
We&apos;ll update this policy as our product evolves. We&apos;ll email you about any material changes. Continued use of LOGO.AI after an update means you accept the revised policy.
Questions, concerns, or requests about your privacy?
Or by mail:
LOGO.AI, Inc.
[Street Address]
San Francisco, CA [ZIP]
United States
Privacy Policy
section-${s.num}
Who we are
What we collect
How we use your data
Who we share it with
How long we keep it
Your rights
How we protect it
California residents (CCPA)
European residents (GDPR)
Children's privacy
Changes to this policy
Contact us
```

---

## TERMS OF SERVICE  →  terms/page.tsx

### ORIGINAL (.docx)
```
TERMS OF SERVICE
TERMS OF SERVICE
Last updated: May 1, 2026
Welcome to LOGO.AI. These Terms of Service ("Terms") govern your use of our website, product, and services. By using LOGO.AI, you agree to these Terms.
We've written them to be as clear as possible. If anything is confusing, reach out at legal@logo.ai.
1. Who can use LOGO.AI
You can use LOGO.AI if you are:
At least 13 years old (or the minimum age in your country)
Using the service for lawful purposes
Not prohibited from receiving services under applicable law
If you're using LOGO.AI on behalf of a company, you confirm you have authority to bind that company to these Terms.
2. Your account
You must provide accurate information when creating an account or claiming a logo
You're responsible for keeping your account secure
Don't share your login credentials with anyone else
Notify us immediately at support@logo.ai if you suspect unauthorized access
3. Your free logo
When you claim a free logo with LOGO.AI:
You get:
A high-resolution PNG file with transparent background
Full commercial and personal rights to use the logo
The right to modify the logo as you see fit
The right to trademark the logo (though we can't guarantee clearance)
You don't get:
Exclusive rights to the visual style (the AI uses common design principles)
Any guarantee that a similar-looking logo won't exist elsewhere
Ownership of the AI model or underlying technology
We promise:
Your logo is yours. Forever. No royalties. No attribution required.
We won't revoke your logo for any reason after you've claimed it.
We won't sell the same logo to someone else.
4. The paid brand kit
If you purchase the paid brand kit, the same ownership rights in Section 3 apply to all assets you receive.
Refunds: If you're not satisfied with your brand kit purchase, contact us at support@logo.ai within 14 days of purchase for a full refund. After 14 days, purchases are final unless otherwise required by law.
5. Acceptable use
You agree NOT to use LOGO.AI to:
Create logos that infringe on others' trademarks or copyrights
Generate content that is illegal, hateful, violent, or sexually explicit
Impersonate individuals, companies, or brands you don't own
Reverse engineer, scrape, or replicate our AI or platform
Interfere with our service, servers, or other users
Use the service to build competing products
We reserve the right to suspend or terminate accounts that violate these rules.
6. Intellectual property
Ours: The LOGO.AI platform, website, AI model, and brand name are owned by LOGO.AI, Inc. You cannot copy, modify, or reuse our platform or AI.
Yours: The logos you generate are yours to use as described in Section 3.
Feedback: If you share ideas, feedback, or suggestions with us, we may use them without obligation or payment.
7. Trademark disclaimer
LOGO.AI generates original logos designed to be distinct. However, we cannot guarantee:
Your logo won't resemble an existing trademark
Your logo will be approved for trademark registration
Your logo won't be challenged by another party
If you plan to register a trademark, we strongly recommend a professional trademark search and legal review before filing.
8. Disclaimers
LOGO.AI is provided "as is" and "as available."
We make no warranties that:
The service will be uninterrupted, error-free, or completely secure
Specific logo results will meet your expectations
The service will fit a particular purpose
To the fullest extent allowed by law, we disclaim all implied warranties, including merchantability and fitness for a particular purpose.
9. Limitation of liability
To the fullest extent allowed by law, LOGO.AI and its team are not liable for:
Indirect, incidental, special, or consequential damages
Loss of profits, data, or business opportunities
Damages exceeding the amount you've paid us in the past 12 months (or $100 if you haven't paid us anything)
Some jurisdictions don't allow these limitations, so they may not apply to you.
10. Indemnification
You agree to defend and indemnify LOGO.AI against any claims arising from:
Your use of the service in violation of these Terms
Your misuse of generated logos
Your violation of applicable law
11. Termination
You can stop using LOGO.AI at any time. We can suspend or terminate your account if:
You violate these Terms
Your use of the service poses a legal or security risk
We're required to do so by law
If we terminate your account without cause, you keep all logos you've already claimed.
12. Changes to these Terms
We'll update these Terms as our product evolves. We'll email you about any material changes. Continued use after an update means you accept the revised Terms.
13. Governing law
These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes will be resolved in the state or federal courts of San Francisco County, California.
If you're in the EU: You also have rights under your country's consumer protection laws, which cannot be overridden by these Terms.
14. Contact us
Questions about these Terms?
legal@logo.ai
LOGO.AI, Inc. [Street Address] San Francisco, CA [ZIP] United States
```

### SITE (page.tsx extracted strings)
```
You can use LOGO.AI if you are:
At least 13 years old (or the minimum age in your country)
Using the service for lawful purposes
Not prohibited from receiving services under applicable law
If you&apos;re using LOGO.AI on behalf of a company, you confirm you have authority to bind that company to these Terms.
You must provide accurate information when creating an account or claiming a logo
You&apos;re responsible for keeping your account secure
Don&apos;t share your login credentials with anyone else
Notify us immediately at
support@logo.ai
if you suspect unauthorized access
When you claim a free logo with LOGO.AI:
You get:
A high-resolution PNG file with transparent background
Full commercial and personal rights to use the logo
The right to modify the logo as you see fit
The right to trademark the logo (though we can&apos;t guarantee clearance)
You don&apos;t get:
Exclusive rights to the visual style (the AI uses common design principles)
Any guarantee that a similar-looking logo won&apos;t exist elsewhere
Ownership of the AI model or underlying technology
We promise:
Your logo is yours. Forever. No royalties. No attribution required.
We won&apos;t revoke your logo for any reason after you&apos;ve claimed it.
We won&apos;t sell the same logo to someone else.
If you purchase the paid brand kit, the same ownership rights in Section 3 apply to all assets you receive.
Refunds:
If you&apos;re not satisfied with your brand kit purchase, contact us at
You agree NOT to use LOGO.AI to:
Create logos that infringe on others&apos; trademarks or copyrights
Generate content that is illegal, hateful, violent, or sexually explicit
Impersonate individuals, companies, or brands you don&apos;t own
Reverse engineer, scrape, or replicate our AI or platform
Use the service to build competing products
We reserve the right to suspend or terminate accounts that violate these rules.
Ours:
The LOGO.AI platform, website, AI model, and brand name are owned by LOGO.AI, Inc. You cannot copy, modify, or reuse our platform or AI.
Yours:
The logos you generate are yours to use as described in Section 3.
Feedback:
If you share ideas, feedback, or suggestions with us, we may use them without obligation or payment.
LOGO.AI generates original logos designed to be distinct. However, we cannot guarantee:
Your logo won&apos;t resemble an existing trademark
Your logo will be approved for trademark registration
Your logo won&apos;t be challenged by another party
If you plan to register a trademark, we strongly recommend a professional trademark search and legal review before filing.
LOGO.AI is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo;
We make no warranties that:
The service will be uninterrupted, error-free, or completely secure
Specific logo results will meet your expectations
The service will fit a particular purpose
To the fullest extent allowed by law, we disclaim all implied warranties, including merchantability and fitness for a particular purpose.
To the fullest extent allowed by law, LOGO.AI and its team are not liable for:
Indirect, incidental, special, or consequential damages
Loss of profits, data, or business opportunities
Damages exceeding the amount you&apos;ve paid us in the past 12 months (or $100 if you haven&apos;t paid us anything)
Some jurisdictions don&apos;t allow these limitations, so they may not apply to you.
You agree to defend and indemnify LOGO.AI against any claims arising from:
Your use of the service in violation of these Terms
Your misuse of generated logos
Your violation of applicable law
You can stop using LOGO.AI at any time. We can suspend or terminate your account if:
You violate these Terms
Your use of the service poses a legal or security risk
We&apos;re required to do so by law
If we terminate your account without cause, you keep all logos you&apos;ve already claimed.
We&apos;ll update these Terms as our product evolves. We&apos;ll email you about any material changes. Continued use after an update means you accept the revised Terms.
These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes will be resolved in the state or federal courts of San Francisco County, California.
If you&apos;re in the EU:
You also have rights under your country&apos;s consumer protection laws, which cannot be overridden by these Terms.
Questions about these Terms?
legal@logo.ai
LOGO.AI, Inc.
[Street Address]
San Francisco, CA [ZIP]
United States
Terms of Service
section-${s.num}
Who can use LOGO.AI
Your account
Your free logo
The paid brand kit
Acceptable use
Intellectual property
Trademark disclaimer
Limitation of liability
Indemnification
Changes to these Terms
Governing law
Contact us
```

---

## COOKIE POLICY  →  cookies/page.tsx

### ORIGINAL (.docx)
```
COOKIE POLICY
COOKIE POLICY
Last updated: May 1, 2026
This Cookie Policy explains what cookies are, how we use them on LOGO.AI, and how you can manage your cookie preferences.
What are cookies?
Cookies are small text files stored on your device when you visit a website. They help sites remember your preferences, keep you logged in, and understand how visitors use the site.
Some cookies are essential to make a website work. Others help us improve the experience.
Cookies we use
Strictly necessary (always on) These cookies are essential for LOGO.AI to function. They can't be turned off.
Session cookies — keep you logged in during your visit
Security cookies — protect against fraud and unauthorized access
Load balancing — ensure the site works reliably
Functional (optional) These cookies remember your preferences.
Language and region preferences
Interface choices
Analytics (optional) These cookies help us understand how visitors use LOGO.AI so we can improve it.
Traffic analytics — anonymized data about how visitors use our site
Performance monitoring — information about site speed and errors
Marketing (optional) These cookies help us reach people who might benefit from LOGO.AI.
Conversion tracking — measuring the effectiveness of our marketing campaigns
Third-party cookies
Some of our partners set their own cookies when you visit our site. These include analytics, hosting, and advertising providers that help us deliver and improve our service.
We don't control these cookies. Check the partner's privacy policy for more information.
How to manage cookies
On LOGO.AI: When you first visit our site, you'll see a cookie banner letting you accept or decline non-essential cookies. You can change these preferences any time in your account settings.
In your browser: Most browsers let you block or delete cookies. Here's how:
Chrome: Settings → Privacy and security → Cookies
Safari: Preferences → Privacy
Firefox: Settings → Privacy & Security
Edge: Settings → Privacy, search, and services
Note: Blocking essential cookies may prevent parts of LOGO.AI from working properly.
Updates to this policy
We'll update this policy if we change the cookies we use. Check back for the latest version.
Questions?
privacy@logo.ai
```

### SITE (page.tsx extracted strings)
```
Cookies are small text files stored on your device when you visit a website. They help sites remember your preferences, keep you logged in, and understand how visitors use the site.
Some cookies are essential to make a website work. Others help us improve the experience.
Strictly necessary (always on)
— These cookies are essential for LOGO.AI to function. They can&apos;t be turned off.
Session cookies — keep you logged in during your visit
Security cookies — protect against fraud and unauthorized access
Load balancing — ensure the site works reliably
Functional (optional)
— These cookies remember your preferences.
Language and region preferences
Analytics (optional)
— These cookies help us understand how visitors use LOGO.AI so we can improve it.
Traffic analytics — anonymized data about how visitors use our site
Performance monitoring — information about site speed and errors
Marketing (optional)
— These cookies help us reach people who might benefit from LOGO.AI.
Conversion tracking — measuring the effectiveness of our marketing campaigns
Some of our partners set their own cookies when you visit our site. These include analytics, hosting, and advertising providers that help us deliver and improve our service.
We don&apos;t control these cookies. Check the partner&apos;s privacy policy for more information.
On LOGO.AI:
When you first visit our site, you&apos;ll see a cookie banner letting you accept or decline non-essential cookies. You can change these preferences any time in your account settings.
In your browser:
Most browsers let you block or delete cookies. Here&apos;s how:
Chrome:
Settings → Privacy and security → Cookies
Safari:
Preferences → Privacy
Firefox:
Settings → Privacy &amp; Security
Edge:
Settings → Privacy, search, and services
Note:
Blocking essential cookies may prevent parts of LOGO.AI from working properly.
We&apos;ll update this policy if we change the cookies we use. Check back for the latest version.
privacy@logo.ai
Cookie Policy
What are cookies?
Cookies we use
Third-party cookies
How to manage cookies
Updates to this policy
Questions?
```
