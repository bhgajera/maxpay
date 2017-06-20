angular.module('starter.services', [])

.factory('Product', function($rootScope,$http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var products = [
    { 
      id: 1,
      name: "Zara shirt",
      price: 30,
      sale_price: 20,
      thumb: "img/list/p_1.jpg", 
      images: [ 
        "img/detail/d_1.jpg", 
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ],
      description: "Due to Christmas Time, the returns/exchanges period for orders placed between the 27th of November and the 17th of December will be extended until the 17th of January.",
      reviews: [
        {
          avatar: "img/avatar.jpg",
          name: "Slimer",
          content: "This product is good",
          stars: 4
        }
      ]
    },
    {
      id: 2,
      name: "Mango shirt",
      price: 30,
      sale_price: null,
      thumb: "img/list/p_2.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ]
    },
    {
      id: 3,
      name: "Zara shirt",
      price: 30,
      sale_price: null,
      thumb: "img/list/p_3.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ]
    },
    {
      id: 4,
      name: "Mango shirt",
      price: 30,
      sale_price: 20,
      thumb: "img/list/p_4.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ]
    },
    {
      id: 5,
      name: "Zara shirt",
      price: 30,
      sale_price: 20,
      thumb: "img/list/p_5.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ]
    },
    {
      id: 6,
      name: "Zara shirt",
      price: 30,
      sale_price: null,
      thumb: "img/list/p_6.jpg",
      images: [
        "img/detail/d_1.jpg",
        "img/detail/d_2.jpg",
        "img/detail/d_3.jpg"
      ]
    },
  ];

  return {
    all: function() {
      return products;
    },
    get: function(productId) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(productId)) {
          return products[i];
        }
      }
      return null;
    },
    getAllProducts : function(pageno){
    //alert("service pageno"+$rootScope.page_no);    
      var form = new FormData();      
      form.append("page_no", pageno);
      //console.log($rootScope.baseUrl+'products/get_all_products?Page_no=1');
      //alert($rootScope.baseUrl+'products/get_all_products?'+$rootScope.page_no);
      /*CURRENT PAGE LOAD IS FOR PAGES 1 TO 5 CHANGE IT IN ALLPRODUCTS HTML ng-if condition*/
      console.log("page No >>>> "+pageno);
      return $http({
          url: $rootScope.baseUrl+'products/get_all_products',
          method: "POST",
          // contentType: false,
          // mimeType: "multipart/form-data",
          data: form
      })  
      // return  $http({
      //       url: $rootScope.baseUrl+'pooler_request',
      //       method: "POST",        
      //       headers: {'Content-Type':"application/x-www-form-urlencoded",'User-Id':user.UserId, 'Api-Key':user.api_key},
      //        data: $httpParamSerializerJQLike({})
      //   });


    }
     ,  
    getSingleProductVarient : function(product_master_id){
      //alert("getSingle productService called");
      var form = new FormData();
      form.append("product_master_id", product_master_id);
      return $http({
          url: $rootScope.baseUrl+'products/get_single_product',
          method: "POST",
          contentType: false,
          mimeType: "multipart/form-data",
          data: form
      })
    }
  };
})

