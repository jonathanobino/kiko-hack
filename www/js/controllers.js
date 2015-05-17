angular.module('starter.controllers', [])

.controller('StreamCtrl', function($scope,$foto) {
	$scope.data= $foto;

	console.log($scope.data)

	$scope.like= function(elem){
		elem.like++;
		$foto.$save(elem);
		elem.liked = true;
	}



	$scope.add= function(){

		var time= Date.now();
		var data = {
			"utente":"Jonathan",
			"descrizione":"prova",
			"like":8,
			"added": time
		} 

		console.log(data);
		$foto.$add(data);
	}

})

.controller("SinglePhotoCtrl", function($scope,$stateParams,$foto){

	$scope.data = $foto.$getRecord($stateParams.fotoId);


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
		})
	.controller("loginCtrl", ["loginServ", "$scope", "$firebaseAuth", "$location", function(loginServ, $scope, $firebaseAuth, $location){
		$scope.loginFb = function(){
			var promise = loginServ.userLogin("facebook");

			promise.then(function(authData) {
				console.log(authData);
				$scope.dataLogin = [];
				$scope.dataLogin.username = authData.facebook.displayName;
				$location.path("/tab/dash");
				return $scope.dataLogin;
			}).catch(function(error) {
				console.log("Authentication failed:", error);
			});
		} 
		$scope.loginTw = function(){
			var promise = loginServ.userLogin("twitter");

			promise.then(function(authData) {
				console.log(authData);
				$scope.dataLogin = [];
				$scope.dataLogin.username = authData.twitter.displayName;
				$location.path("/tab/dash");
				return $scope.dataLogin;
			}).catch(function(error) {
				console.log("Authentication failed:", error);
			});
		}
	}]);

