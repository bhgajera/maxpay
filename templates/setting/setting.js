angular.module('starter.controllers')

// Home controller
.controller('settingCtrl', function($scope, $rootScope,WalletService,$ionicSideMenuDelegate,Product,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams,$timeout) {
    scope = $scope;
    console.log("Called Setting");

    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
    console.log("user Data >> "+JSON.stringify($rootScope.userData));
    $scope.getWallet = function(){
      //$ionicLoading.show();        
      WalletService.getWallet().success(function(res){
        $ionicLoading.hide();
        console.log("Wallet >> "+JSON.stringify(res));
        $scope.userWallet = res.output;
        $scope.wallettotal = (parseFloat(res.output.wallet_amount)).toFixed(2);
        ///$ionicSideMenuDelegate.toggleLeft();                  
      }).error(function(err){
        console.log(JSON.stringify(err));
      })
    }
 
    $scope.page_no = 1;
    $scope.moreData = true;       
    $scope.wallet_statement = [];
    $scope.getWalletStatement = function(){
      WalletService.getWalletStatement($scope.page_no).success(function(res){
        $scope.$broadcast('scroll.infiniteScrollComplete');
        console.log("Wallet Statement >> "+JSON.stringify(res));
        //alert(JSON.stringify(res.output));
        $scope.wallet_statement = $scope.wallet_statement.concat(res.output);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.page_no++;
        if(res.next_page == false){
          $scope.moreData = false;
        }


      }).error(function(err){

        console.log(JSON.stringify(err));
        if(err.code == 400 && err.message == 'Records Not Exists'){
          $scope.moreData = false;
        }
        $scope.msg = err.message; 
      })
    }
    
    if($rootScope.userData!=null){
      if($rootScope.userData.rolecode != null){$scope.getWallet();}
    }

     $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };

            })
