// categoryCtrl.js
angular.module('starter.controllers')
.controller('CategoryCtrl', function($scope,$rootScope, Product,CategoryService,$stateParams,$state, $ionicLoading) {    
				
	console.log("Category Called >>> "+$stateParams.product_id);
	$scope.showLoading = function() {
        $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
    };
    $scope.hideLoading = function(){
        $ionicLoading.hide();
    };
	$scope.page_no = 1;
	$scope.moreData = true;
	$scope.product = [];
	$scope.fetch_category_product = function(){
	  $scope.showLoading();
	   CategoryService.getProductByCategory($stateParams.product_id,$scope.page_no).success(function(res){
	    	console.log("RES > "+JSON.stringify(res));
	    	//alert(JSON.stringify(res));
	    	$scope.hideLoading();
	    	$scope.product = $scope.product.concat(res.output);
	    	$scope.page_no++;
	    	$scope.$broadcast('scroll.infiniteScrollComplete');
	    	if(res.next_page == false){
	    		$scope.moreData = false;
	    	}
		}).error(function(err){
			$scope.hideLoading();
			//alert(JSON.stringify(err));
	    	console.log("ER > "+JSON.stringify(err));
	    	$scope.moreData = false;
	    	$scope.$broadcast('scroll.infiniteScrollComplete');
	    	if(err.code == 400 && err.error == true && err.message!==null){
	    		$scope.msg = err.message;
	    	}
	    })
	}

	/*$scope.getSingleProduct = function(product){
		$rootScope.singleProductImages = [product.image1_850_1036, product.image2_850_1036, product.image3_850_1036];
		$rootScope.singleProduct = product;
		//alert(JSON.stringify(product));
		$state.go('detail');
	}*/

	//single product NEW Images	
	$scope.getSingleProduct = function(product){
		$rootScope.singleProductImages=[];
		//alert(JSON.stringify(product.images));

		if (typeof product.images != "undefined")
		{
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
		}

		
		//$rootScope.singleProductImages = [product.images.image_1];
		$rootScope.singleProduct = product;
		//alert(JSON.stringify($rootScope.singleProductImages));
		$state.go('detail');
	}


})
