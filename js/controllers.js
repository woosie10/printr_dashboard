
printrApp.controller('totalsCtrl', function($scope, weeklyTotalsData, percentageDiff) {

	//initialise arrays
	$scope.weeklyTotals = [];
	$scope.xAxis = [];
	$scope.usersTotals = [];
	$scope.modelsSlicedTotals = [];
	$scope.printHoursTotals = [];
	$scope.totals = [];
	$scope.previousTotals = [];

	//get weekly totals data
	weeklyTotalsData.get().then(function(data){

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
		legend: {
            itemStyle: {
                color: '#333',
                fontWeight: 'normal',
                fontSize: '15px',
            }
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
				color: '#535877'
		    }
		]
		
    };



});







printrApp.controller('livedataCtrl', function($scope, $filter, $interval, liveTotalsData) {

	//initialise arrays
	$scope.currentTotals = [];
	$scope.currentTotals.devices = [];
	$scope.currentTotals.users = [];
	$scope.currentTotals.jobs = [];

	$scope.xAxis = [];
	$scope.xAxis.seconds = [];
	$scope.xAxis.minutes = [];

	//populate first data values
    $scope.currentTotals.devices.seconds = [50];
	$scope.currentTotals.users.seconds = [75];
	$scope.currentTotals.jobs.seconds = [35];

	$scope.currentTotals.devices.minutes = [50];
	$scope.currentTotals.users.minutes = [75];
	$scope.currentTotals.jobs.minutes = [35];

	

	(function () {
        var time = (new Date()).getTime(), i;

        for (i = -60; i <= 0; i += 1) {

        	//generate previous 60 seconds of random live data
            $scope.xAxis.seconds.push($filter('date')(time + i * 1000, 'HH:mm:ss'));
            liveTotalsData.add($scope.currentTotals.devices.seconds);
            liveTotalsData.add($scope.currentTotals.users.seconds);
            liveTotalsData.add($scope.currentTotals.jobs.seconds);

            //generate previous 60 minutes of random live data
            $scope.xAxis.minutes.push($filter('date')(time + i * 60000, 'HH:mm:ss'));
            liveTotalsData.add($scope.currentTotals.devices.minutes);
            liveTotalsData.add($scope.currentTotals.users.minutes);
            liveTotalsData.add($scope.currentTotals.jobs.minutes);
        }

        //find max and min of data
        liveTotalsData.findLimits($scope.currentTotals.devices);
        liveTotalsData.findLimits($scope.currentTotals.users);
        liveTotalsData.findLimits($scope.currentTotals.jobs);
    	
    }())



	//define line chart options
	$scope.lineChartOptions = {
	    chart: {
	      	type: 'spline',
	      	lineWidth: 2,
	      	backgroundColor: '#FDFDFD',
	      	height: 260
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
            categories: $scope.xAxis.seconds,
            minTickInterval: 10,
        },
        yAxis:{
        	allowDecimals: false
        },
        title: {
			text: ''
		},
		legend: {
            itemStyle: {
                color: '#333',
                fontWeight: 'normal',
                fontSize: '15px',
            }
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
				color: '#1EB1E6',
		      	data: $scope.currentTotals.devices.seconds
		    }
		]	

    };

    //define users connected chart
    $scope.usersConnectedConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Users Connected',
				color: '#888998',
		      	data: $scope.currentTotals.users.seconds
		    }
		]		

    };

    //define current jobs chart
    $scope.currentJobsConfig = {

		options: $scope.lineChartOptions,
		  
		series: [
		    {
		      	name: 'Current Jobs',
				color: '#535877',
		      	data: $scope.currentTotals.jobs.seconds
		    }
		]		

    };


    //generate new random data values every second
    $interval(function () {

    	liveTotalsData.add($scope.currentTotals.devices.seconds);
    	liveTotalsData.add($scope.currentTotals.users.seconds);
    	liveTotalsData.add($scope.currentTotals.jobs.seconds);

    	liveTotalsData.findLimits($scope.currentTotals.devices);
        liveTotalsData.findLimits($scope.currentTotals.users);
        liveTotalsData.findLimits($scope.currentTotals.jobs);


    	$scope.newTime = $filter('date')(new Date(), 'HH:mm:ss');
    	$scope.xAxis.seconds.push($scope.newTime);

    	if($scope.xAxis.seconds.length>30){
        	$scope.xAxis.seconds.splice(0,1);
    	}

    }, 1000);


    //generate new random data values every minute
    $interval(function () {

    	liveTotalsData.add($scope.currentTotals.devices.minutes);
    	liveTotalsData.add($scope.currentTotals.users.minutes);
    	liveTotalsData.add($scope.currentTotals.jobs.minutes);

    	liveTotalsData.findLimits($scope.currentTotals.devices);
        liveTotalsData.findLimits($scope.currentTotals.users);
        liveTotalsData.findLimits($scope.currentTotals.jobs);

    	$scope.newTime = $filter('date')(new Date(), 'HH:mm:ss');
    	$scope.xAxis.minutes.push($scope.newTime);

    	if($scope.xAxis.minutes.length>30){
        	$scope.xAxis.minutes.splice(0,1);
    	}

    }, 60000);



    //set chart type to seconds
    $scope.chartFlag = 1;

    //toggle between seconds and minutes charts
    $scope.toggleChart = function(){


    	$scope.devicesConnectedConfig.series.splice(0, 1);
    	$scope.usersConnectedConfig.series.splice(0, 1);
    	$scope.currentJobsConfig.series.splice(0, 1);

    	if($scope.chartFlag == 1){

			$scope.chartFlag = 2;

    		$scope.devicesConnectedConfig.options.xAxis.categories = $scope.xAxis.minutes;

			$scope.devicesConnectedConfig.series.push({
				name: 'Devices Connected',
				color: '#1EB1E6',
				data: $scope.currentTotals.devices.minutes
			});

			$scope.usersConnectedConfig.series.push({
				name: 'Users Connected',
				color: '#888998',
		      	data: $scope.currentTotals.users.minutes
			});

			$scope.currentJobsConfig.series.push({
				name: 'Current Jobs',
				color: '#535877',
		      	data: $scope.currentTotals.jobs.minutes
			});


		}else{

			$scope.chartFlag = 1;

			$scope.devicesConnectedConfig.options.xAxis.categories = $scope.xAxis.seconds;

			$scope.devicesConnectedConfig.series.push({
				name: 'Devices Connected',
				color: '#1EB1E6',
				data: $scope.currentTotals.devices.seconds
			});

			$scope.usersConnectedConfig.series.push({
				name: 'Users Connected',
				color: '#888998',
		      	data: $scope.currentTotals.users.seconds
			});

			$scope.currentJobsConfig.series.push({
				name: 'Current Jobs',
				color: '#535877',
		      	data: $scope.currentTotals.jobs.seconds
			});

		}

    }




});
