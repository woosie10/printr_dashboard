var printrApp = angular.module( 'printrApp', [] );

 


//set height to full page
printrApp.directive('resize', function ($window) {
    return function (scope) {

      scope.style = function () {
          return { 
              'min-height': ($window.innerHeight) + 'px',

          };
      };

    
    }
});