
var fb = new Firebase("https://euinspetor.firebaseio.com");


appGeral.controller("securecontroller", function($scope, $ionicHistory, $firebaseArray, $cordovaCamera, $firebaseObject, $ionicPopup) {

  $ionicHistory.clearHistory();

  $scope.images = [];

  var fbAuth = fb.getAuth();
  if(fbAuth) {
      var userReference = fb.child("users/" + fbAuth.uid);
      var syncArray = $firebaseArray(userReference.child("images"));
      $scope.images = syncArray;
  } else {
      $state.go("firebase");
  }

  $scope.upload = function() {
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
          syncArray.$add({image: imageData}).then(function() {
              //alert("Imagem enviada com sucesso!");
          });
      }, function(error) {
          console.error(error);
      });
  }

  $scope.list = function() {
        fbAuth = fb.getAuth();
        if(fbAuth) {
            var syncObject = $firebaseObject(fb.child("users/" + fbAuth.uid));
            syncObject.$bindTo($scope, "data");
        }
    }

    var legenda = $scope.legenda;

    $scope.create = function(textoFoto) {

          if($scope.data.hasOwnProperty("titulos") !== true) {
              $scope.data.textoFoto = [];

            $scope.data.textoFoto.push({TextoFoto: textoFoto.legenda});
            $scope.modalSendPhoto.hide();
            $ionicPopup.alert({
                title: 'Denúncias',
                template: 'Sua denúncia foi recebida com sucesso!'
            })
          } else {
              console.log("Action not completed");
          }
    }

    //

    var textodenuncia = $scope.textodenuncia;

    $scope.createtexto = function(denunciaTexto) {

          if($scope.data.hasOwnProperty("textodenuncia") !== true) {
              $scope.data.denunciaTexto = [];

            $scope.data.denunciaTexto.push({DenunciaTexto: denunciaTexto.textodenuncia});
            $scope.modalSendTexto.hide();
            $ionicPopup.alert({
                title: 'Denúncias',
                template: 'Sua denúncia foi recebida com sucesso!'
            })
          } else {
              console.log("Action not completed");
          }
    }
});
