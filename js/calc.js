
angular.module('creditCalc', []).controller('calcCtrl', function ($scope)
{

    $scope.sumCredit = '';
    $scope.timeCredit = '';
    $scope.percentRateCredit = '';


    $scope.action = function()
    {
        $scope.timeStr = $scope.timeCredit + ' месяцев';
        $scope.percentStr = $scope.percentRateCredit + ' %';
        $scope.results = [];
        $scope.sumNa4islProcenti = 0;
        $scope.sumSumPlatej = 0;
        $scope.sumSumCredit = 0;

        if( $scope.check() )
        {
            document.getElementById('res').style.display = 'table';

            var zadoljnost = +$scope.sumCredit;
            var timeCredit = +$scope.timeCredit;
            var percentRateCredit = +$scope.percentRateCredit;

            $scope.sumNa4islProcenti = 0;
            $scope.sumSumPlatej = 0;
            $scope.sumSumCredit = +$scope.sumCredit;

            var osnovnoiDolg = $scope.myRound(zadoljnost / timeCredit);

            var na4islProcenti = 0;
            var sumPlatej = 0;

            for ( var i = 1; i <= timeCredit; i++ )
            {
                na4islProcenti = $scope.myRound((zadoljnost / 100) * (percentRateCredit / 12));
                sumPlatej = osnovnoiDolg + na4islProcenti;

                $scope.results.push({
                    zadoljnost: zadoljnost.toLocaleString(),
                    na4islProcenti: na4islProcenti.toLocaleString(),
                    osnovnoiDolg: osnovnoiDolg.toLocaleString(),
                    sumPlatej: sumPlatej.toLocaleString()
                });

                zadoljnost -= $scope.myRound(osnovnoiDolg);

                $scope.sumNa4islProcenti += na4islProcenti;
                $scope.sumSumPlatej += sumPlatej;
            }
        }
        else
        {
            document.getElementById('res').style.display = 'none';
        }
    };

    $scope.check = function ()
    {
        $scope.errors = {};
        var check = true;

        var zadoljnost = +$scope.sumCredit;
        var timeCredit = +$scope.timeCredit;
        var percentRateCredit = +$scope.percentRateCredit;

        if ( zadoljnost == 0 ) {
            $scope.errors.zadoljnost = 'Ошибка рассчета кредита.';
            check = false;
        }
        else if ( isNaN(zadoljnost) ) {
            $scope.errors.zadoljnost = 'Ошибка рассчета кредита.';
            check = false;
        }

        if ( timeCredit == 0 ) {
            $scope.errors.timeCredit = 'Ошибка рассчета кредита.';
            check = false;
        }
        else if ( isNaN(timeCredit) ) {
            $scope.errors.timeCredit = 'Ошибка рассчета кредита.';
            check = false;
        }

        if ( percentRateCredit == 0 ) {
            $scope.errors.percentRateCredit = 'Ошибка рассчета кредита.';
            check = false;
        }
        else if ( isNaN(percentRateCredit) ) {
            $scope.errors.percentRateCredit = 'Ошибка рассчета кредита.';
            check = false;
        }

        return check;
    };

    $scope.myRound = function(number)
    {
        return (Math.round(number * 100) / 100);
    };

});
