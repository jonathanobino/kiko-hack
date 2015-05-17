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

.controller("PhotoCtrl", function ($scope, $cordovaCamera,$foto,$user) {

	// var utente = $user.getUser();

	// console.log($scope.test);

			     // var options = {
        //     quality : 75,
        //     destinationType : Camera.DestinationType.DATA_URL,
        //     sourceType : Camera.PictureSourceType.CAMERA,
        //     allowEdit : true,
        //     encodingType: Camera.EncodingType.JPEG,
        //     popoverOptions: CameraPopoverOptions,
        //     targetWidth: 500,
        //     targetHeight: 500,
        //     saveToPhotoAlbum: false
        // };


		 document.addEventListener("deviceready", function () {

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


        

	        $cordovaCamera.getPicture(options).then(function(imageData) {

	        	var now = Date.now();
	        	// var utente = "kiko " + Math.floor((Math.random()*100)%3);
	        	var utente = $user.getUser(); 
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
        }, function(error) {
            console.error(error);
        });
	       

        

		  }, false);



		})

	.controller('AccountCtrl', function($scope) {
		  $scope.settings = {
		    enableFriends: true
		  };
		})
	.controller("rewCtrl",function($scope){

	})
	.controller("saldoCtrl", function(){

	})
	.controller("loginCtrl", [ "$scope", "$state","$user", function( $scope, $state, $user){
				

		$scope.loginFb = function(utente){


			var nomeutente = utente;

			$user.setUser(nomeutente);
	 		$state.go("tab.dash");
		} 
		$scope.loginTw = function(utente){
			var nomeutente = utente;
			$user.setUser(nomeutente);
			$state.go("tab.dash");
		}
	}]);

