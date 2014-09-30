// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ngCordova', 'ionic', 'ngResource', 'ngAnimate', 'starter.controllers', 'starter.services', 'starter.filters'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function($cordovaSplashscreen) {
  setTimeout(function() {
    $cordovaSplashscreen.hide()
  }, 2000)
})


.run(function($rootScope, $ionicScrollDelegate) {
    $rootScope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop(true);
  };
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Explore / Discovery:

    .state('tab.explore', {
      url: '/explore',
      views: {
        'tab-explore': {
          templateUrl: 'templates/e/tab-explore.html',
          controller: 'ExploreCtrl'
        }
      }
    })
    .state('tab.explore-detail', {
      url: '/restaurant/:restaurantId',
      views: {
        'tab-explore': {
          templateUrl: 'templates/e/restaurant-detail.html',
          controller: 'DetailCtrl'
        }
      }
    })

    .state('tab.explore-cuisine-detail', {
      url: '/explore/cuisine/:cuisineId',
      views: {
        'tab-explore': {
          templateUrl: 'templates/e/cuisine-detail.html',
          controller: 'CuisineDetailCtrl'
        }
      }
    })

    .state('tab.explore-restaurant-pics', {
      url: '/explore/restaurant/:restaurantId/pics',
      views: {
        'tab-explore': {
          templateUrl: 'templates/e/restaurant-pics.html',
          controller: 'PicsCtrl'
        }
      }
    })

    .state('tab.explore-restaurant-map', {
      url: '/explore/restaurant/:restaurantId/map',
      views: {
        'tab-explore': {
          templateUrl: 'templates/e/restaurant-map.html',
          controller: 'DetailCtrl'
        }
      }
    })

// Nearby / Map

    .state('tab.nearby', {
      url: '/nearby',
      views: {
        'tab-nearby': {
          templateUrl: 'templates/n/tab-nearby.html',
          controller: 'MapCtrl'
        }
      }
    })

    .state('tab.nearby-restaurant', {
      url: '/nearby/restaurant/:restaurantId',
      views: {
        'tab-nearby': {
          templateUrl: 'templates/n/restaurant-detail.html',
          controller: 'DetailCtrl'
        }
      }
    })

    .state('tab.nearby-cuisine-detail', {
      url: '/nearby/cuisine/:cuisineId',
      views: {
        'tab-nearby': {
          templateUrl: 'templates/n/cuisine-detail.html',
          controller: 'CuisineDetailCtrl'
        }
      }
    })

    .state('tab.nearby-restaurant-pics', {
      url: '/nearby/restaurant/:restaurantId/pics',
      views: {
        'tab-nearby': {
          templateUrl: 'templates/n/restaurant-pics.html',
          controller: 'PicsCtrl'
        }
      }
    })

    .state('tab.nearby-restaurant-map', {
      url: '/nearby/restaurant/:restaurantId/map',
      views: {
        'tab-nearby': {
          templateUrl: 'templates/n/restaurant-map.html',
          controller: 'DetailCtrl'
        }
      }
    })

// Cuisines 

    .state('tab.cuisines', {
      url: '/cuisines',
      views: {
        'tab-cuisines': {
          templateUrl: 'templates/c/tab-cuisines.html',
          controller: 'CuisCtrl'
        }
      }
    })

    .state('tab.cuisine-detail', {
      url: '/cuisine/:cuisineId',
      views: {
        'tab-cuisines': {
          templateUrl: 'templates/c/cuisine-detail.html',
          controller: 'CuisineDetailCtrl'
        }
      }
    })

    .state('tab.cuisine-restaurant', {
      url: '/cuisine/restaurant/:restaurantId',
      views: {
        'tab-cuisines': {
          templateUrl: 'templates/c/restaurant-detail.html',
          controller: 'DetailCtrl'
        }
      }
    })

    .state('tab.cuisine-restaurant-pics', {
      url: '/cuisine/restaurant/:restaurantId/pics',
      views: {
        'tab-cuisines': {
          templateUrl: 'templates/c/restaurant-pics.html',
          controller: 'PicsCtrl'
        }
      }
    })

    .state('tab.cuisine-restaurant-map', {
      url: '/cuisine/restaurant/:restaurantId/map',
      views: {
        'tab-cuisines': {
          templateUrl: 'templates/c/restaurant-map.html',
          controller: 'DetailCtrl'
        }
      }
    })


// About

    .state('tab.about', {
      url: '/about',
      views: {
        'tab-about': {
          templateUrl: 'templates/tab-about.html'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/nearby');

});

