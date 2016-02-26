
var printrApp = angular.module( 'printrApp', ['highcharts-ng'] );



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



// import weekly totals data
printrApp.factory('weeklyTotalsData', function($http) {

	var factory = {};
	factory.get = function() {
	    return $http.get('json/weeklyTotalsData.json');
	};

	return factory;
  
});



// calculate the percentage difference of two numbers
printrApp.factory('percentageDiff', function($http) {

	var factory = {};
	factory.calc = function(num1, num2) {
	    return (num1 - num2) / num2 * 100;
	};

	return factory;
  
});



// add data to live totals array
printrApp.factory('liveTotalsData', function($http) {

	var factory = {};
	factory.add = function(dataSeries) {

		var lastPoint = dataSeries[dataSeries.length-1];
    	var newPoint = lastPoint + Math.round(Math.random() * 2 - 1);

    	if(newPoint<0){
    		newPoint = 1;
    	}

    	dataSeries.push(newPoint);

    	if(dataSeries.length>60){
        	dataSeries.splice(0,1);
    	}


    	if(dataSeries.max < Math.max.apply(null, dataSeries) || !dataSeries.max){
    		dataSeries.max = Math.max.apply(null, dataSeries)
    	}

    	if(dataSeries.min > Math.min.apply(null, dataSeries) || !dataSeries.min){
    		dataSeries.min = Math.min.apply(null, dataSeries)
    	}

	    return dataSeries;
	};

	return factory;
  
});