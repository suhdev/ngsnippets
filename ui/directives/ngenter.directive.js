angular.module('Ui').directive('ngEnter', [function () {
	return function ($S, $E, $A) {
        $E.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                $S.$apply(function (){
                    $S.$eval($A.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
}]);