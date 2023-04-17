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
  <title>PWA Test</title>

  <link rel="icon" type="image/png" sizes="192x192" href="/testIcon.png">
  <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/testIcon.png">

  <meta charset="utf-8"/>
  <meta name="MobileOptimized" content="width"/>
  <meta name="HandheldFriendly" content="true"/>
  <link rel="stylesheet" media="all" href="/style.css"/>
</head>
<body>
  <h1>Stekkie</h1>
  <script type="module" src="/pwa.js"></script>
  <script type="module" src="/app.js"></script>
</body>
</html>
`;
