// Ionic Starter App

// BVPL26543179
// OS1BO 


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js 
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.services'])
  

.run(function($ionicPlatform,$rootScope,$ionicHistory,$state,$http,$ionicPopup,CategoryService,GetBanner,$ionicSlideBoxDelegate,$ionicSideMenuDelegate,$ionicLoading) {

  $ionicPlatform.ready(function() {

    $rootScope.userData = JSON.parse(localStorage.getItem('userData')) || null;
//    $rootScope.baseUrl = 'http://www.mibluepay.com/bluepaymax_mobi_prabhs/api/'
//    $rootScope.memberUrl='https://www.bluepaymax.com/bluepaymax_mobi_prabhs/member/index.php/'

    $rootScope.baseUrl = 'https://www.bluepaymax.com/bluepaymax_mobi_prabhs/api/index.php/'
    $rootScope.memberUrl='https://www.bluepaymax.com/bluepaymax_mobi_prabhs/member/index.php/'

    
    GetBanner.getBanner().success(function(res){
      // console.log("Success >>> ");
      // console.log(JSON.stringify(res));
      localStorage.setItem("default_banner",JSON.stringify(res.all_banners));
      $rootScope.banner_image_arr = JSON.parse(localStorage.getItem("default_banner"));
      // console.log("Banner Image >> "+JSON.stringify($rootScope.banner_image_arr)); 
      $ionicSlideBoxDelegate.update();
    }).error(function(err){
      console.log("Fetch Banner > >"+JSON.stringify(err));
    });

    CategoryService.getAll_Category().success(function(response){
    var arr_cat = [];
    var cat_sub = [];
      console.log("All Category");
      console.log(JSON.stringify(response.output))
      //$scope.showLoading();
        if (response.code == 200) {

             //$scope.hideLoading();
             //$scope.allcategory = response.output;
             $rootScope.allcategory = response.output;

             arr_cat = response.output;


                                                                         for(var i=0; i<arr_cat.length; i++){
                                                                         cat_sub.push({"image":"ion-catt","name":arr_cat[i].product_category,"objCat":arr_cat[i]})
                                                                         }

                                                                         $rootScope.groups = [{
                                                                                          "image": "ion-home",
                                                                                          "name": "Home",
                                                                                          "subMenu": []
                                                                                          },
                                                                                          {
                                                                                          "image": "ion-person",
                                                                                          "name": "My Profile",
                                                                                          "subMenu": [{
                                                                                                      "image": "ion-android-contact",
                                                                                                      "name": "Contact Admin"
                                                                                                      }, {
                                                                                                      "image": "ion-briefcase",
                                                                                                      "name": "Virtual Office"
                                                                                                      }, {
                                                                                                      "image": "ion-person",
                                                                                                      "name": "My Reference"
                                                                                                      }, {
                                                                                                      "image": "ion-person",
                                                                                                      "name": "Sponsor New"
                                                                                                      }, {
                                                                                                      "image": "ion-person",
                                                                                                      "name": "Change Password"
                                                                                                      }, {
                                                                                                      "image": "ion-person",
                                                                                                      "name": "My Profile"
                                                                                                      }]
                                                                                          },
                                                                                          {
                                                                                          "image": "ion-grid",
                                                                                          "name": "Category",
                                                                                          "subMenu": cat_sub
                                                                                          },
                                                                                          {
                                                                                          "image": "ion-card",
                                                                                          "name": "Cards & Vouchers",
                                                                                          "subMenu": [{
                                                                                                      "image": "ion-home",
                                                                                                      "name": "Reloadable Card"
                                                                                                      }, {
                                                                                                      "image": "ion-home",
                                                                                                      "name": "Non Reloadable Card"
                                                                                                      }, {
                                                                                                      "image": "ion-home",
                                                                                                      "name": "Reload Your Card"
                                                                                                      }, {
                                                                                                      "image": "ion-home",
                                                                                                      "name": "Profit Cards"
                                                                                                      }, {
                                                                                                      "image": "ion-home",
                                                                                                      "name": "Fuel Card"
                                                                                                      }, {
                                                                                                      "image": "ion-home",
                                                                                                      "name": "Reloadable Fuel Card"
                                                                                                      }]
                                                                                          },
                                                                                          {
                                                                                          "image": "ion-briefcase",
                                                                                          "name": "Business Tool",
                                                                                          "subMenu": [{
                                                                                                      "image": "ion-tshirt-outline",
                                                                                                      "name": "Application Form"
                                                                                                      }, {
                                                                                                      "image": "ion-tshirt-outline",
                                                                                                      "name": "Business Plan"
                                                                                                      }, {
                                                                                                      "image": "ion-tshirt-outline",
                                                                                                      "name": "Team Follow Up"
                                                                                                      }, {
                                                                                                      "image": "ion-tshirt-outline",
                                                                                                      "name": "Code of Ethics"
                                                                                                      }, {
                                                                                                      "image": "ion-tshirt-outline",
                                                                                                      "name": "kyc for reward"
                                                                                                      }]
                                                                                          },
                                                                                          {
                                                                                          "image": "ion-cash",
                                                                                          "name": "Wallet",
                                                                                          "subMenu": [{
                                                                                                      "image": "ion-ios-gear",
                                                                                                      "name": "My Wallet"
                                                                                                      }, {
                                                                                                      "image": "ion-ios-gear",
                                                                                                      "name": "Wallet History"
                                                                                                      }]
                                                                                          },
                                                                                          {
                                                                                          "image": "ion-cash",
                                                                                          "name": "Financial info",
                                                                                          "subMenu": [{
                                                                                                      "image": "ion-person",
                                                                                                      "name": "Daily Report"
                                                                                                      }, {
                                                                                                      "image": "ion-person",
                                                                                                      "name": "Weekly Report"
                                                                                                      }, {
                                                                                                      "image": "ion-home",
                                                                                                      "name": "Repurchase Report"
                                                                                                      }]
                                                                                          },

                                                                                          {
                                                                                          "image": "ion-ios-cart",
                                                                                          "name": "My Orders",
                                                                                          "subMenu": []
                                                                                          },
                                                                                          {
                                                                                          "image": "ion-ios-information",
                                                                                          "name": "About",
                                                                                          "subMenu": [{
                                                                                                      "image": "ion-person",
                                                                                                      "name": "About"
                                                                                                      }, {
                                                                                                      "image": "ion-person",
                                                                                                      "name": "Privacy Policy"
                                                                                                      }, {
                                                                                                      "image": "ion-person",
                                                                                                      "name": "Terms and Condition"
                                                                                                      }, {
                                                                                                      "image": "ion-person",
                                                                                                      "name": "Intro Video"
                                                                                                      }]
                                                                                          },
                                                                                          {
                                                                                          "image": "ion-person-stalker",
                                                                                          "name": "Network Manager",
                                                                                          "subMenu": [{
                                                                                                      "image": "ion-person",
                                                                                                      "name": "Epin List"
                                                                                                      }]
                                                                                          },
                                                                                          {
                                                                                          "image": "ion-android-exit",
                                                                                          "name": "Logout",
                                                                                          "subMenu": []
                                                                                          },
                                                                                          {
                                                                                          "image": "ion-locked",
                                                                                          "name": "Login",
                                                                                          "subMenu": []
                                                                                          }
                                                                                          ];


                                              console.log("TEST ==>"+JSON.stringify($rootScope.groups));

        }
    }).error(function(err){
          console.log(JSON.stringify(err));
    });


                       /*
                        * if given group is the selected group, deselect it
                        * else, select the given group
                        */
                       $rootScope.toggleGroup = function(group) {
                       if ($rootScope.isGroupShown(group)) {
                       $rootScope.shownGroup = null;
                       } else {
                       $rootScope.shownGroup = group;
                       }
                       };
                       $rootScope.isGroupShown = function(group) {
                       return $rootScope.shownGroup === group;
                       };




    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $http.defaults.headers.post = 'Content-Type: application/json';
    $http.defaults.headers.get = 'Content-Type: application/json';
    $http.defaults.headers.put = 'Content-Type: application/json';
  })



  $ionicPlatform.registerBackButtonAction(function(event) {
    if (true) { // your check here
      if($state.current.name ==='home'){
        /*$ionicPopup.confirm({
          title: 'System warning',
          template: 'are you sure you want to exit?'
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp(); //exit app
          }
        })*/  
      ionic.Platform.exitApp(); ///exit app
      }
      else{       
        //$state.go('home');        
          //$ionicHistory.goBack(); //this does not works sometimes   
          window.history.back();                            
      }
    }
  }, 100);



     $rootScope.openWeb = function(webviewLink){

     var ref = window.open(webviewLink, '_blank','location=no');

     var myCallback =  function(event){

     var current_url = event.url;

     console.log(event.type);
     console.log(event.url);
     };

     ref.addEventListener('loadstop', myCallback);
     ref.addEventListener('loaderror',myCallback);
     ref.addEventListener('exit',myCallback);

     };

})

