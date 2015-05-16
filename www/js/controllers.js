angular.module('starter.controllers', [])

.controller('StreamCtrl', function($scope,$foto) {
	$scope.data= $foto;

	$scope.like= function(elem){
		elem.like++;
		$foto.$save(elem);
	}

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller("PhotoCtrl", function  ($scope,$cordovaBarcodeScanner,$ionicModal) {
	$scope.test="test";

	// document.add

	// $scope.scanBarcode = function() {
 //        $cordovaBarcodeScanner.scan().then(function(imageData) {
 //            alert(imageData.text);
 //            console.log("Barcode Format -> " + imageData.format);
 //            console.log("Cancelled -> " + imageData.cancelled);
 //        }, function(error) {
 //            console.log("An error happened -> " + error);
 //        });
 //    };
		 document.addEventListener("deviceready", function () {

		    $scope.scanBarcode = $cordovaBarcodeScanner
		      .scan()
		      .then(function(barcodeData) {
							        $ionicModal.fromTemplateUrl('./templates/modal.html', {
					    scope: $scope,
					    animation: 'slide-in-up'
					  }).then(function(modal) {
					    $scope.modal = modal;
					  });
					  $scope.openModal = function() {
					    $scope.modal.show();
					  };
					  $scope.closeModal = function() {
					    $scope.modal.hide();
					  };
					  //Cleanup the modal when we're done with it!
					  $scope.$on('$destroy', function() {
					    $scope.modal.remove();
					  });
					  // Execute action on hide modal
					  $scope.$on('modal.hidden', function() {
					    // Execute action
					  });
					  // Execute action on remove modal
					  $scope.$on('modal.removed', function() {
					    // Execute action
					  });
		      }, function(error) {
		        // An error occurred
		      });


		    // NOTE: encoding not functioning yet
		    $cordovaBarcodeScanner
		      .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
		      .then(function(success) {
		        // Success!
		      }, function(error) {
		        // An error occurred
		      });

		  }, false);

		})

		.controller('AccountCtrl', function($scope) {
		  $scope.settings = {
		    enableFriends: true
		  };
});
