var jetbrains = angular.module("jetbrains", []);

jetbrains.controller("SignupCtrl", function ($http) {
    var app = this;
    var url = "http://localhost:3000";
    app.signupUser = function (userName, password, email, name, address, phNo, zipCode) {
        $http.post(url + '/signup', {userName: username, password: password, email:email, address:address, phNo:phNo, zipCode:zipCode}).success(function (response) {
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
