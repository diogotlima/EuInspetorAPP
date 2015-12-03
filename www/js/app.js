var appGeral = angular.module('starter', ['ionic', 'ngSanitize', 'starter.controllers', 'ngCordova', 'firebase'])
var fb = null;

appGeral.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if (window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // }
    // if (window.StatusBar) {
    //   // org.apache.cordova.statusbar required
    //   StatusBar.styleDefault();
    // }
    fb = new Firebase("https://euinspetor.firebaseio.com/");
  });
});