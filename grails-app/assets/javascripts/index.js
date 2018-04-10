
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

    // $("#xCoord").val("Locating...");
    // $("#yCoord").val("Locating...");
    navigator.geolocation.getCurrentPosition(success, error);
}


function showCatchDetail(index) {

    $.getJSON("catch/getCatch", { catchID: index }, function (data) {

        // getCatch returns an array converted as JSON
        // only returns one JSON object
        // has a hidden paragraph tag with ID as value
        $.each(data, function (key, val) {
            $("#displayTripModal").html(
                "<h2 id='tripNameModal'>" + val.tripName + "</h2>" +
                "<div id='tripModalData'>" +
                    "<b>Date: </b><p id='dateCaughtModal'>" + val.dateCaught.substring(0, 10) + "</p><br />" +
                    "<b>Fish Type: </b><p id='fishTypeModal'>" + val.fishType + "</p><br />" +
                    "<b>Comments: </b><p id='commentModal'>" + val.comment + "</p><br />" +
                    "<b>Location: </b><p id='xCoordModal'>" + val.xCoord + "</p>, <p id='yCoordModal'>" + val.yCoord + "</p><br />" +
                "</div>"
            );

            $("#modalCatchID").text(index)
        });

    });

    $("#editCatchButton").show();
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
        "<p>Trip Name</p>" +
        "<input id='modalTripName' type='text' class='modalTextbox' value='" + tripName + "' /><br />" +

        "<p>Fish Type</p>" +
        "<input id='modalFishType' type='text' value='" + fishType + "' /><br />" +

        "<p>Comment</p>" +
        "<input id='modalComment' type='text' value='" + comment + "' /><br />" +

        "<p>X Coord</p>" +
        "<input id='modalXCoord' type='text' value='" + xCoord + "' /><br />" +


        "<p>Y Coord</p>" +
        "<input id='modalYCoord' type='text' value='" + yCoord + "' /><br />" +

        "<p>Date Caught</p>" +
        "<input id='modalDateCaught' type='date' value='" + dateCaught + "' /><br />"
    );

    $("#displayTripModal").append("<input type='submit' onclick='submitEditCatch()' class='button' />");
    $("#editCatchButton").hide();
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
    localforage.setDriver(localforage.LOCALSTORAGE).then(function() {

        localforage.getItem('fishQueue', function (err, value) {
            if (value != null) {
                var html = "<table><tr><th>Queue:</th></tr>";
                for (var i = 0; i < value.length; i++) {
                    html += "<tr><td>" + value[i].tripName + "</tr></td>";
                }

                html += "<tr><td><button id='submitQueue'>Upload Queue</button></td></tr></table>";
                $("#catchQueue").html(html);
            }
        });
    });

    if (navigator.onLine) {

        if('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(function() { console.log("Service Worker Registered"); });
        }

        // not logged in
        if (getLogin() == false) {
            $("#newCatchButton").hide();
        }

    } else {

        $("#showCatchesButton").hide();
    }



    // Show catch button event listner
    $('#showCatchesButton').click(function() {

        // get show catch div
        var showCatchesDiv = $('#showCatches');


        // check if div is visible, hide it if not
        if (showCatchesDiv.is(":visible")) {
            showCatchesDiv.hide();

        // this checks if we already loaded data into the div so we don't have to call to server again
        } else if (showCatchesDiv.children().length) {
            showCatchesDiv.show();

        // call to the controller Catch, method getCatches
        } else {
            $.getJSON("catch/getCatches", function (data) {
                var catches = [];
                catches.push("<table>" +
                    "<tr>" +
                        "<th>Trip</th><th>Type</th><th>Date</th>" +
                    "</tr>");
                // getCatches returns an array converted as JSON, go through the JSON file creating populated rows
                $.each(data, function (key, val) {
                    catches.push(
                        "<tr id='catch_" + val.id + "' onclick='showCatchDetail(" + val.id + ")'>" +
                            "<td>" + val.tripName + "</td>" +
                            "<td>" + val.fishType + "</td>" +
                            "<td>" + val.dateCaught.substring(0, 10) + "</td>" +
                        "</tr>"
                    );
                });

                catches.push("</table>");


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
        var imageUpload = null;
        // var imageUpload = $('#image').get(0).files[0];

        if (navigator.onLine && $("#loginBtn").text() !== "Login") {


            var jForm = new FormData();
            jForm.append("image", $('#image').get(0).files[0]);
            jForm.append("tripName", tripName.val());
            jForm.append("fishType", fishType.val());
            jForm.append("dateCaught", dateCaught.val());
            jForm.append("comment", comment.val());

            jForm.append("xCoord", xCoord.val());
            jForm.append("yCoord", yCoord.val());
            $.ajax({
                url: "catch/NewCatch",
                type: "POST",
                data: jForm,
                mimeType: "multipart/form-data",
                contentType: false,
                cache: false,
                processData: false,

                success: function(data) {
                    tripName.val("");
                    fishType.val("");
                    dateCaught.val("");
                    comment.val("");
                    xCoord.val("");
                    yCoord.val("");
                    imageUpload.val("");
                }
            });


            // $.post("catch/newCatch", {
            //         tripName: tripName.val(),
            //         fishType: fishType.val(),
            //         dateCaught: dateCaught.val(),
            //         comment: comment.val(),
            //         xCoord: xCoord.val(),
            //         yCoord: yCoord.val(),
            //         // image: imageUpload
            //     },
            //     function () {
            //         tripName.val("");
            //         fishType.val("");
            //         dateCaught.val("");
            //         comment.val("");
            //         xCoord.val("");
            //         yCoord.val("");
            //         // imageUpload.val("");
            //
            //         alert("Submitted!");
            //     }).fail(function () {
            //     console.log("error");
            // });




        } else {
            localforage.setDriver(localforage.LOCALSTORAGE).then(function() {

                localforage.getItem('fishQueue', function(err, value) {

                    var fishCaught = [];
                    if (value != null) {
                        fishCaught = value
                    }

                    fishCaught.push({
                        tripName: tripName.val(),
                        fishType: fishType.val(),
                        dateCaught: dateCaught.val(),
                        comment: comment.val(),
                        xCoord: xCoord.val(),
                        yCoord: yCoord.val(),
                    });
                    
                    localforage.setItem('fishQueue', fishCaught, function() {
                        tripName.val("");
                        fishType.val("");
                        dateCaught.val("");
                        comment.val("");
                        xCoord.val("");
                        yCoord.val("");
                        //imageUpload.val("");

                        alert("Added to queue, Login to upload catch!");
                    });


                });


            });
        }

    });


    $('#newCatchButton').click(function() {
        var newCatchDiv = $("#newCatch");

        if (newCatchDiv.is(":visible")) {
            newCatchDiv.hide();
        } else {
            newCatchDiv.show();
        }
    });



    $("#catchQueue").click(function() {

        if ($("#loginBtn").text() !== "Login") {

            if (navigator.onLine) {
                localforage.setDriver(localforage.LOCALSTORAGE).then(function () {
                    localforage.getItem('fishQueue', function (err, value) {

                        for (var i = 0; i < value.length; i++) {
                            $.post("catch/newCatch", {
                                    tripName: value[i].tripName,
                                    fishType: value[i].fishType,
                                    dateCaught: value[i].dateCaught,
                                    comment: value[i].comment,
                                    xCoord: value[i].xCoord,
                                    yCoord: value[i].yCoord,
                                    // image: imageUpload
                                },
                                function (returnedData) {


                                }).fail(function () {
                                console.log("error");
                            });
                        }
                    });

                    localforage.removeItem('fishQueue', function (err, value) {
                        $("#catchQueue").html("<b>Successfully Uploaded!</b>");
                    })
                });
            } else {
                alert("you ain't online")
            }
        } else {
            alert("Log in first!");
        }
    });

    getLogin();
    geoFindMe();

});


