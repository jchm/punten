'use strict';
var app = angular.module('punten2App');

app.factory('players', function($http) {
  var myService = {
      async: function() {
        var promise = $http.get('http://punten.herokuapp.com/').then(function (response) {
          return response.data;
        });
        return promise;
      },
      getByID: function(id) {

       var success = $http({method: 'GET', url: 'http://punten.herokuapp.com/' + id}).success(function(data, status, headers, config) {
            console.log(data);
            return data;
        });

       return success;
      },
      save: function(player) {
        var id = player._id;
        var data = {"name": player.name, "points": player.points};

        $http.put('http://punten.herokuapp.com/' + id, data);
      }
    };
    return myService;
});

app.controller('MainCtrl', function (players, $scope) {

   players.async().then(function(d) {
      $scope.players = d;
    });

   $scope.predicate = 'points';

    $scope.addPoints = function(points) {

    //make beter
    players.getByID( $scope.player._id ).success(function(d) {
       $scope.player.points = parseInt(d.points) + parseInt(points);
       players.save($scope.player);
     });
   

  };

});

