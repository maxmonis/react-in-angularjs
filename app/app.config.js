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
          controller: function($http, $scope, $window) {
            loadQuote();
            function loadQuote() {
              $http.get('https://api.quotable.io/random')
                .then(function(response) {
                  $scope.quote = response.data;
                });
            }
            function handleEvent(event) {
              if (event.detail === 'reload') loadQuote();
            }
            $window.addEventListener('quotes', handleEvent);
            $scope.$on('$destroy', function() {
              $window.removeEventListener('quotes', handleEvent);
            });
          },
          template: '<quotes-page angular-quote="{{quote}}"></quotes-page>'
        }).
        otherwise('/phones');
    }
  ]);
