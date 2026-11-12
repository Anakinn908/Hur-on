HUR-ON website (static, multi-page)
===================================
 
Enquiry forms (contact.html, proposal.html) post to a Google Apps Script web app (URL in FORM_ENDPOINT in common.js; script source in apps-script.gs).
After ANY change to the script, redeploy it as a NEW version (Deploy > Manage deployments > Edit > New version), access = Anyone.
 
Structure
  index.html, about.html, ...   17 pages + 404.html
  *.css, *.js                   styles and scripts (keep next to the pages)
  assets/                       images, videos, fonts
  robots.txt, sitemap.xml       SEO files (assume https://www.hur-on.com/)
  og-image.jpg                  social-share image (1200x630)
 
Local preview
  cd into this folder, run:  python3 -m http.server 8000
  then open http://localhost:8000
