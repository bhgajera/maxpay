angular.module('starter.controllers')

// Home controller
.controller('productbysubcategoryCtrl', function($scope, $rootScope, Product,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams,CategoryService) {      
      //alert("you clicked all products CTRLLLLL");
    $rootScope.page_no = 1;
    //$scope.page_no= 1;
    $scope.productSubCategoryIds = $rootScope.pcid;
    $scope.ProductCategoryId  = $rootScope.p_cat_id
   // alert("ProductCategoryId"+$scope.ProductCategoryId);
    $rootScope.pcid = undefined;
    $scope.items=[];
    //alert("productbysubcategoryCtrl cat id........"+JSON.stringify($scope.ProductCategoryId));
    //alert("productbysubcategoryCtrl subcatIDS........"+JSON.stringify($scope.productSubCategoryIds));
    $scope.moreData = true;
    $scope.loadMore = function() {   
        setTimeout(function(){
           console.log("loadMore called  pro>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            console.log($rootScope.page_no);  
           // alert($scope.ProductCategoryId);
            //alert(JSON.stringify($scope.productSubCategoryIds));
            CategoryService.getAllProductsByCategory($scope.ProductCategoryId,$scope.productSubCategoryIds).success(function(response){
              console.log(JSON.stringify(response));  
              //alert(JSON.stringify(response.output[0].images));    
              if(response.code == 200 && response.error == false) {
                $scope.items = $scope.items.concat(response.output);            
                $rootScope.page_no = $rootScope.page_no+1;
                $scope.$broadcast('scroll.infiniteScrollComplete'); 
                if(response.next_page == false){
                  $scope.moreData = false;
                } 
              }
            }).error(function(err){          
             //alert(JSON.stringify(err)); 
              $scope.moreData = false;   
              $scope.msg = "Product does not exists";
          }); 
        },200)         
    };
    /*$scope.getSingleProduct = function(singleProduct){    
          
      $rootScope.singleProduct = singleProduct; 
      $scope.singleProduct = $rootScope.singleProduct;

      var singleProductImages = [      
      singleProduct.image1_850_1036,
      singleProduct.image1_100_122,
      singleProduct.image1_300_366,
      singleProduct.image1_260_317
      ]      
      //static dummy data for product detail
      //var singleProductImages=[
        //"img/detail/d_1.jpg", 
        //"img/detail/d_2.jpg",
        //"img/detail/d_3.jpg"
      //]
      
      $rootScope.singleProductImages=[];
      for(i=0; i<singleProductImages.length; i++){        
        $rootScope.singleProductImages.push(singleProductImages[i]);
      }      
      $state.go('detail');     
    } */ 
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