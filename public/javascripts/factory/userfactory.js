app2.factory('factoryOne', ($http, $q, URL,AuthToken) => {
    const obj = {
        register(user) {
            var defer = $q.defer();
            $http.post(URL + '/register', user).then(data => {
                AuthToken.setToken(data.data.token);
                defer.resolve(data);
            });
            return defer.promise;
        },

        login(user){
            var defer = $q.defer();
            $http.post(URL + '/login', user).then(data=>{
                AuthToken.setToken(data.data.token);
                defer.resolve(data);
            });
            return defer.promise;
        },

        isLoggedIn(){
            if(AuthToken.getToken()){
                return true;
            }
            else{
                return false;
            }
        },

        logout(){
            //console.log('i am in logout function');
            AuthToken.setToken();
        }
    }
    return obj;
});

app2.factory('AuthToken',($window)=>{
    var authtokenfactory={
        setToken(token){
            if(token){
            $window.localStorage.setItem('token',token);
            }
            else{
                $window.localStorage.removeItem('token');
            }
                
        },

        getToken(){
            return $window.localStorage.getItem('token');
        }
    }
    return authtokenfactory;
});