console.log('js');

var app = angular.module('JokeApp', []);

app.controller('JokeController', ['$http', function($http) {
    console.log('Message Controller has been loaded');
    var self = this;
    self.jokes = [];

    self.getJokes = function() {
        $http({
            method: 'GET',
            url: '/jokes',
        }).then(function(response) {
            console.log(response.data);
            self.jokes = response.data;
        });
    }
    self.postJokes = function() {
        $http({
            method: 'POST',
            url: '/jokes',
            data: self.newJoke
        }).then(function(response) {
            console.log(response);
            self.getJokes();
        });
    }
    self.getJokes();
}]);