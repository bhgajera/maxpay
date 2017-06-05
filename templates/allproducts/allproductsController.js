angular.module('starter.controllers')

// Home controller
.controller('allproductsCtrl', function($scope, $rootScope, Product,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams) {      
      //alert("you clicked all products CTRLLLLL");
       $rootScope.page_no = 1;
       //alert($rootScope.cartProducts.length);
       $scope.cartProductss = $rootScope.cartProducts || [];       
      // alert(JSON.stringify($scope.cartProductss)); 
       //$scope.page_no= 1;
      $scope.showLoading = function() {
        $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
      };
      $scope.hideLoading = function(){
         $ionicLoading.hide();
      };       
/*      Product.getAllProducts().success(function(response){
      //console.log("Controller >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      //console.log(JSON.stringify(response));       
      $scope.showLoading();
      if (response.code == 200 && response.error == false) { 
          $scope.hideLoading();
          $scope.product_master_id = response.output[0].product_master_id;
          //alert($scope.product_master_id);
          $scope.products = response.output; 
          alert("Server res length"+response.output.length);
          $rootScope.page_no= $rootScope.page_no+1;
          alert($rootScope.page_no);
      }
      }).error(function(err){
        console.log(err);
        alert(err);
        $scope.hideLoading();
        //alert("err");
    }); */
    $scope.items=[];
    $scope.moreData = true;      
    $scope.loadMore = function() {   
      //alert("loadMore called page no"+$rootScope.page_no);
        /*$scope.items.push({id: $scope.items.length});        
        if($scope.items.length==100)
        {
            $scope.moredata=true;
        }*/ 
        $scope.showLoading();
          console.log("loadMore called >>>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log($rootScope.page_no); 
          //alert(JSON.stringify($rootScope.cartProducts));
          Product.getAllProducts($rootScope.page_no).success(function(response){
            console.log(JSON.stringify(response));          
            if(response.code == 200 && response.error == false) {
              $scope.hideLoading();
              //$scope.items = response.output;
              //alert(JSON.stringify(response.output[0].images));
              $scope.items = $scope.items.concat(response.output);   
                       
              $rootScope.page_no = $rootScope.page_no+1;
              $scope.$broadcast('scroll.infiniteScrollComplete');

              if(response.next_page == false){
                $scope.moreData = false;
              }

              
            }
          }).error(function(err){          
           // alert(err);  
           $scope.hideLoading();
           $scope.moreData = false;
           $scope.msg = "Record does not Exists";
           $scope.$broadcast('scroll.infiniteScrollComplete');                 
        });          
    };
    
    
    /*$scope.getSingleProduct = function(singleProduct){
     
      //alert(JSON.stringify(singleProduct));      
      $rootScope.singleProduct = singleProduct; 
      $scope.singleProduct = $rootScope.singleProduct;   
    
      //var singleProductImages = [      
      //singleProduct.image1_850_1036,
      //singleProduct.image1_100_122,
      //singleProduct.image1_300_366,
      //singleProduct.image1_260_317
      //]
      
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