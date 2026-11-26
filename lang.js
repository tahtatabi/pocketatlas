// Shows the page in the reader's language: ?lang=xx (the game passes its own language), else the
// first of the browser's languages the page has, else English. The buttons switch, and the links
// between the two pages keep the language.
(function () {
  var langs = ['en', 'tr', 'de', 'fr', 'es', 'pt-BR', 'it', 'ja', 'ko', 'zh-Hant'];

  // "de-AT" → "de", "pt-PT" → "pt-BR", "zh-TW" / "zh-Hant-HK" → "zh-Hant"; anything else → null.
  function pick(code) {
    code = String(code || '').toLowerCase();
    if (!code) return null;
    if (code.indexOf('zh') === 0) return /hant|tw|hk|mo/.test(code) ? 'zh-Hant' : null;
    if (code.indexOf('pt') === 0) return 'pt-BR';
    var base = code.split('-')[0];
    return langs.indexOf(base) >= 0 ? base : null;
  }

  var current = pick(new URLSearchParams(location.search).get('lang'));
  var wanted = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (var i = 0; !current && i < wanted.length; i++) current = pick(wanted[i]);
  current = current || 'en';

  var blocks = document.querySelectorAll('body [lang]');
  var buttons = document.querySelectorAll('nav.lang button');
  var links = document.querySelectorAll('a[data-page]');

  function set(code) {
    document.documentElement.lang = code;
    blocks.forEach(function (el) { el.hidden = el.getAttribute('lang') !== code; });
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.l === code)); });
    links.forEach(function (a) { a.href = a.dataset.page + '?lang=' + code; });
  }

  buttons.forEach(function (b) { b.addEventListener('click', function () { set(b.dataset.l); }); });
  document.body.classList.add('js');
  set(current);
})();
