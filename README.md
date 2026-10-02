# Ellie’s Oats website snapshot

Public pages saved from https://www.elliesoats.co.uk/ and imported for design work.

## Preview

Run `python3 -m http.server 8000` from this folder, then open http://localhost:8000/.

The root HTML pages use local navigation and saved assets. Next.js runtime scripts are disabled in these preview pages to prevent hydration from replacing the saved content or requiring the original server. Forms cannot submit in the preview. Ordering and payments are not reproduced.

`saved-pages/` preserves the uploaded HTML and supporting folders unchanged, including downloaded JavaScript. These are browser downloads, not the original Next.js project source.

## Missing assets

The hero video, favicon, and some fonts still depend on the live website. No backend, database, API credentials, or payment configuration is included. The saved pages may contain only the initial state of interactive features.
