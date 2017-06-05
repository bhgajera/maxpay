angular.module('starter.controllers')

// Home controller
.controller('otpCtrl', function($scope, $rootScope, $ionicNavBarDelegate, $cordovaToast, $ionicHistory, $state,$ionicLoading,$stateParams,OtpService) {
  console.log('otpCtrl >>>>>>>>>>>>>>>>>>>>>');
  $scope.user={};
 // console.log($stateParams.mobile);  
   $scope.otpUser = {};
  $scope.otpUser.mobile = $stateParams.mobile;
  //alert("from otp controllerstateparam mobile"+JSON.stringify($stateParams.mobile));
  
  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    });
  };
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

   $scope.verify = function(){    
    //$scope.showLoading();
    if($scope.user.otp == '' || $scope.user.otp == null || $scope.user.otp == undefined){
      console.log("Please Enter OTP");
      $cordovaToast.show("Please Enter OTP!",'short', 'center'); 
      return;
    }
    OtpService.verifyOtp($scope.user.otp,$scope.otpUser.mobile).success(function(res){
      $scope.hideLoading();
      console.log('in success');
      console.log(JSON.stringify(res));
      if(res.code == 200 && res.error == false && res.output.message == "Your mobile number verified successfully"){        
        $cordovaToast.show("Your mobile number verified successfully",'short', 'center');
        $state.go('login');
      }
      if(res.status == 200 && res.error == false && res.output.message =="Access Denied. Account is already verified"){
       $cordovaToast.show("Account is already verified",'short', 'center'); 
       $state.go('login');
      }
    }).error(function(err){
      $scope.hideLoading();
      console.log('in err');
      //alert(err);
      console.log(JSON.stringify(err));
      if(err.status== 400 && err.error == true && err.message.onetimepassword[0] == "Entered OTP is wrong"){
        $cordovaToast.show("Entered OTP is wrong",'short', 'center'); 
        //$state.go('register');
      }
    });
  }

  $scope.resendOtp = function(){
    console.log("from resendOtp fn in controller");
    //$scope.showLoading();
    OtpService.resendOtp($scope.register.mobile).success(function(res){
      $scope.hideLoading();
      console.log("resend otp success");
      console.log(JSON.stringify(res));
      if(res.code ==200 && res.error == false && output.message == "OTP has been send to your registered mobile"){
        alert("OTP has been send to your registered mobile");
      }
    }).error(function(err){
      $scope.hideLoading();
      console.log("eror in resend otp");
      if(err.status == 400 && err.error == true && err.message == "Access Denied. Account is already verified"){
        console.log("Access Denied. Account is already verified");
        $cordovaToast.show("Account is already verified!",'short', 'center');
        //alert("Access Denied. Account is already verified");
      }
      if(err.status == 400 && err.error == true && message.mobile_no[0] == "Please Enter your Mobile No" && message.mobile_no[1] == "The Mobile No  needs to be exactly 10 digits in length"){
        console.log("The Mobile No  needs to be exactly 10 digits in length");
        $cordovaToast.show("The Mobile No  needs to be exactly 10 digits in length!",'long', 'center');
        //alert("The Mobile No  needs to be exactly 10 digits in length");
      }
      if(err.status == 400 && err.error == true && err.message == "Access Denied. Invalid Mobile Nno"){
        console.log("Access Denied. Invalid Mobile Nno");
        $cordovaToast.show("Invalid Mobile No!",'short', 'center');
      }
    })
  }
})