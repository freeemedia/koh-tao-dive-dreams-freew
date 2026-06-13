// Centralized GA4 loader for static entry pages.
(function () {
  var GA4_ID = 'G-26SDDT2RZJ';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  var firstScript = document.getElementsByTagName('script')[0];
  var gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;

  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(gaScript, firstScript);
  } else {
    (document.head || document.documentElement).appendChild(gaScript);
  }

  window.gtag('js', new Date());
  window.gtag('config', GA4_ID);
})();