<?php
function user_login($username, $password, $iscookie)
{
    global $global_config_arr;
    global $db;

    $username = savesql($username);
    $password = savesql($password);
    $index = mysql_query("SELECT * FROM ".$global_config_arr[pref]."user WHERE user_name = '$username'", $db);
    $rows = mysql_num_rows($index);
    if ($rows == 0) {
        $_GET['go'] = "login";
        return 1;  // Fehlercode 1: User nicht vorhanden
    }
    else {

        $dbuserpass = mysql_result($index, 0, "user_password");
        $dbuserid = mysql_result($index, 0, "user_id");
        $username = mysql_result($index, 0, "user_name");
        $usersalt = mysql_result($index, 0, "user_salt");
        
        if ($iscookie===false) {
            $password = md5 ( $password.$usersalt );
        }

        if ($password == $dbuserpass) {
            $_SESSION["user_level"] = "loggedin";
            $_SESSION["user_id"] = $dbuserid;
            $_SESSION["user_name"] = $username;
            return 0;  // Login akzeptiert
        }
        else {
            $_GET['go'] = "login";
            return 2;  // Fehlercode 2: Falsches Passwort
        }
    }
}



function set_cookie($username, $password)
{
    global $global_config_arr;
    global $db;

    $username = savesql($username);
    $password = savesql($password);
    $index = mysql_query("SELECT * FROM ".$global_config_arr[pref]."user WHERE user_name = '$username'", $db);
    $rows = mysql_num_rows($index);
    if ($rows == 0)
    {
        return false;
    }
    else
    {

        $dbuserpass = mysql_result($index, 0, "user_password");
        $dbuserid = mysql_result($index, 0, "user_id");
        $dbusersalt= mysql_result($index, 0, "user_salt");
        $password = md5 ( $password.$dbusersalt );

        if ($password == $dbuserpass)
        {
            $inhalt = $password . $username;
            setcookie ("login", $inhalt, time()+2592000, "/");
            return true;  // Login akzeptiert
        }
        else
        {
            return false;
        }
    }
}

/////////////////////////
//// Do Cookie Stuff ////
/////////////////////////
if ( $_POST['login'] == 1 ) {
    $global_config_arr['login_state'] = user_login ( $_POST['username'], $_POST['userpassword'], FALSE );
} elseif ( $_COOKIE['login'] ) {
    $userpassword = substr ( $_COOKIE['login'], 0, 32 );
    $username = substr ( $_COOKIE['login'], 32, strlen ( $_COOKIE['login'] ) );
    $global_config_arr['login_state'] = user_login ( $username, $userpassword, TRUE );
}

if ( $_POST['stayonline'] == 1 && $global_config_arr['login_state'] == 0 ) {
    set_cookie ( $_POST['username'], $_POST['userpassword'] );
}


////////////////
//// Logout ////
////////////////
if ( $_GET['go'] == "logout" && $_POST['go'] != "login" ) {
    session_unset ();
    session_destroy ();
    $_SESSION = array();
    setcookie ( "login", "", time()-1000, "/" );
}
?>