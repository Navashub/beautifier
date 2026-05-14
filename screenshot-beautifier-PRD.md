# SnapFrame — Screenshot Beautifier SaaS
### Product Requirements Document (PRD) v1.0

---

## 1. Product Overview

**SnapFrame** is a web-based SaaS tool that transforms raw social media screenshots into polished, shareable visual cards. Users upload a screenshot, the app detects which platform it came from, wraps it in a beautiful branded frame, highlights its engagement stats, and exports a ready-to-share image.

**Target Users:**
- Social media creators and influencers (Instagram, TikTok, Twitter/X, YouTube)
- Brand managers and agencies
- Entrepreneurs showcasing social proof
- Anyone who wants to share a screenshot that looks *intentional*, not accidental

**Core Value Proposition:**
> "Stop sharing ugly screenshots. Turn your social wins into beautiful proof."

---

## 2. Problem Statement

Creators share screenshots of their performing posts all the time — in DMs, on stories, in pitch decks, on other platforms. But raw screenshots look rough: mixed aspect ratios, browser chrome, notification bars, inconsistent sizing. There is no fast, beautiful tool built specifically for **social media creators** to beautify these screenshots and make them look share-worthy.

Existing tools (BrandBird, Savvyshot) target SaaS founders showing product UIs. **SnapFrame targets creators showing social performance.**

---

## 3. Tech Stack (Recommended)

| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR, image processing, fast |
| Styling | Tailwind CSS + shadcn/ui | Fast, consistent UI |
| Image Processing | `fabric.js` or `html2canvas` + `sharp` | Canvas manipulation, export |
| Platform Detection | Custom heuristic parser + Claude Vision API (optional) | Detect platform from screenshot |
| Auth | Clerk or NextAuth | Simple, quick setup |
| Database | Supabase (Postgres) | User data, saved projects |
| Storage | Supabase Storage or Cloudflare R2 | Store uploaded + output images |
| Payments | Lemon Squeezy or Stripe | Subscription billing |
| Deployment | Vercel | Zero config, fast CI/CD |

---

## 4. Core Features (MVP)

### 4.1 Upload & Platform Detection

- User uploads a screenshot (PNG, JPG, WebP — max 10MB)
- App **automatically detects** which social media platform the screenshot is from:
  - Detection heuristics: UI color palette, logo fragments, layout patterns, username format, icon shapes
  - Supported platforms (MVP): **Instagram, Twitter/X, TikTok, YouTube, LinkedIn, Facebook**
  - If detection confidence is low: show platform selector for user to confirm
- Display a small confidence badge: *"Detected: Instagram ✓"*

**Detection Logic (priority order):**
1. Color fingerprinting (Instagram gradient, Twitter blue, TikTok red/black)
2. UI element pattern matching (like button shapes, font rendering artifacts)
3. Metadata if available (EXIF, file name hints)
4. Fallback: manual platform picker

---

### 4.2 Beautification Canvas

After upload and platform detection, user enters the **editor view**:

#### Background Options
- **Gradient presets** — curated per platform (e.g., warm sunset for Instagram, dark sleek for TikTok)
- **Solid colors** — color picker with saved brand colors
- **Custom image upload** — use own background
- **Blur/bokeh background** — auto-generated from the screenshot itself (dominant color extraction)
- **Glass morphism** — frosted glass card effect

#### Frame & Border Options
- Rounded corners (slider: 0px to 48px)
- Drop shadow (intensity, direction, color)
- Platform badge overlay — small platform icon (Instagram camera, X bird, TikTok logo) pinned to corner
- Optional: device mockup (phone frame around the screenshot)

#### Padding & Layout
- Inner padding controls (top/bottom/left/right)
- Canvas aspect ratio presets:
  - `1:1` Square (Twitter, general sharing)
  - `9:16` Portrait (Stories, TikTok)
  - `16:9` Landscape (YouTube, LinkedIn)
  - `4:5` Instagram portrait feed
  - Custom

#### Stats Overlay (Key Differentiator)
If the screenshot contains engagement stats (likes, views, shares, comments), user can enable a **Stats Bar** at the bottom of the card:
- Auto-parsed from the screenshot using OCR (Tesseract.js or Claude Vision API)
- Displays stats in a stylized row: `❤️ 7,584 · 💬 56 · 🔁 787 · 👁 90.8K`
- Font, size, and color of stats bar are customizable
- Manual override if OCR misreads numbers

#### Caption / Text Overlay
- Optional text block (quote, caption, or username)
- Font selector (Google Fonts — curated selection of ~20 good ones)
- Position: top, bottom, or floating
- Background: transparent, blurred pill, solid

---

### 4.3 Platform-Specific Presets

