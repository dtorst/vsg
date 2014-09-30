angular.module('starter.services', ['ngResource'])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('DataService', function($resource) {

var Regions = $resource('http://api.veggiesetgo.com/cuisines');

})


.factory('Explore', ['$resource',
    function ($resource) {
    return $resource('http://api.veggiesetgo.com/restaurants/:restaurantId', {});
    }])

.factory('Cuisines', ['$resource',
    function ($resource) {
    return $resource('http://api.veggiesetgo.com/cuisines/:cuisineId', {});
    }])

.factory('Locations', ['$resource',
  function ($resource) {
    return $resource('http://api.veggiesetgo.com/nearby/:lat/:lng', {});
  }])

.factory('myCache', function ($cacheFactory) {
        return $cacheFactory('myData');
})

.factory('myCacheA', function ($cacheFactory) {
        return $cacheFactory('myDataA');
});