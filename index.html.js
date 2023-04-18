export default `<!DOCTYPE html>
<html lang="nl" dir="ltr">
<head>
  <link rel="manifest" href="manifest.json">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
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
  <div class="topbar">
   <h1>Stekkie</h1>
      <small>
        Focus on the task at hand
      </small>
  </div>
  <div class="container"></div>
  <hr />
  <div class="container">
    <footer>
      <div>
        <small class="text-muted">Stekkie helps you focus. Put interupting tasks on the stack. Once completed, continue where you left off.</small>
      </div>
      <div>
        <small class="text-muted">Send feedback to ivo@fitchef.nl</small>
      </div>
    </footer>
  </div>
  <script type="module" src="/pwa.js"></script>
  <script type="module" src="/app.js"></script>
</body>
</html>
`;
