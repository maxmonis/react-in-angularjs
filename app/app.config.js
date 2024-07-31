'use strict';

angular.
  module('phonecatApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        when('/quotes', {
          controller: function($http, $scope) {
            loadQuote();
            function loadQuote() {
              $http.get('https://api.quotable.io/random')
                .then(function(response) {
                  $scope.quote = response.data;
                });
            }
          },
          template: '<quotes-page angular-quote="{{quote}}"></quotes-page>'
        }).
        otherwise('/phones');
    }
  ]);
