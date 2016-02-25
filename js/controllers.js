
printrApp.controller('totalsCtrl', function($scope, weeklyTotals, percentageDiff) {

	//initialise arrays
	$scope.weeklyTotals = [];
	$scope.xAxis = [];
	$scope.usersTotals = [];
	$scope.modelsSlicedTotals = [];
	$scope.printHoursTotals = [];
	$scope.totals = [];
	$scope.previousTotals = [];

	//get weekly totals data
	weeklyTotals.getData().then(function(data){

	  	$scope.weeklyTotals = data.data;

	  	//populate chart data
	  	angular.forEach($scope.weeklyTotals, function(item){  
			$scope.xAxis.push(item.label);
			$scope.usersTotals.push(item.users);
			$scope.modelsSlicedTotals.push(item.modelsSliced);
			$scope.printHoursTotals.push(item.printHours);
       	})

	  	//get latest week's data
       	$scope.totals = $scope.weeklyTotals[$scope.weeklyTotals.length - 1];

       	//get previous week's data
       	$scope.previousTotals = $scope.weeklyTotals[$scope.weeklyTotals.length - 2];

       	//calculate totals vs previous week
       	$scope.totals.usersDiff = percentageDiff.calc($scope.totals.users, $scope.previousTotals.users);
       	$scope.totals.modelsSlicedDiff = percentageDiff.calc($scope.totals.modelsSliced, $scope.previousTotals.modelsSliced);
       	$scope.totals.printHoursDiff = percentageDiff.calc($scope.totals.printHours, $scope.previousTotals.printHours);



	});


	//define line chart options
	$scope.lineChartOptions = {
	    chart: {
	      	type: 'spline',
	      	backgroundColor: '#FDFDFD',
	      	lineWidth: 2
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
        yAxis:{
        	allowDecimals: false
        },
        title: {
			text: ''
		},
		credits: {
			enabled: false
		}
	};


	//define total users chart
	$scope.totalUsersConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Users Total',
		      	data: $scope.usersTotals,
				color: '#1EB1E6'
		    }
		]
		

    };

    //define total sliced models chart
    $scope.totalSlicedModelsConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Models Sliced Total',
		      	data: $scope.modelsSlicedTotals,
				color: '#888998'
		    }
		]		

    };

    //define total print hours chart
    $scope.totalPrintHoursConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Print Hours Total',
		      	data: $scope.printHoursTotals,
				color: '#3E4259'
		    }
		]
		

    };




});







printrApp.controller('livedataCtrl', function($scope, $filter, $interval, liveTotals) {

	//initialise arrays
	$scope.currentTotals = [];
	$scope.xAxis = [];

	//populate first data values
    $scope.currentTotals.devices = [50];
	$scope.currentTotals.users = [75];
	$scope.currentTotals.jobs = [25];


	(function () {

        //generate previous 60 seconds of random live data
        var time = (new Date()).getTime(), i;

        for (i = -30; i <= 0; i += 1) {
            $scope.xAxis.push($filter('date')(time + i * 2000, 'HH:mm:ss'));

            liveTotals.addData($scope.currentTotals.devices);
            liveTotals.addData($scope.currentTotals.users);
            liveTotals.addData($scope.currentTotals.jobs);
        }
        return $scope.xAxis, $scope.currentTotals.devices, $scope.currentTotals.users, $scope.currentTotals.jobs;
    }())


	//define line chart options
	$scope.lineChartOptions = {
	    chart: {
	      	type: 'spline',
	      	lineWidth: 2,
	      	backgroundColor: '#FDFDFD'
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
        yAxis:{
        	allowDecimals: false
        },
        title: {
			text: ''
		},
		credits: {
			enabled: false
		}

	};


	//define devices connected chart
	$scope.devicesConnectedConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Devices Connected',
		      	data: $scope.currentTotals.devices,
				color: '#1EB1E6'
		    }
		]	

    };

    //define users connected chart
    $scope.usersConnectedConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Users Connected',
		      	data: $scope.currentTotals.users,
				color: '#888998'
		    }
		]		

    };

    //define current jobs chart
    $scope.currentJobsConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Current Jobs',
		      	data: $scope.currentTotals.jobs,
				color: '#3E4259'
		    }
		]		

    };


    //generate new random live data
    $interval(function () {

    	liveTotals.addData($scope.currentTotals.devices);

    	liveTotals.addData($scope.currentTotals.users);

    	liveTotals.addData($scope.currentTotals.jobs);


    	$scope.newTime = $filter('date')(new Date(), 'HH:mm:ss');
    	$scope.xAxis.push($scope.newTime);

    	if($scope.xAxis.length>30){
        	$scope.xAxis.splice(0,1);
    	}

    }, 1000);





});
