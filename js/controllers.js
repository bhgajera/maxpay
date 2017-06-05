/**
 * @author: Duy Thanh DAO
 * @email: success.ddt@gmail.com
 */
angular.module('starter.controllers', [])

// Home controller
.controller('HomeCtrl', function($scope,GetBanner,$cordovaToast,Autosuggest, $ionicNavBarDelegate,$ionicSideMenuDelegate, $rootScope,$ionicSlideBoxDelegate, Product, CategoryService, $ionicNavBarDelegate,WalletService, $ionicLoading, $state, $ionicHistory) {
    $ionicSlideBoxDelegate.update();
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;    
    $scope.openContactadminURL = function(){
     var  adminurl="https://www.bluepaymax.com/member/customer_service/member-service/"      
      $rootScope.openWeb(adminurl+$rootScope.userData.User_Id);
      return false;
    }
    $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct")) || [];
    $rootScope.allcategory = $rootScope.allcategory || null;    
    //$scope.cartlength = $rootScope.cartProducts.length; //ion bag shows no of products in cart
    $rootScope.cartReloadableCards =JSON.parse(localStorage.getItem("reloadablecard")) ||null;  
    
    if($rootScope.userData != null){
      $rootScope.banner_image_arr = JSON.parse(localStorage.getItem("banner_image"));
      //console.log("Banner Image >> "+JSON.stringify($rootScope.banner_image_arr)); 
      $ionicSlideBoxDelegate.update();
    }
    else{
        $rootScope.banner_image_arr = JSON.parse(localStorage.getItem("default_banner"));
        //console.log("Banner Image >> "+JSON.stringify($rootScope.banner_image_arr)); 
        $ionicSlideBoxDelegate.update();      
    }
    console.log("User Data > "+JSON.stringify($rootScope.userData));
    //moved below lines at starting of controller
    /*$ionicHistory.clearHistory();
    $ionicHistory.clearCache();*/

if($rootScope.userData != null){
 CategoryService.getWallet().success(function(res){

       console.log("Wallet >> "+JSON.stringify(res));
       $rootScope.userWallet = res.output;
       $rootScope.wallettotal = (parseFloat(res.output.wallet_amount)).toFixed(2);

       ///$ionicSideMenuDelegate.toggleLeft();
       }).error(function(err){
                console.log(JSON.stringify(err));
                })
$rootScope.wallet_amount =  $rootScope.userData.wallet_amount;
}


    $scope.getWallet = function(){
      WalletService.getWallet().success(function(res){
        console.log("Wallet >> "+JSON.stringify(res));
        $scope.userWallet = res.output;
      }).error(function(err){
        console.log(JSON.stringify(err));
      })
    }

    if($rootScope.userData!=null){
      if($rootScope.userData.rolecode != null){$scope.getWallet();}
    }

    $scope.showLoading = function() {
      $ionicLoading.show({ 
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
    };
    $scope.hideLoading = function(){
      $ionicLoading.hide();
    };
    $scope.getallProducts = function(){      
      $state.go('allproducts');
    }

    $scope.getsubcategory = function(item){       
      /*setTimeout(function(){ */  
        var productcat_id = item.product_category_id;  
        console.log("productcat_id : "+productcat_id);       
           CategoryService.getSubCategory(productcat_id).success(function(response){     
              if (response.code == 200 && response.error == false) {
                  $rootScope.subcategoryy = response;              
                  //alert(JSON.stringify($rootScope.subcategoryy));
                    $rootScope.p_cat_id = item.product_category_id;
                    //alert("homectrl p_cat_id"+$rootScope.p_cat_id);
                    //$state.go('subcategory',{reload:true});
                    $ionicHistory.clearCache().then(function(){ $state.go('subcategory') });

              }    
          }).error(function(err){
              console.log(JSON.stringify(err));              
              if(err.code ==400 && err.error ==true && err.message!=null){
                $cordovaToast.showShortBottom(JSON.stringify(err.message)).then(function(success) {
                    //on success 
                }, function (error) {
                    // error
                });
                return;
              }
              /*if(err.code ==400 && err.error ==true && err.message.product_category_id[0] == "Please Enter your Product Category Id"){
                //alert("Please Enter your Product Category Id");  
                return;             
              }
              if(err.code ==400 && err.error ==true && err.message =="Entered category not exist in subcategory"){
                //alert("Entered category not exist in subcategory");
                return;
              }*/
          });
      /*$scope.apply();
      },100);*/
    } 

    $scope.logout = function(){
      localStorage.clear();
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();

      $rootScope.userData = null;
      $rootScope.banner_image_arr = undefined;
      $ionicSlideBoxDelegate.update();      
      $ionicLoading.show();      
      GetBanner.getBanner().success(function(res){
        $ionicLoading.hide();
        localStorage.setItem("default_banner",JSON.stringify(res.all_banners));
        $rootScope.banner_image_arr = JSON.parse(localStorage.getItem("default_banner"));
        $ionicSlideBoxDelegate.update();
        setTimeout(function(){
          $ionicSlideBoxDelegate.update();
          $state.go("home");
        },200)
      }).error(function(err){
        console.log("Fetch Banner > >"+JSON.stringify(err));
      });      
    }


    $scope.suggestedtxt=[];
    $scope.selectedsug={
      auto_search:''
    };
    $scope.autosuggestproduct = function(autotxt){
      //$scope.txtSearch = ""; 
      if(autotxt =='' || autotxt ==null || autotxt ==undefined){
        $scope.txtSearch = ""; 
        $scope.suggestedtxt=[];             
      }
      if(autotxt =='' || autotxt ==null || autotxt ==undefined){
        $scope.txtSearch = ""; 
        $scope.suggestedtxt=[];  
      }
      Autosuggest.getAutosuggest(autotxt).success(function(res){
        //alert(JSON.stringify(res));
        if(res.status==200 && res.error ==false){
          $scope.suggestedtxt = res.auto_result;
          //alert(JSON.stringify($scope.suggestedtxt));
        }
      }).error(function(err){
        //alert(JSON.stringify(err));                
      })      
    }
    $scope.searchTxt = function(txt){      
      //$rootScope.searchTxt = txt;
      if(txt.length==0){
        $scope.txtSearch = ""; 
        $scope.suggestedtxt=[];  
        $rootScope.searchTxt=='';
      }
      if(txt.length >2){
         $scope.autosuggestproduct(txt);
      }
      //$scope.txtSearch = "";      
      //$ionicSideMenuDelegate.toggleLeft();
      //$state.go('search');
     
      /*$ionicHistory.clearCache().then(function(){ 
        //$state.go('search') 
      });*/      
    }
    $scope.gotoSearch = function(txt){
      $rootScope.searchTxt = txt;  
      $scope.txtSearch =""; 
      $scope.suggestedtxt=[];
      $scope.selectedsug={
         auto_search:''
      };     
      //$state.go('search');
      $ionicHistory.clearCache().then(function(){ 
        $state.go('search'); 
      }); 
    }
    // $scope.moreSearch = true;
    // $scope.searchPage = 1;

    // $scope.searchData = function(){
    //   console.log("TExt > "+$rootScope.searchTxt);
    //   SearchProductService.searchProduct($rootScope.searchTxt,$scope.searchPage).success(function(res){
    //     console.log("RES >> "+JSON.stringify(res));

    //     $scope.searchPage++;
    //     $scope.$broadcast('scroll.infiniteScrollComplete');
    //     if(res.next_page == false){
    //       $scope.moreSearch = false;
    //     }
    //   }).error(function(err){
    //     console.log("ERR > "+JSON.stringify(err))
    //   })
    // }
})
  //this is for detal ion sliding images used in(detail.html) ion slide click event
.directive('repeatDone', function () {
  //alert("dir");
       return function (scope, element, attrs) {
         if (scope.$last) { // all are rendered
           scope.$eval(attrs.repeatDone);
         }
       }
})

// Product detail controller
.controller('DetailCtrl', function($scope,$rootScope,$state,WishListService, Product,$cordovaToast, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicPopup, $timeout,$filter) {
  scope = $scope;
  $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
  $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct")) || [];
  $scope.product= $rootScope.singleProduct;
  //alert(JSON.stringify($scope.product));
  //alert(JSON.stringify($rootScope.singleProductImages[0]));
  $rootScope.cartReloadableCards =JSON.parse(localStorage.getItem("reloadablecard")) ||null;  
  //alert(JSON.stringify($rootScope.cartReloadableCards));  
  $scope.variants=[];
  $scope.variantprice='';
  $scope.product_var_boolean=false;
  $scope.currentVariants = [];
    
  // called below api ONLY for displaying product variants  
          $scope.singleprvariant= function(){
            Product.getSingleProductVarient($scope.product.product_master_id).success(function(response){
             //alert(JSON.stringify(response.price_variant));
              $scope.product_var_boolean = response.output.price_var_bool; //if true show variants
              //alert($scope.product_var_boolean);
              $scope.variants= response.price_variant;  
              //alert("sssssssssss"+JSON.stringify($scope.variants[0].value));   
            //$scope.variantprice = $scope.variants[0].value;
            }).error(function(err){             
                $cordovaToast.showShortBottom(JSON.stringify(err)).then(function(success) {
                    //on success 
                }, function (error) {
                    // error
                });
            })
          } 
          //alert(JSON.stringify($scope.variants));
          $scope.selected_price ='';
          $scope.selected_pv='';          
          
          $scope.setVariantprice = function(value){
              
              
              $scope.currentVariants = $filter('filter')($scope.variants, {"value":value}, true) || [];
              
                console.log($scope.currentVariants);
                console.log("on variant selection ==>"+JSON.stringify(value));

            console.log("on variant selection ==>"+JSON.stringify($scope.variants));

                  if ($scope.currentVariants.length)
                  {
                      $scope.currentVariants = $scope.currentVariants;
                      $scope.currentVariants[0].qty = 1;
            }
          }
  
           $scope.repeatDone = function() {
            $ionicSlideBoxDelegate.update();
          };

          /*
           * Show Full Screen Sliding Images
          */
          $scope.showImages = function(index) {
            $scope.activeSlide = index;
            $scope.showModal('templates/image-popover.html');
          };

          $scope.showModal = function(templateUrl) {
               $ionicModal.fromTemplateUrl(templateUrl, {
               scope: $scope
            }).then(function(modal) {
               $scope.modal = modal;
               $scope.modal.show();
            });
          };
            //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
         if (typeof $scope.modal != "undefined")
         {
             $scope.modal.remove();
         }
          
          $ionicSlideBoxDelegate.enableSlide(true);
          $ionicSlideBoxDelegate.update();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
          // Execute action
            $ionicSlideBoxDelegate.enableSlide(true);
            $ionicSlideBoxDelegate.update();
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
          // Execute action
            $ionicSlideBoxDelegate.enableSlide(true);
            $ionicSlideBoxDelegate.update();
        });

          $scope.zoomMin = 1;
          $scope.updateSlideStatus = function(slide) {
           var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
           if (zoomFactor == $scope.zoomMin) {
               $timeout(function(){
                    $ionicSlideBoxDelegate.enableSlide(true); 
                  });
           } else {
               $timeout(function(){
                    $ionicSlideBoxDelegate.enableSlide(false); 
                });
           }
         };

  //alert(JSON.stringify($scope.product));
  ////////////////////default content///////
  //$scope.product = Product.get(2);
  $rootScope.singleProduct;
  // generate array from number
  $scope.range = function(n) {
    return new Array(n);
  };
  //////////////////////////////  
  // $rootScope.cartProducts = $rootScope.cartProducts || [];  
    //alert($rootScope.cartProducts.length);    
  //$scope.cartProducts = $rootScope.cartProducts;  
  //alert("cart len"+$scope.cartProducts.length);

  function myIndexOf(o) {    
      var arr = $rootScope.cartProducts;
      for (var i = 0; i < arr.length; i++) {
          if (arr[i].product_master_id == o.product_master_id) {
              return 0;
          }
      }
      return -1;
  }
    
$scope.totalAmount =  function(){
   var shiping = parseInt($scope.product.shipping_cost);
    var price = 0;
   if($scope.currentVariants.length)
    {
        price =  parseInt($scope.currentVariants[0].price);
    }
    else{
        price = parseInt($scope.product.discounted_amount); 
    }
    total = shiping + price;
    return total;
}      

  $scope.addToCart = function (product){ 
    //if user not loggedin go to login page
    //alert(JSON.stringify(product));
    if($rootScope.userData ==null){
      $state.go('login');
    } 
    //check for profit cards in cart 
    if($rootScope.cartReloadableCards!=null){
      //alert("cannot add to cart because cart contains profit card");
      $cordovaToast.showShortBottom("You cannot buy any other product with card.Please make a fresh purchase for other products").then(function(success) {
      //on success                 
      }, function (error) {
          // error
      });
    }    
    //else allow add to cart
    else{
        if(($rootScope.cartProducts).length > 0){
          if(myIndexOf(product) == -1){ 
              $rootScope.cartProducts.push(product);
              localStorage.setItem("addToCardProduct",JSON.stringify($rootScope.cartProducts));
              $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct"));
              //alert("successfully added to cart"); 
              $cordovaToast.showShortBottom("successfully added to cart").then(function(success) {
        
              }, function (error) {
                // error
              });
          } 
          else{
            //alert("ALREADY added to cart");
            $cordovaToast.showShortBottom("Already in cart").then(function(success) {
        
            }, function (error) {
              // error
            });
          }   
        }
        else{
            if ($scope.product_var_boolean)
            {
                product.usual_retail_price =  $scope.currentVariants[0].price;
            }
            
          $rootScope.cartProducts.push(product);
          localStorage.setItem("addToCardProduct",JSON.stringify($rootScope.cartProducts));
          $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct"));
          //alert("successfully added to cart");   
          $cordovaToast.showShortBottom("successfully added to cart").then(function(success) {
        
          }, function (error) {
            // error
          });         
        }  
    }  
    
  }


  $scope.addToWish = function(product){
//    alert(JSON.stringify(product));
    console.log("Add Wish");
    WishListService.addWishList(product).success(function(res){
      console.log("Wish List >> "+JSON.stringify(res))
      $cordovaToast.showShortBottom(res.output.message).then(function(success) {
        
      }, function (error) {
        // error
      });
    }).error(function(err){
      console.log("Wish List >> "+JSON.stringify(err));
      $cordovaToast.showShortCenter(JSON.stringify(err)).then(function(success) {
        
      }, function (error) {
        // error
      });
      console.log("ERR > "+JSON.stringify(err));
    })
  }
  
  
})

