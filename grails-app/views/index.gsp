<!doctype html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Welcome to Grails</title>

    <asset:link rel="icon" href="favicon.ico" type="image/x-ico" />

</head>
<body>


    %{-- New Catch Div--}%
    <div class="row">
        <div class="col-md-12"><button class='center-block' id="newCatchButton">New Catch</button></div>
    </div>
    <div id="newCatch" style="display: none;" class="container col-md-offset-3 col-md-6 col-xs-12 col-xs-offset-0">
        <div class="row">
            <div class="col-md-12">
                <h2>New Catch</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <p>Trip Name</p>
            </div>
            <div class="col-md-6 col-xs-6">
                <input id="tripName" type="text" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <p>Fish Type</p>
            </div>
            <div class="col-md-6 col-xs-6">
                <input type="text" id="fishType" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <p>Date</p>
            </div>
            <div class="col-md-6 col-xs-6">
                <input id="dateCaught" type="date" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <p>X Coordinate</p>
            </div>
            <div class="col-md-6 col-xs-6">
                <input type="text" id="xCoord" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <p>Y Coordinate</p>
            </div>
            <div class="col-md-6 col-xs-6">
                <input type="text" id="yCoord" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <p>Comment</p>
            </div>
            <div class="col-md-6 col-xs-6">
                <textarea id="comment"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-6">
                <p>Upload Image</p>
            </div>
            <div class="col-md-6 col-xs-6">
                <input type="file" id="image" />
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <input id="submitNewCatch" class="center-block" type="submit" />
            </div>
        </div>
    </div>


    %{-- Show Catches div--}%
    <div class="row">
        <div class="col-md-12"><button class='center-block' id="showCatchesButton">Your Catches</button></div>
    </div>
    <div id="showCatches" style="display: none;" class="container col-md-offset-3 col-md-6 col-xs-offset-0 col-xs-12">
        <div class="row">
            <div class="col-md-4 col-xs-4">
                <b>Trip</b>
            </div>
            <div class="col-md-4 col-xs-4">
                <b>Type</b>
            </div>
            <div class="col-md-4 col-xs-4">
                <b>Date</b>
            </div>
        </div>
    </div>


    %{--Login DIV--}%
    <div class="modal fade" id="login" role="dialog">
        <div class="modal-dialog">
            <div class="login s2ui_center ui-corner-all" style="text-align:center">
                <div class="login-inner">
                    <g:form controller="login" action="authenticate" method="post" autocomplete="off" style="background-color:whitesmoke; padding:10px 10px 10px 10px; border-radius:5px">
                        <div id="login-inner" class="sign-in">
                            <h2>Login as <g:message code="term.coach"/> or <g:message code="term.trainer"/></h2>
                            <p style="color:red;" id="loginFailedText"></p>

                            <div class="input-group login-userinput">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                                <input autofocus="autofocus" name="username" id="username" type="text" class="form-control" placeholder="Username">
                            </div>


                            <div class="input-group"  style="padding-top: 5px; padding-bottom: 5px">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                                <input  name="password" id="password" type="password" class="form-control" placeholder="Password">
                            </div>

                            <g:actionSubmit value="Login" class="btn btn-primary btn-block login-button" />
                            <div class="form-group" style="align:center">
                                <label for="remember_me">Remember me</label>
                                <input name="remember-me" id="remember_me" checked="checked" type="checkbox">
                            </div>

                            <div class="forgot-link">
                                <g:link controller="register" action="forgotPassword">Forgot password?</g:link><br/>
                            </div>
                            <g:link controller="registration">Register a new account</g:link><br/>
                        </div>
                    </g:form>
                </div>
            </div>
        </div>
    </div>


%{-- catchDetail Modal --}%
<div class="modal fade" id="catchDetail" role="dialog">
    <div class="modal-dialog" style="background-color:whitesmoke; padding:10px 10px 10px 10px; border-radius:5px; text-align:center;">
        <p id="displayTripName">sfsdf</p>
    </div>
</div>