.factory('CategoryService', ['$http','$rootScope','$httpParamSerializerJQLike',function($http,$rootScope,$httpParamSerializerJQLike){
    
    return {

       getWallet : function(){
//       alert($rootScope.userData.user_id+"<==>"+$rootScope.userData.api_key)
    console.log('User-Id ' +$rootScope.userData.user_id+ ' Api-Key '+$rootScope.userData.api_key)
       return $http({
                    url: $rootScope.memberUrl+"get_wallet",
                    method:'GET',
                    headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key}
                    })
       },

       getAll_Category : function(){
        console.log("getAllCategory service called @@@@@@@@@@@@@@@@@@@@");
        return $http({
            url: $rootScope.baseUrl+'localization/get_category',
            method: "GET"
        })
      },
      getSubCategory : function(product_category_id){
        var form = new FormData();
        form.append("product_category_id", product_category_id);
        return $http({
            url: $rootScope.baseUrl+'localization/get_sub_category',
            method: "POST",
            contentType: false,
            mimeType: "multipart/form-data",
            data: form
        })
      },
      getAllProductsByCategory : function(productCategoryId,SubProdCatID) {

        console.log("productCategoryId > "+productCategoryId);
        console.log("SubProdCatID > "+JSON.stringify(SubProdCatID));
       
        var form = new FormData();
        form.append("product_category_id", productCategoryId);
        form.append("product_sub_cat_id", JSON.stringify(SubProdCatID));
        console.log("Called API");


        return $http({

            url: $rootScope.baseUrl+'products/get_product_by_cat_subcat',
            method: "POST",
             cache: false,
            //data : $httpParamSerializerJQLike({"product_category_id" :  productCategoryId , "product_sub_cat_id" : SubProdCatID}),
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            //data: { "product_category_id" :  productCategoryId , "product_sub_cat_id" : SubProdCatID }
            data: form
        })
      },
      getProductByCategory : function(productId,page_no){
        // products/get_product_by_category
        // product_category_id
        var form = new FormData();
        form.append("page_no",page_no)
        form.append("product_category_id", productId);
        return $http({
            url: $rootScope.baseUrl+'products/get_product_by_category',
            method: "POST",
            data: form
        })
      }
    }
  }
])

//add_mem_wishlist
.factory('WishListService', ['$http','$rootScope',function($http,$rootScope){
    
    return {
        addWishList: function(data){
          var form = new FormData();
          form.append('product_master_id',data.product_master_id);

          return $http({
              url: $rootScope.memberUrl+'add_mem_wishlist',
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
              data:form
          })
        },
        getWishList: function(page_no){

          console.log("Called Get Wish LiST")
          var form = new FormData();
          form.append('page_no',page_no);

          return $http({
              url: $rootScope.memberUrl+'product/get_all_mem_wishlists',
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
              data:form
          })
        },
        removeWishList: function(data){

          console.log("Called Remove Wish LiST")
          var form = new FormData();
          form.append('product_master_id',data.product_master_id);

          return $http({
              url: $rootScope.memberUrl+'remove_mem_wishlist',
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
              data:form
          })
        }
    }
  }
])
//product/get_all_mem_wishlists
.factory('GetBanner', ['$http','$rootScope',function($http,$rootScope){
    
    return {
        getBanner: function(data){
          return $http({
              url: $rootScope.baseUrl+'get_banner_categories',
              method: "GET"
          })
        }
    }
  }
])
.factory('Autosuggest', ['$http','$rootScope',function($http,$rootScope){
    
    return {
        getAutosuggest: function(searchTxt){
          var form = new FormData();
          form.append('auto_search',searchTxt);
          return $http({
              url: $rootScope.baseUrl+'autocomplete_search',
              method: "POST",
              data:form
          })
        }
    }
  }
])

.factory('SearchProductService', ['$http','$rootScope',function($http,$rootScope){
    
    return {
        searchProduct: function(searchTxt,page_no){

          console.log("searchTxt >> "+searchTxt);
          console.log("Page_no > "+page_no);
          var form = new FormData();
          form.append('product_name',searchTxt);
          form.append('page_no',page_no);

          if($rootScope.userData!= null && $rootScope.userData.rolecode == null){
            console.log("E-commerce user >>>");
            return $http({
                url: $rootScope.baseUrl+'product_search',
                method: "POST",
                headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
                data:form
            })
          }
          else if($rootScope.userData != null && $rootScope.userData.rolecode != null){
            console.log("Member is logged in");
            //product_search_mem
            return $http({
                url: $rootScope.memberUrl+'product_search_mem',
                method: "POST",
                headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
                data:form
            })

          }
          else{
            console.log("not logged");
            return $http({
                url: $rootScope.baseUrl+'search_product',
                method: "POST",
                data:form
            })
          }
        }
      }
  }
])

.factory('RegisterService', ['$http','$rootScope',function($http,$rootScope){
    
    return {
        Register: function(data){
          var form = new FormData();
          //console.log($rootScope.baseUrl+'customer_register?email_id='+data.email+'&mobile_no='+data.mobile+'&name='+data.fullname+'&password='+data.password);
          return $http({
              url: $rootScope.baseUrl+'customer_signup',
              method: "POST",
              contentType: false,
              mimeType: "multipart/form-data",
              data: form
          })
        }
    }
  }
])


