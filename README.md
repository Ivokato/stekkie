# Run locally

PORT=3001 npm start

# Release update

Push to 'main' branch will automatically update https://stekkie.herokuapp.com

# Build for Android / iOS

https://www.pwabuilder.com

- Build using web interface
- iOS upload via XCode 'archive' 
- Android
  - Locally 'adb install' 
    adb install -r ./PWA-T.apk
  - Upload online via Google Developer Console website.