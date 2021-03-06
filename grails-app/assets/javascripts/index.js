
// Use with generateGUID function to make random int
function genString() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// For generating unique ID
function generateGUID() {
    return (genString() + genString() + "-" + genString() + "-4" + genString().substr(0,3) + "-" + genString() + "-" + genString() + genString() + genString()).toLowerCase();
}


// Converts blob string to a blob file
// Taken from https://ourcodeworld.com/
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}


// Finds location using navigator and sets the values for newCatch
function geoFindMe() {

    if (!navigator.geolocation){
       //print some error here if you want
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        $("#xCoord").val(latitude);
        $("#yCoord").val(longitude);

    }

    function error() {
        //handle failed retrieve
    }

    navigator.geolocation.getCurrentPosition(success, error);
}


// Displays thumbnail of selected image in the imageDiv
// this function is from HTML5 rocks!
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var f = files[0];

    if (f.type.match('image.*')) {
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result, '" />'].join('');
                $('#imageDiv').html(span);

            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    } else {
        alert("Invalid File!");
    }

}


// Populates modal that shows catches detail
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
                    "<b>Location: </b><p id='xCoordModal'>" + val.xCoord + "</p>, <p id='yCoordModal'>" + val.yCoord + "</p><br />"
            );

            // if there is an image append it!
            if (val.image !== null) {
                $("#displayTripModal").append("<img class='catchDetailImg' src='../../Images/" + val.image + "'/></div>");
            }

            $("#modalCatchID").text(index)
        });

    });

    $("#editCatchButton").show();
    $("#catchDetail").modal();

}


// Replaces everything in catch detail modal with inputs
function editCatch() {
    var tripName = $("#tripNameModal").text();
    var fishType = $("#fishTypeModal").text();
    var dateCaught = $("#dateCaughtModal").text();
    var comment = $("#commentModal").text();
    var xCoord = $("#xCoordModal").text();
    var yCoord = $("#yCoordModal").text();


    $("#displayTripModal").html(
        "<form>" +
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
            "<input id='modalDateCaught' type='date' value='" + dateCaught + "' /><br />" +

            "<p>Image</p>" +
            "<input id='modalImage' type='file' accept='image/*' capture />" +

            "<input type='submit' onclick='submitEditCatch()' class='button' />" +
        "</form>"

    );

    $("#editCatchButton").hide();
}


// Sends ajax request to submit the edited catch
function submitEditCatch() {
    var catchID = $("#modalCatchID");
    var tripName = $("#modalTripName");
    var fishType = $("#modalFishType");
    var dateCaught = $("#modalDateCaught");
    var comment = $("#modalComment");
    var xCoord = $("#modalXCoord");
    var yCoord = $("#modalYCoord");
    var imageUpload = $("#modalImage");


    var jForm = new FormData();

    // if there is an image, append it to the form
    if (imageUpload[0].files.length) {
        jForm.append("image", imageUpload[0].files[0]);
    } else {
        imageUpload = null;
    }

    jForm.append("ID", catchID.text());
    jForm.append("tripName", tripName.val());
    jForm.append("fishType", fishType.val());
    jForm.append("dateCaught", dateCaught.val());
    jForm.append("comment", comment.val());
    jForm.append("xCoord", xCoord.val());
    jForm.append("yCoord", yCoord.val());


    $.ajax({
        url: "catch/editCatch",
        type: "POST",
        data: jForm,
        mimeType: "multipart/form-data",
        contentType: false,
        cache: false,
        processData: false,

        success: function() {
            $("#catchDetail").modal('hide');
            $("#showCatches").html("");
            $("#showCatches").css("display", "none");
        }
    });
}


// This is used for submit queue, it takes the parameter
// of the catch so the image can be extracted and converted
// from localforage without synchronization issues
function submitQueueHelper(value) {

    // All data being sent to catch/NewCatch is stored in here
    var jForm = new FormData();

    // if there is a photo
    if (value.photoID !== null) {
        // This is getting the photo of the catch out of localforage
        // it then makes a promise in which the ajax is called after
        // it is full filled
        localforage.getItem(value.photoID, function (err, data) {

            // convert the blob string back to an appropriate file
            var block = data.split(";");
            var contentType = block[0].split(":")[1];
            var realData = block[1].split(",")[1];
            var image = b64toBlob(realData, contentType);


            jForm.append("tripName", value.tripName);
            jForm.append("fishType", value.fishType);
            jForm.append("dateCaught", value.dateCaught);
            jForm.append("comment", value.comment);
            jForm.append("xCoord", value.xCoord);
            jForm.append("yCoord", value.yCoord);
            jForm.append("image", image);

        }).then(function () {

            $.ajax({
                url: "catch/NewCatch",
                type: "POST",
                data: jForm,
                mimeType: "multipart/form-data",
                contentType: false,
                cache: false,
                processData: false
            });

            localforage.removeItem(value.photoID);

        });


    } else {

        jForm.append("tripName", value.tripName);
        jForm.append("fishType", value.fishType);
        jForm.append("dateCaught", value.dateCaught);
        jForm.append("comment", value.comment);
        jForm.append("xCoord", value.xCoord);
        jForm.append("yCoord", value.yCoord);
        jForm.append("image", null);

        $.ajax({
            url: "catch/NewCatch",
            type: "POST",
            data: jForm,
            mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false
        });
    }
}


