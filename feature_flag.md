**Classification: INTERNAL**

# Feature flags

The sites have no scripts and no build step, so a flag is an HTML attribute: a flagged block ships with `data-flag="<name>" hidden`, and `site.css` keeps it out of the page (`.slide[hidden] { display:none; }`). Releasing means removing `hidden`; hiding again means adding it back.

The markup stays in the page source while hidden. Anyone who opens the source can read it, so a flagged block must never hold a secret, a price that is not final, or anything the product may not ship.

Keep this file at the repo root, never inside a site folder: Cloudflare Pages serves everything in `saku/`.

## Flags

| Flag | Site | State | What it hides | App counterpart |
|---|---|---|---|---|
| `pro` | `saku/` | **off** (2026-10-26) | The Saku Pro slide in the tour carousel on `index.html` and `en.html` (Free vs Pro rows, "Segera hadir / Coming soon", no price) | Server table `feature_flags`, key `pro` (`saku/IMPLEMENTATION.md` § Feature flags) |

Find every flagged block:

    grep -rn 'data-flag=' saku/

## Releasing `pro`

Turn the website flag on in the same release as the app's `pro` flag, not before.

1. **Privacy policy first:** `saku/privacy.html` (and the app's `res/raw*/privacy.txt`) must name Google Play as the payment processor and say what Saku keeps about a purchase.
2. **Final copy:** in both pages, change the slide's step label "Segera hadir" / "Coming soon" to the price, and say whether Pro is a subscription or a one-time purchase ("Pro Selamanya"). Check the rows still match the app's Free vs Pro table.
3. **Show it:** remove `hidden` from `<article ... data-flag="pro" hidden>` in `saku/index.html` and `saku/en.html`.
4. **Renumber:** the slide labels count visible slides. Give the Pro slide `aria-label="8 dari 9"` / `"8 of 9"`, the closing card `"9 dari 9"` / `"9 of 9"`, and change the others from `dari 8` / `of 8` to `dari 9` / `of 9`.
5. Preview both pages (README), then commit and push; Cloudflare Pages deploys `main`.

To hide it again: add `hidden` back and undo step 4.
