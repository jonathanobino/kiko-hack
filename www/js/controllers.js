angular.module('starter.controllers', [])

.controller('StreamCtrl', function($scope,$foto) {
	$scope.data= $foto;

	console.log($scope.data)

	$scope.like= function(elem){
		elem.like++;
		$foto.$save(elem);
	}



	$scope.add= function(){

		var time= Date.now();
		var rand= (Math.random()*100)%4;
		var data = {
			"utente":"Jonathan"+rand,
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

.controller("PhotoCtrl", function  ($scope, $cordovaCamera,$foto,$state) {
			$scope.test="test";

		 // document.addEventListener("deviceready", function () {

		 	var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };

        $scope.take= function () {

        	$cordovaCamera.getPicture(options).then(function(imageData) {

        	var now = Date.now();
        	var utente = "kiko " + Math.floor((Math.random()*100)%3);
        	var title = "makeup " + Math.floor((Math.random()*150)%4);

        	var data={
        		foto:imageData,
        		added: now,
        		like:0,
        		utente:utente,
        		title:title
        	}


            $foto.$add(data).then(function() {
                alert("Image has been uploaded");
            });
            // $state.go($state.current, {}, {reload: true});
        }, function(error) {
            console.error(error);
        });

        }
        

		  // }, false);



		})

	.controller('AccountCtrl', function($scope) {
		  $scope.settings = {
		    enableFriends: true
		  };
		})
	.controller("loginCtrl", ["loginServ", "$scope", "$firebaseAuth", "$state", function(loginServ, $scope, $firebaseAuth, $state){
		$scope.loginFb = function(){
			// var promise = loginServ.userLogin("facebook");

			// promise.then(function(authData) {
			// 	console.log(authData);
			// 	$scope.dataLogin = [];
			// 	$scope.dataLogin.username = authData.facebook.displayName;
			// 	$state.go("tab.dash");
			// 	$scope.dataLogin;
			// }).catch(function(error) {
			// 	console.log("Authentication failed:", error);
			// });
	 		$state.go("tab.dash");
		} 
		$scope.loginTw = function(){
			// var promise = loginServ.userLogin("twitter");

			// promise.then(function(authData) {
			// 	console.log(authData);
			// 	$scope.dataLogin = [];
			// 	$scope.dataLogin.username = authData.twitter.displayName;
			// 	$state.go("tab.dash");
			// 	$scope.dataLogin;
			// }).catch(function(error) {
			// 	console.log("Authentication failed:", error);
			// });
			$state.go("tab.dash");
		}
	}]);

