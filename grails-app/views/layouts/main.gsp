<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>
        <g:layoutTitle default="Grails"/>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <asset:javascript src="dropzone.js"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    <style>
        #navMain {
            background-color: #2597ec;
            height: 60px;
            width: 100%;
            font-size: 15px;
            color: #ffffff;
            display: flex;
            vertical-align: middle;
        }

        #mainLogoText {
            color: #79b94c;
            font-size: 24px;
            font-weight: 500;
            vertical-align: middle;
            margin-top: 12px;

        }

        #mainLogo {
            margin-left: 15px;
            vertical-align: middle;
        }

        .loginBtn {
            margin-top: 15px;
            color: #79b94c;
            text-align: right;
            vertical-align: middle;
            font-size: 20px;
            margin-left:auto;
            margin-right:15px;
        }

        #navUser {
            background-color: #006dba;
            text-align: center;
            width: 100%;



        }

        #navUser a {
            font-size: 15px;
            color: white;
        }


        text {
            border: 1px solid black;
            width: 100%;
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
    <nav id="navMain">
        <a id="mainLogoText" href="/fishingApp/"><g:img id="mainLogo" dir="images" file="logo.png"  /> FishingApp</a>
        <g:link class="loginBtn" controller="login" action="auth">Login</g:link>
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
