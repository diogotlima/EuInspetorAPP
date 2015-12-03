angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.openCadastro = fOpenCadastro;
  $scope.closeCadastro = fCloseCadastro;
  var templateLogin = "templates/login.html";
  $scope.takePicture = f_takePicture;
  $scope.selectPicture = f_selectPicture;
  $scope.uploadPicture = f_uploadPicture;
  viewUploadedPictures = f_viewUploadedPictures;
  $scope.viewPictures = f_viewPictures;
  $scope.captureAudio = f_captureAudio;
  $scope.captureVideo = f_captureVideo;

  // Modal Login
  $ionicModal.fromTemplateUrl( templateLogin, {
    scope: $scope,
    animation: 'slide-in-up'

  }).then(function(modal) {
    $scope.modalLogin = modal;
    $scope.openLogin = fOpenLogin;
    $scope.closeLogin = fCloseLogin;
  });

  // Modal Termos
  $ionicModal.fromTemplateUrl('templates/termo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalTermo = modal;
    $scope.openTermo = fOpenTermo;
    $scope.closeTermo = fCloseTermo;
  });

  // Modal Cadastro
  $ionicModal.fromTemplateUrl('templates/cadastro.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCadastro = modal;
    $scope.openCadastro = fOpenCadastro;
    $scope.closeCadastro = fCloseCadastro;
  });

  // Modal Cadastro
  $ionicModal.fromTemplateUrl('templates/cadastro.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCadastro = modal;
    $scope.openCadastro = fOpenCadastro;
    $scope.closeCadastro = fCloseCadastro;
  });

  // Modal Send Photo
  $ionicModal.fromTemplateUrl('templates/enviarFoto.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalSendPhoto = modal;
  });


  $scope.opensendPhoto = function() {
    $scope.modalSendPhoto.show();
  };
  $scope.closesendPhoto = function() {
    $scope.modalSendPhoto.hide();
  };

  // Modal Send Video
  $ionicModal.fromTemplateUrl('templates/enviarVideo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalSendVideo = modal;
  });
  $scope.opensendVideo = function() {
    $scope.modalSendVideo.show();
  };
  $scope.closesendVideo = function() {
    $scope.modalSendVideo.hide();
  };

  // Modal Send Audio
  $ionicModal.fromTemplateUrl('templates/enviarAudio.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalSendAudio = modal;
  });
  $scope.opensendAudio = function() {
    $scope.modalSendAudio.show();
  };
  $scope.closesendAudio = function() {
    $scope.modalSendAudio.hide();
  };

  // Modal Send Texto
  $ionicModal.fromTemplateUrl('templates/enviarTexto.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalSendTexto = modal;
  });

  $scope.opensendTexto = function() {
    $scope.modalSendTexto.show();
  };
  $scope.closesendTexto = function() {
    $scope.modalSendTexto.hide();
  };

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
  function fOpenTermo(){
    $scope.modalTermo.show();
  };
  function fCloseTermo(){
    $scope.modalTermo.hide();
  };
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/enviarFoto.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.openModal = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doModal = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
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
      //$scope.arquivo_audio = audioData;
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
})
