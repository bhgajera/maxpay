app = angular.module('starter.controllers')

// Home controller
.controller('BuyProductCtrl', function($scope, $rootScope,$ionicLoading,OrderService, Product,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams) {      
    root =$rootScope;
    console.log("Called Buy Product");
    $scope.showLoading = function() {
        $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner></ion-spinner>'
        });
    };
    $scope.hideLoading = function(){
        $ionicLoading.hide();
    };    

    //$rootScope.orderProduct = JSON.parse(localStorage.getItem('orderProductList')) || [];
    //console.log("orderProduct >> "+JSON.stringify($rootScope.orderProduct));
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
    $scope.page_no = 1;
    $scope.moreData = true;  
    $rootScope.buyProduct = [];
$scope.getOrderHistory = function(){
        $scope.showLoading();
    	OrderService.getOrderHistory($scope.page_no,$rootScope.userData.rolecode).success(function(response){
			$scope.hideLoading();
            //alert(JSON.stringify(response.output[0].order_date));            
            console.log("Order Hiistory >>> "+JSON.stringify(response));
			$scope.page_no++;
			$rootScope.buyProduct = $rootScope.buyProduct.concat(response.output);            
			$scope.$broadcast('scroll.infiniteScrollComplete');
          	if(response.next_page == false){
            	$scope.moreData = false;
          	}
            //alert(JSON.stringify($scope.buyProduct));
    	}).error(function(err){
            $scope.hideLoading();
    		console.log(JSON.stringify(err));
    		if(err.code == 400 & err.message == 'Orders doesnot Exist'){
    			$scope.moreData = false;
    		}
    		$scope.msg = err.message; 
    	}) 
        var len= $rootScope.buyProduct.length;             
            $scope.groups = [];       
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
    $scope.getOrderHistory();    
})



.controller('BuyProductDetailCtrl', function($scope, $rootScope,$ionicLoading,OrderService, Product,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams) {      
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
    root = $rootScope;
    scope = $scope;
    
    console.log($stateParams);
    $scope.myOrder = $rootScope.buyProduct[$stateParams.index] || [];
    
    
   	        
   	console.log($rootScope.buyProduct);    
   	        
   	    
    console.log( $scope.myOrder);
})


.controller('BuyProductTrackCtrl', function($scope, $rootScope,$ionicLoading,OrderService, Product,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$rootScope,$state, $stateParams) {      
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
    root = $rootScope;
    scope = $scope;
    
    console.log($stateParams);
    $scope.myOrder = $rootScope.buyProduct[$stateParams.index] || [];
    
    
   	        
   	console.log($rootScope.buyProduct);    
   	        
   	    
    console.log( $scope.myOrder);
})
