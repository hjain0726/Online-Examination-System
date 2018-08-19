app.controller('ctrl1', function ($scope, factorytwo, myfactory, $location, $rootScope, $window) {
    $scope.state = function () {
        if (factorytwo.isLoggedIn()) {
            return true;
        }
        else {
            return false;
        }
    }
    $scope.admin = {};
    $scope.question = {
        options: [{}, {}, {}, {}],
        selected: null,
        correctflag: null
    };

    $scope.saveData = function (isvalid) {
        if (isvalid) {
            var pr = myfactory.add($scope.question);
            pr.then(res => {
                $scope.result = res;
                // $rootScope.showsData();
                $location.path('/home');
                $window.location.reload('/home');
            })
        }
    }

    $scope.showsData = function () {
        var pro = factorytwo.showdata();
        pro.then((data) => {
            $scope.questions = data;
        }, (err) => {
            $scope.error = err;
        })
    }
    $scope.showsData();

    $scope.edit = function (user) {
        $rootScope.id = user._id;
        //console.log($scope.id);
        $location.path('/edit');
    }

    $scope.update = {
        options: [{}, {}, {}, {}],
        selected: null,
        correctflag: null
    };
    $scope.updatedData = function (isvalid) {
        if (isvalid) {
            var prom = factorytwo.updateIt($rootScope.id, $scope.update);
            prom.then(res => {
                $scope.success = res;
                $location.path('/home');
                $window.location.reload('/home');
            })

        }

    }

    $scope.delete = function (user) {
        $scope.uid = user._id;
        var promise = factorytwo.delete($scope.uid);
        promise.then((res) => {
            $scope.deletemsg = res;

            $location.path('/home');
            $window.location.reload('/home');
            //$window.location.reload();
            //$scope.showsData();

        })

    }

    $scope.signin = function (isvalid) {
        if (isvalid) {
            var pr = factorytwo.signin($scope.admin);
            pr.then(res => {
                if (res.data == "Invalid email or password") {
                    $scope.resp = res.data;
                }
                else {
                    $location.path('/home');
                }
            });
        }
    }
    $scope.logout = function () {
        factorytwo.logout();
        $location.path('/home');
    }

    $scope.exam = {};
    $scope.Duration = function (isvalid) {
        if (isvalid) {
            var proms = factorytwo.updatetime($scope.exam);
            proms.then(data => {
                $scope.msgupdt = data.data;
            })
        }

    }
    //$route.reload();
    //$window.location.reload();
});

app.controller('ctrl2', function ($scope, factorytwo, myfactory, $location) {
    var pr = myfactory.givescore();
    pr.then(data => {
        $scope.docs = data
    })
});