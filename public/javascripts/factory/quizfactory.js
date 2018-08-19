app2.factory('quizfactory', ($http, $q, URL) => {
    const quizobj = {
        quizActive: false,
        resultsActive: false,

        givedata() {
            var defer = $q.defer();
            $http.get(URL + '/givedata').then((data) => {
                defer.resolve(data);
            }, (err) => {
                defer.reject(err);
            });
            return defer.promise;
        },

        changeState(metric, state) {
            if (metric === 'quiz') {
                quizobj.quizActive = state;
            } else if (metric === 'results') {
                quizobj.resultsActive = state;
            } else {
                return false;
            }

        },
        score(userscore){
            var defer = $q.defer();
            $http.post(URL + '/postscore',userscore).then(data=>{
                defer.resolve(data);
            })
            return defer.promise;
        },
        givetime(){
            var defer = $q.defer();
            $http.get(URL + '/givetime').then((data) => {
                defer.resolve(data);
            }, (err) => {
                defer.reject(err);
            });
            return defer.promise;
  
        }
    }
    return quizobj;
});