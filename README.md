**Classification: INTERNAL**

# Kantong Studio

Public static pages for Kantong Studio apps. One folder per site, each deployed as its own Cloudflare Pages project. No build step: Pages serves the folder as it is.

| Folder | Domain | Pages project settings |
|---|---|---|
| `landing_page/saku/` | `saku.kantongstudio.com` | Build output directory `landing_page/saku`, build command empty, build watch paths `landing_page/saku/*` |

Rules for every site (see `landing_page/saku/_headers`): no scripts, no third-party requests, never framed, light theme only.

## Saku

Landing (`/`, `/en`), `/privacy`, `/terms`, `/delete-account` for Google Play and Google sign-in. The plan, the Cloudflare and Play Console steps, and the open questions live in the app repo: `saku/plan/29-website.md`.

The privacy and terms text is also bundled in the app (`saku/app/src/main/res/raw*/`). Change both places together.

Preview locally (serves clean URLs like Cloudflare Pages):

    python3 -c "import http.server as h, os
    class H(h.SimpleHTTPRequestHandler):
      def translate_path(s, p):
        f = super().translate_path(p)
        return f + '.html' if not os.path.exists(f) and os.path.exists(f + '.html') else f
    h.ThreadingHTTPServer(('127.0.0.1', 8002), lambda *a: H(*a, directory='landing_page/saku')).serve_forever()"
