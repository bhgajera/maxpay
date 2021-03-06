angular.module('starter.controllers')

// Reload controller
.controller('reloadCardCtrl', function($scope,cardsService,$rootScope,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$state) {      
    console.log("Called reloadCardCtrl");
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
    $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct")) || [];
    $rootScope.cartReloadableCards =JSON.parse(localStorage.getItem("reloadablecard")) ||null;

    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $scope.showLoading = function() {
      $ionicLoading.show({ 
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
    };
    $scope.hideLoading = function(){
      $ionicLoading.hide();
    };    
    $scope.reloaddata={};
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
    $scope.items=[];
    $scope.getCardnumber = function(){
        $scope.showLoading()
            cardsService.getreloadYourcards().success(function(res){
                    $scope.hideLoading();
                    console.log("ReloadCard >> "+JSON.stringify(res));                    
                    $scope.items= res.output[0];
                    //alert(JSON.stringify($scope.items.card_no));
                    //alert(JSON.stringify(res.output[0].card_no));
            }).error(function(err){
                //alert(JSON.stringify(err));
                console.log("Error >> "+JSON.stringify(err));
            })
    }  
    $scope.getCardnumber()
    //dummy dropdown data
    /*$scope.items=[
                    {"id":1,"name":"Card1"},
                    {"id":2,"name":"Card2"}                
                ]*/
    $scope.calculatePv = function(rechargval){
              
         var pv = (rechargval*0.15)/10;
         $scope.reloaddata.pv =pv;
          //alert($scope.reload.pv);
    }
    $scope.selectedCard = function(selectedcard){
        //alert("selectedCard"+selectedcard);
    }
        
        $scope.reloadCard = function(reloaddata){
        //alert(reload.card);
            
            if($scope.reloaddata.card=='' || $scope.reloaddata.card ==undefined || $scope.reloaddata.card == null){
                $cordovaToast.showShortBottom("Please Select Card").then(function(success) {
                //on success 
                }, function (error) {
                    // error
                });
                return;
            }
            if($scope.reloaddata.rechargevalue=='' || $scope.reloaddata.rechargevalue ==undefined || $scope.reloaddata.rechargevalue == null){
                $cordovaToast.showShortBottom("Please Enter Recharge value").then(function(success) {
                //on success 
                }, function (error) {
                    // error
                });
                return;
            }
            if($scope.reloaddata.rechargevalue<3000 || $scope.reloaddata.rechargevalue>20000){
                $cordovaToast.showShortBottom("Enter Recharge Amount between 3000 to 20000").then(function(success) {
                //on success 
                }, function (error) {
                    // error
                });
                return;
            }
            if($rootScope.cartProducts.length>0){ //if product in cart 
                $cordovaToast.showShortBottom("You cannot buy any other product with reload.Please make a fresh purchase for other products").then(function(success) {
                //on success                 
                }, function (error) {
                    // error
                });
                return;  
            } 
            if($rootScope.cartReloadableCards!=null){ //if cart contains any other card
                        $cordovaToast.showShortBottom("You cannot buy anyother product with the reload card . Please make a fresh purchase for other products").then(function(success) {
                        //on success                      
                        //$state.go('checkout_address');
                        return;
                        }, function (error) {
                            // error
                        });
            }                   
            else{
                //alert("suuccess");
                /*$cordovaToast.showShortBottom("call Api").then(function(success) {
                //on success                 
                }, function (error) {
                    // error
                }); */
                if($rootScope.cartReloadableCards==null){                        
                 //alert("Successfully Added to cart");  
                localStorage.setItem("reloadablecard",JSON.stringify($scope.reloaddata));
                $rootScope.cartReloadableCards =localStorage.getItem("reloadablecard");                
                $cordovaToast.showShortBottom("Buy Now").then(function(success) {
                //on success                      
                $state.go('checkout_address');
                }, function (error) {
                    // error
                });
               // return;
                }
            }
                                            
                         
        } 
})