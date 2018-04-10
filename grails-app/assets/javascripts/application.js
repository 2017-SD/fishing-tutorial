// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better
// to create separate JavaScript files as needed.
//
//= require jquery-2.2.0.min
//= require bootstrap
//= require_tree .
//= require_self

if (typeof jQuery !== 'undefined') {
    (function($) {
        $(document).ajaxStart(function() {
            $('#spinner').fadeIn();
        }).ajaxStop(function() {
            $('#spinner').fadeOut();
        });
    })(jQuery);

}

jQuery.noConflict();
// listener for login anchor
$('#loginBtn').click(function() {
    $("#login").modal();
});


function getLogin() {

    if (navigator.onLine) {

        $.get("user/getLogin", function (username) {

            if (username != 'false') {
                $("#navContainer").html(
                    "<nav id='navMain'>" +
                        "<a id='mainLogoText' href='/'><img id='mainLogo' src='/assets/logo.png'  /> FishingApp</a>" +
                        "<a class='loginBtn' href='/logout'>log out</a>" +
                    "</nav>" +
                    "<nav id='navUser'>" +
                        "<a>Logged in as " + username + "!</a>" +
                    "</nav>"
                );

                $("#showCatchesButton").show();

                return username;

            } else {
                return false;
            }
        });

    } else {
        $("#navContainer").html(
            "<nav id='navMain'>" +
                "<a id='mainLogoText' href='/'><img id='mainLogo' src='/assets/logo.png'  /> FishingApp</a>" +
            "</nav>" +
            "<nav id='navUser'>" +
            "<a>Offline Mode</a>" +
            "</nav>"
        );

        return false;
    }

}