.factory('MemberRegisterService', ['$http','$rootScope',function($http,$rootScope){
    
    return {
        Register: function(data){
          console.log("Called Member Register Service");
          console.log(JSON.stringify(data));

          var form = new FormData();
          form.append('sponser_bluepay_id',data.sponser_bluepay_id);
          form.append('sponserside',data.sponserside);
          form.append('epin_number',data.epin_number);
          form.append('name',data.name);
          form.append('dob',data.dob);
          form.append('gender',data.gender);
          form.append('email_id',data.email_id);
          form.append('phone',data.phone);
          form.append('nominee_name',data.nominee_name);
          form.append('nominee_relation',data.nominee_relation);

          return $http({
              url: $rootScope.memberUrl+'member_signup',
              method: "POST",
              data: form
          });
        },
        // member_otp_verify
        OTPVerification : function(data){
            console.log("Called Member OTP  Register Service");
            console.log(JSON.stringify(data));
              var form = new FormData();
              form.append('sponser_bluepay_id',data.sponser_bluepay_id);
              form.append('sponserside',data.sponserside);
              form.append('epin_number',data.epin_number);
              form.append('name',data.name);
              form.append('dob',data.dob);
              form.append('gender',data.gender);
              form.append('email_id',data.email_id);
              form.append('phone',data.phone);
              form.append('nominee_name',data.nominee_name);
              form.append('nominee_relation',data.nominee_relation);
              form.append('onetime_password',data.otp);

              return $http({
                  url: $rootScope.memberUrl+'member_otp_verify',
                  method: "POST",
                  data: form
              });
        }

    }
  }
])



.factory('ViewProfileService', ['$http','$rootScope',function($http,$rootScope){
    
    return {
        viewProfile: function(rolecode){
          var form = new FormData();
          //console.log($rootScope.baseUrl+'customer_register?email_id='+data.email+'&mobile_no='+data.mobile+'&name='+data.fullname+'&password='+data.password);
          var api;
          var myurl;
          if(rolecode == null){
            api = 'view_profile';
            myurl = $rootScope.baseUrl;
          }
          else{
            api = 'view_profile';
            myurl = $rootScope.memberUrl;
          }
          console.log(api+" @@@ "+myurl);

          return $http({
              url: myurl+api,
              method: "GET",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key}
          })
        }

    }
  }
])

.factory('OrderService', ['$http','$rootScope',function($http,$rootScope){
    return {
        getOrderHistory: function(page_no,rolecode){
          var form = new FormData();
          form.append("page_no", page_no);

          var api;
          var myurl;
          if(rolecode == null){
            api = 'get_order_history';
            myurl = $rootScope.baseUrl;
          }
          else{
            api = 'get_member_order_history';
            myurl = $rootScope.memberUrl;
          }
          console.log(myurl+"   / "+api);
          return $http({
              url: myurl+api,
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
              data: form
          })
        },
        getOrderTrack: function(docket_number){
          var form = new FormData();
          form.append("docket_number", 'ECZ21625');

          var api = 'track_my_shipping';
          var myurl = $rootScope.memberUrl;
          console.log(myurl+"   / "+api);
          return $http({
              url: myurl+api,
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
              data: form
          })
        }
    }
  }
])


