var appShare = angular.module('share', ['ionic', 'starter.controllers', 'ngCordova'])
//Share
appShare.controller("ExampleController", function($scope, $cordovaSocialSharing) {
 
    $scope.shareAnywhere = function (){
      $cordovaSocialSharing.share("mensagem", "Titulo", null, "http://www.cabojeoas.com.br")
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occurred. Show a message to the user
        });
    }

    $scope.shareViaTwitter = function(message, image, link) {
        $cordovaSocialSharing.canShareVia("whatsapp", message, image, link).then(function(result) {
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link);
        }, function(error) {
            alert("Cannot share on WhatsApp");
        });
    }
 
})
//Fim Share