angular.module('starter.filters', [])

.filter('groupBy',
    function () {
        return function (collection, key) {
            if (collection === null) return;
            return uniqueItems(collection, key);
    };
})

.filter('externalLinks', function() {
	return function(text) {
		return String(text).replace(/href=/gm, 
"onclick=\"angular.element(this).scope().exLink(this);return false\" href=");
	}
})

.filter('to_trusted', ['$sce', function($sce) {
	return function(text) {
		return $sce.trustAsHtml(text);
	};
}]);