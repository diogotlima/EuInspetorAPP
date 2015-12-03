//Share
appGeral.controller("ShareController", function($scope, $cordovaSocialSharing) {
 
    $scope.shareAnywhere = function (){
      $cordovaSocialSharing.share("mensagem", "Titulo", null, "http://www.dominio.com.br")
        .then(function(result) {
          // Success!
        }, function(err) {
          alert("Erro");
        });
    }
})
//Fim Share
