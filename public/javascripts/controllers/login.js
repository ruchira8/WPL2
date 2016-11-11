var jetbrains = angular.module("jetbrains", []);

jetbrains.controller("AppCtrl", function ($http) {
    var app = this;
    var url = "http://localhost:3000";
    app.authenticateUser = function (userName, password) {
        $http.post(url + '/login', {userName: userName, password: password}).success(function (response) {
            console.log(response);
            //loadUsers();
        });

    }
    function loadUsers() {
        $http.get(url).success(function (users) {
            app.users = users;
        })
    }

    //loadUsers();
})
