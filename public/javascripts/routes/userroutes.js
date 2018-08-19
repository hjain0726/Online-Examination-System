app2.config(($routeProvider, $locationProvider) => {
    $locationProvider.hashPrefix('');
    $routeProvider.when('/home', { templateUrl: '/views/user/home.html', controller: 'ctrl1' })
        .when('/login', { templateUrl: '/views/user/login.html',authenticated:false, controller: 'ctrl1' })
        .when('/register', { templateUrl: '/views/user/register.html', authenticated:false, controller: 'ctrl1' })
        .when('/profile', { templateUrl: '/views/user/profile.html',authenticated:true,controller:'quizcontroller' })
        .otherwise({ templateUrl: '/views/user/home.html', controller: 'ctrl1' });
});

app2.run(($rootScope,factoryOne,$location)=>{
    $rootScope.$on('$routeChangeStart',(event,next,current)=>{
        if(next.$$route.authenticated==true){
            if(!factoryOne.isLoggedIn()){
                event.preventDefault();
                $location.path('/home');
            }
        }else if(next.$$route.authenticated==false){
            if(factoryOne.isLoggedIn()){
                event.preventDefault();
                $location.path('/profile');
            }
        }
    });
});