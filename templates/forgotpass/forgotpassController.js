angular.module('starter.controllers')

// Home controller
.controller('ForgotpassCtrl', function($scope, $rootScope, $ionicNavBarDelegate, $cordovaToast, $ionicHistory, $state,$ionicLoading,$stateParams,ForgotpassService) { 
  $scope.user={};
  console.log('forgotpass controller');
  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });
  };
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };
  $scope.Forgotpass= function(){
    //$scope.email_id;
    console.log($scope.user.email_id);      
    if($scope.user.email_id=='' || $scope.user.email_id == undefined || $scope.user.email_id == null){
      $cordovaToast.showShortBottom("please enter emailid").then(function(success) {
              //success
              return;
            }, function (error) {
              // error
      });
      
    }  
    $scope.showLoading();
    ForgotpassService.Forgotpass($scope.user.email_id).success(function(res){
      console.log("success");
      $scope.hideLoading();
     //alert("Password has been sent to in your registered email id");
      //$state.go('login');
      if(res.code== 200 && res.error == false && res.output == "Password has sent to your registered email id"){        
       $cordovaToast.showShortBottom(res.output).then(function(success) {
                  //success
                  $state.go('login');
        }, function (error) {
                  // error
        });
       
      }

      }).error(function(err){
      $scope.hideLoading();
      console.log('in err');
      console.log(JSON.stringify(err));

      if(err.code== 400 && err.error == true){        
       //$state.go('login');
       $cordovaToast.showShortBottom(err.message.email_id).then(function(success) {
                  //success
                 return;
        }, function (error) {
                  // error
        });
       
      }
    });
  }

})