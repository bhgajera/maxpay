angular.module('starter.controllers')

.controller('wishListCtrl', function($scope, $rootScope, WishListService,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams) {
	console.log("Wish List");



	$scope.moreData = true;
	$scope.wishList=[];
	
	$scope.page_no = 1;
	$scope.getWishList = function(){
		WishListService.getWishList($scope.page_no).success(function(res){
			
			$scope.$broadcast('scroll.infiniteScrollComplete');
			console.log("WISH LIST  >> "+JSON.stringify(res));
			$scope.wishList = $scope.wishList.concat(res.output);

			if(res.next_page == false){
				$scope.moreData = false;
			}
		}).error(function(err){	
			$cordovaToast.showShortCenter(JSON.stringify(err)).then(function(success) {
                  //on success             
	        }, function (error) {
	            // error
	        });		
			console.log("ERR >> "+JSON.stringify(err));
			$scope.moreData = false;
			$scope.msg = "Record Not Found";
			$scope.$broadcast('scroll.infiniteScrollComplete');
		})
	}
	

	$scope.wishDetails = function(data){
		$rootScope.singleProductImages = [data.image1_850_1036, data.image2_850_1036, data.image3_850_1036];
		$rootScope.singleProduct = data;

		$state.go('detail');
	}

	// $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct"));
	// $scope.addToCart = function (product){    
	//     if(($rootScope.cartProducts).length > 0){
	//       if(myIndexOf(product) == -1){ 
	//           $rootScope.cartProducts.push(product);
	//           localStorage.setItem("addToCardProduct",JSON.stringify($rootScope.cartProducts));
	//           $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct"));
	//       } 
	//       else{
	//         alert("ALREADY added to cart");
	//       }   
	//     }
	//     else{
	//       $rootScope.cartProducts.push(product);
	//       localStorage.setItem("addToCardProduct",JSON.stringify($rootScope.cartProducts));
	//       $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct"));
	     
	//     }  
	//  }

	// $scope.removeToWishList = function(product){
	// 	console.log("Remove Start");
	// 	$ionicLoading.show();
	// 	WishListService.removeWishList(product).success(function(res){
	// 		console.log("RES  > "+JSON.stringify(res));
	// 		$ionicLoading.hide();
	// 		$scope.page_no = 1;
	// 		$scope.getWishList();
			
	// 		$scope.wishList.splice($scope.wishList.product_master_id,1);
	// 		$state.go('wishList');
	// 		$cordovaToast.showShortBottom(res.output.message);
	// 	}).error(function(err){
	// 		$ionicLoading.hide();
	// 		console.log("ERROR > "+JSON.stringify(err));
	// 		$cordovaToast.showShortBottom(res.output.message);
	// 	})
	// }
})