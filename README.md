# Ink & Print Studio

# Unique Design Custom — 1-Page E-Commerce Mockup

## Brand
Unique Design Custom offers custom printed T-Shirts and Coffee Mugs — upload any design, preview it, get it printed and shipped. Audience: individuals ordering personalised gifts, small businesses/teams ordering branded merch in small batches, event organisers.

## Design Direction (follow precisely)

**Concept:** Treat the page like a screen-printing shop's spec ticket — bold poster typography, an ink-swatch colour palette, and a live "pick your ink colour" interaction on the hero product mockup. This is a print studio, not a generic dropshipping storefront. Avoid generic AI-template looks (no cream-background-with-terracotta-serif, no near-black-with-acid-green, no newspaper-broadsheet layout).

**Colour palette (use these exact hex values as CSS variables):**
- `--bg`: #F6F4EF (chalk white — cool-toned off-white base, NOT cream/beige)
- `--ink`: #1B1B1F (near-black, primary text)
- `--cobalt`: #2A4B8D (primary accent — nav, links, structural elements)
- `--coral`: #FF5A3C (secondary accent — primary CTAs, energy)
- `--marigold`: #FFB627 (tertiary accent — highlights, small details only, use sparingly)
- `--thread`: #8B8880 (muted grey — secondary text, borders, dividers)

**Typography:**
- Display: Anton or Archivo Black — bold, condensed, poster-style for headlines, tight tracking, large sizes
- Body: Work Sans — clean humanist sans for paragraph copy
- Utility/mono: Space Mono — for prices, and "spec tag" details (e.g. "100% COTTON", "11OZ CERAMIC", eyebrow labels) — this print-ticket detail is what makes the page feel authentic to the subject

**Signature element (the one thing this page should be remembered for):**
An interactive ink-swatch colour picker on the hero product mockup. Show a T-shirt mockup with 4-5 clickable ink-colour swatches (cobalt, coral, marigold, ink-black, white) that instantly re-colour the printed graphic on the mockup when clicked — proving the "customise it live" promise. Build this with real React state (not a real upload flow).

**Layout concept:**
Structure sections like tearaway garment tags / print tickets — small mono-font eyebrow labels above headlines, thin hairline dividers between sections, generous whitespace on the chalk-white base. Only use numbered markers where content is a genuine sequence (the How It Works steps qualify — everything else should not be numbered just for decoration).

**Motion:** Subtle scroll-reveal as sections enter, a satisfying colour-swap transition on the ink-swatch interaction (150–200ms), gentle hover lift on product cards. Respect prefers-reduced-motion. One confident interaction (the swatch picker) matters more than decoration everywhere else — keep the rest disciplined and quiet.

## Page Structure (single page, all sections on one scroll)

1. **Nav** — Wordmark "Unique Design Custom", links (Shop / How It Works / Reviews), CTA button "Start Designing" (coral fill)

2. **Hero** — Small eyebrow label, bold headline about turning any design into something wearable/usable, one-line subcopy, primary CTA + secondary "See How It Works" text link. Interactive product mockup with the ink-swatch picker described above as the visual centrepiece.

3. **How It Works** — 3 real steps: (1) Upload your design, (2) Preview & pick your colours, (3) We print & ship in a few days. This is a legitimate numbered sequence.

4. **Shop / Product Showcase** — Two product categories: Custom T-Shirts and Custom Coffee Mugs, shown as two clear cards/panels. Each with a product mockup image, a starting price in mono font, a short description, and a "Customise Now" CTA.

5. **Why Us** — Short feature strip: durable print quality, no minimum order quantity, fast turnaround, satisfaction guarantee. Icon + short label each, not paragraphs.

6. **Reviews / Social Proof** — 3 short customer quotes, each with a name and what they ordered (e.g. "Sarah R. — Custom Mug for her team").

7. **Footer CTA** — Closing headline + CTA button, simple footer with contact/social links and copyright.

## Copy
Write all copy from the customer's point of view — plain, confident, specific ("Your design, printed the way you drew it" rather than generic sales language). Keep it short and scannable; this is an e-commerce landing page, not a blog.

## Technical requirements
- React + TypeScript + Tailwind CSS
- Single page, fully responsive (mobile-first, test down to ~375px width)
- The ink-swatch colour picker must use real React state — clicking a swatch must visibly re-colour the printed design area on the mockup
- Smooth scroll for internal nav links
- Visible keyboard focus states on all interactive elements
- Respect prefers-reduced-motion
- Semantic HTML and alt text on all images
- This is a visual mockup only — no real payment, auth, or backend required; CTAs can scroll to the relevant section or show a simple confirmation state
- Use clean placeholder product photography where real photography isn't available, cropped and toned consistently

Build this now as a complete, polished single page.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3653d23d-7d6a-4a26-ad60-ede95a23ba47).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
