angular.module('starter.services', ['ngResource'])


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
})

.factory('GeoLocService', function($q) {
    
    var latLong = null;
    var latitude = null;
    var longitude = null;
    
    var getSavedLatLong = function() {
        return [latLong.lat, latLong.long];
    };

    var getLatLong = function() {
        var deferred = $q.defer();
//        if( latLong === null || refresh ) {
            console.log('Getting lat long from service');
            navigator.geolocation.getCurrentPosition(function(pos) {
                latLong =  { 'lat' : pos.coords.latitude, 'long' : pos.coords.longitude }
                latitude = pos.coords.latitude;
                longitude = pos.coords.longitude
                console.log("from service: new lat " + latLong.lat + ", new long " + latLong.long);
                deferred.resolve(latLong);

            }, function(error) {
                console.log('Got an error:');
                console.log(error);
                latLong = null
                
                deferred.reject('Failed to Get Lat Long')

            }, {timeout: 10000, enableHighAccuracy: true});
            
//        }  else {
//            deferred.resolve(latLong);
//        }
        return deferred.promise;
    };      
    return {
        getLatLong : getLatLong
    }
});