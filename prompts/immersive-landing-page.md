# Immersive Landing Page Workflow

Use this prompt when a website needs original art direction, generated or curated visuals, scroll motion, quiet view, and browser-verified polish.

The workflow assumes custom imagery is part of the design process, not an afterthought. Use native image generation wherever custom visuals would improve the experience, then build the interface around the accepted assets.

## Request Template

Build a distinctive, immersive landing page for `[business / offer]`.

Audience: `[who it is for]`
Main action: `[join / book / buy / enquire]`
Offer details and verified sources: `[details / links]`
Brand colors and style: `[brand]`
Existing website or assets: `[links / files]`

The page needs a complete sales narrative:
- A clear opening promise.
- The problem and why it matters.
- How the offer works.
- Specific benefits and examples.
- Relevant proof, where verified.
- What is included.
- FAQs.
- A strong final call to action.

Use as many sections as the story needs. Vary composition, scale, and pacing rather than repeating the same card layout.

Create original art direction. Do not copy a reference website's branding, imagery, typography, or overall composition.

Do not invent testimonials, results, product features, pricing, or venue claims.

First inspect the available skills and existing project. Use relevant design, image generation, animation, testing, and hosting skills. Explain which you are using and why.

Use the strongest available model for the first heavy design pass when budget and limits allow. After imagery, effects, and section layouts are established, switch to a cheaper or faster model for cleanup when appropriate.

## Direction Gate

Before building, propose three genuinely different visual directions.

For each direction, include:
- Central visual idea.
- Why it relates to the business.
- Imagery to generate or source.
- How the page develops from beginning to end.
- Motion language.
- What makes it recognizable rather than templated.

Recommend the strongest direction and wait for selection unless the user asked for autonomous execution.

## Asset Gate

Generate or gather the artwork as part of the design process before implementing the page.

Create a coherent asset set:
- Wide hero environment with space for readable HTML text.
- Closer view showing the work, product, or process.
- Optional transparent foreground object for layered parallax.
- Any additional imagery the model decides is needed for product, section, or interaction context.

Keep lighting, materials, color palette, and visual language consistent. Do not bake headlines, buttons, navigation, logos, or readable body copy into images.

Inspect generated images before using them. Check whether they could plausibly pass as authentic brand imagery rather than obvious AI filler. Save accepted assets into the project and record prompts, generation method, provenance, and concept-imagery disclaimers.

## Motion Plan

Create a section-by-section table with:
- Section purpose.
- Visual asset.
- Foreground, middle, and background layers.
- Forward-scroll behavior.
- Reverse-scroll behavior.
- Mobile behavior.
- Reduced-motion behavior.
- Quiet-view behavior for heavy cinematic, shader, 3D, cursor-reactive, or scroll-driven pages.

Use motion only where it serves the story. Keep text, forms, and buttons readable and usable.

For heavy immersive pages, include a quiet view toggle that switches to a mostly static, content-first version. On mobile, prefer quiet view or a low-motion equivalent when full effects would reduce readability or performance.

## Browser Testing

Open the running site and inspect:
- Wide desktop.
- Tablet.
- Narrow mobile.

Scroll through the whole page in both directions and check intermediate animation states.

Test:
- Text overlap, clipping, and contrast.
- Image crops and foreground positioning.
- Sticky sections and navigation.
- Buttons, forms, and anchor links.
- Cursor-reactive interactions, where present.
- Video playback and fallback controls, where present.
- 3D loading and interaction, where present.
- Quiet view and mobile low-motion behavior.
- Motion pause and reduced-motion behavior.
- Horizontal overflow.
- Console errors and obvious performance problems.

Report separately:
1. What was visually inspected.
2. What interactions were tested.
3. What technical checks passed.
4. Anything not verified.

Do not claim visual quality based only on build or route checks.
