angular.module('starter.controllers', [])

.controller('CuisCtrl', function($scope, $ionicLoading, $resource) {
  $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
  });
  var Cuisines = $resource('http://api.veggiesetgo.com/cuisines');
  $scope.cuisines = Cuisines.query();
  $scope.cuisines.$promise.then(function (result) {
    $scope.cuisines = result;
    $ionicLoading.hide();
  });
})

.controller('CuisineDetailCtrl', function($scope, $stateParams, $resource, $ionicLoading) {
    $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
  });

    if ($scope.latLng) {
  var Cuisine = $resource('http://api.veggiesetgo.com/cuisines/:cuisineId/:lat/:lng');
  $scope.restaurants = Cuisine.query({cuisineId: $stateParams.cuisineId, lat: $scope.latLng.lat, lng: $scope.latLng.long});
    } else {
  var allListings = $resource('http://api.veggiesetgo.com/restaurants');
  $scope.restaurants = allListings.query();
    }
  $scope.restaurants.$promise.then(function (result) {
    $scope.restaurants = result;
    $ionicLoading.hide();
  });
})

.controller('LoadCtrl', function($scope, $ionicLoading, $timeout) {
  $scope.totalDisplayed = 10;
  $timeout(function() {
    if ($scope.restaurants.length < 10) {
      $scope.noMoreEntries = true;
    };
  }, 1000);
  $scope.loadMore = function () {
    $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
  });
    $timeout(function() {
      $scope.totalDisplayed += 10; 
          $ionicLoading.hide();
    if ($scope.totalDisplayed < $scope.restaurants.length) {
      $scope.noMoreEntries = false;
  } else {
      $scope.noMoreEntries = true;
    }
    }, 1000);
	};
})


.controller('LoadExploreCtrl', function($scope, $ionicLoading, $timeout) {
  $scope.totalDisplayed = 10;
/*  $timeout(function() {
    if ($scope.restaurants.length < 10) {
      $scope.noMoreEntries = true;
    };
  }, 1000);
*/
  $scope.loadMore = function () {
    $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
  });
    $timeout(function() {
      $scope.totalDisplayed += 10; 
          $ionicLoading.hide();
    if ($scope.totalDisplayed < $scope.filteredRestaurants.length) {
      $scope.noMoreEntries = false;
  } else {
      $scope.noMoreEntries = true;
    }
    }, 1000);
  };
})


