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

// for use with modals
jQuery.noConflict();


// listener for login anchor
$('#loginBtn').click(function() {
    $("#login").modal();
});


function getLogin() {

    // check if the user is online
    if (navigator.onLine) {

        // call method getLogin in user
        $.get("user/getLogin", function (firstName) {

            // check if user is logged in
            if (firstName !== 'false') {
                $("#navContainer").html(
                    "<nav id='navMain'>" +
                        "<a id='mainLogoText' href='/'><img id='mainLogo' src='/assets/logo.png'  /> FishingApp</a>" +
                        "<a class='loginBtn' href='/logout'>log out</a>" +
                    "</nav>" +
                    "<nav id='navUser'>" +
                        "<a>Logged in as " + firstName + "!</a>" +
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


getLogin();