// Cart controller
.controller('CartCtrl', function($scope, $rootScope, $state,$cordovaToast,$ionicNavBarDelegate,$ionicHistory) {
   scope = $scope;
    root =$rootScope;
   
 
  //$ionicNavBarDelegate.showBackButton(true);
  $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
  $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct")) || [];
  $rootScope.orderProduct = JSON.parse(localStorage.getItem('orderProductList')) || [];  
  $rootScope.cartReloadableCards =JSON.parse(localStorage.getItem("reloadablecard")) ||null;  
  $rootScope.cartfuelCards =JSON.parse(localStorage.getItem("fuelcard")) || null;  

  //alert(JSON.stringify($rootScope.cartReloadableCards));
  console.log("orderProduct >> "+JSON.stringify($rootScope.orderProduct));
  //alert(JSON.stringify($rootScope.cartProducts));
  $scope.selectedquantity =  1;
  //alert(JSON.stringify($rootScope.cartProducts)); 
    /*if($rootScope.cartProducts == undefined || $rootScope.cartProducts == []){
      $scope.message ="No items to show in your cart";
    } */ 
    $scope.message='';
    if($rootScope.cartProducts ==undefined || $rootScope.cartProducts ==null || $rootScope.cartProducts==''){
      if($rootScope.cartReloadableCards ==null){
        $scope.message="No items to show in your Cart";        
      }    
      //$scope.message="";
    }  
    //alert(JSON.stringify($rootScope.cartProducts));
    $scope.cartItems = $rootScope.cartProducts;     
    $scope.quantity = [
            {
                quan: 1 , 'id' : 1               
            }, {
                quan: 2  , 'id' : 2            
            }, {
                quan: 3, 'id' : 3
            }, {
                quan: 4, 'id' : 4
            }];         

    $scope.getTotal = function(){        
      var total = 0;
      var totalpv =0;      
      console.log("Cart Total >>> "+JSON.stringify($rootScope.cartProducts));
      for(var i = 0; i < $rootScope.cartProducts.length; i++){
          var product = $rootScope.cartProducts[i];
          var price= parseFloat(product.total_amount);
          var shipping =parseFloat(product.shipping_cost);

          var pv = parseFloat(product.product_bv_value);          
          totalpv +=pv;          

          total +=(price+shipping);
        
          if(i == $rootScope.cartProducts.length-1){            
            $rootScope.totalCardAmount = total;
            $rootScope.totalpv = totalpv;          
            console.log("totalCardAmount >>> "+$rootScope.totalCardAmount); 
            //alert("rootscopepvtotal"+$rootScope.totalpv);
          }
      }
      setTimeout(function(){
        $scope.$apply();
      },100);
    }       

    $scope.setQuantity = function(iem,product){
        var productTotalPrice = iem*product.usual_retail_price;
        for(var i=0; i<$rootScope.cartProducts.length; i++){
          if(product.product_master_id == $rootScope.cartProducts[i].product_master_id){
            $rootScope.cartProducts[i].total_amount = productTotalPrice;
            $rootScope.cartProducts[i].qty = iem;
            $scope.getTotal();
          }

          if(i == $rootScope.cartProducts.length-1){
            $scope.getTotal();
          }
        }
    }
    if($rootScope.cartProducts.length > 0){
       $scope.getTotal();
    }
    $scope.deleteCartItem = function(item){
       var index = $rootScope.cartProducts.indexOf(item);
       $rootScope.cartProducts.splice(index, 1);  
       localStorage.setItem("addToCardProduct",JSON.stringify($rootScope.cartProducts));
       $rootScope.cartProducts = JSON.parse(localStorage.getItem("addToCardProduct")); 
       $scope.getTotal(); 
       $scope.shippingTotal();     
       if($rootScope.cartProducts.length==0){
        $scope.message='No items to show in your Cart';
       }
    }
    $scope.deleteCartreloadablecard = function(card){
      localStorage.removeItem("reloadablecard");
      $rootScope.cartReloadableCards =JSON.parse(localStorage.getItem("reloadablecard")) ||null;  
      //alert(JSON.stringify($rootScope.cartReloadableCards));
      $scope.message="No items to show in your Cart";
    }

    $scope.deleteCartfuelcard = function(card){
      localStorage.removeItem("fuelcard");
      $rootScope.cartfuelCards =JSON.parse(localStorage.getItem("fuelcard")) || null;  
      //alert(JSON.stringify($rootScope.cartReloadableCards));
      $scope.message="No items to show in your Cart";
    }
   
    $scope.checkoutCart =  function(product){
      //alert(JSON.stringify(product));
      $rootScope.checkoutProduct = product;
      console.log("Check Out Product length >> "+ $rootScope.checkoutProduct.length);
      //alert($rootScope.checkoutProduct.length);
      var otheprodutsexists = 1;
      var singleprofitcard=[];
      for(i=0; i< $rootScope.checkoutProduct.length; i++){
        if($rootScope.checkoutProduct[i].product_headline=="Bluepaymax Profit Card"){                     
         singleprofitcard.push(i);
          if(singleprofitcard.length==1){
                for(j=0; j<$rootScope.checkoutProduct.length; j++){
                  if($rootScope.checkoutProduct[j].product_headline!="Bluepaymax Profit Card"){                            
                    otheprodutsexists =0;
                    //alert("you cannot buy other products with profit card"+otheprodutsexists);
                     $cordovaToast.showShortBottom("You cannot buy any other product with Profit card.Please make a fresh purchase for other products").then(function(success) {
                          //on success 
                      }, function (error) {
                          // error
                      });
                  }                   
                }
          }
          else{            
            otheprodutsexists =0;
            $cordovaToast.showShortBottom("You cannot buy 2 Profit cards in Singleorder. Please make a fresh purchase for other profit card").then(function(success) {
                          //on success 
            }, function (error) {
                          // error
            });
          }
        }
      
    }
    if(otheprodutsexists!=0){
        //$state.go("checkout_address");

        $state.go("checkout_main");
      } 
    }

    $scope.checkoutAs = function(product){
      $rootScope.checkoutProduct = product;
      console.log("Check Out Product length >> "+ $rootScope.checkoutProduct.length);
      //alert("checkout As");      
      $state.go("checkout_as");
    }
    $scope.shippingTotal = function(){  

      var shippingtotal = 0;      
      for(var i = 0; i < $rootScope.cartProducts.length; i++){
          var product = $rootScope.cartProducts[i];
          var shippingcost= parseFloat(product.shipping_cost);
          shippingtotal += (shippingcost);

          if(i == $rootScope.cartProducts.length-1){
            $rootScope.totalShippingAmount = shippingtotal;            
            //console.log("totalShippingAmount >>> "+$rootScope.totalShippingAmount);
            //alert("shipping total"+JSON.stringify($rootScope.totalShippingAmount));
            
            /*if($rootScope.totalShippingAmount ==0){
              $scope.freeshippingmsg =" Free Shipping";
            }*/
          }          
      }
      /*setTimeout(function(){
        $scope.$apply();
      },100);*/
    }
    $scope.shippingTotal();
})

