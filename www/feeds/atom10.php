<?php
###################
## Feed Settings ##
###################
$feed_url = "feeds/atom10.php";
$settings = array (
    'to_html' => array(),
    'to_text' => array('b', 'i', 'u', 's', 'center', 'url', 'home', 'email', 'list', 'numlist', 'img', 'cimg', 'font', 'color', 'size', 'code', 'quote', 'video', 'noparse'),
    'to_bbcode' => array(),
    'shortening' => false,
    'extension' => "...",
    'use_html' => true,
    'tpl_functions' => "softremove",
);
##################
## Settings End ##
##################
 

/* FS2 PHP Init */
set_include_path('.');
define('FS2_ROOT_PATH', "./../", true);
require_once(FS2_ROOT_PATH . "includes/phpinit.php");
phpinit(false, "Content-type: application/atom+xml");
/* End of FS2 PHP Init */


// Inlcude DB Connection File or exit()
require( FS2_ROOT_PATH . "login.inc.php");
 
//Include Functions-Files & Feed-Lib
require_once(FS2_ROOT_PATH . "libs/class_Feed.php");

// create feed
$atom10 = new Atom10($FD->cfg('virtualhost').$feed_url, $settings);
echo $atom10;

// Shutdown System
unset($FD);
?>
