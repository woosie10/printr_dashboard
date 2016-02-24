
printrApp.controller('totalsCtrl', function($scope, weeklyTotals, percentageDiff) {

	
	$scope.weeklyTotals = [];
	$scope.xAxis = [];
	$scope.usersTotals = [];
	$scope.modelsSlicedTotals = [];
	$scope.printHoursTotals = [];
	$scope.totals = [];
	$scope.previousTotals = [];


	weeklyTotals.getData().then(function(data){

	  	$scope.weeklyTotals = data.data;

	  	angular.forEach($scope.weeklyTotals, function(item){  
			$scope.xAxis.push(item.label);
			$scope.usersTotals.push(item.users);
			$scope.modelsSlicedTotals.push(item.modelsSliced);
			$scope.printHoursTotals.push(item.printHours);
       	})

       	$scope.totals = $scope.weeklyTotals[$scope.weeklyTotals.length - 1];
       	$scope.previousTotals = $scope.weeklyTotals[$scope.weeklyTotals.length - 2];

       	$scope.totals.usersDiff = percentageDiff.calc($scope.totals.users, $scope.previousTotals.users);
       	$scope.totals.modelsSlicedDiff = percentageDiff.calc($scope.totals.modelsSliced, $scope.previousTotals.modelsSliced);
       	$scope.totals.printHoursDiff = percentageDiff.calc($scope.totals.printHours, $scope.previousTotals.printHours);



	});



	$scope.lineChartOptions = {
	    chart: {
	      	type: 'spline'
	    },
	    plotOptions: {
		    series: {
		        marker: {
		            enabled: false
		        }
		    }
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
		      	name: 'Users Total',
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
		      	name: 'Models Sliced Total',
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
		      	name: 'Print Hours Total',
		      	data: $scope.printHoursTotals,
				type: 'spline',
				id: 'series-2',
				lineWidth: 2,
				color: '#3E4259'
		    }
		]
		

    };




});







printrApp.controller('livedataCtrl', function($scope, $filter) {


	$scope.devices = [50];
	$scope.users = [75];
	$scope.jobs = [25];
	$scope.xAxis = [$filter('date')(new Date(), 'HH:mm:ss')];
	$scope.currentTotals = [];

	$scope.lineChartOptions = {
	    chart: {
	      	type: 'spline'
	    },
	    plotOptions: {
		    series: {
		        animation: false,
		        marker: {
		            enabled: false
		        }
		    }
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


	$scope.devicesConnectedConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Devices Connected',
		      	data: $scope.devices,
				id: 'series-0',
				connectNulls: true,
				type: 'spline',
				lineWidth: 2,
				color: '#1EB1E6'
		    }
		]	

    };


    $scope.usersConnectedConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Users Connected',
		      	data: $scope.users,
				connectNulls: true,
				id: 'series-1',
				type: 'spline',
				lineWidth: 2,
				color: '#888998'
		    }
		]		

    };


    $scope.currentJobsConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Current Jobs',
		      	data: $scope.jobs,
				connectNulls: true,
				id: 'series-1',
				type: 'spline',
				lineWidth: 2,
				color: '#3E4259'
		    }
		]		

    };



    $scope.currentTotals.devices = $scope.devices[0];
    $scope.currentTotals.users = $scope.users[0];
    $scope.currentTotals.jobs = $scope.jobs[0];


    function updateChart(chart, total){

    	var newTime = $filter('date')(new Date(), 'HH:mm:ss');

        $scope.dataSeries = chart.series[0].data;
        $scope.dataSeries.push(total);
        
        if($scope.dataSeries.length>30){
        	$scope.dataSeries.splice(0,1);
    	}

        
        $scope.dataAxis = chart.options.xAxis.categories;
        $scope.dataAxis.push(newTime);

        if($scope.dataAxis.length>30){
        	$scope.dataAxis.splice(0,1);
    	}

	};



    setInterval(function () {

    	$scope.currentTotals.devices += Math.round(Math.random() * 2 - 1);

        if($scope.currentTotals.devices<0){
        	$scope.currentTotals.devices = 1;
        }

    	updateChart($scope.devicesConnectedConfig, $scope.currentTotals.devices);


    	$scope.currentTotals.users += Math.round(Math.random() * 2 - 1);

        if($scope.currentTotals.users<0){
        	$scope.currentTotals.users = 1;
        }

    	updateChart($scope.usersConnectedConfig, $scope.currentTotals.users);


    	$scope.currentTotals.jobs += Math.round(Math.random() * 2 - 1);

        if($scope.currentTotals.jobs<0){
        	$scope.currentTotals.jobs = 1;
        }

    	updateChart($scope.currentJobsConfig, $scope.currentTotals.jobs);

        $scope.$apply();

    }, 2000);



});
