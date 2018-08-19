app.config(($routeProvider, $locationProvider) => {
    $locationProvider.hashPrefix('');
    $routeProvider.when('/home', { templateUrl: '/views/admin/home.html',authenticated:true,controller: 'ctrl1'})
        .when('/edit', { templateUrl: '/views/admin/edit.html',authenticated:true,controller: 'ctrl1'})
        .when('/login', { templateUrl: '/views/admin/login.html',authenticated:false,controller: 'ctrl1'})
        .when('/create', { templateUrl: '/views/admin/create.html',authenticated:true,controller: 'ctrl1'})
        .when('/scorerecord', { templateUrl: '/views/admin/record.html',authenticated:true,controller: 'ctrl2'})
        .when('/timer', { templateUrl: '/views/admin/timer.html',authenticated:true,controller: 'ctrl1'})
        .otherwise({ templateUrl: '/views/admin/login.html',authenticated:false,controller: 'ctrl1'});
});

app.run(($rootScope,factorytwo,$location)=>{
    $rootScope.$on('$routeChangeStart',(event,next,current)=>{
        if(next.$$route.authenticated==true){
            if(!factorytwo.isLoggedIn()){
                event.preventDefault();
                $location.path('/login');
            }
        }else if(next.$$route.authenticated==false){
            if(factorytwo.isLoggedIn()){
                event.preventDefault();
                $location.path('/home');
            }
        }
    });
});