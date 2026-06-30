<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="agd-partner-manual-verification" />
    <title>Diving In Asia</title>
    <meta name="description" content="One Media Projeckt" />
    <meta name="author" content="divinginasia" />

    <meta property="og:title" content="" />
    <meta property="og:description" content="One Media Project" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@rocketmedia" />
    <meta name="twitter:image" content="g" />
    <!-- Google Tag Manager -->
    <script>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-P4D36PXQ');
    </script>
    <!-- End Google Tag Manager -->
  </head>

  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4D36PXQ"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div id="root"></div>
    <!-- Book Now Button -->
    <button class="book-now-btn" style="position:fixed;bottom:2rem;right:2rem;z-index:9999;">Book Now / Inquiry</button>

    <!-- Modal Structure -->
    <div id="booking-modal" style="display:none;position:fixed;z-index:1000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;">
      <div style="background:#fff;padding:2rem;border-radius:8px;max-width:400px;width:90%;position:relative;box-shadow:0 2px 16px #0003;">
        <button id="booking-modal-close" style="position:absolute;top:10px;right:10px;background:none;border:none;font-size:1.5rem;cursor:pointer;">&times;</button>
        <form></form>
      </div>
    </div>

    <script src="/booking-modal.js"></script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
