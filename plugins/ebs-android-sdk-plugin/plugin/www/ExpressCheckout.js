cordova.define("ebs-android-sdk-plugin.ExpressCheckout", function(require, exports, module) {
/**
* Main module that packs the payment functionality and success / failure callbacks
*/
var expressCheckout = {
    ABORTED: 'txn-aborted'
};

Object.defineProperty(expressCheckout, 'startCheckoutActivity', {
    enumerable: false,
    value: function(configs) {
        var requiredFields = [{
            key: 'onPaymentSuccess',
            validator: function (f) {
                return typeof f === 'function';
            }
        }, {
            key: 'onTransactionAborted',
            validator: function (f) {
                return typeof f === 'function';   
            }
        }, {
            key: 'parameters',
            validator: function (params) {
                var req = ['merchantId', 'algorithm', 'mode', 'txnAmt', 'refernceNo', 'failureId', 'currency', 'txnDescrip', 'billingEmail', 'billingName', 'billingAddress', 
                'billingCity', 'billingPostalCode', 'billingState', 'billingCountry', 'billingPhone', 'shippingEmail', 'shippingName', 'shippingAddress', 'shippingCity', 'shippingPostalCode',
                'shippingState', 'shippingCountry', 'shippingPhone', 'hidePaymentOpt', 'hideCreditCard', 'hideCashCard', 'hideDebitCard', 'hideNetBanking', 'hideStoredCard', 'customParam'];
                var isOk = true;
                for(var i in req) {
                    isOk = isOk && ((req[i] in params) && (params[req[i]]))
                }
                return isOk;
            }
        }];

        for(var e in requiredFields) {
            var field = requiredFields[e];
            if(!(field.key in configs) || !field.validator(configs[field.key])) {
                throw "Error: Please specify the following field: " + field.key;
            }
        }

        var options = [{
                'merchantId': configs.parameters.merchantId,
                'secretKey':configs.parameters.secretKey,
                'algorithm':configs.parameters.algorithm,
                'mode':configs.parameters.mode,
                'txnAmt':configs.parameters.txnAmt,
                'refernceNo':configs.parameters.refernceNo,
                'failureId':configs.parameters.failureId,
                'currency':configs.parameters.currency,
                'txnDescrip':configs.parameters.txnDescrip,
                'billingEmail':configs.parameters.billingEmail,
                'billingName':configs.parameters.billingName,
                'billingAddress':configs.parameters.billingAddress,
                'billingCity':configs.parameters.billingCity,
                'billingPostalCode':configs.parameters.billingPostalCode,
                'billingState':configs.parameters.billingState,
                'billingCountry':configs.parameters.billingCountry,
                'billingPhone':configs.parameters.billingPhone,
                'shippingEmail':configs.parameters.shippingEmail,
                'shippingName':configs.parameters.shippingName,
                'shippingAddress':configs.parameters.shippingAddress,
                'shippingCity':configs.parameters.shippingCity,
                'shippingPostalCode':configs.parameters.shippingPostalCode,
                'shippingState':configs.parameters.shippingState,
                'shippingCountry':configs.parameters.shippingCountry,
                'shippingPhone':configs.parameters.shippingPhone,
                'hidePaymentOpt':configs.parameters.hidePaymentOpt,
                'hideCreditCard':configs.parameters.hideCreditCard,
                'hideCashCard':configs.parameters.hideCashCard,
                'hideDebitCard':configs.parameters.hideDebitCard,
                'hideNetBanking':configs.parameters.hideNetBanking,
                'hideStoredCard':configs.parameters.hideStoredCard,
                'customParam':configs.parameters.customParam
            }];
    
        cordova.exec(
            configs.onPaymentSuccess,
            configs.onTransactionAborted,
            "ExpressCheckout",
            "EBSStartPayment",
            options
        );
    }
});

if('freeze' in Object && typeof Object.freeze === 'function') {
    expressCheckout = Object.freeze(expressCheckout);
}

module.exports = expressCheckout;
});