One-click presets designed per platform that auto-apply the right background, badge, font, and layout:

| Preset Name | Platform | Vibe |
|---|---|---|
| "Golden Hour" | Instagram | Warm amber gradient, serif font |
| "Dark Mode" | Twitter/X | Near-black bg, white text, minimal |
| "Viral Clip" | TikTok | Hot pink/black gradient, bold font |
| "Studio" | YouTube | Deep red accent, dark bg, clean |
| "Professional" | LinkedIn | Navy/white, corporate clean |
| "Highlight" | Facebook | Blue gradient, rounded, friendly |

User can start from a preset and then customize freely.

---

### 4.4 Export

- **Export formats:** PNG (default), JPG, WebP
- **Resolution options:** 1x (screen), 2x (retina), custom DPI
- **Export sizes** match selected aspect ratio
- Watermark on free tier (small "SnapFrame" text, bottom corner)
- No watermark on paid tiers
- **Download** button (instant client-side export)
- **Copy to clipboard** button
- Optional: **Share link** — generates a public URL to the beautified image (stored on Supabase/R2)

---

## 5. User Flow (Happy Path)

```
1. Land on homepage → click "Beautify a Screenshot"
2. Upload screenshot (drag & drop or file picker)
3. Platform auto-detected → user confirms or corrects
4. Editor loads with default preset for that platform
5. User tweaks background, padding, stats bar, caption (optional)
6. Click "Export"
7. Image downloads instantly
8. (Optional) Save project to account for later editing
```

---

## 6. Pages & Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo, pricing, testimonials |
| `/app` | Main editor (authenticated or guest with limits) |
| `/app/projects` | Saved projects (authenticated users) |
| `/pricing` | Pricing page |
| `/login` | Auth page |
| `/blog` | SEO content (optional, post-MVP) |

---

## 7. Pricing Model

### Free Tier
- 5 exports per month
- Watermark on exports
- Access to 3 background presets
- No project saving

### Creator — $9/month
- Unlimited exports
- No watermark
- All presets + custom backgrounds
- Save up to 20 projects
- Priority export (larger resolution)

### Pro — $19/month
- Everything in Creator
- Unlimited saved projects
- Brand kit (saved colors, fonts, logo)
- Bulk upload (up to 10 screenshots at once)
- API access (coming soon)

---

## 8. UI/UX Design Principles

- **Mobile-first editing** — must work beautifully on mobile (creators are on phones)
- **One-second wow** — the beautified preview must appear within 1 second of upload
- **Dark mode by default** — editors feel premium in dark; toggle available
- **No design skills needed** — every option should have a smart default
- **Instant feedback** — all edits are live-previewed on the canvas in real time (no "Apply" button)

---

## 9. Technical Architecture

```
┌─────────────────────────────────────────┐
│              Next.js Frontend            │
│  ┌──────────┐  ┌──────────────────────┐  │
│  │ Upload   │  │   Canvas Editor      │  │
│  │ Component│  │   (fabric.js / DOM)  │  │
│  └────┬─────┘  └──────────┬───────────┘  │
│       │                   │              │
│  ┌────▼───────────────────▼───────────┐  │
│  │         Platform Detector          │  │
│  │  (color fingerprint + OCR + AI)    │  │
│  └────────────────────────────────────┘  │
└──────────────┬──────────────────────────┘
               │ API Routes
┌──────────────▼──────────────────────────┐
│           Supabase Backend               │
│  ┌──────────┐  ┌──────────┐             │
│  │  Auth    │  │ Storage  │             │
│  └──────────┘  └──────────┘             │
│  ┌──────────────────────────┐           │
│  │  DB: users, projects,    │           │
│  │  exports, subscriptions  │           │
│  └──────────────────────────┘           │
└─────────────────────────────────────────┘
```

---

## 10. Platform Detection — Technical Detail

### Strategy (No AI required for MVP)

```javascript
// 1. Extract dominant colors from screenshot
const dominantColors = extractDominantColors(imageData); 

// 2. Compare against platform color signatures
const platformSignatures = {
  instagram: { hues: [280, 320, 40], saturation: 'high' },  // purple/pink/orange gradient
  twitter:   { hues: [205], saturation: 'medium' },          // Twitter blue
  tiktok:    { hues: [355, 180], saturation: 'very-high' },  // red + cyan
  youtube:   { hues: [0], saturation: 'high' },              // YouTube red
  linkedin:  { hues: [210], saturation: 'medium' },          // LinkedIn blue
  facebook:  { hues: [215], saturation: 'medium' }           // Facebook blue
};

// 3. Confidence scoring → pick best match
// 4. If confidence < 70%, prompt user to select manually
```

