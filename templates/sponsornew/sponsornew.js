angular.module('starter.controllers')

// Home controller
.controller('NewMemberCtrl', function($scope, $rootScope, MemberRegisterService,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$state, $stateParams) {      
    console.log("Called NewMember");
    $scope.newmember = $rootScope.newmember || {};
    console.log("New Member >> "+JSON.stringify($scope.newmember));

    $scope.newmember.sponserside = "L";
    
    // $scope.NEWmember.sponser_bluepay_id = 'BVPL85043726';
    // $scope.NEWmember.epin_number = 135888561453909;
    $scope.setType = function(type){
      console.log("Type > "+type);
      $scope.newmember.sponserside = type;
    }

    $scope.register_NEWmember = function(){
         $scope.msg ="";
        console.log(JSON.stringify($scope.newmember));       

        if($scope.newmember.sponser_bluepay_id == null || $scope.newmember.sponser_bluepay_id == ""){
            $scope.msg = 'Please enter sponser bluepay id';
            return;
        }

        if($scope.newmember.epin_number == null || $scope.newmember.epin_number == ""){
            $scope.msg = 'Please enter epin number';
            return;
        }
        if($scope.newmember.epin_number != null){
            if(isNaN($scope.newmember.epin_number)){
                $scope.msg = 'Please enter numeric value in epin number';
                return;       
            }
        }
        if($scope.newmember.name == null || $scope.newmember.name == ""){
            $scope.msg = 'Please enter name';
            return; 
        }
        if($scope.newmember.dob == null || $scope.newmember.dob == ""){
            $scope.msg = 'Please select dob';
            return; 
        }
        if($scope.newmember.dob != null || $scope.newmember.dob != ""){
            if($scope.newmember.dob>new Date()){
                $scope.msg = 'Please select valid dob';
                return;
            }
        }
        if($scope.newmember.gender == null || $scope.newmember.gender == ""){
            $scope.msg = 'Please select gender';
            return; 
        }
        if($scope.newmember.email_id == null || $scope.newmember.email_id == ""){
            $scope.msg = 'Please enter email id';
            return; 
        }
        if($scope.newmember.email_id != null){
            
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var flag = re.test($scope.newmember.email_id);
            if(flag == false){
                $scope.msg = "invalid email id (Ex : ABC@xyz.com )";
                 return;
            }
        }
        if($scope.newmember.phone == null || $scope.newmember.phone == ""){
            $scope.msg = "Enter mobile no";
            return;
        }
        if($scope.newmember.phone!=null){
            console.log("Len > "+($scope.newmember.phone.toString()).length)
            if(isNaN($scope.newmember.phone)){
                $scope.msg = "Enter numeric value in Phone no.";
                return;
            }
            if(($scope.newmember.phone.toString()).length != 10){
                console.log("reutnr bvac")
                $scope.msg = "10 digit required in phone no";
                return;
            }
        }
        $rootScope.newmember = $scope.newmember;
        $ionicLoading.show();
        MemberRegisterService.Register($scope.newmember).success(function(res){
            console.log("Success NEW Member Register >>> "+JSON.stringify(res));
            $ionicLoading.hide();
            //alert(JSON.stringify(res));
            $state.go('newmember_otp'); 
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
   


    $scope.newmember_otp_verification = function(){
        $ionicLoading.show();
        if($scope.newmember.otp == null || $scope.newmember.otp == ""){
            $scope.msg = "Please enter OTP ";
            return;
        }
        console.log("Start OTP verification @@@"+JSON.stringify($scope.newmember));
        $rootScope.newmember = $scope.newmember;
        MemberRegisterService.OTPVerification($scope.newmember).success(function(res){
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
