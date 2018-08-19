app2.controller('quizcontroller', function ($scope, quizfactory, $timeout,$rootScope) {
    var prom = quizfactory.givetime();
    prom.then(data=>{
        $scope.counter=data.data.timer;
    });
    var pr = quizfactory.givedata();
    pr.then((data) => {
        $scope.questions = data.data;
    });
    $scope.quizfactory = quizfactory;
    $rootScope.userdata;

    $scope.activateQuiz = function () {
        quizfactory.changeState('quiz', true);
        $scope.countdown();
    }
    $scope.activeQuestion = 0;
    $scope.error = false;
    $scope.finalise = false;
    $scope.setActiveQuestion = function (index) {
        if (index === undefined) {
            var breakOut = false;
            var quizLength = $scope.questions.length - 1;
            while (!breakOut) {
                $scope.activeQuestion = $scope.activeQuestion < quizLength ? ++$scope.activeQuestion : 0;
                if ($scope.activeQuestion === 0) {
                    $scope.error = true;
                }
                if ($scope.questions[$scope.activeQuestion].selected === null) {
                    breakOut = true;
                }
            }
        }
        else {
            $scope.activeQuestion = index;
        }

    }

    $scope.activeQuestion = 0;
    var numQuestionAnswered = 0;
    $scope.questionAnswered = function () {
        var quizLength = $scope.questions.length;
        // for timer
        if($scope.counter==0){
            $scope.finalise = true;
        }
        //end
        if ($scope.questions[$scope.activeQuestion].selected !== null) {
            numQuestionAnswered++;
            if (numQuestionAnswered >= quizLength) {
                for (var i = 0; i < quizLength; i++) {
                    if ($scope.questions[i].selected === null) {
                        setActiveQuestion(i);
                        return;
                    }
                }
                $scope.error = false;
                $scope.finalise = true;
                return;
            }
        }
        $scope.setActiveQuestion();
    }

    $scope.selectAnswer = function (index) {
        $scope.questions[$scope.activeQuestion].selected = index;
    }

    $scope.numCorrect = 0;
    $scope.markQuiz = function () {
        for (var i = 0; i < $scope.questions.length; i++) {
            if ($scope.questions[i].selected === $scope.questions[i].correct) {
                $scope.questions[i].correctflag = true;
                $scope.numCorrect++;
            } else {
                $scope.questions[i].correctflag = false;
            }
        }
    }

    $scope.finalizeAnswers = function () {
        $scope.finalise = false;
        numQuestionAnswered = 0;
        $scope.activeQuestion = 0;
        $scope.markQuiz();
        quizfactory.changeState('quiz', false);
        quizfactory.changeState('results', true);
    }

    $scope.activeQues = 0;
    $scope.getAnswerClass = function (index) {
        if (index === $scope.questions[$scope.activeQues].correct) {
            return "bg-success";
        } else if (index === $scope.questions[$scope.activeQues].selected) {
            return "bg-danger";
        }
    }

    $scope.setActiveQues = function (index) {
        $scope.activeQues = index;
    }

    $scope.calculatePerc = function () {
        $rootScope.percentage=$scope.numCorrect / $scope.questions.length * 100;
        return $scope.numCorrect / $scope.questions.length * 100;
    }
    //timer
   // $scope.counter = 180;
    var stopped;
    $scope.countdown = function () {
        if ($scope.counter == 0) {
            $scope.stop();
            return;
        }
        else {
            stopped = $timeout(function () {
                $scope.counter--;
                $scope.countdown();
            }, 1000);
        }
    }
    $scope.no=true;
    $scope.stop = function () {
        $timeout.cancel(stopped);
        $scope.finalise = true;
        $scope.timeup="Time up";
        $scope.no=false;
    }

   $scope.scoreobj={
        email:$rootScope.userdata,
        rank:null
    }

    $scope.score=function(isvalid){
        if(isvalid){
            var promise = quizfactory.score($scope.scoreobj);
            promise.then(res=>{
                $scope.msg=res.data.msg;
                $scope.rank=res.data.rank;
            });
        }
    }
});