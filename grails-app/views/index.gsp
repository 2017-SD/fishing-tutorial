<!doctype html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>The Fishing App</title>

    <asset:link rel="icon" href="favicon.ico" type="image/x-ico" />
    <asset:stylesheet src="index.css" />
    <style>

    </style>
</head>
<body>


    %{-- New Catch Div--}%
    <div class="row">
        <div class="col-md-12"><button class='center-block btn newCatchBtn' id="newCatchButton">New Catch</button></div>
    </div>
    <div id="newCatch" class="container col-md-offset-3 col-md-6 col-xs-12 col-xs-offset-0">
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
        <div class="col-md-12"><button class='center-block btn' id="showCatchesButton">Your Catches</button></div>
    </div>
    <div id="showCatches" class="container col-md-offset-3 col-md-6 col-xs-offset-0 col-xs-12">
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


%{-- catchDetail Modal --}%
<div class="modal fade" id="catchDetail" role="dialog">
    <div class="modal-dialog">
        <a id='editCatchButton' onclick="editCatch()" style="float:right; padding-right: 5px;">EDIT</a>
        <div id="displayTripModal" class="container">Placeholder eh</div>
        <p id='modalCatchID' style='display:none;'>" + index + "</p>
    </div>
</div>


</body>
</html>

<content tag="footScripts">
    <asset:javascript src="index.js"/>
</content>