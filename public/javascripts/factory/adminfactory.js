app.factory('myfactory', ($http, $q, URL) => {
    var defer = $q.defer();
    const obj = {
        add(user) {
            $http.post(URL + "/postdata", user).then((res) => {
                defer.resolve(res);
            })
            return defer.promise;
        },
        givescore() {
            var def = $q.defer();
            $http.get(URL + "/givescore").then((res) => {
                var docs = res.data.sort((a, b) => a.rank - b.rank);
                def.resolve(docs);
            }, (err) => {
                def.reject(err);
            })
            return def.promise;
        }
    }
    return obj;
});

app.factory('factorytwo', ($http, $q, AuthToken, URL) => {
    var defer = $q.defer();
    var defer2 = $q.defer();
    const obj2 = {
        showdata() {
            $http.get(URL + "/givedata").then((data) => {
                defer.resolve(data);
            }, (err) => {
                defer.reject(err);
            })
            return defer.promise;
        },
        updateIt(id, update) {
            $http.put(URL + "/" + id, update).then((res) => {
                defer2.resolve(res)
            })
            return defer2.promise;
        },
        delete(id) {
            $http.delete(URL + "/delete/" + id).then((res) => {
                defer.resolve(res);
            })
            return defer.promise;
        },
        signin(admin) {
            var defer3 = $q.defer();
            $http.post(URL + '/adminsignin', admin).then(data => {
                AuthToken.setToken(data.data.token);
                defer3.resolve(data);
            });
            return defer3.promise;
        },
        isLoggedIn() {
            if (AuthToken.getToken()) {
                return true;
            }
            else {
                return false;
            }
        },
        logout() {
            //console.log('i am in logout function');
            AuthToken.setToken();
        },
        updatetime(timer){
            var defer4 = $q.defer();
            $http.post(URL + '/updatetimer', timer).then(data=>{
                defer4.resolve(data);
            });
            return defer4.promise;
        }
    }
    return obj2;
});

app.factory('AuthToken', ($window) => {
    var authtokenfactory = {
        setToken(token) {
            if (token) {
                $window.localStorage.setItem('admintoken', token);
            }
            else {
                $window.localStorage.removeItem('admintoken');
            }

        },

        getToken() {
            return $window.localStorage.getItem('admintoken');
        }
    }
    return authtokenfactory;
});