// Authentication controller
.controller('AuthCtrl', function($scope,$cordovaToast, $ionicHistory,$rootScope,RegisterService,LoginService,$ionicSlideBoxDelegate,$state,$ionicLoading,$ionicHistory) {
    // hide back butotn in next view
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

$scope.login_type="member"; 
    /*$scope.login_type="user";
    $scope.setType = function(type){
      console.log("Type > "+type);
       $scope.login_type=type;
    }*/

    $scope.register = {};
    $scope.errors = false;
    //Register new user
    $scope.Register = function(){
      //console.log($scope.register);
      //alert("register clicked");
      if($scope.register.email == null || $scope.register.email == undefined || $scope.register.email == ""){
        $scope.errors = true;
        $scope.errorMsg = 'Please Enter Valid Email!';
        alert("Please Enter Valid Email!");
        return;
      }
      if($scope.register.mobile == null || $scope.register.mobile == undefined || $scope.register.mobile == ""){
        $scope.errors = true;
        $scope.errorMsg = 'Please Enter Your Mobile Number!';
        return;
      } 
      if (/^\d{10}$/.test($scope.register.mobile)) {
          //console.log('mobile is ok, use it');
      } else {
          $scope.errors = true;
          $scope.errorMsg = "The Mobile No needs to be exactly 10 digits!";
          alert("The Mobile No needs to be exactly 10 digits!")
          return;
      }
      var mobile =  $scope.register.mobile.toString();
      if(mobile.charAt(0) == 1 || mobile.charAt(0) == 2 || mobile.charAt(0) == 3 || mobile.charAt(0) == 4 || mobile.charAt(0) == 5 || mobile.charAt(0) == 6 || mobile.charAt(0) == 0 ){     
        $scope.errors = true;
        $scope.errorMsg = 'Mobile Number May Only Start With 7,8 OR 9!';
        return;
      }
      if($scope.register.fullname == null || $scope.register.fullname == undefined || $scope.register.fullname == ""){
        $scope.errors = true;
        $scope.errorMsg = 'Please Enter Your Full Name!';
        return;
      }

      if($scope.register.password == null || $scope.register.password == undefined || $scope.register.password == ""){
        $scope.errors = true;
        $scope.errorMsg = 'Please Enter Your Password!';
        return;
      }
      else{
          $ionicLoading.show();
          $scope.errors = false;
          $ionicHistory.clearHistory();
          RegisterService.Register($scope.register).success(function(response){
            // console.log("register response...............");
            // console.log(JSON.stringify(response));
            $state.go('otp');//////////////////////////////////////////////////////////////////////
            $ionicLoading.hide();
           // alert(JSON.stringify(response));
            if(response.status == 200 && response.error == false && response.available == true){
              $scope.errors = true;
              $scope.errorMsg = "Email And Mobile Already Exist!";
              //alert(JSON.stringify(response));
              return;
            }
            if(response.status == 200 && response.error == false && response.available == false){
                //alert("success signup");
                $rootScope.temp_mobile = $scope.register.mobile
                $state.go('otp',{'mobile':$scope.register.mobile});
            }
          }).error(function(err){
            $ionicLoading.hide();
             alert(JSON.stringify(err));
              console.log(err);              
          });
      } 
    }

    $scope.login = {};
    $rootScope.flag = false;
    $scope.showPassword = false;  
    $scope.toggleShowPassword = function(){   
     $scope.showPassword = !$scope.showPassword;      
    }
    //login existing user
    $scope.Login = function(){
      $ionicHistory.clearHistory();
      if($scope.login.login_id == null || $scope.login.login_id == undefined || $scope.login.login_id == ""){
        $scope.errors = true;
        $scope.errorMsg = 'Please Enter Login Id!';
        return;
      }
      if($scope.login.password == null || $scope.login.password == undefined || $scope.login.password == ""){
        $scope.errors = true;
        $scope.errorMsg = 'Please Enter Password!';
        return; 
      }else{
        $scope.errors = false;
        $ionicLoading.show();
        LoginService.Login($scope.login,$scope.login_type).success(function(response){

          console.log("logged In >>"+JSON.stringify(response));
          localStorage.setItem("userData",JSON.stringify(response.output));

          $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
          $ionicLoading.hide()
         
          if(response.code == 200){
              $ionicHistory.clearHistory();
              $scope.login = {};
              $rootScope.flag = true;
              // localStorage.setItem('all_banners',JSON.stringify(response.all_banners));    
              // $scope.all_banners = JSON.parse(localStorage.getItem('all_banners'));
              var len =  response.all_banners.length;
              console.log("length > "+response.all_banners.length);
              // if(response.all_banners){
              //   console.log("NOt null")
              //   $scope.banner_image_arr=[];        
              //   for(var i=0; i<len; i++){            
              //     $scope.banner_image_arr.push(response.all_banners[i].banner_image);      
              //   }
              //   $rootScope.banner_image_arr = $scope.banner_image_arr;
              //   localStorage.setItem("banner_image",JSON.stringify($rootScope.banner_image_arr));
              // }

            
              $rootScope.banner_image_arr = response.all_banners;
              localStorage.setItem("banner_image",JSON.stringify($rootScope.banner_image_arr));
              $ionicSlideBoxDelegate.update();
              
              setTimeout(function(){
                $scope.$apply();
              },100);

              $ionicHistory.clearHistory();
              $ionicHistory.clearCache();
              $ionicHistory.nextViewOptions({
                disableBack: false,
                historyRoot: true
              });
              $state.go('home');       
                          
          }else{
            $scope.errors = true;
            $scope.errorMsg = 'Invalid Credentials!';
            return;
          }
        }).error(function(err){
            $ionicLoading.hide()
            if(err.code == 400 && err.error == true ){
              if (err.message.status != null) {
                $scope.errors = true;
                $state.go('otp',{'mobile':$scope.login.login_id});            
              }
              if (err.message.login_id != null) {
                $scope.errors = true;
                $scope.errorMsg = 'Invalid Login Id!';
                return;
              }
              if (err.message.password != null) {
                $scope.errors = true;
                $scope.errorMsg = 'Invalid Password!';
                return;
              }
            }
        });
      }
    }
     
});


