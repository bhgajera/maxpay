angular.module('starter.controllers')

// Home controller
.controller('MemberCtrl', function($scope, $rootScope, MemberRegisterService,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams) {      
    console.log("Called Member");


    $scope.member = $rootScope.member || {};
    console.log("Meber >> "+JSON.stringify($scope.member));

    $scope.member.sponserside = "L";
    
    // $scope.member.sponser_bluepay_id = 'BVPL85043726';
    // $scope.member.epin_number = 135888561453909;
    $scope.setType = function(type){
      console.log("Type > "+type);
      $scope.member.sponserside = type;
    }

    $scope.register_member = function(){
         $scope.msg ="";
        console.log(JSON.stringify($scope.member));
       

        if($scope.member.sponser_bluepay_id == null || $scope.member.sponser_bluepay_id == ""){
            $scope.msg = 'Please enter sponser bluepay id';
            return;
        }

        if($scope.member.epin_number == null || $scope.member.epin_number == ""){
            $scope.msg = 'Please enter epin number';
            return;
        }
        if($scope.member.epin_number != null){
            if(isNaN($scope.member.epin_number)){
                $scope.msg = 'Please enter numeric value in epin number';
                return;       
            }
        }
        if($scope.member.name == null || $scope.member.name == ""){
            $scope.msg = 'Please enter name';
            return; 
        }
        if($scope.member.dob == null || $scope.member.dob == ""){
            $scope.msg = 'Please select dob';
            return; 
        }
        if($scope.member.dob != null || $scope.member.dob != ""){
            if($scope.member.dob>new Date()){
                $scope.msg = 'Please select valid dob';
                return;
            }
        }
        if($scope.member.gender == null || $scope.member.gender == ""){
            $scope.msg = 'Please select gender';
            return; 
        }
        if($scope.member.email_id == null || $scope.member.email_id == ""){
            $scope.msg = 'Please enter email id';
            return; 
        }
        if($scope.member.email_id != null){
            
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var flag = re.test($scope.member.email_id);
            if(flag == false){
                $scope.msg = "invalid email id (Ex : ABC@xyz.com )";
                 return;
            }
        }
        if($scope.member.phone == null || $scope.member.phone == ""){
            $scope.msg = "Enter mobile no";
            return;
        }
        if($scope.member.phone!=null){
            console.log("Len > "+($scope.member.phone.toString()).length)
            if(isNaN($scope.member.phone)){
                $scope.msg = "Enter numeric value in Phone no.";
                return;
            }
            if(($scope.member.phone.toString()).length != 10){
                console.log("reutnr bvac")
                $scope.msg = "10 digit required in phone no";
                return;
            }
        }
        $rootScope.member = $scope.member;
        $ionicLoading.show();
        MemberRegisterService.Register($scope.member).success(function(res){
            console.log("Success Member Register >>> "+JSON.stringify(res));
            $ionicLoading.hide();
            //alert(JSON.stringify(res));
            $state.go('member_otp');

        }).error(function(err){
            console.log("Erro >>> "+JSON.stringify(err));
            $ionicLoading.hide();
             //alert(JSON.stringify(err));
            if(err.code == 400){
               if(err.sponser_bluepay_id != null){
                    $scope.msg = err.sponser_bluepay_id; 
               }
               else if(err.sponserside != null){
                    $scope.msg = err.sponserside;
               }
               else if(err.epin_number != null){
                    $scope.msg = err.epin_number;
               }
               else if(err.phone != null){
                    $scope.msg = err.phone;
               }
            }
        })
    }
   


    $scope.member_otp_verification = function(){
        $ionicLoading.show();
        if($scope.member.otp == null || $scope.member.otp == ""){
            $scope.msg = "Please enter OTP ";
            return;
        }
        console.log("Start OTP verification @@@"+JSON.stringify($scope.member));
        $rootScope.member = $scope.member;
        MemberRegisterService.OTPVerification($scope.member).success(function(res){
            console.log("Success After OPT >>> "+JSON.stringify(res));
            if(res.code == 200){
                $ionicLoading.hide();
                $state.go('login');
            }
            
        }).error(function(err){
            console.log("EROOR >> "+JSON.stringify(err));
            $ionicLoading.hide();
            if(err.code == 400 && err.message != null){
                $scope.msg = err.message;
            }
        })
    }

})