.factory('CheckoutService',['$http','$rootScope','$httpParamSerializerJQLike',function($http,$rootScope,$httpParamSerializerJQLike){
  return{
    checkoutProduct : function(address,productData,shipping_boolean,shipping_cost,total_amount){
      // console.log("Address >>> "+JSON.stringify(address));
      // console.log("productData >>> "+JSON.stringify(productData));
      // console.log("Shipping Boolean >> "+shipping_boolean);
      // console.log("shipping_cost > "+shipping_cost);

      // console.log("total_amount >> "+total_amount);
      // console.log("length >> "+productData.length);
      // for(var i=0;i<productData.length;i++){
      //   console.log("Product >>"+JSON.stringify(productData[i]));
      // }

      var form = new FormData();

      form.append("first_name", address.firstName);
      form.append("last_name", address.lastName);
      form.append("mobile",address.mobileno)
      form.append("email",address.email);
      form.append("address",address.address);
      form.append("country",address.country);
      form.append("state",address.state);
      form.append("city",address.city);
      form.append("area",address.area);
      form.append("pincode",address.zip);
      form.append("comment",address.comment);
      form.append("landmark",address.landmark);
      form.append("shipping_cost",shipping_cost);
      form.append("total_amount",total_amount);
      form.append("shipping_boolean",shipping_boolean);
      form.append("product_details",JSON.stringify(productData));
      ///guest_checkout

      return $http({
        url:$rootScope.baseUrl+'guest_checkout',
        method:'POST',
        data:form
      });

    },
    onlineCheckout : function(address,shipping,productData,shipping_boolean,shipping_cost,total_amount2){

//    for(var k=0; k<productData.length; k++){
//    productData[k].procuct_headline.replace(/[\])}[{(]/g, '');
//    productData[k].product_code.replace(/[\])}[{(]/g, '');
//    }

    console.log("==> "+typeof(total_amount2))
    console.log("onlineCheckout total ==>"+total_amount2);
    //console.log("onlineCheckout productData ==>"+JSON.stringify(productData));
    console.log(address);
    console.log(shipping);
    var post_data = {};
   
    post_data.first_name = address.firstName;
     post_data.last_name= address.last_name;
     post_data.mobile= address.mobileno;
     post_data.email=address.email;
     post_data.address=address.address;
     post_data.country=address.country;
     post_data.state=address.state;
     post_data.city=address.city;
     post_data.area=address.area;
     post_data.pincode=address.zip;
     post_data.comment=address.comment;
     post_data.landmark=address.landmark;
     post_data.shipping_cost=0;
     post_data.total_amount=total_amount2;
     post_data.remarks = 'this is test';
     post_data.shipping_boolean = shipping_boolean;
     post_data.shipping_first_name = shipping.firstName;
     post_data.shipping_last_name=shipping.lastName;
     post_data.shipping_mobile=shipping.mobileno;
     post_data.shipping_email=shipping.email;
     post_data.shipping_address=shipping.address;
     post_data.shipping_country=shipping.country;
     post_data.shipping_state=shipping.state;
     post_data.shipping_city=shipping.city;
     post_data.shipping_area=shipping.area;
     post_data.shipping_pincode=shipping.zip;
     post_data.shipping_comment=shipping.comment;
     post_data.shipping_landmark=shipping.landmark;
     post_data.product_details=productData;
    
    function convertToparam(data){
      url = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
     }).join('&')
    return url;
    }

    //var pdata = convertToparam(post_data)+'&product_details='+JSON.stringify(productData);
  
    //console.log("POST_DATA ==>"+JSON.stringify(post_data));

      var form = new FormData();

      form.append("first_name", address.firstName);
      form.append("last_name", address.lastName);
      form.append("mobile",address.mobileno)
      form.append("email",address.email);
      form.append("address",address.address);
      form.append("country",address.country);
      form.append("state",address.state);
      form.append("city",address.city);
      form.append("area",address.area);
      form.append("pincode",address.zip);
      form.append("landmark",address.landmark);
      form.append("shipping_cost",0);
      form.append("total_amount",total_amount2);
	  form.append("remarks","this is test");
      form.append("shipping_boolean",shipping_boolean);
      form.append("shipping_first_name",shipping.firstName);
      form.append("shipping_last_name",shipping.lastName);
      form.append("shipping_mobile",shipping.mobileno)
      form.append("shipping_email",shipping.email);
      form.append("shipping_address",shipping.address);
      form.append("shipping_country",shipping.country);
      form.append("shipping_state",shipping.state);
      form.append("shipping_city",shipping.city);
      form.append("shipping_area",shipping.area);
      form.append("shipping_pincode",shipping.zip);
      form.append("shipping_comment",shipping.comment);
      form.append("shipping_landmark",shipping.landmark);
      form.append("company",1);
      form.append("transaction_id",1);
      form.append("bank_name",1);
      form.append("branch_location",1);
      form.append("transaction_date",1);
      form.append("transaction_date",1);
      form.append("transaction_date",1);
      form.append("product_details",JSON.stringify(productData));

      console.log("FORM DATA ==>"+JSON.stringify(form));
      console.log(form);

	//static data
//                            form.append("product_details",'[{"product_master_id":"612","old_card_is":"","card_no":"","is_reloadable_cards":"0","is_card":"","price_variant_qty":"","price_variant":"","options":"","product_category":"Women","product_sub_cat":"Footwear","discount_percentage":"0","usual_retail_price":"499.00","discounted_amount":499,"qty":1,"product_unique_id":"96470813","procuct_headline":"Stiletto Women Grey Flats","model_no":"","product_code":"","vendor_master_id":"32","shipping_cost":"60","internet_fee":0,"profit_card":"","bv_value":"10"},{"product_master_id":"611","old_card_is":"","card_no":"","is_reloadable_cards":"0","is_card":"","price_variant_qty":"","price_variant":"","options":"","product_category":"Women","product_sub_cat":"Footwear","discount_percentage":"0","usual_retail_price":"499.00","discounted_amount":499,"qty":1,"product_unique_id":"47619532","procuct_headline":"Stiletto Women White Heels","model_no":"","product_code":"","vendor_master_id":"32","shipping_cost":"60","internet_fee":0,"profit_card":"","bv_value":"20"}]');


      return $http({
        url:$rootScope.memberUrl+'bluepay_member_checkout',
        method:'POST',
        headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
        data:form
        });

    },
    neftCheckout : function(address,shipping,payment,productData,shippingboolean,shippingcost,total_amount3){

						console.log("neftCheckout total ==>"+total_amount3);
      console.log("neftCheckout productData ==>"+JSON.stringify(productData));

					var amount_total = parseInt(total_amount3);

      var form = new FormData();
      form.append("first_name",address.firstName);
      form.append("last_name",address.lastName);
      form.append("mobile",address.mobileno)
      form.append("email",address.email);
      form.append("address",address.address);
      form.append("country",address.country);
      form.append("state",address.state);
      form.append("city",address.city);
      form.append("area",address.area);
      form.append("pincode",address.zip);
      form.append("comment",address.comment);
      form.append("landmark",address.landmark);
      form.append("company",address.company);
      form.append("total_amount",amount_total);
      form.append("shipping_first_name",shipping.firstName);
      form.append("shipping_last_name",shipping.lastName);
      form.append("shipping_mobile",shipping.mobileno)
      form.append("shipping_email",shipping.email);
      form.append("shipping_address",shipping.address);
      form.append("shipping_country",shipping.country);
      form.append("shipping_state",shipping.state);
      form.append("shipping_city",shipping.city);
      form.append("shipping_area",shipping.area);
      form.append("shipping_pincode",shipping.zip);
      form.append("shipping_comment",shipping.comment);
      form.append("shipping_landmark",shipping.landmark);
      form.append("transaction_id",payment.transactionId);
      form.append("bank_name",payment.bankname);
      form.append("branch_location",payment.branchlocation)
      form.append("transaction_date",payment.transactiondate);
      form.append("shipping_cost",0);
      form.append("product_details",JSON.stringify(productData));
      //dummy product      
//      form.append("product_details",'[{"product_master_id":"389","is_reloadable_cards":"","old_card_is":"","card_no":"","profit_card":"","is_card":"","price_variant_qty":"","profit_card":"","options":"","price_variant":"", "shipping_cost":"0","internet_fee":"0", "vendor_master_id":"15", "product_category":"8", "product_sub_cat":"13", "usual_retail_price":"1", "discount_percentage":"0", "discounted_amount":"1","procuct_headline":"tes", "model_no":"1","product_code":"1","qty":"1","product_unique_id":"407239", "bv_value":"10"}]');



      //static shippingboolean from controllercheckout_paymentCtrl.js
      form.append("shipping_boolean",shippingboolean);
      return $http({
        url:$rootScope.memberUrl+'bluepay_member_neft_checkout',
        method:'POST',
        headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
        data:form
      })
    },
     MemberSignup : function(address,shipping,payment,productData,shippingboolean,shippingcost,total_amount){

          var form = new FormData();
          form.append("sponser_bluepay_id",address.firstName);
          form.append("sponserside",address.lastName);
          form.append("epin_number",address.mobileno)
          form.append("name",address.email);
          form.append("dob",address.address);
          form.append("gender",address.country);
          form.append("email_id",address.state);
          form.append("phone",address.city);
          form.append("nominee_name",address.area);
          form.append("nominee_relation",address.zip);
          return $http({
            url:$rootScope.memberUrl+'member_signup',
            method:'POST',
            headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
            data:form
          })
        }
  }
}])


