angular.module('starter.controllers')
.controller('checkoutCtrl', function($scope,$rootScope,$ionicHistory,$cordovaToast,$state,Product,CheckoutService) {
  console.log("called Checkout Controller");

  $scope.shipping={};
  // $scope.checkoutChoice = 'free';
  $scope.address = $rootScope.address || {};
  $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
  $scope.checkoutProduct = $rootScope.checkoutProduct;  


  $rootScope.orderProduct = JSON.parse(localStorage.getItem('orderProductList')) || [];
  console.log("orderProduct >> "+JSON.stringify($rootScope.orderProduct));


    $scope.checkoutCart =  function(product){
      $rootScope.checkoutProduct = product;
      console.log("Check Out Product length >> "+ $rootScope.checkoutProduct.length);
      $ionicHistory.clearCache().then(function(){ 
        $state.go('checkout_address') 
      });         
    }
    //checkout as options 
    /*$scope.defaultcheckoutas = function(){
    //$scope.setcheckoutasChoice('member');    
    $scope.checkoutasChoice = 'guest'
    //alert($scope.checkoutasChoice);
    }*/
    $scope.setcheckoutasChoice = function(chk_outas){
      //alert(chk_outas);
      $scope.checkoutasChoice = chk_outas
    }
  //console.log("product Data >>> "+JSON.stringify($stateParam.checkoutProduct));
  //console.log("Scope >>>"+JSON.stringify($scope.checkoutProduct));

  // for(var i=0; i<$scope.checkoutProduct.length; i++){
  //   console.log("Product >> "+JSON.stringify($scope.checkoutProduct[i]));
  // }
  $scope.defaultSet = function(){
    $scope.checkoutChoice = 'free';
  }

  $scope.setChoice =  function(choice){
    console.log("Choice > "+choice);
    $scope.checkoutChoice = choice;
  }


  console.log("User Data > "+JSON.stringify($rootScope.userData));
  if($rootScope.userData == null ){

     $scope.address = $rootScope.address || {};
  }
  else{
    $rootScope.userData.name
    //alert("ADDRESS"+JSON.stringify($rootScope.userData.name));
    $scope.address = { 
      // firstName:$rootScope.userData.name,
      firstName:($rootScope.userData.name != "")?$rootScope.userData.name.replace("&nbsp;", "") : null,
      email:$rootScope.userData.email_id,
      address:($rootScope.userData.address != "")?$rootScope.userData.address.trim() : null,
      state:($rootScope.userData.state != " ")?$rootScope.userData.state.trim() : null,
      city:($rootScope.userData.city != " ")?$rootScope.userData.city.trim() : null,
      zip:($rootScope.userData.zip != " ")?$rootScope.userData.zip.trim() : null,
      mobileno:$rootScope.userData.mobile_no.trim()
    }
  }
  var billingAdd = localStorage.getItem('billingAdd');

   if(billingAdd != null ){
      $scope.address =  JSON.parse(billingAdd);
   }  
   var shippingAdd = localStorage.getItem('shippingAdd');
   if(shippingAdd != null ) {
      $scope.shipping =  JSON.parse(shippingAdd);
   }
  $scope.copyAddress = function(){
    var copyAddress =  $scope.shipping.copyAddress;
        var billingAdd = localStorage.getItem('billingAdd');
       if(billingAdd != null ){
          $scope.shipping =  JSON.parse(billingAdd);
       }  
    $scope.shipping.copyAddress = copyAddress; 
      
  }
  $scope.checkout_shipping = function(){
    $rootScope.address = $scope.address;
    //alert(JSON.stringify("ADDRESS"+JSON.stringify($rootScope.address)));
    //alert(JSON.stringify("USER DATA"+$rootScope.userData));
    // console.log("Address  >> "+JSON.stringify($rootScope.address));
    if($scope.address.firstName == null || $scope.address.firstName == ""){
      $scope.msg = "Enter First Name";
      $scope.cls = "error-cls";
      return;
    }
    if($scope.address.lastName == null || $scope.address.lastName == ""){
      $scope.msg = "Enter Last Name";
      $scope.cls = "error-cls";
      return;
    }
   if($scope.address.mobileno == null || $scope.address.mobileno == ""){
      $scope.msg = "Enter mobile number";
      $scope.cls = "error-cls";
      return;
    }
   if($scope.address.mobileno != null){
      if(isNaN($scope.address.mobileno)){
        $scope.msg = "Enter Numeric value in number";
        $scope.cls = "error-cls";
        return;
      }
      else{
        if($scope.address.mobileno.length != 10){
          $scope.msg = "The Mobile  needs to be exactly 10 digits in length";
          $scope.cls = "error-cls";
          return;
        }
        else{
          var mobile =  $scope.address.mobileno.toString();
          if(mobile.charAt(0) == 1 || mobile.charAt(0) == 2 || mobile.charAt(0) == 3 || mobile.charAt(0) == 4 || mobile.charAt(0) == 5 || mobile.charAt(0) == 6 || mobile.charAt(0) == 0 ){     
            $scope.cls = "error-cls";
            $scope.msg = 'Mobile Number May Only Start With 7,8 OR 9!';
            return;
          }
        }
      }
    }
    // else if($scope.address.email == null || $scope.address.email == ""){
    //   $scope.msg = "Enter First Name");
    //   return;
    // }
    if($scope.address.address == null || $scope.address.address == ""){
      $scope.msg = "Enter address";
      $scope.cls = "error-cls";
      return;
    }
    if($scope.address.country == null || $scope.address.country == ""){
      $scope.msg = "Enter country";
      $scope.cls = "error-cls";
      return;
    }
    if($scope.address.state == null || $scope.address.state == ""){
      $scope.msg = "Enter state";
      $scope.cls = "error-cls";
      return;
    }   
    if($scope.address.city == null || $scope.address.city == ""){
      $scope.msg = "Enter City";
      $scope.cls = "error-cls";
      return;
    }
    if($scope.address.area == null || $scope.address.area == ""){
      $scope.msg = "Enter Area";
      $scope.cls = "error-cls";
      return;
    }
    if($scope.address.zip != null){
      if(isNaN($scope.address.zip)){
        $scope.msg = "Enter Numeric value in Zip";
        $scope.cls = "error-cls";
        return;
      }
      else{
        if($scope.address.zip.length != 6){
          $scope.msg = "The Pincode  needs to be exactly 6 digits in length";
          $scope.cls = "error-cls";
          return;
        }
      }
    }
    if($scope.address.comment == null || $scope.address.comment == ""){
      $scope.msg = "Enter comment";
      $scope.cls = "error-cls";
      return;
    }
    if($scope.address.landmark == null || $scope.address.landmark == ""){
      $scope.msg = "Enter landmark";
      $scope.cls = "error-cls";
      return;
    }
    if($scope.address.company == null || $scope.address.company == ""){
      $scope.msg = "Enter company";
      $scope.cls = "error-cls";
      return;
    }
        
        $scope.msg="";       
        $rootScope.address = $scope.address;
        localStorage.setItem('billingAdd',JSON.stringify($rootScope.address));
      //alert("root"+JSON.stringify($rootScope.address));      
      // console.log("Address >>> "+JSON.stringify($rootScope.address));
      // console.log("Product >>> "+JSON.stringify($scope.checkoutProduct));
      $rootScope.checkoutChoice = $scope.checkoutChoice;
      // CheckoutService.checkoutProduct($rootScope.address,$scope.checkoutProduct).success(function(res){

      // });
      $state.go('checkout_shipping');      
  }

  $scope.confirmCheckout = function(){

    console.log("confirm Checkout ");
    // console.log("Address >> "+JSON.stringify($rootScope.address));
    // console.log("checkout Choice > "+$rootScope.checkoutChoice);
    // console.log("Product Details >> "+JSON.stringify($rootScope.checkoutProduct));
    //console.log("Choice >> "+$scope.checkoutChoice);

    if($scope.checkoutChoice == 'free'){
      $rootScope.shipping_boolean = 'no'; 
      $rootScope.shipping_cost = 0;
    }
    else if($scope.checkoutChoice == 'quick'){
      $rootScope.shipping_boolean = 'yes'; 
      //console.log("Shipping set Boolean >> "+$rootScope.shipping_boolean);
      if($rootScope.checkoutProduct.shipping_cost != null){$rootScope.shipping_cost == $rootScope.checkoutProduct.shipping_cost;}
      else{$rootScope.shipping_cost = 0;}
    }

    //console.log("Shipping Boolean >> "+$rootScope.shipping_boolean);
    var total_amount = 0;
    var shipping_cost = 0;

    $scope.productData = [];
    var checkoutProduct = $rootScope.checkoutProduct;
    for(var i=0; i<checkoutProduct.length;i++){
      total_amount += checkoutProduct[i].discounted_amount * checkoutProduct[i].qty;
      if(checkoutProduct[i].shipping_cost!=null){
        shipping_cost += checkoutProduct[i].shipping_cost;
      }

      $scope.productData.push({
        "product_master_id":checkoutProduct[i].product_master_id,
        "shipping_cost":checkoutProduct[i].shipping_cost,
        "internet_fee":checkoutProduct[i].internet_fee, 
        "vendor_master_id":checkoutProduct[i].vendor_master_id, 
        "product_category":checkoutProduct[i].product_category, 
        "product_sub_cat":checkoutProduct[i].product_sub_cat, 
        "usual_retail_price":checkoutProduct[i].usual_retail_price, 
        "discount_percentage":checkoutProduct[i].discount_percentage, 
        "discounted_amount":checkoutProduct[i].discounted_amount,
        "procuct_headline":checkoutProduct[i].product_headline, 
        "model_no":checkoutProduct[i].model_no,
        "product_code":checkoutProduct[i].product_code,
        "qty":checkoutProduct[i].qty,
        "product_unique_id":checkoutProduct[i].product_unique_id
      });
      //alert(JSON.stringify($scope.productData));
      if(i == $scope.checkoutProduct.length-1){
          CheckoutService.checkoutProduct($rootScope.address,$scope.productData,$rootScope.shipping_boolean,shipping_cost,total_amount).success(function(res){
            console.log("Checkout Response >>@@@@@ ");
            console.log(JSON.stringify(res));
            $scope.address = {};
            $rootScope.address = {};
            console.log("Before push length >> "+$rootScope.orderProduct.length);
            $rootScope.orderProduct.push(res.order_details);
            localStorage.setItem("orderProductList",JSON.stringify($rootScope.orderProduct));
            $rootScope.orderProduct = JSON.parse(localStorage.getItem('orderProductList'));
             console.log("After push length >> "+$rootScope.orderProduct.length);
            console.log("LSI > "+JSON.stringify($rootScope.orderProduct));

            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();


           // $state.go('cart');
            //alert("success");
            $cordovaToast.showShortBottom("success").then(function(success) {
                //on success 
            }, function (error) {
                // error
            });
          }).error(function(err){
            //alert(JSON.stringify(err));
            console.log(JSON.stringify(err));            
              $cordovaToast.showShortCenter(JSON.stringify(err)).then(function(success) {
                  //on success 
              }, function (error) {
                  // error
              });
            
          });
      }
    }

  }
  //function called from shipping page
  $scope.goTopayment= function(){  
  //alert("rootScope adress"+JSON.stringify($rootScope.address));  
    if($scope.shipping.firstName == null || $scope.shipping.firstName == ""){
      $cordovaToast.showShortCenter("Enter first Name").then(function(success) {
          //on success 
          
      }, function (error) {
          // error
      }); 
      return;     
    }
    if($scope.shipping.lastName == null || $scope.shipping.lastName == ""){
      $cordovaToast.showShortCenter("Enter last Name").then(function(success) {
          //on success 
          
      }, function (error) {
          // error
      }); 
      return;
    }    
    if($scope.shipping.mobileno == null || $scope.shipping.mobileno == ""){
     $cordovaToast.showShortCenter("Enter mobile no").then(function(success) {
          //on success 
          
      }, function (error) {
          // error
      }); 
      return;
    }
    if($scope.shipping.mobileno != null){
      if(isNaN($scope.shipping.mobileno)){        
        $cordovaToast.showShortCenter("Enter Numeric value in mobile number").then(function(success) {
          //on success 
            
        }, function (error) {
            // error
        }); 
        return;
      }
      else{
        if($scope.shipping.mobileno.length != 10){          
          $cordovaToast.showShortCenter("The Mobile  needs to be exactly 10 digits in length").then(function(success) {
            //on success               
          }, function (error) {
              // error
          });
          return; 
        }
        else{
          var mobile =  $scope.shipping.mobileno.toString();
          if(mobile.charAt(0) == 1 || mobile.charAt(0) == 2 || mobile.charAt(0) == 3 || mobile.charAt(0) == 4 || mobile.charAt(0) == 5 || mobile.charAt(0) == 6 || mobile.charAt(0) == 0 ){     
            $cordovaToast.showShortCenter("Mobile Number May Only Start With 7,8 OR 9!").then(function(success) {
              //on success               
            }, function (error) {
                // error
            }); 
            return;
          }
        }
      }
    }
    if($scope.shipping.email == null || $scope.shipping.email == ""){
      $cordovaToast.showShortCenter("Enter Email").then(function(success) {
          //on success 
          
      }, function (error) {
          // error
      }); 
      return;
    }
    if($scope.shipping.address == null || $scope.shipping.address == ""){
      
      $cordovaToast.showShortCenter("Enter address").then(function(success) {
        //on success               
      }, function (error) {
          // error
      });
      return;
    }
    if($scope.shipping.country == null || $scope.shipping.country == ""){      
      $cordovaToast.showShortCenter("Enter country").then(function(success) {
        //on success               
      }, function (error) {
          // error
      });
      return;
    }
    if($scope.shipping.state == null || $scope.shipping.state == ""){
      
      $cordovaToast.showShortCenter("Enter state").then(function(success) {
        //on success               
      }, function (error) {
          // error
      });
      return;
    }
    if($scope.shipping.city == null || $scope.shipping.city == ""){
      
      $cordovaToast.showShortCenter("Enter city").then(function(success) {
        //on success               
      }, function (error) {
          // error
      });
      return;
    } 
    if($scope.shipping.area == null || $scope.shipping.area == ""){
      $cordovaToast.showShortCenter("Enter Area").then(function(success) {
        //on success               
      }, function (error) {
          // error
      });
      return;
    }
    if($scope.shipping.zip == null || $scope.shipping.zip == ""){
     $cordovaToast.showShortCenter("Enter zip/pincode").then(function(success) {
          //on success 
          
      }, function (error) {
          // error
      }); 
      return;
    }   
    if($scope.shipping.zip != null){
      if(isNaN($scope.shipping.zip)){        
        $cordovaToast.showShortCenter("Enter Numeric value in Zip").then(function(success) {
          //on success               
        }, function (error) {
            // error
        });
        return;
      }
      else{
        if($scope.shipping.zip.length != 6){          
          $cordovaToast.showShortCenter("The Pincode  needs to be exactly 6 digits in length").then(function(success) {
            //on success               
          }, function (error) {
              // error
          });
          return;
        }
      }
    }
    if($scope.shipping.comment == null || $scope.shipping.comment == ""){
      $cordovaToast.showShortCenter("Enter comment").then(function(success) {
        //on success               
      }, function (error) {
          // error
      });
      return;
    }    
    if($scope.shipping.landmark == null || $scope.shipping.landmark == ""){
      $cordovaToast.showShortCenter("Enter landmark").then(function(success) {
        //on success               
      }, function (error) {
          // error
      });
      return;
    } 
    $rootScope.shipping = $scope.shipping;
     localStorage.setItem('shippingAdd',JSON.stringify($rootScope.shipping));
    //alert(JSON.stringify($rootScope.shipping));
    $state.go('checkout_payment');    
    // CheckoutService.checkoutProduct($rootScope.address,$scope.checkoutProduct).success(function(res){

    // });
    /*else{
       $state.go('checkout_payment');
    }   */
  }


})
