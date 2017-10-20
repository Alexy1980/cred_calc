angular.module('creditCalc', ['rzModule']).controller('calcCtrl', function ($scope)
{
    $scope.percentRateCredit = '';
    $scope.sumSlider = 1500000;
    $scope.timeSlider = 256;
    $scope.percentSlider = 100;

    $scope.action = function()
    {
        $scope.timeStr = $scope.timeSlider + ' месяцев';
        $scope.percentStr = $scope.percentSlider + ' %';
        $scope.results = [];
        $scope.sumNa4islProcenti = 0;
        $scope.sumSumPlatej = 0;
        $scope.sumSumSlider = 0;

        if( $scope.check() )
        {
            document.getElementById('res').style.display = 'table';

            var zadoljnost = +$scope.sumSlider; // общая сумма кредита
            var timeSlider = +$scope.timeSlider; // срок кредита
            var percentRateCredit = +$scope.percentSlider; // процентная ставка в год

            $scope.sumNa4islProcenti = 0;
            $scope.sumSumPlatej = 0;
            // Добавление знака + перед переменной (убедитесь, что между ними нет места) сообщает интерпретатору JavaScript, чтобы попытаться преобразовать строку в числовое значение - если строка содержит только цифры. Другой способ - использовать команду Number($scope.sumSlider)
            $scope.sumSumSlider = +$scope.sumSlider;

            var osnovnoiDolg = $scope.myRound(zadoljnost / timeSlider); // фиксированная на весь период сумма, идущая на погашение суммы задолженности

            var na4islProcenti = 0;
            var sumPlatej = 0;

            for ( var i = 1; i <= timeSlider; i++ )
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

        var zadoljnost = +$scope.sumSlider;
        var timeSlider = +$scope.timeSlider;
        var percentRateCredit = +$scope.percentSlider;

        if ( zadoljnost == 0 ) {
            $scope.errors.zadoljnost = 'Поле не должно быть пустым.';
            check = false;
        }
        else if ( isNaN(zadoljnost) ) {
            $scope.errors.zadoljnost = 'Значение должно быть числом.';
            check = false;
        }

        if ( timeSlider == 0 ) {
            $scope.errors.timeSlider = 'Поле не должно быть пустым.';
            check = false;
        }
        else if ( isNaN(timeSlider) ) {
            $scope.errors.timeSlider = 'Значение должно быть числом.';
            check = false;
        }

        if ( percentRateCredit == 0 ) {
            $scope.errors.percentSlider = 'Поле не должно быть пустым.';
            check = false;
        }
        else if ( isNaN(percentRateCredit) ) {
            $scope.errors.percentSlider = 'Значение должно быть числом.';
            check = false;
        }

        return check;
    };

    $scope.myRound = function(number)
    {
        return (Math.round(number * 100) / 100);
    };

});


