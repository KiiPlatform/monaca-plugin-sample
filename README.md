A Monaca sample project using Kii Cloud Cordova plugin.

## Usage

### Get source code

Get the source code from Github

```
$ git clone https://github.com/KiiPlatform/monaca-plugin-sample
```

### Update kiicloud-plugin

1. Get kiicloud-plugin from Github [Repository]()

  ```
  $ git clone
  ```

2. Update Kii Cloud Javascript SDK in the kiicloud-plugin.

  - Download the latest Kii Cloud Javascript SDK from [Kii Developer Portal](https://developer.kii.com/v2/downloads)
  - Replace the file `www/kiisdk.js` file under the kiicloud-plugin root folder with the latest Kii Cloud Javascript SDK. Make sure the file name is `kiisdk.js`

3. Replace kiicloud-plugin folder in sample project downloaded in the [section](#get-source-code). The source code folder of kiicloud-plugin is `plugins/kiicloud-plugin`

### Zip this project

Compress the downloaded sample code folder `monaca-plugin-sample` as zip file.

### Import to Monaca

Import the zip file to Monaca.

### Initialize kiicloud-plugin

- Change `APP_ID`, `APP_KEY`, and `KII_SITE` with appropriate values in the `index.js` file located under `www/js` folder

**Note**: If you don't know how to create an app from Kii Cloud, please refer the [Guild](http://docs.kii.com/en/guides/javascript/quickstart/).


```
// replace APP_ID, APP_KEY, and KII_SITE with appropriate values
kii.Kii.initializeWithSite(APP_ID, APP_KEY, KII_SITE);

```

- change `sender_id` with appropriate value in the `index.js` file located under `www/js` folder.

**Note**: To leverage GCM with Kii Cloud, please refer the [Guild](If you don't know how to create an app from Kii Cloud, please refer the [Guild](http://docs.kii.com/en/guides/javascript/quickstart/).

```
window.kiiPush.initAndroid("sender_id", "pushReceived", {

```