.controller('ExploreCtrl', function($ionicPlatform, $scope, $timeout, $resource, $ionicLoading, myCache, filterFilter) {


  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  $scope.toggleGroup1 = function(group) {
    if ($scope.isGroup1Shown(group)) {
      $scope.shownGroup1 = null;
    } else {
      $scope.shownGroup1 = group;
    }
  };
  $scope.isGroup1Shown = function(group) {
    return $scope.shownGroup1 === group;
  };

  $scope.toggleGroup2 = function(group) {
    if ($scope.isGroup2Shown(group)) {
      $scope.shownGroup2 = null;
    } else {
      $scope.shownGroup2 = group;
    }
  };
  $scope.isGroup2Shown = function(group) {
    return $scope.shownGroup2 === group;
  };

$scope.useRating = {};
$scope.usePrice = {};
$scope.useLocal = {};
$scope.useGlutenFree = {};
$scope.useOrganic = {};
$scope.useVegan = {};
$scope.useHappyHour = {};

    $scope.group = {}; 



// MAIN LOADING CONTROLLER //
  $ionicPlatform.ready(function() {
var cache = myCache.get('myData');

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: true
    });

if (cache) {
  $scope.restaurants = cache;
  $ionicLoading.hide(); 
}
else {


//  console.log("here's the root scope object:")
//  console.log($scope.latLng);

if ($scope.latLng) {
  var Locations = $resource('http://api.veggiesetgo.com/search/:lat/:lng');
  $scope.restaurants = Locations.query({lat: $scope.latLng.lat, lng: $scope.latLng.long});
  $ionicLoading.hide(); 
} else {
  var allListings = $resource('http://api.veggiesetgo.com/restaurants');
  $scope.restaurants = allListings.query();
  $ionicLoading.hide();
}
  myCache.put('myData', $scope.restaurants);  
}
});

    // Watch the restaurants that are selected
    $scope.$watch(function () {
        return {
            restaurants: $scope.restaurants,
            useRating: $scope.useRating,
            usePrice: $scope.usePrice,
            useLocal: $scope.useLocal,
            useGlutenFree: $scope.useGlutenFree,
            useOrganic: $scope.useOrganic,
            useVegan: $scope.useVegan,
            useHappyHour: $scope.useHappyHour
        }
    }, function (value) {
        var selected;
        
//        $scope.ratingGroup = uniqueItems($scope.restaurants, 'rating');
        var filterAfterRating = [];        
        selected = false;
        for (var j in $scope.restaurants) {
            var p = $scope.restaurants[j];
            for (var i in $scope.useRating) {
                if ($scope.useRating[i]) {
                    selected = true;
                    if (i === p.rating) {
                        filterAfterRating.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            filterAfterRating = $scope.restaurants;
        }

        var filterAfterLocal = [];        
        selected = false;
        for (var j in filterAfterRating) {
            var p = filterAfterRating[j];
            for (var i in $scope.useLocal) {
                if ($scope.useLocal[i]) {
                    selected = true;
                    if (i === p.local) {
                        filterAfterLocal.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            filterAfterLocal = filterAfterRating;
        }

        var filterAfterGlutenFree = [];        
        selected = false;
        for (var j in filterAfterLocal) {
            var p = filterAfterLocal[j];
            for (var i in $scope.useGlutenFree) {
                if ($scope.useGlutenFree[i]) {
                    selected = true;
                    if (i === p.glutenfree) {
                        filterAfterGlutenFree.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            filterAfterGlutenFree = filterAfterLocal;
        }

        var filterAfterOrganic = [];        
        selected = false;
        for (var j in filterAfterGlutenFree) {
            var p = filterAfterGlutenFree[j];
            for (var i in $scope.useGlutenFree) {
                if ($scope.useGlutenFree[i]) {
                    selected = true;
                    if (i === p.organic) {
                        filterAfterOrganic.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            filterAfterOrganic = filterAfterGlutenFree;
        }

        var filterAfterVegan = [];        
        selected = false;
        for (var j in filterAfterOrganic) {
            var p = filterAfterOrganic[j];
            for (var i in $scope.useVegan) {
                if ($scope.useVegan[i]) {
                    selected = true;
                    if (i === p.vegan) {
                        filterAfterVegan.push(p);
                        break;
                    }
                }
            }        
        }
        if (!selected) {
            filterAfterVegan = filterAfterOrganic;
        }

        var filterAfterHappyHour = [];
        selected = false;
        for (var j in filterAfterVegan) {
          var p = filterAfterVegan[j];
          for (var i in $scope.useHappyHour) {
            if ($scope.useHappyHour[i]) {
              selected = true;
              if (i === p.happyhour) {
                filterAfterHappyHour.push(p);
                break;
              }
            }
          }
        }
        if (!selected) {
          filterAfterHappyHour = filterAfterVegan;
        }
        
//        $scope.priceGroup = uniqueItems($scope.restaurants, 'price');
        var filterAfterPrice = [];        
        selected = false;
        for (var j in filterAfterHappyHour) {
            var p = filterAfterHappyHour[j];
            for (var i in $scope.usePrice) {
                if ($scope.usePrice[i]) {
                    selected = true;
                    if (i === p.priceNum) {
                        filterAfterPrice.push(p);
                        break;
                    }
                }
            }       
        }
        if (!selected) {
            filterAfterPrice = filterAfterHappyHour;
        }
      
          $scope.filteredRestaurants = filterAfterPrice;
    }, true);

})

.controller('DetailCtrl', function($scope, $stateParams, $resource, $ionicLoading) {

$scope.openMaps = function(lat, lng) {
  console.log("http://www.google.com/maps/@" + lat + "," + lng + ",14z", "_blank");
  window.open( "comgooglemaps://?q=" + lat + "," + lng + "&zoom=12", "_system" );
};

  $ionicLoading.show({
      content: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
  });

var Restaurant = $resource('http://api.veggiesetgo.com/restaurants/:restaurantId');
$scope.restaurant = Restaurant.get({restaurantId: $stateParams.restaurantId});
  $scope.restaurant.$promise.then(function (result) {
    $scope.restaurant = result;
    $ionicLoading.hide();
  });
})


.controller('PicsCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, Explore) {
  $scope.restaurant = Explore.get({restaurantId: $stateParams.restaurantId});
   $ionicSlideBoxDelegate.update();
})


.controller('MapCtrl', function($scope, $ionicPlatform, $rootScope, $timeout, $resource, myCacheA, $ionicPopup, $ionicLoading, GeoLocService) {

// main geolocation function
var cacheA = myCacheA.get('myDataA');

  $scope.locate = function() {
    if (!cacheA) {
    $scope.geoLocation = {status: "LOCATING"}
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: true
    });
    GeoLocService.getLatLong().then(
      function(latLong) {
        $rootScope.latLng = latLong;
        $scope.geoLocation = {status: "AVAILABLE"}
        console.log("here's the current object: ");
        console.log($scope.latLng);
        var Locations = $resource('http://api.veggiesetgo.com/nearby/:lat/:lng');
        $scope.restaurants = Locations.query({lat: latLong.lat, lng: latLong.long});
  $scope.restaurants.$promise.then(function (result) {
    $scope.restaurants = result;
    $ionicLoading.hide();
  });
        myCacheA.put('myDataA', $scope.restaurants);
      }, function(error) {
        $ionicLoading.hide();
        $scope.geoLocation = {status: "UNAVAILABLE"};
      });
  } else {
      $scope.restaurants = cacheA;
  }
  };


  $ionicPlatform.ready( function() {
    $scope.locate();
  });


$scope.codeAddress = function() {
      $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showDelay: 0
    });
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      $scope.newLatitude = results[0].geometry.location.k;
      $scope.newLongitude = results[0].geometry.location.B;
      console.log(results);
    var Locations = $resource('http://api.veggiesetgo.com/nearby/:lat/:lng');
  $scope.restaurants = Locations.query({lat: $scope.newLatitude, lng: $scope.newLongitude});
  $scope.restaurants.$promise.then(function (result) {
    $scope.restaurants = result;
    $ionicLoading.hide();
  });

      myCacheA.put('myDataA', $scope.restaurants);
      console.log('latitude: ' + results[0].geometry.location.B + ', longitude: ' + results[0].geometry.location.k);
    } else {
      console.log(status);
      $ionicLoading.hide();
      if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
            $ionicPopup.alert({
              title: 'Sorry, no results were found. Try again?',
              okType: 'button-balanced'
            });
//        alert("Sorry, no results were found. Please try again.");
      } else {
      alert("Sorry, something weird happened. Try again?");
      }
    }
  });
}


  $scope.findAgain = function() {
    $scope.geoLocation = {status: "LOCATING"}
    GeoLocService.getLatLong().then(
      function(latLong) {
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i>',
      animation: 'fade-in',
      showBackdrop: true
    });
        $scope.latLng = latLong;
        $scope.geoLocation = {status: "AVAILABLE"}
        console.log(latLong);
        var Locations = $resource('http://api.veggiesetgo.com/nearby/:lat/:lng');
        $scope.restaurants = Locations.query({lat: latLong.lat, lng: latLong.long});
  $scope.restaurants.$promise.then(function (result) {
    $scope.restaurants = result;
    $ionicLoading.hide();
  });
        myCacheA.put('myDataA', $scope.restaurants);
      }, function(error) {
        $scope.geoLocation = {status: "UNAVAILABLE"};
        $ionicLoading.hide();
      });
};

});