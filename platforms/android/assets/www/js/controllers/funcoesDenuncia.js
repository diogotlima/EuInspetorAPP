appGeral.controller("funcoesDenuncia", function($scope, $cordovaCamera, $cordovaCapture, $cordovaFile, $cordovaFileTransfer, $ionicPopup) {

  $scope.data = { "ImageURI" :  "Select Image" };
  $scope.takePicture = f_takePicture;
  $scope.selectPicture = f_selectPicture;
  $scope.uploadPicture = f_uploadPicture;
  viewUploadedPictures = f_viewUploadedPictures;
  $scope.viewPictures = f_viewPictures;
  $scope.captureAudio = f_captureAudio;
  $scope.captureVideo = f_captureVideo;
  $scope.openLogin = fOpenLogin;
  $scope.openCadastro = fOpenCadastro;
  $scope.closeCadastro = fCloseCadastro;



  $scope.sendAudio = function(mediafiles) {

    var file = mediafiles[0];
    $scope.sound = {};

    var options = {
      fileKey: "sound",
      fileName: file.name,
      mimeType: file.type
      //mimeType: "audio/mpeg"
    };

    $cordovaFileTransfer.upload("http://dominio-admin.herokuapp.com/api/v1/sounds", file.fullPath, options)
    .then(function(sound){
      console.log("Arquivo cadastrado com sucesso: " + sound.id);
      $scope.modalSendAudio.hide();
        $ionicPopup.alert({
            title: 'Denúncias',
            template: 'Sua denúncia foi recebida com sucesso!'
        })
      //$http.put( 'http://192.168.1.4:5000/admn/sounds/' + sound.id, { legend: $scope.sound.legend } )
    }, function(erro){
      console.log("Erro ao enviar arquivo de audio...");
      $scope.modalSendAudio.hide();
        $ionicPopup.alert({
            title: 'Denúncias',
            template: 'Sua denúncia foi recebida com sucesso!'
        })
    })


  };


  function f_takePicture() {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA
      };
    $cordovaCamera.getPicture(options).then(
    function(imageData) {
      $scope.picData = imageData;
      $scope.ftLoad = true;
      $localstorage.set('fotoUp', imageData);
      $ionicLoading.show({template: 'Foto acquisita...', duration:500});
    },
    function(err){
      $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
    })
  };

  function f_selectPicture() { 
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };

    $cordovaCamera.getPicture(options).then(
    function(imageURI) {
      window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
        $scope.picData = fileEntry.nativeURL;
        $scope.ftLoad = true;
        var image = document.getElementById('myImage');
        image.src = fileEntry.nativeURL;
        });
      $ionicLoading.show({template: 'Foto acquisita...', duration:500});
    },
    function(err){
      $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
    })
  };

  function f_uploadPicture() {
    $ionicLoading.show({template: 'Sto inviando la foto...'});
    var fileURL = $scope.picData;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;

    var params = {};
    params.value1 = "someparams";
        params.value2 = "otherparams";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://www.dominio.com.br/app/upload.php"), viewUploadedPictures, function(error) {$ionicLoading.show({template: 'Errore di connessione...'});
    $ionicLoading.hide();}, options);
  }

  function f_viewUploadedPictures() {
    $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.dominio.com.br/app/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {          
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
          return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
    $ionicLoading.hide();
    }

  function f_viewPictures() {
    $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.dominio.com.br/app/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {          
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
          return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
    $ionicLoading.hide();
    }

  // Captura Vídeo
  function f_captureAudio() {
    var options = { limit: 1, duration: 30 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
      $scope.arquivo_audio = audioData;
      //alert(audioData);
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }


  function f_captureVideo() {
    var options = { limit: 1, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }

  function fOpenLogin(){
    $scope.modalLogin.show();
  };
  function fCloseLogin(){
    $scope.modalLogin.hide();
  };
  function fOpenCadastro(){
    $scope.modalCadastro.show();
  };
  function fCloseCadastro(){
    $scope.modalCadastro.hide();
  };

});
