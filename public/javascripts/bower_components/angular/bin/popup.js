$(function() {
    // Calling Login Form
    $("#login_form").click(function() {
        $(".user_login").show();
        return false;
    });

    // Calling Register Form
    $("#register_form").click(function() {
        $(".user_register").show();
        $(".header_title").text('Register');
        return false;
    });

    // Going back to Social Forms
    $(".back_btn").click(function() {
        $(".user_login").hide();
        $(".user_register").hide();
         $(".header_title").text('Login');
        return false;
    });

    $("#newuser").click(function() {
        $(".user_register").show();
        $(".user_login").hide();
        $(".header_title").text('Register');
        return false;
    });

    // display modal on click of login
    $("#modal_trigger" ).click(function() {
        $('#modal').show();
        $(".user_login").show();
        $(".user_register").hide();
    });

    $("#close" ).click(function() {
        alert("so you wish to continue as guest!!")
        $('#modal').hide();

    });

    $("#existinguser" ).click(function() {
        $(".user_login").show();
        $(".user_register").hide();

    });

});/**
 * Created by Sneha on 11/23/2016.
 */
