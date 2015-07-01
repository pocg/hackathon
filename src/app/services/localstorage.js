angular.module('hackathon2015')
.factory('localstorage', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        findByWildcard: function (wildcard) {
            var regex = new RegExp(wildcard), results = [];
            Object.keys($window.localStorage)
                .forEach(function(key){
                    if (regex.test(key)) {
                        results.push(JSON.parse($window.localStorage[key]));
                    }
                });
            return results;
        },
        removeByWildcard: function (wildcard) {
            var regex = new RegExp(wildcard);
            Object.keys($window.localStorage)
                .forEach(function(key){
                    if (regex.test(key)) {
                        $window.localStorage.removeItem(key);
                    }
                });
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            if($window.localStorage[key]) {
                return JSON.parse($window.localStorage[key]);//JSON.parse($window.localStorage[key] || '{}');
            }
            return null;
        },
        delete: function(key){
            $window.localStorage.removeItem(key);
        }
    }
}]);