<script>
    $(document).ready( function() {



        // Show catch button event listner
        $('#showCatchesButton').click(function() {

            // get show catch div
            var showCatchesDiv = $('#showCatches');


            // check if div is visible, hide it if not
            if (showCatchesDiv.is(":visible")) {
                showCatchesDiv.hide();

            // this checks if we already loaded data into the div so we don't have to call to server again
            } else if (showCatchesDiv.children().length > 1) {
                showCatchesDiv.show();

            // call to the controller Catch, method getCatches
            } else {
                $.getJSON("catch/getCatches", function (data) {
                    var catches = [];

                    // getCatches returns an array converted as JSON, go through the JSON file creating populated rows
                    $.each(data, function (key, val) {
                        catches.push(
                            "<div class='row' id='catch_" + val.id + "' onclick='showCatchDetail(" + val.id + ")'>" +
                                "<div class='col-md-4 col-xs-4'>" + val.tripName + "</div>" +
                                "<div class='col-md-4 col-xs-4'>" + val.fishType + "</div>" +
                                "<div class='col-md-4 col-xs-4'>" + val.dateCaught + "</div>" +
                            "</div>"
                        );
                    });

                    // if there isn't anything in the database
                    if (catches.length === 0) {
                        showCatchesDiv.html("You haven't caught anything yet!");
                    } else {
                        // combine the rows as one HTML object and push it to the showCatches div
                        $(
                            catches.join("")
                        ).appendTo("#showCatches");
                    }

                    // make the div visible
                    showCatchesDiv.show();
                });
            }
        });



        $('#submitNewCatch').click(function() {
            var tripName = $("#tripName");
            var fishType = $("#fishType");
            var dateCaught = $("#dateCaught");
            var comment = $("#comment");
            var xCoord = $("#xCoord");
            var yCoord = $("#yCoord");


            $.post("catch/newCatch", {
                    tripName: tripName.val(),
                    fishType: fishType.val(),
                    dateCaught : dateCaught.val(),
                    comment : comment.val(),
                    xCoord : xCoord.val(),
                    yCoord: yCoord.val()
                },
                function(returnedData) {
                    tripName.val("");
                    fishType.val("");
                    dateCaught.val("");
                    comment.val("");
                    xCoord.val("");
                    yCoord.val("");
                }).fail(function() {
                    console.log("error");
            });
        });

        $('#newCatchButton').click(function() {
            var newCatchDiv = $("#newCatch");

            if (newCatchDiv.is(":visible")) {
                newCatchDiv.hide();
            } else {
                newCatchDiv.show();
            }
        });



    });


    function geoFindMe() {
        var outputLatLong = $("#outputGeolocation");

        if (!navigator.geolocation){
            outputLatLong.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }

        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            $("#xCoord").val(latitude);
            $("#yCoord").val(longitude);

        };

        function error() {
            outputLatLong.innerHTML = "Unable to retrieve your location";
        };

        $("#xCoord").val("Locating...");
        $("#yCoord").val("Locating...");
        navigator.geolocation.getCurrentPosition(success, error);
    }


    // navigator.onLine returns true if user is connected to internet
    if (navigator.onLine) {

        geoFindMe();



    } else {



    }

    function showCatchDetail(index) {

        $.getJSON("catch/getCatch", { catchID: index }, function (data) {

            // getCatch returns an array converted as JSON
            // only returns one JSON object
            $.each(data, function (key, val) {
                $("#displayTripName").html(
                    "<div class='row'>" +
                        "<div class='col-md-12'><h2>" +
                            val.tripName +
                        "</h2></div>" +
                    "<div class='row'>" +
                        "<div class='col-md-4 col-xs-4'><b>Date</b></div>" +
                        "<div class='col-md-4 col-xs-4'><b>Fish Type</b></div>" +
                        "<div class='col-md-4 col-xs-4'><b>Comment</b></div>" +
                    "</div>" +
                    "<div class='row' id='catch_" + key + "' onclick='showCatchDetail(" + key + ")'>" +
                        "<div class='col-md-4 col-xs-4'>" + val.dateCaught + "</div>" +
                        "<div class='col-md-4 col-xs-4'>" + val.fishType + "</div>" +
                        "<div class='col-md-4 col-xs-4'>" + val.comment + "</div>" +
                    "</div>"
                );
            });

        });


//        $("#displayTripName").text(index)
        $("#catchDetail").modal();

    }

</script>
</body>
</html>
