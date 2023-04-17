export default `<!DOCTYPE html>
<html lang="nl" dir="ltr">
<head>
  <link rel="manifest" href="manifest.json">

  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="application-name" content="PWA-Test">
  <meta name="apple-mobile-web-app-title" content="PWA-Test">
  <meta name="theme-color" content="#123456">
  <meta name="msapplication-navbutton-color" content="#123456">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="msapplication-starturl" content="/">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link rel="icon" type="image/png" sizes="192x192" href="/testIcon.png">
  <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/testIcon.png">

  <meta charset="utf-8"/>
  <meta name="MobileOptimized" content="width"/>
  <meta name="HandheldFriendly" content="true"/>
  <link rel="stylesheet" media="all" href="/style.css"/>
</head>
<body>
  <main>Dit is die {{content}}</main>
  <script>
    if ('serviceWorker' in navigator) {
      // Register a service worker hosted at the root of the
      // site using the default scope.
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('Service worker registration succeeded:', registration);
      }, /*catch*/ function(error) {
        console.log('Service worker registration failed:', error);
      });
    } else {
      console.log('Service workers are not supported.');
    }
  </script>
</body>
</html>
`;