//.controller('MyCtrl', function($ionicPlatform,$rootScope,$ionicHistory,$state,$http,$ionicPopup,CategoryService,GetBanner,$ionicSlideBoxDelegate,$ionicSideMenuDelegate,$timeout) {
//
//            $rootScope.testIt = function(){
//
//            $timeout(function(){
//                       $ionicSideMenuDelegate.toggleLeft();
//                       },10);
//            };
//
//
//
//            })


.controller('MyRef', function($rootScope,$ionicHistory,$state,$http,$ionicPopup,$timeout,$ionicLoading,$scope,$timeout) {

            $scope.refObj={}

            $rootScope.getReference = function(){

            var req = {
            method: "POST",
            headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
            url: $rootScope.memberUrl+"get_my_reference",
            data:null
            };


            $http(req)
            .success(function(data, status, headers, config){
                     console.log("success ==>"+JSON.stringify(data))
                     $timeout(function(){
                     $scope.refObj = data.my_reference;
																					},1500);
                     })
            .error(function(data, status, headers, config) {
                   console.log("error ==>"+JSON.stringify(data))
                   });
            };

            $scope.$on("$ionicView.beforeEnter", function(event, data){
                       $timeout(function(){
                                $rootScope.getReference();
                                });
                       
                       });
            
            
            })



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Home screen
  .state('home', {
    url: '/home',      
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl',
    resolve:{
      "check":function($ionicHistory,$ionicSlideBoxDelegate,$ionicNavBarDelegate,$ionicHistory){
        $ionicHistory.clearHistory();
        //$ionicNavBarDelegate.showBackButton(false);
        $ionicHistory.nextViewOptions({
          disableBack: false,
          historyRoot: true
        });
        $ionicHistory.clearCache();
        $ionicSlideBoxDelegate.update();
      }
    }
  })
  //all products
  .state('allproducts', {
    url: '/allproducts',      
    templateUrl: 'templates/allproducts/allproducts.html',
    controller: 'allproductsCtrl'
  })
  .state('search', {
    url: '/search',      
    templateUrl: 'templates/search/search.html',
    controller: 'searchCtrl'
  })
  .state('wishList', {
    url: '/wishList',      
    templateUrl: 'templates/allproducts/wishList.html',
    controller: 'wishListCtrl'
  })
  .state('wishListDetails', {
    url: '/wishList',      
    templateUrl: 'templates/allproducts/wishListDetails.html',
    controller: 'wishListCtrl'
  })
  // View category
  .state('category', {
    url: '/category',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })

