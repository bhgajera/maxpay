angular.module('starter.controllers')

.controller('nonreloadableCtrl', function($scope, $rootScope,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$state) {      
    console.log("Called reloadableCtrl");
    $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct")) || [];
    $rootScope.cartReloadableCards =JSON.parse(localStorage.getItem("reloadablecard")) ||null;
    //alert(JSON.stringify($rootScope.cartReloadableCards));
    //alert("reloadableCtrl");
    $scope.showLoading = function() {
      $ionicLoading.show({ 
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
    };
    $scope.hideLoading = function(){
      $ionicLoading.hide();
    };    
    $scope.nonreloadabledata={};
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;    
    $scope.nonreloadablePv = function(rechargval){              
         var pv = (rechargval*0.15)/10;
         $scope.nonreloadabledata.pv =pv;
          //alert($scope.reload.pv);
    }    
        
        $scope.reloadableCardBuy = function(nonreloadabledata){
        //alert(reload.card);
            if($scope.nonreloadabledata.rechargevalue=='' || $scope.nonreloadabledata.rechargevalue ==undefined || $scope.nonreloadabledata.rechargevalue == null){
                $cordovaToast.showShortBottom("Please Enter Recharge value").then(function(success) {
                //on success 
                }, function (error) {
                    // error
                });
                return;
            }
            if($scope.nonreloadabledata.rechargevalue<20000 || $scope.nonreloadabledata.rechargevalue>49990){
                $cordovaToast.showShortBottom("Enter Recharge Amount between 20,000 to 49,990").then(function(success) {
                //on success 
                }, function (error) {
                    // error
                });
                return;
            }                                    
            /*$cordovaToast.showShortBottom("call Api").then(function(success) {
                //on success 
                }, function (error) {
                    // error
            }); */               
            if($rootScope.cartProducts.length>0){ //if product in cart 
                $cordovaToast.showShortBottom("You cannot buy any other product with card.Please make a fresh purchase for other products").then(function(success) {
                //on success                 
                }, function (error) {
                    // error
                });
                return; 
            }             
            if($rootScope.cartReloadableCards!=null){
                if($rootScope.cartReloadableCards.rechargevalue<20000){
                    $cordovaToast.showShortBottom("You cannot buy any other product with card.Please make a fresh purchase for other products").then(function(success) {
                    //on success                 
                    }, function (error) {
                        // error
                    });
                    return;
                }
            }
            if($rootScope.cartReloadableCards == null){
                //alert("Successfully Added to cart");
                localStorage.setItem("reloadablecard",JSON.stringify(nonreloadabledata));
                $rootScope.cartReloadableCards =localStorage.getItem("reloadablecard"); 
                $cordovaToast.showShortBottom("Successfully Added to cart").then(function(success) {
                //on success     
                //$state.go('cart');            
                }, function (error) {
                    // error
                });
                //return;
            } 
        }
    /*
    $scope.viewProfile = function(){
        ViewProfileService.reloadcardApi().success(function(res){
            console.log("ReloadCard >> "+JSON.stringify(res));
            $scope.reCardData = res.output;
        }).error(function(err){
            console.log("Error >> "+JSON.stringify(err));
        })
        
    }    
   */
})