### OCR for Stats Parsing (Optional, enhances UX)
- Use **Tesseract.js** (client-side, no server call) to parse numbers from the screenshot
- Look for patterns: `K`, `M`, heart/comment/share icon proximity to numbers
- Map to: `{ likes, comments, shares, views, saves }`
- Display in the Stats Bar overlay

---

## 11. Stats Bar Component Spec

The stats bar appears as an overlay at the bottom of the beautified card.

```
┌─────────────────────────────────────────┐
│          [beautified screenshot]         │
│                                         │
│  ❤️ 7,584  💬 56  🔁 787  👁 90.8K     │  ← Stats Bar
└─────────────────────────────────────────┘
```

**Props:**
```typescript
interface StatsBar {
  likes?: number | string;
  comments?: number | string;
  shares?: number | string;
  views?: number | string;
  saves?: number | string;
  platform: Platform;           // Determines icon set
  style: 'minimal' | 'pill' | 'bold' | 'glass';
  position: 'bottom' | 'top';
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  opacity: number;              // 0–1
}
```

---

## 12. MVP Scope vs. Post-MVP

### MVP (Ship This)
- [x] Upload + platform detection (heuristic)
- [x] Canvas editor with background, padding, border controls
- [x] 6 platform presets
- [x] Stats bar (manual input, no OCR)
- [x] Export PNG/JPG
- [x] Auth (sign up / login)
- [x] Free tier with watermark
- [x] One paid tier ($9/month)
- [x] Landing page

### Post-MVP (Backlog)
- [ ] OCR-powered stats auto-detection
- [ ] AI platform detection (Claude Vision)
- [ ] Bulk upload (up to 10 at once)
- [ ] Brand kit (saved colors/fonts)
- [ ] Shareable public link
- [ ] API for programmatic access
- [ ] Mobile app (React Native)
- [ ] Browser extension (right-click → beautify)
- [ ] Figma plugin

---

## 13. Success Metrics

| Metric | MVP Target (Month 3) |
|---|---|
| Registered users | 500+ |
| Monthly exports | 2,000+ |
| Paid subscribers | 50+ |
| Export completion rate | > 70% |
| Time-to-first-export | < 60 seconds |

---

## 14. Competitive Positioning

| Feature | SnapFrame | BrandBird | Savvyshot |
|---|---|---|---|
| Social media focus | ✅ Core | ❌ SaaS/dev focus | ❌ General |
| Platform detection | ✅ Auto | ❌ Manual | ❌ Manual |
| Stats bar overlay | ✅ Yes | ❌ No | ❌ No |
| Mobile-first editor | ✅ Yes | ⚠️ Partial | ❌ Desktop app |
| African market pricing | ✅ Affordable | ❌ USD only | ❌ USD only |
| Creator presets | ✅ Yes | ⚠️ Dev-oriented | ❌ No |

---

## 15. File & Folder Structure (Suggested)

```
snapframe/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── app/
│   │   ├── page.tsx              # Editor
│   │   └── projects/page.tsx     # Saved projects
│   ├── pricing/page.tsx
│   └── api/
│       ├── detect-platform/      # Platform detection endpoint
│       ├── export/               # Server-side export if needed
│       └── ocr/                  # Stats parsing endpoint
├── components/
│   ├── editor/
│   │   ├── Canvas.tsx            # Main canvas component
│   │   ├── BackgroundPicker.tsx
│   │   ├── StatsBar.tsx
│   │   ├── PlatformBadge.tsx
│   │   ├── PaddingControls.tsx
│   │   └── ExportButton.tsx
│   ├── upload/
│   │   └── DropZone.tsx
│   └── ui/                       # shadcn components
├── lib/
│   ├── platform-detector.ts      # Detection logic
│   ├── ocr.ts                    # Tesseract wrapper
│   ├── canvas-export.ts          # Export helpers
│   └── presets.ts                # Platform preset configs
├── types/
│   └── index.ts                  # Shared TypeScript types
└── public/
    └── platform-icons/           # SVG icons per platform
```

---

## 16. Notes for the Developer

1. **Start with the canvas editor first** — that is the core product. Get upload → render → export working before touching auth or payments.
2. **Use `html2canvas` for simplicity in MVP**; migrate to `fabric.js` if you need more complex canvas interactions.
3. **Platform detection can be simple in MVP** — even a manual platform selector is fine. Auto-detect is a nice-to-have.
4. **Stats bar values can be typed manually in MVP** — OCR adds complexity; ship without it first.
5. **Design matters a lot here** — the product's whole job is making things look good. The editor UI itself must look polished. Use a dark theme.
6. **The landing page should have a live demo** — let users try it without signing up to reduce friction.

---

*Document version: 1.0 | Created for SnapFrame MVP development*
