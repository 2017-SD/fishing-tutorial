<!doctype html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>The Fishing App</title>

    <asset:link rel="icon" href="favicon.ico" type="image/x-ico" />
    <asset:stylesheet src="index.css" />

</head>
<body>

    <div id="container">

        %{-- Catch Queue Div --}%
        <div id="catchQueue">

        </div>

        <button class='button' id="newCatchButton">New Catch</button> <br />

        %{-- Show Catches div--}%
        <button class='button' id="showCatchesButton">Your Catches</button>
        <div id="showCatches">

        </div>

    </div>


%{-- New Catch Modal--}%
<div class="modal fade" id="newCatch" role="dialog">
    <div class="modal-dialog">
        <form>
            <input type="hidden" id="modalCatchID" />
            <h2>New Catch</h2>
            <label for="tripName">Trip Name</label>
            <input type="text" id="tripName" placeholder="The name of your trip...">

            <label for="fishType">Fish Type</label>
            <input type="text" id="fishType" placeholder="The type of fish you caught...">

            <label for="dateCaught">Date Caught</label>
            <input type="date"  id="dateCaught" />

            <label for="xCoord">X-Coordinate</label>
            <input type="num" id="xCoord" placeholder="X coordinate of fish location">

            <label for="yCoord">Y-Coordinate</label>
            <input type="num" id="yCoord" placeholder="Y coordinate of fish location">

            <label for="comment">Comment</label>
            <input type="text" id="comment" placeholder="Anything you would like to mention?">


            <label for="image">Upload Image</label>
            <input id="image" type="file" accept="image/*" capture />
            <div id="imageDiv"></div>

            <input id="submitNewCatch" class="button" type="submit" />
            <button type="button" id="closeNewCatch" class="button center-block" >Close</button>
        </form>

    </div>
</div>

%{-- catchDetail Modal --}%
<div class="modal fade" id="catchDetail" role="dialog">
    <div class="modal-dialog">
        <a id='editCatchButton' onclick="editCatch()">EDIT</a>
        <div id="displayTripModal">Placeholder eh</div>
    </div>
</div>




</body>
</html>

<content tag="footScripts">
    <asset:javascript src="index.js"/>
</content>