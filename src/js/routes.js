app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
    
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
    
    // Make trailing slash optional.
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();
    
        // check to see if the path already has a slash where it should be
        if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
            return;
        }
    
        if (path.indexOf('?') > -1) {
            return path.replace('?', '/?');
        }
    
        return path + '/';
    });

    // LANGUAGE ABSTRACT STATE ========================================
    $stateProvider.state('app', {
        abstract: true,
        url: '/{lang}/',
        template: '<sh-app/>',
        controller: function ($translate, $state, $rootScope) {
            $translate.use($state.params.lang);
                
            if (/he|ar/.test($state.params.lang)) {
                $rootScope.dir = 'rtl';
            }
        }
    });
    
    // HOME STATE ========================================
    $stateProvider.state('app.home', {
        url: '',
        template: '<sh-main/>'
    });
    
    $urlRouterProvider.otherwise('/en/');
});