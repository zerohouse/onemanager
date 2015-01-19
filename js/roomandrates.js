var app = angular.module('onemanager', ['datePicker', 'ui.bootstrap']);

app.controller('RoomAndRateController', ['$scope', function ($scope) {

    $scope.selloptions = [{name: "판매가능"}, {name: "판매중단"}];
    $scope.feeoptions = [{name: "판매가"}, {name: "입금가"}];

    $scope.serviceType = [{
        select: false,
        name: "Breakfast Included (S)"
    }, {
        select: false,
        name: "Breakfast Included - Airtel(S)"
    }, {
        select: false,
        name: "Breakfast Included - ASIA(S)"
    }, {
        select: false,
        name: "Room Only(S)"
    }, {
        select: false,
        name: "Room Only - Airtel(S)"
    }, {
        select: false,
        name: "Room Only - ASIA(S)"
    }];


    $scope.dayToggle = function (day) {
        if ($scope.days == undefined)
            return;
        for (var i = 0; i < $scope.days.length; i++) {
            if ($scope.days[i][day].toggle == undefined)
                continue;
            $scope.days[i][day].toggle();
        }
    }

    $scope.weekToggle = function (week) {
        for (var i = 0; i < week.length; i++) {
            if (week[i].toggle == undefined)
                continue;
            week[i].toggle();
        }
    }

    $scope.update = function () {
        if ($scope.days == undefined)
            return;
        for (var i = 0; i < $scope.days.length; i++) {
            for (var j = 0; j < $scope.days[i].length; j++) {
                if ($scope.days[i][j].info == undefined)
                    continue;
                if (!$scope.days[i][j].select)
                    continue;

                $scope.days[i][j].info.allotment = $scope.allotment;
                $scope.days[i][j].info.fee = $scope.fee;
                $scope.days[i][j].info.cutoff = $scope.cutoff;
                $scope.days[i][j].info.sellstate = $scope.sellstate;
                $scope.days[i][j].info.serviceTypes = selectedTypeArray();
            }
        }

        function selectedTypeArray() {
            var result = [];
            for (var i = 0; i < $scope.serviceType.length; i++) {
                if ($scope.serviceType[i].select)
                    result.push($scope.serviceType[i]);
            }
            return result;
        }
    }


    var Day = function (date) {
        this.date = date;
        this.select = false;
        this.info = {
            done: function () {
                if (this.allotment == undefined)
                    return false;
                if (!(this.allotment > 0))
                    return false;
                if (this.sellstate.name != "판매가능")
                    return false
                if (!(this.fee > 0))
                    return false
                return true;
            },
            process: function () {
                if (this.allotment == undefined && this.fee == undefined)
                    return false;
                if (this.done())
                    return false;
                return true;
            }
        };
        this.mouseEnter = function () {
            if (isMouseDown) {
                this.toggle();
            }
        };
        this.toggle = function () {
            if (this.select) {
                this.select = false;
                return
            }
            this.select = true;
        }

    }

    var update = function () {
        var result = [];
        var days = [];
        var start = newDate($scope.start);

        var end = newDate($scope.end);
        if (start == undefined) {
            return;
        }
        if (end == undefined) {
            return;

        }
        while (start <= end) {
            var each = new Day(newDate(start));
            days.push(each);
            start.setDate(start.getDate() + 1);
        }

        var size = days[0].date.getDay() - 1;
        if (size < 0)
            size += 6;
        for (var i = 0; i < size; i++)
            days.unshift(i);

        while (days.length > 0)
            result.push(days.splice(0, 7));
        $scope.days = result;
    }

    $scope.$watch(function (scope) {
        return scope.start;
    }, update);

    $scope.$watch(function (scope) {
        return scope.end;
    }, update);


    var newDate = function (date) {
        if (date == undefined)
            return;
        return new Date(date.getFormattedString());
    }

    var isMouseDown = false;

    $scope.mousedown = function () {
        isMouseDown = true;
        return false; // prevent text selection
    };


    $(document).mouseup(function () {
        isMouseDown = false;
    });


}]);


$(document).ready(function () {
    // Pin #2
    new $.Zebra_Pin($('#update'), {
        top_spacing: 70
    });

});