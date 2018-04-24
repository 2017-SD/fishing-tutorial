<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/javascript; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>
        The Fishing App
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <asset:javascript src="jquery-3.1.1.js" />
    <asset:javascript src="bootstrap.js" />
    <asset:javascript src="localforage/localforage.js" />

    <asset:stylesheet src="bootstrap.css" />
    <asset:stylesheet src="bootstrap-theme.css" />
    <asset:stylesheet src="main.css"/>


    <style>
        body {
            background-color: #A4DB8F;
        }
    </style>
    <g:layoutHead/>
</head>
<body>

    %{--Login DIV--}%
    <div class="modal fade" id="login" role="dialog">
        <div class="modal-dialog">
            <div class="login s2ui_center ui-corner-all" style="text-align:center">
                <div class="login-inner">
                    <g:form controller="login" action="authenticate" method="post" autocomplete="off">
                        <div id="login-inner" class="sign-in">
                            <h2>FishingApp</h2>

                            <div>
                                <input style="width:60%" autofocus="autofocus" name="username" id="username" type="text" class="form-control" placeholder="Username">
                            </div>


                            <div style="padding-top: 2px; padding-bottom: 10px">
                                <input style="width:60%; margin:auto;" name="password" id="password" type="password" class="form-control" placeholder="Password">
                            </div>

                            <g:actionSubmit value="Login" class="button" />
                        </div>
                    </g:form>
                </div>
            </div>
        </div>
    </div>


    <div id="navContainer">
        <nav id="navMain">
            <a id="mainLogoText" href="/"><g:img id="mainLogo" dir="images" file="logo.png"  /> FishingApp</a>
            <a class="loginBtn" id="loginBtn">Login</a>
        </nav>
    </div>


<g:layoutBody/>


    <div class="footer" role="contentinfo"></div>

    <div id="spinner" class="spinner" style="display:none;">
        <g:message code="spinner.alt" default="Loading&hellip;"/>
    </div>


    <asset:javascript src="application.js"/>
</body>
</html>
