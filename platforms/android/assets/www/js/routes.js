appGeral.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.inicial', {
    url: "/inicial",
    views: {
      'menuContent': {
        templateUrl: "templates/inicial.html"
      }
    }
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.projetos', {
    url: "/projetos",
    views: {
      'menuContent': {
        templateUrl: "templates/projetos.html"
      }
    }
  })

  .state('app.sobre', {
    url: "/sobre",
    views: {
      'menuContent': {
        templateUrl: "templates/sobre.html"
      }
    }
  })

  .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',

    })

  .state('app.licitacoes', {
    url: "/licitacoes",
    views: {
      'menuContent': {
        templateUrl: "templates/licitacoes.html"
      }
    }
  })

  .state('app.denuncias', {
    url: "/denuncias",
    views: {
      'menuContent': {
        templateUrl: "templates/denuncias.html"
      }
    }
  })

  .state('app.redes', {
    url: "/redes",
    views: {
      'menuContent': {
        templateUrl: "templates/redes.html"
      }
    }
  })

   .state('app.raimundo', {
    url: "/raimundo",
    views: {
      'menuContent': {
        templateUrl: "templates/raimundo-mendes.html"
      }
    }
  })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicial');
});