// View subcategory
  .state('subcategory', {
    url: '/subcategory',
    templateUrl: 'templates/subcategory/subcategory.html',
    controller: 'subcategoryCtrl'
  })
  //product by Category
  .state('product_category', {
    url: '/product_category/:product_id',
    templateUrl: 'templates/category/category.html',
    controller: 'CategoryCtrl'
  })

  .state('productbysubcategory', {
    url: '/productbysubcategory',
    templateUrl: 'templates/productbysubcategory/productbysubcategory.html',
    controller: 'productbysubcategoryCtrl'
  })

  // Product detail
  .state('detail', {
    url: '/detail',
    templateUrl: 'templates/detail.html',
    controller: 'DetailCtrl'
  })
  .state('epin', {
    url: '/epin',
    templateUrl: 'templates/epin/epin.html',
    controller: 'epinCtrl'
  })

  .state('my_reference', {
     url: '/my_reference',
     templateUrl: 'templates/epin/my_reference.html',
     controller:'MyRef'
     })
  //daily payout info
  .state('payoutinfo', {
    url: '/payoutinfo',
    templateUrl: 'templates/payoutinfo/payoutinfo.html',
    controller: 'PayoutCtrl'
  })
  //weekly payout info
  .state('weeklypayoutinfo', {
    url: '/weeklypayoutinfo',
    templateUrl: 'templates/payoutinfo/weeklyinfo.html',
    controller: 'WeeklypayoutCtrl'
  })
  
  .state('repurchasepayoutinfo', {
    url: '/repurchasepayoutinfo',
    templateUrl: 'templates/payoutinfo/repurchaseinfo.html',
    controller: 'PurchasepayoutCtrl'
  })

  // Cart detail
  .state('cart', {
    url: '/cart',
    templateUrl: 'templates/cart.html',
    controller: 'CartCtrl'
  })
  // Checkout steps   
  .state('checkout_main', {
    url: '/checkout/main',
    templateUrl: 'templates/checkout/checkoutMainScreen.html',
    controller: 'checkoutCtrl',
    resolve:{
      "check":function($ionicHistory,$ionicSlideBoxDelegate,$ionicNavBarDelegate,$ionicHistory){
        $ionicHistory.clearHistory();
        //$ionicNavBarDelegate.showBackButton(false);
        $ionicHistory.nextViewOptions({
          disableBack: false,
          historyRoot: true
        });
        $ionicHistory.clearCache();        
      }
    }
  })  
  // Address
  .state('checkout_address', {
    url: '/checkout/address',
    templateUrl: 'templates/checkout/checkout-address.html',
    controller: 'checkoutCtrl'
  })

  //Checkout steps (checkout As)
  .state('checkout_as', {
    url: '/checkout/as',
    templateUrl: 'templates/checkout/checkout-as.html',
    controller: 'checkoutCtrl'
  })

  // Shipping
  .state('checkout_shipping', {
    url: '/checkout/shipping',
    templateUrl: 'templates/checkout/checkout-shipping.html',
    controller: 'checkoutCtrl'
  }) 
  // Payment
  .state('checkout_payment', {
    url: '/checkout/payment',
   // templateUrl: 'templates/checkout/checkout-payment.html',
    //controller :'checkoutCtrl'
     templateUrl: 'templates/checkout/payment/checkout-payment.html',
    controller: 'checkoutPaymentCtrl'
  })

  // Checkout Message
   .state('checkout_message_success', {
      url: '/checkout/messsage_success',
      templateUrl: 'templates/checkout/payment/messageScreen_success.html',
      controller: 'checkoutPaymentCtrl'
    })

  .state('checkout_message_fail', {
         url: '/checkout/messsage_fail',
         templateUrl: 'templates/checkout/payment/messageScreen_fail.html',
         controller: 'checkoutPaymentCtrl'
         })

  // login screen
  .state('login', {
    url: '/login',
    //templateUrl: 'templates/checkout/profitcardredeem.html',     
    //templateUrl: 'templates/checkout/shipping-info.html', 
    templateUrl: "templates/login.html",
    controller: 'AuthCtrl'
  })
 // otp screen
  .state('otp', {
    url: '/otp',
    templateUrl: 'templates/otp/otp.html',
    controller: 'otpCtrl',
    params: {
    'mobile': null
    }
  })
  .state('forgotpass', {
    url: '/forgotpass',
    templateUrl: 'templates/forgotpass/forgotpass.html',
    controller: 'ForgotpassCtrl'
  })

  .state('setting',{
    url:'/setting',
    templateUrl:'templates/setting/setting.html',
    controller:'settingCtrl'
  })
  /*.state('wallet',{
    url:'/wallet',
    templateUrl:'templates/setting/wallet.html',
    controller:'settingCtrl'
  })*/
  .state('wallet_statement',{
    url:'/wallet_statement',
    templateUrl:'templates/setting/wallet_statement.html',
    controller:'settingCtrl'
  })
  //changePassword
  .state('changePassword',{
    url:'/changePassword',
    templateUrl:'templates/changePassword/changePassword.html',
    controller:'PasswordCtrl'
  })
  .state('reloadcard',{
    url:'/reloadcard',
    templateUrl:'templates/reloadcard/reloadcard.html',
    controller:'reloadCardCtrl'
  })
  .state('nonreloadable',{
    url:'/nonreloadable',
    templateUrl:'templates/nonreloadablecard/nonreloadable.html',
    controller:'nonreloadableCtrl'
  })
  .state('reloadable',{
    url:'/reloadable',
    templateUrl:'templates/reloadablecard/reloadable.html',
    controller:'reloadableCtrl'
  })
  .state('cards',{
    url:'/cards',
    templateUrl:'templates/cards/cards.html',
    controller:'cardsCtrl'
  })

  .state('fuelcard',{
    url:'/fuelcard',
    templateUrl:'templates/fuelcard/fuelcard.html',
    controller:'fuelcardCtrl'
  })

