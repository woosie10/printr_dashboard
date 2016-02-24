
printrApp.controller('dashboardCtrl', function($scope) {

	$scope.totals = [];

	$scope.totals.users = 251;
	$scope.totals.slicedModels = 1156;
	$scope.totals.printHours = 6532;

	$scope.xAxis = ['2/1', '9/1', '16/1', '23/1', '30/1', '6/2', '13/2', '20/2'];

	$scope.lineChartOptions = {
	    chart: {
	      	type: 'spline'
	    },
	    xAxis: {
            categories: $scope.xAxis
        },
	    plotOptions: {
	      	series: {
	        	stacking: false
	      	}
	    }
	};


	$scope.totalUsersConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'No. of Users',
		      	data: [
			        173,
			        194,
			        205,
			        211,
			        251
			    ],
				id: 'series-0',
				connectNulls: true,
				type: 'spline',
				lineWidth: 2,
				color: '#1EB1E6'
		    }
		],
		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		loading: false,
		size: {}
		

    };

    $scope.totalSlicedModelsConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'No. Models Sliced',
		      	data: [
			        871,
			        925,
			        992,
			        1051,
			        1156
		      	],
				connectNulls: true,
				id: 'series-1',
				type: 'spline',
				lineWidth: 2,
				color: '#888998'
		    }
		],
		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		loading: false,
		size: {}
		

    };


    $scope.totalPrintHoursConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'No. Print Hours',
		      	data: [
			        4371,
			        5271,
			        5824,
			        6142,
			        6532
			    ],
				type: 'spline',
				id: 'series-2',
				lineWidth: 2,
				color: '#3E4259'
		    }
		],
		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		loading: false,
		size: {}
		

    };




});

