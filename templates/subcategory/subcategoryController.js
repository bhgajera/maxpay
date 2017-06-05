angular.module('starter.controllers')
.controller('subcategoryCtrl', function($scope,$rootScope,$cordovaToast,$state,Product,CategoryService) {
  //alert("sub cat ctrl");
  $scope.subcategory = $rootScope.subcategoryy || [];  
  $rootScope.subcategoryy = undefined;  
  //$rootScope.p_cat_id = $rootScope.p_cat_id;
  // //alert($rootScope.subcategoryy.sub_categories[0]); 

  $scope.selectedCategory = [];
  $scope.selectedType = function(id){
    console.log(id);
    //alert(id);
    if($scope.selectedCategory.indexOf(id) == -1){
        $scope.selectedCategory.push(id);
        console.log("selectedCategory >>>"+JSON.stringify($scope.selectedCategory));
    }
    else{
        $scope.selectedCategory.splice($scope.selectedCategory.indexOf(id), 1);
        console.log($scope.selectedCategory);
        console.log("selectedCategory 2  >>>"+JSON.stringify($scope.selectedCategory));
    }
  }

  $scope.viewProducts = function(){
    if($scope.selectedCategory.length == 0){
       // $cordovaToast.show('Please Select At Least One Sub category','Short','Center');
      //return;
        $cordovaToast.showShortCenter("Please Select At Least One Sub category").then(function(success) {
                  //on success             
        }, function (error) {
            // error
        });
      return;
    }
    $rootScope.pcid = $scope.selectedCategory;    
    //alert(JSON.stringify($rootScope.pcid));
    $state.go('productbysubcategory');
  }
}) 