<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/javascript; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>
        The Fishing App
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    %{--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>--}%
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
                    <g:form controller="login" action="authenticate" method="post" autocomplete="off" style="background-color:whitesmoke; padding:10px 10px 10px 10px; border-radius:5px">
                        <div id="login-inner" class="sign-in">
                            <h2>FishingApp</h2>
                            <p style="color:red;" id="loginFailedText"></p>

                            <div>
                                <input style="width:100%" autofocus="autofocus" name="username" id="username" type="text" class="form-control" placeholder="Username">
                            </div>


                            <div style="padding-top: 2px; padding-bottom: 10px">
                                <input name="password" id="password" type="password" class="form-control" placeholder="Password">
                            </div>

                            <g:actionSubmit value="Login" class="btn btn-primary btn-block login-button" />
                            <div class="form-group" style="align:center">
                                <label for="remember_me">Remember me</label>
                                <input name="remember-me" id="remember_me" checked="checked" type="checkbox">
                            </div>

                            <g:link controller="registration">Register a new account</g:link><br/>
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
