HUR-ON website (static, multi-page)
===================================

Upload the CONTENTS of this folder to the root of your web host
(Netlify, Cloudflare Pages, cPanel, GitHub Pages, S3 ... any static host).
Do not upload the folder itself; index.html must sit at the web root.

Structure
  index.html, about.html, ...   17 pages + 404.html
  *.css, *.js                   styles and scripts (keep next to the pages)
  assets/                       images, videos, fonts
  robots.txt, sitemap.xml       SEO files (assume https://www.hur-on.com/)
  og-image.jpg                  social-share image (1200x630, made from the hero)

Before going live
  1. If the live domain is NOT https://www.hur-on.com/, search & replace that
     address in the *.html files, robots.txt and sitemap.xml.
  2. Enquiry forms use Web3Forms; the access key is in common.js
     (W3F_KEY). hCaptcha is loaded on contact.html and proposal.html.
     Test both forms once on the live domain.
  3. Domain restriction for the key is a Web3Forms Pro feature (optional).
  4. Set your host's 404 page to 404.html.

Local preview
  cd into this folder, run:  python3 -m http.server 8000
  then open http://localhost:8000
  (Opening index.html by double-click also works for browsing, but the
  enquiry forms need a real http(s) address.)
