<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>
        <g:layoutTitle default="Grails"/>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <asset:stylesheet src="main.css"/>
    <asset:stylesheet src="bootstrap.css" />
    <asset:stylesheet src="bootstrap-theme.css" />
    <asset:javascript src="bootstrap.js" />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <style>
        body {
            background-color: #A4DB8F;
        }
    </style>
    <g:layoutHead/>
</head>
<body>




<sec:ifLoggedIn>
    <nav id="navMain">

        <a id="mainLogoText" href="/fishingApp/"><g:img id="mainLogo" dir="images" file="logo.png"  /> FishingApp</a>
        <g:link class="loginBtn" controller="Logout">log out</g:link>
    </nav>
    <nav id="navUser">
        <a>Logged in as <sec:username/>!</a>
    </nav>

</sec:ifLoggedIn>

<sec:ifNotLoggedIn>

    %{--Login DIV--}%
    <div class="modal fade" id="login" role="dialog">
        <div class="modal-dialog">
            <div class="login s2ui_center ui-corner-all" style="text-align:center">
                <div class="login-inner">
                    <g:form controller="login" action="authenticate" method="post" autocomplete="off" style="background-color:whitesmoke; padding:10px 10px 10px 10px; border-radius:5px">
                        <div id="login-inner" class="sign-in">
                            <h2>FishingApp</h2>
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

                            <g:link controller="registration">Register a new account</g:link><br/>
                        </div>
                    </g:form>
                </div>
            </div>
        </div>
    </div>



    <nav id="navMain">
        <a id="mainLogoText" href="/fishingApp/"><g:img id="mainLogo" dir="images" file="logo.png"  /> FishingApp</a>
        <a class="loginBtn" id="loginBtn">Login</a>
    </nav>
</sec:ifNotLoggedIn>



<g:layoutBody/>


    <div class="footer" role="contentinfo"></div>

    <div id="spinner" class="spinner" style="display:none;">
        <g:message code="spinner.alt" default="Loading&hellip;"/>
    </div>


    <asset:javascript src="application.js"/>
</body>
</html>
