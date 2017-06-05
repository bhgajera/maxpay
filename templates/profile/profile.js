angular.module('starter.controllers')

// Home controller
.controller('viewProfileCtrl', function($scope, $rootScope,ViewProfileService, Product,$cordovaToast, $ionicLoading,$ionicHistory, $ionicNavBarDelegate,$state, $stateParams, $cordovaCamera, $ionicActionSheet) {      
    console.log("Called profile");
    $scope.showLoading = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="spiral"></ion-spinner>'
      });
    };
    $scope.hideLoading = function(){
      $ionicLoading.hide();
    };
    $rootScope.userData = JSON.parse(localStorage.getItem("userData")) || null;
    $scope.profile_picture = localStorage.getItem("profilephoto");
    // Fetch From api


    $scope.viewProfile = function(){
        $scope.showLoading();
        ViewProfileService.viewProfile($rootScope.userData.rolecode).success(function(res){
            console.log("Fetch Profile >> "+JSON.stringify(res));
            //alert(JSON.stringify(res));
            $scope.hideLoading();
            $scope.profileData = res.output;
        }).error(function(err){
            $scope.hideLoading();
            console.log("Error >> "+JSON.stringify(err));
        })
    	
    }
    $scope.viewProfile();
    
    var openGallary = function(){
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
       console.log("openGallary Image >>>>>>>>>><<<<<< "+imageData); // Encode URI to Base64 needed for contacts plugin        
                //alert("openGallary Image >>>>>>>>>><<<<<< "+JSON.stringify(imageData));
                $scope.profile_picture = imageData;
                localStorage.setItem("profilephoto",imageData);
                // function for uploadProfile() 
                $scope.$apply();
      }, function(err) {
        // error
      });
   }


   var takePicture = function(){
          $cordovaCamera.cleanup()
          var options = {
            quality: 100,            
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight:300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            correctOrientation:true
          };
          $cordovaCamera.getPicture(options).then(function(imageData) {
                //var picture = "data:image/jpeg;base64,"+imageData;         
                if(imageData != undefined){
                  $scope.profile_picture = imageData;
                  localStorage.setItem("profilephoto",imageData);
                  //// function for uploadProfile() 
                }
               
          }, function(err) {
              console.log("take picture err >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
              console.log(err);
          });
    }      
    $scope.changeProfile = function(type){        
      console.log("Called Select selectMedia");
        $scope.hideSheet = $ionicActionSheet.show({     //show action sheet to choose action
              buttons: [
                  { text: 'Take photo' },
                  { text: 'Select from Gallary' }
                ],
                titleText: 'Add Profile Photo',
                cancelText: 'Cancel',
                buttonClicked: function(index) {      //call action method on base
                    if(index === 1){
                        openGallary();                      
                        return true;
                    }
                    if(index === 0){
                      takePicture();                     
                      return true;
                    }
                }
          });
    }
})
