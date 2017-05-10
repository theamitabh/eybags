var app = angular.module('bagApp', []);
app.controller('bagController' , function ($scope, $http) {
	$scope.showBagHeader = false;
	$scope.pnrre = /\b\w{6}\b/;	

	
	$scope.selectBag = function (val) {
		$scope.selectedBagTag = val.bagtag;
		$scope.loadEvents();
	}
	
	$scope.loadBagTags = function () {
		$scope.listOfBags = null;
		$scope.listOfBagEvents = null;
		$scope.showBagHeader= false;
		$scope.selectedBag = null;
		
		var apiurl = '/eyapi/baggage/v1/getguestbags?pnrnum=' + $scope.pnrNum.toUpperCase() + '&depdate=' + $scope.depDate ;
		$http.get(apiurl)

			.success(function (data) {
				$scope.listOfBags = data.bags;

				if ($scope.listOfBags.length > 0) {
					$scope.showBagHeader= true;
					$scope.selectedBag = $scope.listOfBags[0].bagtag;
					$scope.loadEvents();
				}
			})
			.error(function (data, status, headers, config) {
				$scope.errorMessage = "Couldn't load the list of customers, error # " + status;
			});
 
	

	}


	$scope.loadEvents = function () {
		$scope.listOfBagEvents = null;
		//eyapi/baggage/v1/baghistory?bagtag={{x.bagtag}}&depdate={{trvlDate}}
		var url = '/eyapi/baggage/v1/baghistory?bagtag=' + $scope.selectedBagTag + '&depdate=' + $scope.depDate ;
		$http.get(url)
			.success(function (data) {
				$scope.listOfBagEvents = data.events;
			})
			.error(function (data, status, headers, config) {
				$scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
			});
	}
		
});