.factory("WalletService",['$rootScope','$http',function($rootScope,$http){
    return{

      //http://admin.bluepaymax.com/bluepaymax_mobi_prabhs/member/wallet_statement
      getWallet : function(){
        //return $http.get($rootScope.memberUrl+"get_wallet?user_id="+$rootScope.userData.user_id+'&api_key='+$rootScope.userData.api_key);
      console.log($rootScope.memberUrl+"get_wallet")
        return $http({
          url:$rootScope.memberUrl+"get_wallet",
          method:'GET',
          headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key}
        })
      },
      getWalletStatement : function(page_no){

        console.log("Wallet page > "+page_no);

        var form = new FormData();
        form.append("page_no", page_no);
        return $http({
          url:$rootScope.memberUrl+"wallet_statement",
          method:'POST',
          headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
          data:form
        })
      }

    }
}])


.factory("CMSService",['$rootScope','$http',function($rootScope,$http){
    return{
      cms_data : function(cms_type){
        console.log("TYPE >> "+cms_type);
        var form = new FormData();
        form.append("cms_type", cms_type);
        return $http({
          url:$rootScope.baseUrl+"get_cms_contents",
          method:'POST',
          data:form
        })
      }

    }
}])

.factory("EpinService",['$rootScope','$http',function($rootScope,$http){
    return{
      epinlist : function(){        
        console.log("epin service");
        //var form = new FormData();
        //form.append("page_no":page_no);
        return $http({
          url:$rootScope.memberUrl+"get_epins",
          method:'POST',
          headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
          //data:form
        })
      }

    }
}])