.state('reloadfuelcard',{
    url:'/reloadfuelcard',
    templateUrl:'templates/fuelcard/reloadablefuelcard.html',
    controller:'reloadablefuelcardCtrl'
  })

  .state('aboutlist',{
    url:'/aboutlist',
    templateUrl:'templates/cms/aboutlist.html',
    controller:'CMSCtrl'
  })
  .state('cms_about',{
    url:'/cms/about/:cms_type',
    templateUrl:'templates/cms/about.html',
    controller:'CMSCtrl'
  })
  .state('cms_policy',{
    url:'/cms/policy/:cms_type',
    templateUrl:'templates/cms/privacyPolicy.html',
    controller:'CMSCtrl'
  })
  .state('cms_terms',{
    url:'/cms/terms/:cms_type',
    templateUrl:'templates/cms/termCondtion.html',
    controller:'CMSCtrl'
  })
  .state('cms_intro',{
    url:'/cms/intoduction/:cms_type',
    templateUrl:'templates/cms/introVideo.html',
    controller:'CMSCtrl'
  })
  .state('buy_product_list',{
    url:'/buy_product_list',
    templateUrl:'templates/buyProduct/buyProductList.html',
    controller:'BuyProductCtrl'
  })
  .state('buy_product_detail',{
    url:'/buy_product_list/:index',
    templateUrl:'templates/buyProduct/buyProductDetail.html',
    controller:'BuyProductDetailCtrl'
  })
  
   .state('buy_product_track',{
    url:'/buy_product_track/:docket',
    templateUrl:'templates/buyProduct/buyProductTrack.html',
    controller:'BuyProductTrackCtrl'
  })
  
  
  .state('profile',{
    url:'/profile',
    templateUrl:'templates/profile/profile.html',
    controller:'viewProfileCtrl'
  })
  
  // buy_product_list
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'AuthCtrl'
  })
  .state('member_signup', {
    url: '/member_signup',
    templateUrl: 'templates/member/member_signup.html',
    controller: 'MemberCtrl'
  })  
  .state('member_otp', {
    url: '/member_otp',
    templateUrl: 'templates/member/member_otp.html',
    controller: 'MemberCtrl'
  })
  //sponsernew
  .state('newmember_signup', {
    url: '/newmember_signup',
    templateUrl: 'templates/sponsornew/sponsornew_signup.html',
    controller: 'NewMemberCtrl'
  })
  .state('newmember_otp', {
    url: '/newmember_otp',
    templateUrl: 'templates/sponsornew/sponsornew_otp.html',
    controller: 'NewMemberCtrl'
  })
  .state('kycpage', {
    url: '/kycpage',
    templateUrl: 'templates/kyc/kycpage.html',
    controller: 'kycCtrl'
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});

// 1. fetch Member or e-commerce user orderHistory (For memeber Showing error when fetch order History ).
// 2. Set CMS value.
// 3. Set Slider for logger or guest user.
// 4. Fetch Profile Data
