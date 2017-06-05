angular.module('starter.controllers')

// Home controller
.controller('cardsCtrl', function($scope, $rootScope ,$cordovaToast,cardsService, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$state, $stateParams) {      
  $scope.cards=[];

  $scope.getcards= function(){    
    cardsService.getProfitcards().success(function(res){
      //alert(JSON.stringify(res));      
      $scope.cards = $scope.cards.concat(res.output);
    }).error(function(err){
      alert(JSON.stringify(err));
    })
  }
  $scope.getcards();  
  $scope.getSingleProduct = function(singleProduct){
     
      //alert(JSON.stringify(singleProduct));      
      $rootScope.singleProduct = singleProduct; 
      $scope.singleProduct = $rootScope.singleProduct     
     /*var singleProductImages = [
      singleProduct.image1_850_1036,
      singleProduct.image2_850_1036,
      singleProduct.image3_850_1036
      ]*/
      var singleProductImages = [      
      singleProduct.image1_850_1036, //only this image is available 
      singleProduct.image1_100_122, //404
      singleProduct.image1_300_366, //404
      singleProduct.image1_260_317 //404
      ]
      
      //static dummy data for product detail
      /*var singleProductImages=[
        "img/detail/d_1.jpg", 
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ]
      */
      //alert(JSON.stringify($scope.singleProductImages));
      $rootScope.singleProductImages=[];
      for(i=0; i<singleProductImages.length; i++){        
        $rootScope.singleProductImages.push(singleProductImages[i]);
      }
      
      $state.go('detail');
      //alert(JSON.stringify($rootScope.singleProductImages));
    }
})