.factory("PayoutinfoService",['$rootScope','$http',function($rootScope,$http){
    return{
      dailypayoutReport: function(){  
      //alert(page_no);
        console.log("dailypayoutReport");
        //var form = new FormData();
        //form.append("page_no":page_no);
        return $http({
          url:$rootScope.memberUrl+"payout_report",
          method:'POST',
          headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
          //data:form
        })
      },
      weeklypayoutReport: function(){ 
        //var form = new FormData();
        //form.append("page_no":page_no);       
        return $http({
          url:$rootScope.memberUrl+"weekly_payout_report",
          method:'POST',
          headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
          //data:form
        })
      }

    }
}])

.factory("purchasepayoutReport",['$rootScope','$http',function($rootScope,$http){
    return{
      dailypayoutReport: function(){  
      //alert(page_no);
        console.log("dailypayoutReport");
        //var form = new FormData();
        //form.append("page_no":page_no);
        return $http({
          url:$rootScope.memberUrl+"payout_report",
          method:'POST',
          headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
          //data:form
        })
      },
      weeklypayoutReport: function(){ 
        //var form = new FormData();
        //form.append("page_no":page_no);       
        return $http({
          url:$rootScope.memberUrl+"weekly_payout_report",
          method:'POST',
          headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
          //data:form
        })
      }

    }
}])


