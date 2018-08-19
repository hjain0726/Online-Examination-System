app2.controller('ctrl1', function ($scope, factoryOne, $location,$rootScope) {
    $scope.state=function(){
        if (factoryOne.isLoggedIn()){
            return true;
        } 
        else{
            return false;
        }
    }
    $scope.user = {};
    $scope.user1 = {};
    $scope.signup = function (isvalid) {
        if (isvalid) {
            var pr = factoryOne.register($scope.user);
            pr.then(res => {
                if (res.data == 'User already Exist') {
                    $scope.res = res.data;
                }
                else {
                    $rootScope.userdata=res.data.email;
                    $location.path('/profile');
                }

            });
        }
    }
    
    $scope.signin = function (isvalid) {
        if (isvalid) {
            var pr = factoryOne.login($scope.user1);
            pr.then((res) => {
                if (res.data == "Invalid username or Password") {
                    $scope.resp = res.data;
                }
                else {
                    $rootScope.userdata=res.data.email;
                    $location.path('/profile');
                }
            });
        }
    }

    $scope.logout=function(){
        factoryOne.logout();
        $location.path('/home');
    }
});