angular.module('starter.controllers')

// controller
.controller('epinCtrl', function($scope, $rootScope,$cordovaClipboard, $cordovaInAppBrowser,EpinService, $cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$state, $stateParams) {      
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
    $scope.epins = [];
    //dummy data
    /*$scope.epins= [
      {
          "EpinNumber": "790367415269446",
          "created_date": "03-02-2017 04:22pm",
          "used_by": "",
          "sold_date": ""
      },
      {
          "EpinNumber": "932835606696700",
          "created_date": "03-02-2017 04:22pm",
          "used_by": "",
          "sold_date": ""
      },
      {
          "EpinNumber": "549399503759620",
          "created_date": "03-02-2017 04:22pm",
          "used_by": "",
          "sold_date": ""
      }
    ];*/
    $scope.copyEpinNo = function(epinNo){

      $cordovaClipboard
        .copy(epinNo)
        .then(function () {
          // success
          //alert("success"+epinNo);
          $cordovaToast.showShortBottom("Copied to clipboard").then(function(success) {
                      //success
                      //$scope.moreData = false;                                       
          }, function (error) {
                    // error
          });
        }, function () {
          // error
          $cordovaToast.showShortBottom("Error while copying to clipboard").then(function(success) {
                      //success
                      //$scope.moreData = false;                                       
          }, function (error) {
                    // error
          });
        });

      $cordovaClipboard
        .paste()
        .then(function (result) {
          // success, use result
          //alert(result);
        }, function () {
          // error
          //alert("err in paste");
        });
    }

    $scope.showepins = function(){  
      
    $scope.showLoading();      
      EpinService.epinlist().success(function(res){
        $scope.hideLoading();        
          //$scope.$broadcast('scroll.infiniteScrollComplete');
        console.log("epins >> "+JSON.stringify(res));
        $scope.epins = $scope.epins.concat(res.output);
       // $scope.$broadcast('scroll.infiniteScrollComplete');
        //$scope.page_no++;
        //if(res.next_page == false){
          //$scope.moreData = false;
        //}
        
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
    }
    $scope.showepins();

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