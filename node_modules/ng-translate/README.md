# ngTranslate
Simple multi language in an AngularJS application

This repo is for distribution on `npm` only.

## Install

You can install this package with `npm` only.

### npm

```shell
npm install ng-translate
```

Then add `ngTranslate` as a dependency for your app:

```javascript
angular.module('myApp', ['ngTranslate']);
```

Initialize ngTranslate on run of application

```javascript
$translate.Config({
  default :'en_US',
  languages :[
    'nl_NL'
  ]
});
```

Create folder in the root of your applicatie with name: languages

You will place your language files inside the language folder. File name format as follow: en_US.lang.json. An example file:
```json
{
    "locale": "en_US",
    "name":"EN_LANG",
    "words": {
        "APP_TITLE" : "Example App",
        "SETTINGS":"Settings",
	"EN_LANG": "English",
	"NL_LANG":"Dutch",
	"LANGUAGE":"Language"
    }
}
```

## Using in your application

Change the language in the application
```javascript
$translate.ChangeLanguage('nl_NL');
```

Get current language name, name must be exists in the *.lang.json file
```javascript
$translate.GetCurrentLanguage();
```

Use translation as filter inside your template
```html
<div id="example">{{ 'APP_TITLE' | translate }}</div>
```
