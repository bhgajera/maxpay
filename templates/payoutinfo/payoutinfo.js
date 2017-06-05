angular.module('starter.controllers')

// PayoutCtrl controller
.controller('PayoutCtrl', function($scope, $rootScope,$cordovaToast,PayoutinfoService, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$state, $stateParams) {      
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
    $scope.dailyreports = [];
    $scope.showdailyreports = function(){
    $scope.showLoading();      
      PayoutinfoService.dailypayoutReport().success(function(res){
        $scope.hideLoading();        
          //$scope.$broadcast('scroll.infiniteScrollComplete');
        console.log("dailyreports>>> "+JSON.stringify(res));
        //alert(JSON.stringify(res.output[0]));
        $scope.dailyreports = $scope.dailyreports.concat(res.output);
        /*$scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.page_no++;
        if(res.next_page == false){
          $scope.moreData = false;
        }*/
        
      }).error(function(err){ 
        $scope.hideLoading();         
        if(err.code==400 && err.error== true && err.message=="Orders doesnot Exist"){
          $cordovaToast.showShortBottom(err.message).then(function(success) {
                      //success
                      //$scope.moreData = false;                                       
          }, function (error) {
                    // error
          });
        }        
         $scope.msg = err.message; 
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
    $scope.showdailyreports();

    
})