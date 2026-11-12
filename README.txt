HUR-ON website (static, multi-page)
===================================

Enquiry forms (contact.html, proposal.html) are delivered by Web3Forms.
Setup: get a free Access Key at https://web3forms.com (enter the email that
should receive enquiries), then paste it into W3F_KEY near the top of the
ENQUIRY FORM block in common.js. While W3F_KEY is empty the forms run in
preview mode (a popup appears but nothing is sent). Test both forms once
from a real http(s) address after pasting the key.

Structure
  index.html, about.html, ...   17 pages + 404.html
  *.css, *.js                   styles and scripts (keep next to the pages)
  assets/                       images, videos, fonts
  robots.txt, sitemap.xml       SEO files (assume https://www.hur-on.com/)
  og-image.jpg                  social-share image (1200x630)

Local preview
  cd into this folder, run:  python3 -m http.server 8000
  then open http://localhost:8000
