// Google Analytics 4 for saku.kantongstudio.com, behind a consent banner (plan/29-website.md § Analytics).
// Nothing is loaded from Google, and no cookie is set, until the visitor presses Accept; the choice is kept in localStorage.
// The tag is added here instead of in the page because the CSP allows no inline script.
(function () {
  var ID = 'G-0WGD2H7MVZ', KEY = 'saku_analytics', loaded = false;
  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname); // local previews are not counted
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode: asked again next visit */ } }

  function load() {
    if (loaded) return; loaded = true;
    window['ga-disable-' + ID] = false;
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    if (!local) gtag('config', ID);
  }

  function stop() { // declined, or changed their mind: stop sending and delete the _ga cookies
    window['ga-disable-' + ID] = true;
    var host = location.hostname.split('.'), domains = [location.hostname];
    for (var i = 1; i < host.length - 1; i++) domains.push('.' + host.slice(i).join('.'));
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (n.indexOf('_ga') !== 0) return;
      domains.forEach(function (d) { document.cookie = n + '=; Max-Age=0; path=/; domain=' + d; });
      document.cookie = n + '=; Max-Age=0; path=/';
    });
  }

  var path = location.pathname, lang = path === '/en' || path.indexOf('/en.') === 0 ? 'en' : (path === '/' || path === '/index.html' ? 'id' : 'both');
  var T = {
    id: { t: 'Kami memakai Google Analytics untuk menghitung pengunjung situs ini. Tidak ada cookie sebelum kamu setuju.', a: 'Setuju', d: 'Tolak', p: 'Kebijakan Privasi', s: 'Pengaturan cookie', l: 'Cookie' },
    en: { t: 'We use Google Analytics to count visitors to this site. No cookies are set until you agree.', a: 'Accept', d: 'Decline', p: 'Privacy Policy', s: 'Cookie settings', l: 'Cookies' }
  };

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }

  function banner() {
    var old = document.getElementById('consent'); if (old) old.remove();
    var langs = lang === 'both' ? ['id', 'en'] : [lang], t = T[langs[0]];
    var box = el('div', 'consent'); box.id = 'consent'; box.setAttribute('role', 'region'); box.setAttribute('aria-label', langs.map(function (l) { return T[l].l; }).join(' · '));
    var txt = el('p');
    langs.forEach(function (l, i) {
      if (i) txt.appendChild(document.createElement('br'));
      txt.appendChild(document.createTextNode(T[l].t + ' '));
    });
    var link = el('a', '', langs.map(function (l) { return T[l].p; }).join(' · ')); link.href = '/privacy' + (lang === 'en' ? '#en' : '');
    txt.appendChild(link);
    var row = el('div', 'consent-btns');
    var no = el('button', 'btn btn-ghost', langs.map(function (l) { return T[l].d; }).join(' · ')); no.type = 'button';
    var yes = el('button', 'btn btn-primary', langs.map(function (l) { return T[l].a; }).join(' · ')); yes.type = 'button';
    no.onclick = function () { set('denied'); stop(); box.remove(); };
    yes.onclick = function () { set('granted'); load(); box.remove(); };
    row.appendChild(no); row.appendChild(yes); box.appendChild(txt); box.appendChild(row);
    document.body.appendChild(box);
  }

  function footerLink() { // lets the visitor change their mind
    var nav = document.querySelector('.foot nav'); if (!nav) return;
    var b = el('button', 'linklike', langsLabel()); b.type = 'button'; b.onclick = banner; nav.appendChild(b);
  }
  function langsLabel() { return lang === 'both' ? T.id.s + ' · ' + T.en.s : T[lang].s; }

  function init() {
    var c = get();
    if (c === 'granted') load(); else if (c !== 'denied') banner();
    footerLink();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
