angular.module('starter.controllers')

// Home controller
.controller('searchCtrl', function($scope, $rootScope,SearchProductService, Product,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams) {      
    console.log("Called searchCtrl");    
    $scope.showLoading = function() {
        $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
    };
    $scope.hideLoading = function(){
         $ionicLoading.hide();
    };   

    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;

    $scope.moreSearch = true;
    $scope.searchPage = 1;
    
    $scope.searchProductData = [];     
    $scope.searchData = function(){
      /*setTimeout(function(){*/
          console.log("TExt > "+$rootScope.searchTxt);
          //alert("rootScopesearchtxt@@@@@@"+$rootScope.searchTxt);
          $scope.showLoading();
          SearchProductService.searchProduct($rootScope.searchTxt,$scope.searchPage).success(function(res){
            console.log("RES >> "+JSON.stringify(res));
            $rootScope.searchTxt = "";
            $scope.searchTxt ="";
            $scope.hideLoading();
            //alert(JSON.stringify(res.output));
            //alert("$scope.searchProductData !!!!!!BEFORE CONCAT"+JSON.stringify($scope.searchProductData.length));
            $scope.searchProductData = $scope.searchProductData.concat(res.output);
            $scope.searchPage++;
            //alert("$scope.searchProductData !!!!!!AFTER CONCAT"+JSON.stringify($scope.searchProductData.length));
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if(res.next_page == false){
              $scope.moreSearch = false;
            }
          }).error(function(err){
            $scope.moreSearch = false;
            $scope.hideLoading();
            console.log("ERR > "+JSON.stringify(err))
            $scope.msg = "Search Result not found"
            //alert(JSON.stringify(err));
          });
       /* },200)  */
    }   

    /*$scope.getSingleProduct = function(product)
        {        
         $rootScope.singleProduct = product;    
        //$rootScope.singleProductImages = [product.image1_850_1036, product.image2_850_1036, product.image3_850_1036];
        $rootScope.singleProductImages = [product.image1_850_1036, product.image1_100_122, product.image1_300_366, product.image1_260_317];
       
        $state.go('detail');
    }*/
    $scope.getSingleProduct = function(product){
    $rootScope.singleProductImages=[];
    //alert(JSON.stringify(product.images));
    if(product.images.image_1!='' && product.images.image_1!=null && product.images.image_1!=undefined){
      $rootScope.singleProductImages.push(product.images.image_1);
      //alert(JSON.stringify($rootScope.singleProductImages));
    }
    if(product.images.image_2!='' && product.images.image_2!=null && product.images.image_2!=undefined){
      $rootScope.singleProductImages.push(product.images.image_2);
      //alert(JSON.stringify($rootScope.singleProductImages));
    }
    if(product.images.image_3!='' && product.images.image_3!=null && product.images.image_3!=undefined){
      $rootScope.singleProductImages.push(product.images.image_3);
      //alert(JSON.stringify($rootScope.singleProductImages));
    }
    if(product.images.image_4!='' && product.images.image_4!=null && product.images.image_4!=undefined){
      $rootScope.singleProductImages.push(product.images.image_4);
      //alert(JSON.stringify($rootScope.singleProductImages));
    }
    //$rootScope.singleProductImages = [product.images.image_1];
    $rootScope.singleProduct = product;
    //alert(JSON.stringify($rootScope.singleProductImages));
    $state.go('detail');
  }  
   
})