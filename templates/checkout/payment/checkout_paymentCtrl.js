angular.module('starter.controllers')
.controller('checkoutPaymentCtrl', function($scope,$rootScope,$ionicLoading, $cordovaDatePicker,$ionicHistory,$cordovaToast,$state,Product,CheckoutService,$http,$timeout) {
scope = $scope;
    root = $rootScope;
  $rootScope.countryArr = [{'id':'USA','name':'United States'}, {'id':'SAU','name':'Saudi Arabia'}, {'id':'NPL','name':'Nepal'}, {'id':'GBR','name':'United Kingdom'},{'id':'CHN','name':'China'},{'id':'CAN','name':'Canada'},{'id':'IND','name':'India'},{'id':'JPN','name':'Japan'}];
$scope.orderMessage = "";
  console.log("called Checkout checkoutPaymentCtrl");
  $scope.showLoading = function() {
      $ionicLoading.show({ 
        template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
    };
    $scope.hideLoading = function(){
      $ionicLoading.hide();
    };
  $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
  $scope.checkoutProduct = $rootScope.checkoutProduct;    
  $rootScope.orderProduct = JSON.parse(localStorage.getItem('orderProductList')) || [];
  console.log("orderProduct >> "+JSON.stringify($rootScope.orderProduct));
  //alert("orderProduct >> "+JSON.stringify($rootScope.orderProduct));
   $scope.payment={
     bankname:"ICICI"
   };  
   $scope.paymentoptionList = [
    { text: "Online Payment", value: "1" },
    { text: "Neft", value: "2" }
    ];
   $scope.paymentdata = {
    //selectedopt: '1'   //default seleceted payment option
   };
   $scope.showSelectValue = function(opt) {
    //alert($scope.bankname);
    $scope.bankname = opt;
   } 
   $scope.showDatePicker = function(){
     var options = {
      date: new Date(),
      mode: 'date', // or 'time'
      maxDate: new Date() - 10000,
      allowOldDates: true,
      allowFutureDates: false,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };
    document.addEventListener("deviceready", function () {
      $cordovaDatePicker.show(options).then(function(date){
          $scope.payment.transactiondate = date.getDate() +"/"+date.getMonth()+1+"/"+date.getFullYear();
      });
    }, false);
  }


            $scope.onlineCheckoutProductDetail = function(){
            var total_amount = 0;
            var shipping_cost = 0;
            $scope.productData = [];
            var checkoutProduct = $rootScope.checkoutProduct;
//            console.log("onlineCheckoutProductDetail ==>"+JSON.stringify(checkoutProduct));


            for(var i=0; i<checkoutProduct.length;i++){
            total_amount += checkoutProduct[i].discounted_amount * checkoutProduct[i].qty;
            if(checkoutProduct[i].shipping_cost!=null){
            shipping_cost += checkoutProduct[i].shipping_cost;
            }
            $scope.productData.push({
                                    "product_master_id":checkoutProduct[i].product_master_id,
                                    "old_card_is":"",
                                    "card_no":"",
                                    "is_reloadable_cards":"0",
                                    "is_card":"",
                                    "price_variant_qty":"",
                                    "price_variant":"",
                                    "options":"",
                                    "product_category":checkoutProduct[i].product_category,
                                    "product_sub_cat":checkoutProduct[i].product_sub_cat,
                                    "discount_percentage":checkoutProduct[i].discount_percentage,
                                    "usual_retail_price":checkoutProduct[i].usual_retail_price,
                                    "discounted_amount":checkoutProduct[i].discounted_amount,
                                    "qty":checkoutProduct[i].qty,
                                    "product_unique_id":checkoutProduct[i].product_unique_id,
                                    "procuct_headline":checkoutProduct[i].product_headline,
                                    "model_no":checkoutProduct[i].model_no,
                                    "product_code":checkoutProduct[i].product_code,
                                    "vendor_master_id":checkoutProduct[i].vendor_master_id,
                                    "shipping_cost":checkoutProduct[i].shipping_cost,
                                    "internet_fee":checkoutProduct[i].internet_fee,
                                    "bv_value":checkoutProduct[i].product_bv_value,
                                    "profit_card":""
                                    });

            }

            };
  $scope.nefttotal_amount='';
  $scope.neftshipping_cost='';
  $scope.neftproductdetails= function(){
        var total_amount = 0;
        var shipping_cost = 0;
        $scope.productData = [];
        var checkoutProduct = $rootScope.checkoutProduct;
        //dummy data
        //var checkoutProduct =[{"product_master_id":"389","is_reloadable_cards":"","old_card_is":"","card_no":"","profit_card":"","is_card":"","price_variant_qty":"","profit_card":"","options":"","price_variant":"", "shipping_cost":"0","internet_fee":"0", "vendor_master_id":"15", "product_category":"8", "product_sub_cat":"13", "usual_retail_price":"1", "discount_percentage":"0", "discounted_amount":"1","procuct_headline":"tes", "model_no":"1","product_code":"1","qty":"1","product_unique_id":"407239", "bv_value":"10"}];

        console.log("neftproductdetails ==>"+JSON.stringify(checkoutProduct));
        for(var i=0; i<checkoutProduct.length;i++){
          total_amount += checkoutProduct[i].discounted_amount * checkoutProduct[i].qty;
          if(checkoutProduct[i].shipping_cost!=null){
            shipping_cost += checkoutProduct[i].shipping_cost;
          }
          $scope.productData.push({
            "product_master_id":checkoutProduct[i].product_master_id,
            "old_card_is":"",
            "card_no":"",
            "is_reloadable_cards":"0",
            "is_card":"",
            "price_variant_qty":"",
            "price_variant":"",
            "options":"",
            "product_category":checkoutProduct[i].product_category,
            "product_sub_cat":checkoutProduct[i].product_sub_cat,
            "discount_percentage":checkoutProduct[i].discount_percentage,
            "usual_retail_price":checkoutProduct[i].usual_retail_price, 
            "discounted_amount":checkoutProduct[i].discounted_amount,
            "qty":checkoutProduct[i].qty,
            "product_unique_id":checkoutProduct[i].product_unique_id,
            "procuct_headline":checkoutProduct[i].product_headline,
            "model_no":checkoutProduct[i].model_no,
            "product_code":checkoutProduct[i].product_code,
            "vendor_master_id":checkoutProduct[i].vendor_master_id, 
            "shipping_cost":checkoutProduct[i].shipping_cost,
            "internet_fee":checkoutProduct[i].internet_fee,
            "bv_value":checkoutProduct[i].product_bv_value,
            "profit_card":""
          });

            if(i == $scope.checkoutProduct.length-1){
            // alert(JSON.stringify($scope.productData))
            //alert(JSON.stringify($scope.productData.bv_value));
            $scope.nefttotal_amount=total_amount;
            $scope.neftshipping_cost=shipping_cost;
            }
        }
    }

    $scope.saveMember = function(){

    MemberRegisterService.Register($rootScope.member).success(function(res){
                console.log("Success Member Register >>> "+JSON.stringify(res));
                $ionicLoading.hide();
                //alert(JSON.stringify(res));
                $state.go('member_otp');

            }).error(function(err){
                console.log("Erro >>> "+JSON.stringify(err));
                $ionicLoading.hide();
                 //alert(JSON.stringify(err));
                if(err.code == 400){
                   if(err.sponser_bluepay_id != null){
                        $scope.msg = err.sponser_bluepay_id;
                   }
                   else if(err.sponserside != null){
                        $scope.msg = err.sponserside;
                   }
                   else if(err.epin_number != null){
                        $scope.msg = err.epin_number;
                   }
                   else if(err.phone != null){
                        $scope.msg = err.phone;
                   }
                }
            })
    };

            $scope.parseUrl = function(url){
            var queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;

            if (query === url || query === "") return;

            for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);

            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
            }
            return parms;
            };

            $scope.postTransaction = function(successUrl,order_id,reference_no,order_status_id,account_id){

            console.log("successUrl ==>"+successUrl);

            $scope.showLoading();

            var objSuccess = $scope.parseUrl(successUrl);

            for (var key in objSuccess) {
            objSuccess[key] = objSuccess[key][0];

            if(key == "Description"){
            delete objSuccess[key];
            }
            if(key == "PaymentMethod"){
            delete objSuccess[key];
            }
            if(key == "RequestID"){
            delete objSuccess[key];
            }

            }
            objSuccess['AccountID'] = account_id;

            var temp = [];
            temp.push(objSuccess)
												console.log("Transaction_details ==>"+JSON.stringify(objSuccess));

            var form = new FormData();
            form.append("order_id", order_id);
            form.append("reference_no", reference_no);
            form.append("order_status_id",order_status_id)
            form.append("transaction_details",JSON.stringify(temp));

            console.log("post_data ==>"+form);
            console.log("user-id ==>"+$rootScope.userData.user_id);
            console.log("Api-Key ==>"+$rootScope.userData.api_key);

            var req = {
            method: "POST",
            headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
            url: $rootScope.memberUrl+"/post_transaction_details",
            data:form
            };
            $http(req)
            .success(function(data, status, headers, config){
                     $ionicLoading.hide();
                     console.log("success ==>"+JSON.stringify(data))

                     if(data.code == 200 || data.code == "200"){
                     $state.go("checkout_message_success");
                     console.log(data.order_details.message)

                     localStorage.setItem("message",data.order_details.message);


                     setTimeout(function(){
                                var msg =  localStorage.getItem("message");
                                 document.getElementById("msg_success").innerHTML = msg;
                                },200);

                     }else{

																						$state.go("checkout_message_fail");

                      localStorage.setItem("message",data.message);

                     setTimeout(function(){
                                var msg =  localStorage.getItem("message");
                                document.getElementById("msg_failed").innerHTML = msg;
                                },200);


                     }

                     })
            .error(function(data, status, headers, config) {
                   $ionicLoading.hide();
                   console.log("error ==>"+JSON.stringify(data))
                   });

            };
            $scope.postTransactionPlugin = function(response,resorce) {

                console.log("++++++++++++");
                console.log(response);
                console.log("++++++++++++");
                console.log(resorce);
                console.log("++++++++++++");
                
                 for (var key in response) {
                    response[key] = response[key][0];

                    if(key == "Description"){
                      delete response[key];
                    }
                    if(key == "PaymentMethod"){
                      delete response[key];
                    }
                    if(key == "RequestID"){
                      delete response[key];
                    }
              }
              response['AccountID'] = resorce.account_id;

            var temp = [];

            temp.push(JSON.parse(response));
                        console.log("Transaction_details ==>"+JSON.stringify(response));
                var form = new FormData();
                form.append("order_id", resorce.order_id);
                form.append("reference_no", resorce.reference_no);
                form.append("transaction_details",JSON.stringify(temp));

                console.log("post_data ==>" + form);
                console.log("user-id ==>" + $rootScope.userData.user_id);
                console.log("Api-Key ==>" + $rootScope.userData.api_key);

                var req = {
                    method: "POST",
                    headers:{'User-Id':$rootScope.userData.user_id, 'Api-Key':$rootScope.userData.api_key},
                    url: $rootScope.memberUrl + "/post_transaction_details",
                    data: form
                };
                $http(req)
                    .success(function(data, status, headers, config) {
                        $ionicLoading.hide();
                        console.log("success in  post_transaction_details  ==>" + JSON.stringify(data))

                        if (data.code == 200 || data.code == "200") {
                            $state.go("checkout_message_success");
                            console.log(data.order_details.message)

                            localStorage.setItem("message", data.order_details.message);
                            setTimeout(function() {
                                var msg = localStorage.getItem("message");
                                document.getElementById("msg_success").innerHTML = msg;
                            }, 200);

                        } else {

                            $state.go("checkout_message_fail");

                            localStorage.setItem("message", data.message);

                            setTimeout(function() {
                                var msg = localStorage.getItem("message");
                                document.getElementById("msg_failed").innerHTML = msg;
                            }, 200);


                        }

                    })
                    .error(function(data, status, headers, config) {
                        $ionicLoading.hide();
                        console.log("error ==>" + JSON.stringify(data))
                        $state.go("checkout_message_fail");

                            localStorage.setItem("message", data.message);

                            setTimeout(function() {
                                var msg = localStorage.getItem("message");
                                document.getElementById("msg_failed").innerHTML = msg;
                            }, 200);
                    });
                console.log("++++++++++++");
            };
            $scope.openPaymentView = function(webviewLink,order_id,reference_no,order_status_id,account_id){
            var ref = window.open(webviewLink,'_blank','location=no');
            var myCallback =  function(event) {

            var current_url = event.url;

            console.log(event.type);
            console.log(event.url);
            if(event.type == "loadstop" || event.type == "Loadstop" || event.type == "LOADSTOP"){

            if(event.url.match("https://www.bluepaymax.com/order_success")) {
             ref.close();

            $scope.postTransaction(current_url,order_id,reference_no,order_status_id,account_id);


            } else if(event.url.match("https://www.bluepaymax.com/order_failure")) {

            ref.close();

            $scope.postTransaction(current_url,order_id,reference_no,order_status_id,account_id);
            }

            }else{

            }
            };

            ref.addEventListener('loadstop', myCallback);
            ref.addEventListener('loaderror',myCallback);
            ref.addEventListener('exit',myCallback);
            
            };



  $scope.completeOrder = function(){
      //alert("heel");
      console.log("hello");
    //alert(JSON.stringify($scope.paymentdata));
    if($scope.paymentdata.selectedopt=='' || $scope.paymentdata.selectedopt ==null || $scope.paymentdata.selectedopt==undefined){
      $cordovaToast.showShortCenter("please select payment option").then(function(success) {
          //on success 
          return;
      }, function (error) {
          // error
      });
    }
    //IF selected online payment 
    if($scope.paymentdata.selectedopt=='1'){
      //alert("1 ONLINE selected");
      if($rootScope.address=='' || $rootScope.address==null ||$rootScope.address==undefined){
        $cordovaToast.showShortCenter("Finishing Order requires billing info please complete billing info first").then(function(success) {
            //on success 
            return;
        }, function (error) {
            // error
        });
      }
      //shipping info
      
      if($rootScope.shipping=='' || $rootScope.shipping==null ||$rootScope.shipping==undefined){
        //dummy data
        /*$rootScope.shipping ={
        firstName: "test",
        lastName:"testlast",
        mobileno:"9874561235",
        email:"test@gmail.complete",
        address :"address",
        country :"country",
        state:"state",
        city:"city",
        area:"area",
        zip:"987412",
        comment:"comment",
        landmark:"landmark"
        }*/
        $cordovaToast.showShortCenter("Finishing Order requires shipping info please complete shipping info first").then(function(success) {
            //on success 
            return;
        }, function (error) {
            // error
        });
      }
      else{

        $scope.onlineCheckoutProductDetail();
        $scope.showLoading();
//        alert(JSON.stringify($scope.productData));
        console.log("=====>"+JSON.stringify($scope.productData));
        CheckoutService.onlineCheckout($rootScope.address,$rootScope.shipping,$scope.productData,"yes",$scope.onlineshipping_cost,$rootScope.totalCardAmount).success(function(response){
            console.log("hello ==>"+JSON.stringify(response));
            $scope.hideLoading();

            if(response.code==200 && response.error==false){             
              $scope.onlineres= response.order_details;




              //dummy url https://www.bluepaymax.com/dummy.php?
//              var total = 190.889.toFixed(); //send in this format 191 and not 191.00
//              window.open('http://www.mibluepay.com/bluepaymax_mobi_prabhs/member/get_params?account_id='+16782+'&address='+$rootScope.address.address+'&amount='+total+'&bank_code='+''+'&card_brand='+''+'&channel='+0+'&city='+$rootScope.address.city+'&country='+$rootScope.address.country+'&currency='+'INR'+'&description='+''+'&display_currency='+'INR'+'&email='+$rootScope.address.email+'&emi='+''+'&mode='+'LIVE'+'&name='+$rootScope.address.firstName+'&page_id='+5205+'&payment_mode='+''+'&payment_option='+''+'&phone='+$rootScope.address.mobileno+'&postal_code='+$rootScope.address.zip+'&reference_no='+$scope.onlineres.reference_no+'&return_url='+$scope.onlineres.return_url+'&ship_address='+$rootScope.shipping.address+'&ship_city='+$rootScope.shipping.city+'&ship_country='+$rootScope.shipping.country+'&ship_name='+$rootScope.shipping.firstName+'&ship_phone='+$rootScope.shipping.mobileno+'&ship_postal_code='+$rootScope.shipping.zip+'&ship_state='+$rootScope.shipping.state+'&state='+''+'&secure_hash='+'','_system', 'location=yes');
//              return false;
              //window.open(hupp.in.php+'?'account_id+'&'+address+'&'+amount+'&'+bank_code+'&'+card_brand+'&'+channel+'&'+city+'&'+country+'&'+currency+'&'+description+'&'+display_currency+'&'+email+'&'+emi+'&'+mode+'&'+name+'&'+page_id+'&'+payment_mode+'&'+payment_option+'&'+phone+'&'+postal_code+'&'+reference_no+'&'+return_url+'&'+ship_address+'&'+ship_city+'&'+ship_country+'&'+ship_name+'&'+ship_phone+'&'+ship_postal_code+'&'+ship_state+'&'+state+'&'+secure_hash, '_system', 'location=yes');
              //window.open(hupp.in.php+'?'account_id+'&'+$rootScope.address.address+'&'+amount+'&'+bank_code+'&'+card_brand+'&'+channel+'&'+city+'&'+country+'&'+currency+'&'+description+'&'+display_currency+'&'+email+'&'+emi+'&'+mode+'&'+name+'&'+page_id+'&'+payment_mode+'&'+payment_option+'&'+phone+'&'+postal_code+'&'+reference_no+'&'+return_url+'&'+ship_address+'&'+ship_city+'&'+ship_country+'&'+ship_name+'&'+ship_phone+'&'+ship_postal_code+'&'+ship_state+'&'+state+'&'+secure_hash, '_system', 'location=yes');
              /*var url ='https://hupp.in/dummy.php?'+'account_id'+'&'+'$rootScope.address.address'+'&'+'790'+'&'+'bank_code'+'&'+'card_brand'+'&'+'channel'+'&'+'$rootScope.address.city'+'&'+'$rootScope.address.country'+'&'+
              'currency'+'&'+"description"+'&'+'display_currency'+'&'+'$rootScope.address.email'+'&'+"emi"+'&'+'mode'+'&'+'$rootScope.address.firstName'+'&'+
              'page_id'+'&'+"payment_mode"+'&'+'payment_option'+'&'+'$rootScope.address.mobileno'+'&'+'$rootScope.address.zip'+'&'+
              '$scope.onlineres.reference_no'+'&'+'$scope.onlineres.return_url'+'&'+'$rootScope.shipping.address'+'&'+'$rootScope.shipping.city'+'&'+
              '$rootScope.shipping.country'+'&'+'$rootScope.shipping.firstName'+
              '&'+'$rootScope.shipping.mobileno'+'&'+'$rootScope.shipping.zip'+'&'+'$rootScope.shipping.state'+'&'+
              'state'+'&'+'$scope.onlineres.secure_hash'*/              
              //window.open('url', '_system', 'location=yes');                      


							console.log("shipping ==>"+JSON.stringify($rootScope.shipping));
							var blank_string= "";
              var initial_url = $scope.onlineres.initial_url;
              var return_url = $scope.onlineres.return_url;
              var ebs_url = $scope.onlineres.ebs_url;
              var order_status_id = $scope.onlineres.order_status_id;
              var order_status = $scope.onlineres.order_status;
              var account_id = $scope.onlineres.account_id;
              var channel = $scope.onlineres.channel;
              var unique_bookingid = $scope.onlineres.unique_bookingid;
              var page_no = $scope.onlineres.page_no;
              var description = $scope.onlineres.description;
              var merchantId=account_id;
              var secretKey="497bacbab6bd63c80151cc84aea90251";
              var algorithm="SHA512";
              var mode= $scope.onlineres.mode; //"Test";
              var txnAmt = $scope.onlineres.total_product_amt;
              var refernceNo= $scope.onlineres.reference_no;
              var failureId="1";
              var currency="INR";
              var txnDescrip= $scope.onlineres.order_id;
              var billingEmail=$scope.onlineres.billingEmail;
              var billingName=$scope.onlineres.billingName;
              var billingAddress=$scope.onlineres.billingAddress;
              var billingCity=$scope.onlineres.billingCity;
              var billingPostalCode=$scope.onlineres.billingPostalCode;
              var billingState= $scope.onlineres.billingState;
              var billingCountry=$scope.onlineres.billingCountry;
              var billingPhone=$scope.onlineres.billingPhone;
              var shippingEmail=$scope.onlineres.shippingEmail;
              var shippingName=$scope.onlineres.shippingName;
              var shippingAddress=$scope.onlineres.shippingAddress;
              var shippingCity=$scope.onlineres.shippingCity;
              var shippingPostalCode=$scope.onlineres.shippingPostalCode;
              var shippingState=$scope.onlineres.shippingState;
              var shippingCountry= $scope.onlineres.shippingCountry;
              var shippingPhone= $scope.onlineres.shippingPhone;

              var hidePaymentOpt="false";
              var hideCreditCard="false";
              var hideCashCard="false";
              var hideDebitCard="false";
              var hideNetBanking="false";
              var hideStoredCard="false";
              var customParam = {'account_details': 'saving','merchant_type': 'gold'};


//https://www.mibluepay.com/ebs/pay.php?channel=0&account_id=16782...... and so on
//var webView_url = ebs_url+"?order_status_id="+order_status_id+"&total_product_amt="+txnAmt+"&order_status="+order_status+"&account_id="+account_id+"&channel="+channel+"&unique_bookingid="+unique_bookingid+"&total_amount="+txnAmt+"&mode="+mode+"&page_no="+page_no+"&payment_mode="+blank_string+"&description="+description+"&txnAmt="+txnAmt+"&billingEmail="+billingEmail+"&billingName="+billingName+"&billingAddress="+billingAddress+"&billingCity="+billingCity+"&billingPostalCode="+billingPostalCode+"&billingState="+billingState+"&billingCountry="+billingCountry+"&billingPhone="+billingPhone+"&shippingEmail="+shippingEmail+"&shippingName="+shippingName+"&shippingAddress="+shippingAddress+"&shippingCity="+shippingCity+"&shippingPostalCode="+shippingPostalCode+"&shippingState="+shippingState+"&shippingCountry="+shippingCountry+"&shippingPhone="+shippingPhone+"&reference_no="+refernceNo;

                console.log("mode ==>"+mode);
                console.log("txnAmt ==>"+txnAmt);
                console.log("refernceNo ==>"+refernceNo);
                console.log("txnDescrip ==>"+txnDescrip);
                console.log("billingEmail ==>"+billingEmail);
                console.log("billingName ==>"+billingName);
                console.log("billingAddress ==>"+billingAddress);
                console.log("billingCity ==>"+billingCity);
                console.log("billingPostalCode ==>"+billingPostalCode);
                console.log("billingState ==>"+billingState);
                console.log("billingCountry ==>"+billingCountry);

                console.log("shippingEmail ==>"+shippingEmail);
                console.log("shippingName ==>"+shippingName);
                console.log("shippingAddress ==>"+shippingAddress);
                console.log("shippingCity ==>"+shippingCity);
                console.log("shippingPostalCode ==>"+shippingPostalCode);
                console.log("shippingState ==>"+shippingState);
                console.log("shippingCountry ==>"+shippingCountry);
                console.log("shippingPhone ==>"+shippingPhone);





               // $scope.openPaymentView(webView_url,txnDescrip,refernceNo,order_status_id,account_id);



                         ExpressCheckout.startCheckoutActivity({
                             "onPaymentSuccess": function (response) {
                                               var json = JSON.parse(response);
                                                                  console.log("onPaymentSuccess ==>"+response);
                                                                  var PaymentStatus = json["PaymentStatus"];
                                                                 if( PaymentStatus == "Authorized") {

                                                                      $scope.postTransactionPlugin(response,$scope.onlineres);
                                                                       // localStorage.setItem("addToCardProduct",JSON.stringify([]));
                                                                       localStorage.removeItem("addToCardProduct");
                                                                        delete $rootScope.cartProducts;
                                                                        $rootScope.cartProducts = [];
                                                                 }
                                                                 else {
                                                                     $scope.postTransactionPlugin(response,$scope.onlineres);
                                                                 alert("Transaction aborted");
                                                                    // gotoFailurePage()
                                                                 }
                                                             },
                            "onTransactionAborted": function (aborted) {
                                                                     $scope.postTransactionPlugin(aborted,$scope.onlineres);
                                                                    alert("Transaction aborted");
                                                                 },
                                         "parameters": {
                                             "merchantId":merchantId,
                                             "secretKey":secretKey,
                                             "algorithm":algorithm,
                                             "mode":mode,
                                             "txnAmt":txnAmt,
                                             "refernceNo":refernceNo,
                                             "failureId":failureId,
                                             "currency":currency,
                                             "txnDescrip":txnDescrip,
                                             "billingEmail":billingEmail,
                                             "billingName":billingName.trim(),
                                             "billingAddress":billingAddress,
                                             "billingCity":billingCity,
                                             "billingPostalCode":billingPostalCode,
                                             "billingState":billingState,
                                             "billingCountry":'IND',
                                             "billingPhone":billingPhone,
                                             "shippingEmail":shippingEmail,
                                             "shippingName":shippingName,
                                             "shippingAddress":shippingAddress,
                                             "shippingCity":shippingCity,
                                             "shippingPostalCode":shippingPostalCode,
                                             "shippingState":shippingState,
                                             "shippingCountry":'IND',
                                             "shippingPhone":shippingPhone,
                                             "hidePaymentOpt":hidePaymentOpt,
                                             "hideCreditCard":hideCreditCard,
                                             "hideCashCard":hideCashCard,
                                             "hideDebitCard":hideDebitCard,
                                             "hideNetBanking":hideNetBanking,
                                             "hideStoredCard":hideStoredCard,
                                             "customParam":customParam,
                                             "channel": 0
                                         }
                                     });
            }
        }).error(function(err){
            $scope.hideLoading();
            console.log("API 2= ==>"+JSON.stringify(err));
//            alert(JSON.stringify(err));
            $cordovaToast.showShortCenter("Error").then(function(success) {
              //on success 
            }, function (error) {
                // error
            });
        })
      }
    }
    //IF selected NEFT payment
    if($scope.paymentdata.selectedopt=='2'){
      //alert("2 NEFT selected");    
      console.log("NEFT payment selected");
      //alert(JSON.stringify($scope.payment));

      if($rootScope.address=='' || $rootScope.address==null ||$rootScope.address==undefined){
        $cordovaToast.showShortCenter("Finishing Order requires billing info please complete billing info first").then(function(success) {
            //on success 
           
        }, function (error) {
            // error
        });
         return;
      }
      if($rootScope.shipping=='' || $rootScope.shipping==null ||$rootScope.shipping==undefined){
        //dummy data
        //$rootScope.shipping ={
        //firstName: "test",
        //lastName:"testlast",
        //mobileno:"9874561235",
        //email:"test@gmail.complete",
        //address :"address",
        //country :"country",
        //state:"state",
        //city:"city",
        //area:"area",
        //zip:"987412",
        //comment:"comment",
        //landmark:"landmark"
        //}
        $cordovaToast.showShortCenter("Finishing Order requires shipping info please complete shipping info first").then(function(success) {
            //on success 
           
        }, function (error) {
            // error
        });
         return;
      }
      if($scope.payment.transactionId=='' || $scope.payment.transactionId==null ||$scope.payment.transactionId==undefined){
        $cordovaToast.showShortCenter("Please enter transaction id").then(function(success) {
            //on success 
            
        }, function (error) {
            // error
        });
        return;
      }
      if($scope.payment.bankname=='' || $scope.payment.bankname==null ||$scope.payment.bankname==undefined){
        $cordovaToast.showShortCenter("Please select bank name").then(function(success) {
            //on success 
           
        }, function (error) {
            // error
        });
         return;
      }
      if($scope.payment.branchlocation=='' || $scope.payment.branchlocation==null ||$scope.payment.branchlocation==undefined){
        $cordovaToast.showShortCenter("Please enter branch location").then(function(success) {
            //on success 
            
        }, function (error) {
            // error
        });
        return;
      }
      if($scope.payment.transactiondate=='' || $scope.payment.transactiondate==null ||$scope.payment.transactiondate==undefined){
        $cordovaToast.showShortCenter("Please select transaction date").then(function(success) {
            //on success 
           
        }, function (error) {
            // error
        });
         return;
      }
      else{
        //static param shipping boolean 
        $scope.showLoading();
        $rootScope.payment = $scope.payment;
        $scope.neftproductdetails();
          //alert($scope.nefttotal_amount);
          //alert($scope.neftshipping_cost);
        CheckoutService.neftCheckout($rootScope.address,$rootScope.shipping,$rootScope.payment,$scope.productData,"true",$scope.neftshipping_cost,$scope.nefttotal_amount).success(function(response){
//          alert(JSON.stringify(response));
          console.log("hello ==>"+JSON.stringify(response));
          $scope.hideLoading();   
          if(response.code==200 && response.error==false){
            $cordovaToast.showShortCenter(response.order_details.message).then(function(success) {
              //on success 
            }, function (error) {
                // error
            }); 
          }
        }).error(function(err){
          $scope.hideLoading();
//										alert(JSON.stringify(err));
          $cordovaToast.showShortCenter("Error").then(function(success) {
            //on success 
          }, function (error) {
              // error
          });
        })      
      }
    }
  }
})
