
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


function showCatchDetail(index) {

    $.getJSON("catch/getCatch", { catchID: index }, function (data) {

        // getCatch returns an array converted as JSON
        // only returns one JSON object
        // has a hidden paragraph tag with ID as value
        $.each(data, function (key, val) {
            $("#displayTripModal").html(
                "<div class='container col-md-7'>" +
                "<div class='row'>" +
                "<div id='tripNameModal' class='col-md-10'><h2>" +
                val.tripName +
                "</h2></div>" +
                "<div class='row'>" +
                "<div class='col-md-2 col-xs-2'><b>Date</b></div>" +
                "<div class='col-md-2 col-xs-2'><b>Fish Type</b></div>" +
                "<div class='col-md-2 col-xs-2'><b>X Coord</b></div>" +
                "<div class='col-md-2 col-xs-2'><b>Y Coord</b></div>" +
                "<div class='col-md-2 col-xs-2'><b>Comment</b></div>" +
                "</div>" +
                "<div class='row'>" +
                "<div id='dateCaughtModal' class='col-md-2 col-xs-2'>" + val.dateCaught.substring(0, 10) + "</div>" +
                "<div id='fishTypeModal' class='col-md-2 col-xs-2'>" + val.fishType + "</div>" +
                "<div id='xCoordModal' class='col-md-2 col-xs-2'>" + val.xCoord + "</div>" +
                "<div id='yCoordModal' class='col-md-2 col-xs-2'>" + val.yCoord + "</div>" +
                "<div id='commentModal' class='col-md-2 col-xs-2'>" + val.comment + "</div>" +
                "</div>" +
                "</div>"
            );

            $("#modalCatchID").text(index)
        });

    });


    $("#catchDetail").modal();

}


function editCatch() {
    var tripName = $("#tripNameModal").text();
    var fishType = $("#fishTypeModal").text();
    var dateCaught = $("#dateCaughtModal").text();
    var comment = $("#commentModal").text();
    var xCoord = $("#xCoordModal").text();
    var yCoord = $("#yCoordModal").text();


    $("#displayTripModal").html(
        "<div class='row'>" +
        "<div class='col-md-3 col-md-offset-1  col-xs-offset-1 col-xs-3'>Trip Name:</div>" +
        "<div class='col-md-3 col-xs-3'><input id='modalTripName' type='text' class='modalTextbox' value='" + tripName + "' /></div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-3 col-md-offset-1  col-xs-offset-1 col-xs-3'>Fish Type:</div>" +
        "<div class='col-md-3 col-xs-3'><input id='modalFishType' type='text' value='" + fishType + "' /></div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-3 col-md-offset-1  col-xs-offset-1 col-xs-3'>Comment:</div>" +
        "<div class='col-md-3 col-xs-3'><input id='modalComment' type='text' value='" + comment + "' /></div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-3 col-md-offset-1  col-xs-offset-1 col-xs-3'>X Coord:</div>" +
        "<div class='col-md-3 col-xs-3'><input id='modalXCoord' type='text' value='" + xCoord + "' /></div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-3 col-md-offset-1  col-xs-offset-1 col-xs-3'>Y Coord:</div>" +
        "<div class='col-md-3 col-xs-3'><input id='modalYCoord' type='text' value='" + yCoord + "' /></div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-3 col-md-offset-1  col-xs-offset-1 col-xs-3'>Date Caught:</div>" +
        "<div class='col-md-3 col-xs-3'><input id='modalDateCaught' type='date' value='" + dateCaught + "' /></div>" +
        "</div>"
    );
    $("#displayTripModal").append("<div class='row'><input type='submit' onclick='submitEditCatch()' class='btn btn-primary tripModalButton' /></row>");
}

function submitEditCatch() {
    var catchID = $("#modalCatchID");
    var tripName = $("#modalTripName");
    var fishType = $("#modalFishType");
    var dateCaught = $("#modalDateCaught");
    var comment = $("#modalComment");
    var xCoord = $("#modalXCoord");
    var yCoord = $("#modalYCoord");
    var imageUpload = $("#image");

    $.post("catch/editCatch", {
            ID: catchID.text(),
            tripName: tripName.val(),
            fishType: fishType.val(),
            dateCaught : dateCaught.val(),
            comment : comment.val(),
            xCoord : xCoord.val(),
            yCoord: yCoord.val(),
            image: imageUpload.val()
        },
        function(returnedData) {
            $("#catchDetail").modal('hide');
            $("#showCatches").html("");
            $("#showCatches").css("display", "none");
        }).fail(function() {
        console.log("error");
    });
}


$(document).ready( function() {






    // navigator.onLine returns true if user is connected to internet
    if (navigator.onLine) {

        geoFindMe();

        if('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/fishingApp/assets/sw.js')
                .then(function() { console.log("Service Worker Registered"); });
        }


    } else {

        alert("YOU'RE OFFLINE");


    }

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
                        "<div class='col-md-4 col-xs-4'>" + val.dateCaught.substring(0, 10) + "</div>" +
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
        var imageUpload = $("#image");

        $.post("catch/newCatch", {
                tripName: tripName.val(),
                fishType: fishType.val(),
                dateCaught : dateCaught.val(),
                comment : comment.val(),
                xCoord : xCoord.val(),
                yCoord: yCoord.val(),
                image: imageUpload.val()
            },
            function(returnedData) {
                tripName.val("");
                fishType.val("");
                dateCaught.val("");
                comment.val("");
                xCoord.val("");
                yCoord.val("");
                imageUpload.val("");
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