function submitQueue() {

    // this is a hacky way to check if the user is logged in
    if ($("#loginBtn").text() !== "Login") {

        // check if user is online
        if (navigator.onLine) {

            // if they are, enter localforage and extract info
            localforage.setDriver(localforage.INDEXEDDB).then(function () {
                localforage.getItem('catches', function (err, value) {

                    // go through each item in the 'catches' key
                    for (var i = 0; i < value.length; i++) {
                        submitQueueHelper(value[i]);    // This function is called to avoid race conditions
                    }

                    // after all items in the queue are submitted, remove them
                    localforage.removeItem('catches', function (err, value) {
                        $("#catchQueue").html("<b>Successfully Uploaded!</b>");
                    })
                });
            });

        } else {
            // user not online
            alert("You have to be online to do that!")
        }
    } else {
        // user not logged in
        alert("Log in first!");
    }

}


$(document).ready(function() {

    // check if user is online with navigator
    if (navigator.onLine) {

        // check if a service worker is supported then register it
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(function() { console.log("Service Worker Registered"); });
        }

    } else {
        $("#showCatchesButton").hide(); // hide show catches button if offline
    }


    // showCatch button event listener
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

                // if the user has catches
                if (data.length > 0) {

                    catches.push("<table>" +
                                    "<tr>" +
                                        "<th>Trip</th><th>Type</th><th>Date</th>" +
                                    "</tr>"
                    );
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

                    // combine the rows as one HTML object and push it to the showCatches div
                    $(
                        catches.join("")
                    ).appendTo("#showCatches");

                } else {

                    // if there isn't anything in the database
                    showCatchesDiv.html("You haven't caught anything yet!");

                }

                // make the div visible
                showCatchesDiv.show();
            });
        }
    });


    // newCatchButton event listener
    $('#newCatchButton').click(function() {
        $("#newCatch").modal();
    });


    // listener for closeNewCatch button
    $('#closeNewCatch').click(function() {
        $("#newCatch").modal('toggle');
    });


    // submitNewCatch button listener
    $('#submitNewCatch').click(function() {

        var tripName = $("#tripName");
        var fishType = $("#fishType");
        var dateCaught = $("#dateCaught");
        var comment = $("#comment");
        var xCoord = $("#xCoord");
        var yCoord = $("#yCoord");
        var imageUpload = $('#image')[0].files[0];


        // user validation
        if (dateCaught.val() === "") {
            dateCaught.css("border", "1px solid red");
            alert("Enter a date!");
            return;
        } else if (tripName.val() === "") {
            tripName.css("border", "1px solid red");
            alert("Enter a trip name!");
            return;
        } else if (fishType.val() === "") {
            fishType.css("border", "1px solid red");
            alert("Enter a fish type!");
            return;
        }


        // check if online and that the user is logged in
        if (navigator.onLine && $("#loginBtn").text() !== "Login") {

            var jForm = new FormData();

            if (imageUpload !== undefined) {
                jForm.append("image", imageUpload);
            }

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

                success: function() {
                    tripName.val("");
                    fishType.val("");
                    dateCaught.val("");
                    comment.val("");
                    xCoord.val("");
                    yCoord.val("");
                    $('#image').val("");
                    alert("Saved catch!");
                }
            });

        } else {  // Put Catch in localforage

            // check if user has image
            if (imageUpload !== undefined) {
                // for converting image to blob string setup
                var reader = new FileReader();
                reader.readAsDataURL(imageUpload);

                var photoID = generateGUID();   // generate id for the photos
            }


            localforage.setDriver(localforage.INDEXEDDB).then(function() {

                // create dictionary for the catch data
                var catchData = {
                    tripName: tripName.val(),
                    fishType: fishType.val(),
                    dateCaught: dateCaught.val(),
                    comment: comment.val(),
                    xCoord: xCoord.val(),
                    yCoord: yCoord.val()
                };


                // if there is an image
                if (imageUpload !== undefined) {
                    catchData.photoID = photoID;    // put it in the dictionary

                    // store image in localForage
                    reader.onloadend = function() {
                        localforage.setItem(photoID, reader.result);    // reader.result is the blob string
                    };

                } else {

                    catchData.photoID = null;   // put it in the dictionary as null
                }

                var catches = [];

                // get the key first
                localforage.getItem('catches', function (err, value) {

                    // if there is anything in 'catches' we will push to it
                    if (value !== null) {
                        catches = value;
                    }

                    catches.push(catchData);


                    // clear localforage catches
                    localforage.setItem('catches', catches, function () {
                        alert("Added " + tripName.val() + " to queue, Login to upload catch!");
                        tripName.val("");
                        fishType.val("");
                        dateCaught.val("");
                        comment.val("");
                        xCoord.val("");
                        yCoord.val("");
                        $('#image').val("");
                    })
                });
            });
        }
    });


    // listener for the image button
    $('#image').change(handleFileSelect);

    // check localforage and if anything is in there, create catch queue div
    localforage.setDriver(localforage.INDEXEDDB).then(function() {

        localforage.getItem('catches', function (err, value) {
            if (value != null) {
                var html = "<table><tr><th>Catch Queue:</th></tr>";

                for (var i = 0; i < value.length; i++) {
                    html += "<tr><td>" + value[i].tripName + "</tr></td>";
                }

                html += "<tr><td><button id='submitQueue' onclick='submitQueue()' class='button'>Upload Queue</button></td></tr></table>";
                $("#catchQueue").html(html);
            }
        });
    });


    geoFindMe();

});


