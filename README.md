A Monaca sample project using Kii Cloud Cordova plugin.

## Usage

### Get source code
Unzip the downloaded sample code by clicking this [link](https://github.com/KiiPlatform/monaca-plugin-sample/archive/master.zip).

### Import app with Monaca IDE
Import the downloaded zip file with Monaca IDE.

### Setup plugin in Monaca IDE

1. Download the zip file of kii-cordova-plugin by clicking this [link](https://github.com/KiiPlatform/kii-cordova-plugin/archive/monaca.zip).

2. Import the zip file to Monaca IDE.
  * Click `File` -> `Manage Cordova Plugins`
  * On the Cordova Plugins page, click `Import Cordova Plugin` button, then select the plugin zip file downloaded in step 2.

NOTE: We will release Kii Cloud Cordova plugin as Monaca plugin.
After that you don't need to import it from Github.

### Initialize kiicloud-plugin
- Go to https://developer.kii.com and create your app.

- Change `APP_ID`, `APP_KEY`, and `KII_SITE` with appropriate values in the `index.js` file located under `www/js` folder

```
// replace APP_ID, APP_KEY, and KII_SITE with appropriate values
kii.Kii.initializeWithSite(APP_ID, APP_KEY, KII_SITE);

```
For more details, please refer the [guide](http://docs.kii.com/en/guides/javascript/quickstart/).


### Setup push for Android

- Replace `sender_id` with appropriate value (Project ID can be obtained in Google Developer Console) in the `index.js` file located under `www/js` folder.

```
window.kiiPush.initAndroid("sender_id", "pushReceived", {
...
```

About the details of setting up GCM on Kii Cloud, please refer to [guide](http://documentation.kii.com/en/samples/push-notifications/push-notifications-android/).

### Setup push for iOS

Setup iOS push notification in Developer Portal on Kii Cloud.
About the details, please refre to [guide](http://documentation.kii.com/en/samples/push-notifications/push-notifications-ios/).

### Release build

Push notification only works in app with "Realse Build" in iOS/Android platform.

### Send push notification

- After successfully setted up by the above steps, launch the app and login/signup with a kii user.
- Send push notification to device with Direct Push on Kii Cloud. For the details, please refer to [Kii Cloud iOS SDK Guide](http://documentation.kii.com/en/guides/ios/managing-push-notification/direct-push/) or [Kii Cloud Android SDK Guide](http://documentation.kii.com/en/guides/android/managing-push-notification/direct-push/)
