// Shows the Turkish text on Turkish devices (or ?lang=tr), English otherwise; the buttons switch.
(function () {
  var q = new URLSearchParams(location.search).get('lang');
  var tr = q ? q === 'tr' : (navigator.language || '').toLowerCase().indexOf('tr') === 0;
  function set(isTr) {
    document.body.classList.toggle('tr', isTr);
    document.documentElement.lang = isTr ? 'tr' : 'en';
    document.querySelectorAll('nav.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String((b.dataset.l === 'tr') === isTr)); });
  }
  document.querySelectorAll('nav.lang button').forEach(function (b) { b.addEventListener('click', function () { set(b.dataset.l === 'tr'); }); });
  set(tr);
})();
