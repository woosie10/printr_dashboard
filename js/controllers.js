
printrApp.controller('dashboardCtrl', function($scope, weeklyTotals, percentageDiff) {

	
	$scope.weeklyTotals = [];
	$scope.xAxis = [];
	$scope.usersTotals = [];
	$scope.modelsSlicedTotals = [];
	$scope.printHoursTotals = [];
	$scope.currentTotals = [];
	$scope.previousTotals = [];
	

	weeklyTotals.getData().then(function(data){

	  	$scope.weeklyTotals = data.data;

	  	angular.forEach($scope.weeklyTotals, function(item){  
			$scope.xAxis.push(item.label);
			$scope.usersTotals.push(item.users);
			$scope.modelsSlicedTotals.push(item.modelsSliced);
			$scope.printHoursTotals.push(item.printHours);
       	})

       	$scope.currentTotals = $scope.weeklyTotals[$scope.weeklyTotals.length - 1];
       	$scope.previousTotals = $scope.weeklyTotals[$scope.weeklyTotals.length - 2];

       	$scope.currentTotals.usersDiff = percentageDiff.calc($scope.currentTotals.users, $scope.previousTotals.users);
       	$scope.currentTotals.modelsSlicedDiff = percentageDiff.calc($scope.currentTotals.modelsSliced, $scope.previousTotals.modelsSliced);
       	$scope.currentTotals.printHoursDiff = percentageDiff.calc($scope.currentTotals.printHours, $scope.previousTotals.printHours);



	});



	$scope.lineChartOptions = {
	    chart: {
	      	type: 'spline'
	    },
	    xAxis: {
            categories: $scope.xAxis
        },
        title: {
			text: ''
		},
		credits: {
			enabled: false
		}
	};


	$scope.totalUsersConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'No. of Users',
		      	data: $scope.usersTotals,
				id: 'series-0',
				connectNulls: true,
				type: 'spline',
				lineWidth: 2,
				color: '#1EB1E6'
		    }
		]
		

    };


    $scope.totalSlicedModelsConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'No. Models Sliced',
		      	data: $scope.modelsSlicedTotals,
				connectNulls: true,
				id: 'series-1',
				type: 'spline',
				lineWidth: 2,
				color: '#888998'
		    }
		]		

    };


    $scope.totalPrintHoursConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'No. Print Hours',
		      	data: $scope.printHoursTotals,
				type: 'spline',
				id: 'series-2',
				lineWidth: 2,
				color: '#3E4259'
		    }
		]
		

    };




});

