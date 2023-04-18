export default `<!DOCTYPE html>
<html lang="nl" dir="ltr">
<head>
  <link rel="manifest" href="manifest.json">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="application-name" content="Stekkie">
  <meta name="apple-mobile-web-app-title" content="Stekkie">
  <meta name="theme-color" content="#123456">
  <meta name="msapplication-navbutton-color" content="#123456">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="msapplication-starturl" content="/">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Stekkie</title>

  <link rel="icon" type="image/png" sizes="192x192" href="/icon192x192.png">
  <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/testIcon192x192.png">

  <meta charset="utf-8"/>
  <meta name="MobileOptimized" content="width"/>
  <meta name="HandheldFriendly" content="true"/>
  <link rel="stylesheet" media="all" href="/bootstrap5.3.0.css"/>
  <link rel="stylesheet" media="all" href="/style.css"/>
</head>
<body style="min-height:100vh; flex-direction: column; display: flex">
  <div class="topbar">
    <h1>Stekkie</h1>
    <small>Focus on the task at hand</small>
  </div>
  <div class="container" style="flex: 1"></div>
  <hr />
  <div class="container">
    <footer>
      <div class="pb-3">
        <small class="text-muted">Stekkie helps you focus. Put interupting tasks on the stack. Once completed, continue where you left off.</small>
      </div>
      <div>
        <small class="text-muted">Send feedback to ivo@fitchef.nl | <a href="/privacy-policy" style="color: black" alt="privacy policy">privacy policy</a></small>
      </div>
    </footer>
  </div>
  <script type="module" src="/pwa.js"></script>
  <script type="module" src="/app.js"></script>
</body>
</html>
`;
