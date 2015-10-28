A Monaca sample project using Kii Cloud Cordova plugin.

## Usage

### Get source code
Download sample project archive by clicking this [link](https://github.com/KiiPlatform/monaca-plugin-sample/archive/master.zip).

### Import app with Monaca IDE
Import the downloaded zip file with Monaca IDE.

### Setup plugin in Monaca IDE

1. Download the zip file of kii-cordova-plugin by clicking this [link](https://github.com/KiiPlatform/kii-cordova-plugin/archive/monaca.zip).

2. Import the zip file to Monaca IDE.
  * Click `File` -> `Manage Cordova Plugins`
  * On the Cordova Plugins page, click `Import Cordova Plugin` button, then select the plugin zip file downloaded in step 2.

NOTE: We will release Kii Cloud Cordova plugin as Monaca plugin(外部サービス連携).
After that you don't need to import it from Github.

### Initialize kiicloud-plugin
- Go to https://developer.kii.com and create your app.

-  Replace `APP_ID`, `APP_KEY`, and `KII_SITE` with the values of your app.

`index.js` file located under `www/js` folder
```js
// replace APP_ID, APP_KEY, and KII_SITE with appropriate values
kii.Kii.initializeWithSite(APP_ID, APP_KEY, KII_SITE);
```

For more details, please refer to the [guide](http://docs.kii.com/en/guides/javascript/quickstart/).


### Setup push for Android

- Replace `sender_id` with the appropriate value (Project ID can be obtained in Google Developer Console).

`index.js` file located under `www/js` folder.
```js
window.kiiPush.initAndroid("sender_id", "pushReceived", {
...
```
You need to configure GCM on Kii Cloud before testing Push.
About the details of setting up GCM on Kii Cloud, please refer to [guide](http://documentation.kii.com/en/samples/push-notifications/push-notifications-android/).

### Setup push for iOS

Setup iOS push notification in Developer Portal on Kii Cloud.
About the details, please refre to [guide](http://documentation.kii.com/en/samples/push-notifications/push-notifications-ios/).
You need to configure iOS build setting and upload certificate in Monaca IDE as well.

### Send push notification

- After successfully finished the steps above, launch the app and login/signup with a kii user.
- Send push notification to device with Direct Push on Kii Cloud from developer console.

For the details, please refer to [Kii Cloud iOS SDK Guide](http://documentation.kii.com/en/guides/ios/managing-push-notification/direct-push/) or [Kii Cloud Android SDK Guide](http://documentation.kii.com/en/guides/android/managing-push-notification/direct-push/)

###  Limitaion

Push notification only works with "Realse Build" for both iOS and Android platform.
