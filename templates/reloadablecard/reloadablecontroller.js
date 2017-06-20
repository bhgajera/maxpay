angular.module('starter.controllers')

// Reload controller
.controller('reloadableCtrl', function($scope, $rootScope,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$state,cardsService) {      
    console.log("Called reloadableCtrl");    
    $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct")) || [];
    $rootScope.cartReloadableCards =JSON.parse(localStorage.getItem("reloadablecard")) ||null;  
    $scope.showLoading = function() {
      $ionicLoading.show({ 
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
    };
    $scope.hideLoading = function(){
      $ionicLoading.hide();
    };    
    $scope.reloadabledata={};
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;

    $scope.showLoading();
    cardsService.get_yesbank_card(56).success(function(res){
         $scope.hideLoading();
      $scope.yescards = res;
      console.log("yes card");
      console.log($scope.yescards);
    }).error(function(err){
        $scope.hideLoading(); 
      alert(JSON.stringify(err));
    })

    $scope.reloadablePv = function(rechargval){              
         var pv = (rechargval*0.15)/10;
         $scope.reloadabledata.pv =pv;
          //alert($scope.reload.pv);
    }

    $scope.reloadableCardBuy = function(reloadabledata){
            if($scope.reloadabledata.rechargevalue=='' || $scope.reloadabledata.rechargevalue ==undefined || $scope.reloadabledata.rechargevalue == null){
                $cordovaToast.showShortBottom("Please Enter Recharge value").then(function(success) {
                //on success 
                }, function (error) {
                    // error
                });
                return;
            }
            if($scope.reloadabledata.rechargevalue<3000 || $scope.reloadabledata.rechargevalue>19990){
                $cordovaToast.showShortBottom("Enter Recharge Amount between 3000 to 19990").then(function(success) {
                //on success 
                }, function (error) {
                    // error
                });
                return;
            }      

            if (!$scope.yescards.output.product_sell_status)
            {
                var errormsg = $scope.yescards.output.product_status || "We are out of stock for this product. Inconvenience Regretted";
                alert(errormsg);
                return false;
            }


            if($rootScope.cartProducts.length>0){ //if product in cart 
                $cordovaToast.showShortBottom("You cannot buy any other product with card.Please make a fresh purchase for other products").then(function(success) {
                //on success                 
                }, function (error) {
                    // error
                });
                return;  
            }             
            if($rootScope.cartReloadableCards!=null){
                if($rootScope.cartReloadableCards.rechargevalue>1990){
                    $cordovaToast.showShortBottom("You cannot buy any other product with card.Please make a fresh purchase for other products").then(function(success) {
                    //on success                 
                    }, function (error) {
                        // error
                    });
                    return;
                }               
            }
            if($rootScope.cartReloadableCards==null){
                 //alert("Successfully Added to cart");  
                localStorage.setItem("reloadablecard",JSON.stringify(reloadabledata));
                $rootScope.cartReloadableCards = localStorage.getItem("reloadablecard");   
                $cordovaToast.showShortBottom("Successfully Added to cart").then(function(success) {
                //on success  
                //$state.go("cart");
                }, function (error) {
                    // error
                });
               // return;
            }  
    }
})



.controller('reloadablehdfcCtrl', function($scope, $rootScope,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$state,cardsService) {      
    console.log("Called hdfccard");    
    $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct")) || [];
    $rootScope.cartReloadableCards =JSON.parse(localStorage.getItem("reloadablecard")) ||null;  
    //alert($rootScope.cartReloadableCards);
    //alert("reloadableCtrl");
    $scope.showLoading = function() {
      $ionicLoading.show({ 
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
    };
    $scope.hideLoading = function(){
      $ionicLoading.hide();
    };    
    $scope.reloadabledata={};
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;

    $scope.showLoading();
    cardsService.get_hdfc_card(1452).success(function(res){
         $scope.hideLoading();
      $scope.hdfccards = res;
      console.log("hdfc card");
      console.log($scope.hdfccards);
    }).error(function(err){
        $scope.hideLoading(); 
        alert(JSON.stringify(err));
    })

    $scope.reloadablePv = function(rechargval){              
         var pv = (rechargval*0.15)/10;
         $scope.reloadabledata.pv =pv;
          //alert($scope.reload.pv);
    }

    $scope.reloadableCardBuy = function(reloadabledata){
            if($scope.reloadabledata.rechargevalue=='' || $scope.reloadabledata.rechargevalue ==undefined || $scope.reloadabledata.rechargevalue == null){
                $cordovaToast.showShortBottom("Please Enter Recharge value").then(function(success) {
                //on success 
                }, function (error) {
                    // error
                });
                return;
            }
            if($scope.reloadabledata.rechargevalue<3000 || $scope.reloadabledata.rechargevalue>19990){
                $cordovaToast.showShortBottom("Enter Recharge Amount between 3000 to 19990").then(function(success) {
                //on success 
                }, function (error) {
                    // error
                });
                return;
            }      

            if (!$scope.yescards.output.product_sell_status)
            {
                var errormsg = $scope.yescards.output.product_status || "We are out of stock for this product. Inconvenience Regretted";
                alert(errormsg);
                return false;
            }


            if($rootScope.cartProducts.length>0){ //if product in cart 
                $cordovaToast.showShortBottom("You cannot buy any other product with card.Please make a fresh purchase for other products").then(function(success) {
                //on success                 
                }, function (error) {
                    // error
                });
                return;  
            }             
            if($rootScope.cartReloadableCards!=null){
                if($rootScope.cartReloadableCards.rechargevalue>1990){
                    $cordovaToast.showShortBottom("You cannot buy any other product with card.Please make a fresh purchase for other products").then(function(success) {
                    //on success                 
                    }, function (error) {
                        // error
                    });
                    return;
                }               
            }

            

            if($rootScope.cartReloadableCards==null){
                 //alert("Successfully Added to cart");  
                localStorage.setItem("reloadablecard",JSON.stringify(reloadabledata));
                $rootScope.cartReloadableCards = localStorage.getItem("reloadablecard");   
                $cordovaToast.showShortBottom("Successfully Added to cart").then(function(success) {
                //on success  
                //$state.go("cart");
                }, function (error) {
                    // error
                });
               // return;
            }  
    }
})