angular.module('starter.controllers')

// Home controller
.controller('PasswordCtrl', function($scope, $rootScope, Product,$cordovaToast,ChangePasswordService, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams) {      
     console.log("Called Change PasswordCtrl");

    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
	$scope.change = {};
	console.log("userData > "+JSON.stringify($rootScope.userData));
	$scope.changePassword = function(){
		console.log(JSON.stringify($scope.change));
		$scope.msg = null;
		if($scope.change.oldPassword == null || $scope.change.oldPassword == ""){
			$scope.msg ="Enter Current Password.";
			return;
		}
		if($scope.change.pass1 == null || $scope.change.pass1 == ""){
			$scope.msg ="Enter New Password.";
			return;
		}
		if($scope.change.pass2 == null || $scope.change.pass2 == ""){
			$scope.change.pass1 = "";
			$scope.msg ="Re-Type New Password.";
			return;
		}
		if($scope.change.pass1 != $scope.change.pass2){
			$scope.msg = "Enter Same Password";
			return;
		}
		$ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        // $ionicLoading.show();
		ChangePasswordService.changePassword($scope.change).success(function(res){
			$ionicLoading.hide();

			console.log("Success Change > "+JSON.stringify(res));
			
			if(res.code == 200 && res.error== false && res.message!=''){
				$scope.change = {};
				$ionicHistory.clearHistory();
				$ionicHistory.clearCache();

                $ionicHistory.nextViewOptions({
				  disableAnimate: true,
				  disableBack: true
				});
     $cordovaToast.showShortBottom(res.output.message).then(function(success) {
        			$state.go('home');  
			      }, function (error) {
			        // error
			    });
                
			}
			else{
				$ionicLoading.hide();
				alert(res.message);				
			}
		}).error(function(err){
			$ionicLoading.hide();
			console.log(JSON.stringify(err));	
			 if(err.code==400 &&err.error==true){	
				$cordovaToast.showShortBottom("Current password is wrong").then(function(success) {
        			//$state.go('home');  
			      }, function (error) {
			        // error
			    });
			 }
		    if(err.code==401 &&err.error==true){
		    	$cordovaToast.showShortBottom("Access Denied. Invalid User Id/Api-Key.").then(function(success) {
    					//$state.go('home'); 

		      		}, function (error) {
		        		// error
		   		 });
		    }			
		})
	}
})

// 1.member login
// 2.member change Password
// 3.checkout for guest and e-commerce user.
// 4.Set Wallet amount for member user
