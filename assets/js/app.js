(function() {
    "use strict";

    var app = angular.module("myApp", []);

    app.controller('myCtrl', ['$scope', '$filter', '$http', function($scope, $filter, $http) {

        $scope.userDetails = "";
        $scope.id = true;
        $scope.name = true;
        $scope.phone_number = true;
        $scope.loan_type = true;
        $scope.approval_process_status = true;
        $scope.approval_process_user_bucket_id = true;


        $scope.show = function(index) {
            $scope.userDetails.users[index].show = !$scope.userDetails.users[index].show;
        }

        $scope.rowSizeList = [{
                id: 1,
                value: 5,
                name: "5 Rows"
            },
            {
                id: 2,
                value: 10,
                name: "10 Rows"
            },
            {
                id: 3,
                value: 20,
                name: "20 Rows"
            },
            {
                id: 4,
                value: 25,
                name: "25 Rows"
            },
            {
                id: 5,
                value: 50,
                name: "50 Rows"
            },
            {
                id: 6,
                value: 10,
                name: "100 Rows"
            },
            {
                id: 7,
                value: 15,
                name: "150 Rows"
            }
        ];
        $scope.rowSize = $scope.rowSizeList[0].value;

        var data = $.param({
            page: '0',
            page_size: '20',
            sorting_params: 'id',
            sorting_side: 'asc',
            search_params: '',
            search_query: ''
        });

        var config = {
            headers: {
                'Authorization': '145:NmLSY9XTCnn4SoaAz8sy',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };

        var base_url = 'https://loanmeet-staging.herokuapp.com';

        var successCallback = function(resp, status, headers, config) {
            $scope.userDetails = resp.data;
            $scope.data = [];
            $scope.q = '';

            $scope.getData = function() {
                return $filter('filter')($scope.data, $scope.q)
            }

            $scope.numberOfPages = function() {
                return Math.ceil($scope.userDetails.page_unit / $scope.rowSize - 1);
            }

            for (var i = 0; i < $scope.userDetails.page_unit; i++) {
                $scope.data.push("Item " + i);
            }

        };

        var errorCallback = function(rea, status, header, config) {
            $scope.ResponseDetails = rea.data;
        };

        $http.post(base_url + '/v1/credit/getAllLinesPaginated', data, config).then(successCallback, errorCallback)

        $scope.sort = function(keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        }
    }]);

    app.filter('startFrom', function() {
        return function(input, start) {
            if (input || start) {
                start = +start;
                return input.slice(start);
            }
        }
    });

}());