**Classification: INTERNAL**

# Kantong Studio

Public static pages for Kantong Studio products. One folder per product at the repo root, each deployed as its own Cloudflare Pages project on `<product>.kantongstudio.com`. No build step: Pages serves the folder as it is.

| Folder | Domain | Pages project settings |
|---|---|---|
| `saku/` | `saku.kantongstudio.com` | Build output directory `saku`, build command empty, build watch paths `saku/*` |

New product: add a `<product>/` folder, then a new Pages project with output directory `<product>`, watch paths `<product>/*` and custom domain `<product>.kantongstudio.com`.

Rules for every site (see `saku/_headers`): no inline script, never framed, light theme only. The only third party is Google Analytics (`saku/analytics.js`, measurement ID `G-0WGD2H7MVZ`), loaded only after the visitor accepts the cookie banner and not counted on localhost; it is disclosed in `saku/privacy.html`, so any new third-party request needs the CSP and the privacy policy changed in the same commit.

Unreleased parts of a page are hidden behind flags: see [feature_flag.md](feature_flag.md).

## Saku

Landing (`/`, `/en`), `/privacy`, `/terms`, `/delete-account` for Google Play and Google sign-in. The plan, the Cloudflare and Play Console steps, and the open questions live in the app repo: `saku/plan/29-website.md`.

The privacy and terms text is also bundled in the app (`saku/app/src/main/res/raw*/`). Change both places together.

Preview locally (serves clean URLs like Cloudflare Pages):

    python3 -c "import http.server as h, os
    class H(h.SimpleHTTPRequestHandler):
      def translate_path(s, p):
        f = super().translate_path(p)
        return f + '.html' if not os.path.exists(f) and os.path.exists(f + '.html') else f
    h.ThreadingHTTPServer(('127.0.0.1', 8002), lambda *a: H(*a, directory='saku')).serve_forever()"
