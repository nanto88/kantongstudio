// Google Analytics 4 for saku.kantongstudio.com (the snippet from the GA property, moved out of the page because the CSP allows no inline script).
// Loaded before gtag.js; the privacy policy discloses it (plan/29-website.md § Analytics).
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
// Local previews are not counted: they would pollute the production property.
if (!/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) gtag('config', 'G-0WGD2H7MVZ');
