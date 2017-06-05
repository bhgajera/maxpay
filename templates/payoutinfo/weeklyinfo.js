angular.module('starter.controllers')

// PayoutCtrl controller
.controller('WeeklypayoutCtrl', function($scope, $rootScope,$cordovaToast,PayoutinfoService, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$state, $stateParams) {      
  $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
    };
    $scope.hideLoading = function(){
      $ionicLoading.hide();
    };
    
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;

    $scope.page_no = 1;
    $scope.moreData = true;
    $scope.weeklyreports = [];
    $scope.showweeklyreports = function(){
    $scope.showLoading();      
      PayoutinfoService.weeklypayoutReport().success(function(res){
        $scope.hideLoading();        
          //$scope.$broadcast('scroll.infiniteScrollComplete');
        console.log("weeklyreports >> "+JSON.stringify(res));
        //alert(JSON.stringify(res));
        $scope.weeklyreports = $scope.weeklyreports.concat(res.output);
        /*$scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.page_no++;
        if(res.next_page == false){
          $scope.moreData = false;
        }*/
        
      }).error(function(err){ 
        $scope.hideLoading();         
        /*if(err.code==400 && err.error== true && err.message=="Orders doesnot Exist"){
          $cordovaToast.showShortBottom(err.message).then(function(success) {
                      //success
                      //$scope.moreData = false;                                       
          }, function (error) {
                    // error
          });
        }*/        
         $scope.msg = err.message; 
         $cordovaToast.showShortBottom(err.message).then(function(success) {
                      //success
                      //$scope.moreData = false;                                       
          }, function (error) {
                    // error
          });
      })

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
    
    }
    $scope.showweeklyreports();

    
})

/*$scope.output: [
    {
      "regno": "127402",
      "llpv": "0.0",
      "rpv": "0.0",
      "paidpv": "0.0",
      "pvincome": ".0000",
      "singleLegIncome": ".0000",
      "singleLegdeduction": ".0000",
      "LevelIncome": "1250.0000",
      "totalincome": "1250.0000",
      "LeadershipIncome": ".0000"
    },
    {
      "regno": "127402",
      "llpv": "0.0",
      "rpv": "0.0",
      "paidpv": "0.0",
      "pvincome": ".0000",
      "singleLegIncome": ".0000",
      "singleLegdeduction": ".0000",
      "LevelIncome": "2000.0000",
      "totalincome": "2000.0000",
      "LeadershipIncome": ".0000"
    }
]*/