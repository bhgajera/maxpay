angular.module('starter.controllers')

// Home controller
.controller('CMSCtrl', function($scope, $rootScope,$cordovaInAppBrowser, CMSService,$sce, Product,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams) {      
    
  
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
    $scope.fetchCMS = function(){
      //$ionicLoading.show();

      CMSService.cms_data($stateParams.cms_type).success(function(res){
        console.log(JSON.stringify(res));
        $ionicLoading.hide();
        if($stateParams.cms_type == 'intro_video'){
           res.url = res.url.replace("watch?v=", "embed/");
          $scope.cms_data = res;
          console.log("New URL >> "+JSON.stringify($scope.cms_data));
        }
        else{
           $scope.cms_data = res;
           setTimeout(function(){
              $scope.$apply();
           })
        }
        //about_us privacy_policy terms_and_conditions  intro_video 
      }).error(function(err){
        console.log(JSON.stringify(err));
      })
    }

    $scope.fetchCMS();
    
})