.factory('cardsService', ['$http','$rootScope',function($http,$rootScope){
    return {
        getProfitcards: function(){
          // console.log("getProfitcards called >>>>>>>>>>>>>>>>>>>>>>>");
          return $http({              
              url: $rootScope.baseUrl+'products/get_profit_cards',
              method: "POST"
              //data: form       
          });
        },
        
        get_yesbank_card:function(product_id){
          var form = new FormData();
          form.append("product_master_id", product_id);
          return $http({              
              url: $rootScope.memberUrl+'products/get_yesbank_card',
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
              data: form       
          });

        },
         get_hdfc_card:function(product_id){
          var form = new FormData();
          form.append("product_master_id", product_id);
          return $http({              
              url: $rootScope.memberUrl+'products/get_hdfc_card',
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
              data: form       
          });

        },
         get_nonreload_card:function(product_id){
          var form = new FormData();
          form.append("product_master_id", product_id);
          return $http({              
              url: $rootScope.memberUrl+'products/get_nonreload_card',
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
              data: form       
          });

        },

         get_fuel_card:function(product_id){
          var form = new FormData();
          form.append("product_master_id", product_id);
          return $http({              
              url: $rootScope.memberUrl+'products/get_fuel_card',
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
              data: form       
          });

        },
        
        getreloadYourcards: function(){
          // console.log("getreloadYourcards called >>>>>>>>>>>>>>>>>>>>>>>");
          //alert("service called");
          return $http({              
              url: $rootScope.memberUrl+'get_reloadable_cards',
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key}
              //data: form       
          });
        },
        getreloadFuelcards: function(){
         
          return $http({              
              url: $rootScope.memberUrl+'get_fuel_cards',
              method: "POST",
              headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key}
              //data: form       
          });
        }
    }
  }
])

.factory('OtpService', ['$rootScope','$http',function($rootScope, $http){    
    return {
                verifyOtp: function(otp,mobile){
                  var form = new FormData();
                  form.append("mobile_no", mobile);
                  form.append("onetime_pass", otp);
                  return $http({
                              url: $rootScope.baseUrl+'verify_otp',
                              method: "POST",                              
                              data: form
                              
                  });
                },
                resendOtp: function( mobile){
                  console.log('resend otp service>>>>>>>>>>>>>>>>');
                  var form = new FormData();
                  form.append("mobile_no", mobile);                 
                  return $http({
                              url: $rootScope.baseUrl+'resend_otp',
                              method: "POST",                              
                              data: form                              
                  });
                }
            }

 } 
])

.factory('LoginService', ['$http','$rootScope',function($http,$rootScope){
    
    return {
        Login: function(data,login_type){

          
          console.log("Login Type "+login_type);
          console.log("Data > "+JSON.stringify(data));
          
          var form = new FormData();
          form.append("login_id", data.login_id);
          form.append("password", data.password);

          if(login_type == 'member'){
            console.log("Called member")
            return $http({
                url: $rootScope.memberUrl+'member_login',
                method: "POST",
                data: form
            })
          }
          else{
            console.log("Called user");
            return $http({
                url: $rootScope.baseUrl+'customer_login',
                method: "POST",
                data: form
            })
          }
        }  
    }
  }
])

.factory('ForgotpassService', ['$http','$rootScope',function($http,$rootScope){
    return {
        Forgotpass: function(data){
          // console.log("ForgotpassService called >>>>>>>>>>>>>>>>>>>>>>>"); 
          var form = new FormData();
          form.append("email_id", data); 
          //alert(data);
          return $http({
              //url: $rootScope.baseUrl+'forgot_password',  //user forgot pass NOW ONLY FOR MEMBER
              url: $rootScope.memberUrl+'forgot_password',
              method: "POST",                              
              data: form       
          });
        }
    }
  }
])

.factory('ChangePasswordService', ['$http','$rootScope',function($http,$rootScope){
    return {
        changePassword: function(changePassword){
          console.log("password > "+JSON.stringify(changePassword));

          var form = new FormData();
          form.append("current_password", changePassword.oldPassword); 
          form.append("new_password", changePassword.pass1); 
          //alert(data);

          if($rootScope.userData.rolecode != null){
            return $http({
                url: $rootScope.memberUrl+'change_password',
                method: "POST",  
                headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},                            
                data: form   
            });
          }
          else{
            return $http({
                url: $rootScope.baseUrl+'change_password',
                method: "POST",  
                headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},                            
                data: form   
            });
          }

          
        }
    }
  }
])
