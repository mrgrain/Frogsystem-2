<?php
//////////////////////////////
/// Config laden /////////////
//////////////////////////////
$index = mysql_query('SELECT * FROM '.$global_config_arr['pref'].'partner_config', $FD->sql()->conn() );
$config_arr = mysql_fetch_assoc($index);
if ($config_arr['small_allow'] == 0) {
    $config_arr['small_allow_bool'] = true;
    $config_arr['small_allow_text'] = $FD->text("page", "'");
} else {
    $config_arr['small_allow_bool'] = false;
    $config_arr['small_allow_text'] = $FD->text("page", "'");
}
if ($config_arr['big_allow'] == 0) {
    $config_arr['big_allow_bool'] = true;
    $config_arr['big_allow_text'] = $FD->text("page", "'");
} else {
    $config_arr['big_allow_bool'] = false;
    $config_arr['big_allow_text'] = $FD->text("page", "'");
}


///////////////////////////////
//// Partnerbild hochladen ////
///////////////////////////////
if ($_FILES['bild_small']['name'] != ''
    && $_FILES['bild_big']['name'] != ''
    && ($_POST['name'] AND $_POST['name'] != '')
    && ($_POST['link'] AND $_POST['link'] != '')
   )
{
    $_POST['name'] = savesql($_POST['name']);
    $_POST['link'] = savesql($_POST['link']);
    $_POST['description'] = savesql($_POST['description']);
    $_POST['permanent'] = isset($_POST['permanent']) ? 1 : 0;

    mysql_query('INSERT INTO '.$global_config_arr['pref']."partner
                        (partner_name,
                         partner_link,
                         partner_beschreibung,
                         partner_permanent)
                 VALUES ('".$_POST['name']."',
                         '".$_POST['link']."',
                         '".$_POST['description']."',
                         '".$_POST['permanent']."')", $FD->sql()->conn() );
    $id = mysql_insert_id();

    $upload1 = upload_img($_FILES['bild_small'], "images/partner/", $id."_small", $config_arr['file_size']*1024, $config_arr['small_x'], $config_arr['small_y'], 100, $config_arr['small_allow_bool']);

    switch ($upload1)
    {
      case 0:
        $upload2 = upload_img($_FILES['bild_big'], "images/partner/", $id."_big", $config_arr['file_size']*1024, $config_arr['big_x'], $config_arr['big_y'], 100, $config_arr['big_allow_bool']);

        switch ($upload2)
        {
        case 0:
          systext ($FD->text("page", "'") .'<br />'.
                   $FD->text("page", "'").'<br />'.
                   $FD->text("page", "'"));

          unset($_POST['bild_small']);
          unset($_POST['bild_big']);
          unset($_POST['name']);
          unset($_POST['link']);
          unset($_POST['description']);
          unset($_POST['permanent']);

          break;
        default:
          systext ($FD->text("page", "'"). ': ' . upload_img_notice($upload2));
          systext ($FD->text("page", "'"));
          mysql_query('DELETE FROM '.$global_config_arr['pref']."partner WHERE partner_id = '$id'");
          image_delete('images/partner/', $id.'_small');
          image_delete('images/partner/', $id.'_big');
        }

        break;
      default:
        systext ($FD->text("page", "small_pic") . ': ' . upload_img_notice($upload1));
        systext ($FD->text("page", "note_notadded"));
        mysql_query('DELETE FROM '.$global_config_arr[pref]."partner WHERE partner_id = '$id'");
        image_delete('images/partner/', $id.'_small');
        image_delete('images/partner/', $id.'_big');
    }

}


//////////////////////////
//// Error Message    ////
//////////////////////////
elseif ($_POST['sended']) {
    echo get_systext($FD->text("admin", "changes_not_saved").'<br>'.$FD->text("admin", "form_not_filled"), $FD->text("admin", "error"), 'red', $FD->text("admin", "icon_save_error"));

    $_POST['name'] = killhtml($_POST['name']);
    $_POST['link'] = killhtml($_POST['link']);
    $_POST['description'] = killhtml($_POST['description']);
    $_POST['permanent'] = isset($_POST['permanent']) ? ' checked="checked"' : '';
}


//////////////////////////
//// Partner Formular ////
//////////////////////////
echo'
                    <form action="" enctype="multipart/form-data" method="post">
                        <input type="hidden" value="partner_add" name="go">
                        <input type="hidden" value="1" name="sended">
                        <table class="content" cellpadding="3" cellspacing="0">
                            <tr><td colspan="2"><h3>'.$FD->text("page", "'").'</h3><hr></td></tr>
                            <tr>
                                <td class="config" valign="top">
                                    '.$FD->text("page", "'").':<br />
                                    <font class="small">'.$FD->text("page", "'").'</font>
                                </td>
                                <td class="config" valign="top">
                                    <input type="file" class="text" name="bild_small" size="50"><br />
                                    <font class="small">
                                      ['.$config_arr['small_allow_text'].' '.$config_arr['small_x'].' x '.$config_arr['small_y'].' '.$FD->text("page", "'").'] [max. '.$config_arr['file_size'].' '.$FD->text("page", "'").']
                                    </font>
                                </td>
                            </tr>
                            <tr>
                                <td class="config" valign="top">
                                    '.$FD->text("page", "'").':<br />
                                    <font class="small">'.$FD->text("page", "'").'</font>
                                </td>
                                <td class="config" valign="top">
                                    <input type="file" class="text" name="bild_big" size="50"><br />
                                    <font class="small">
                                      ['.$config_arr['big_allow_text'].' '.$config_arr['big_x'].' x '.$config_arr['big_y'].' '.$FD->text("page", "'").'] [max. '.$config_arr['file_size'].' '.$FD->text("page", "'").']
                                    </font>
                                </td>
                            </tr>
                            <tr>
                                <td class="config" valign="top">
                                    '.$FD->text("page", "'").':<br />
                                    <font class="small">'.$FD->text("page", "'").'</font>
                                </td>
                                <td class="config" valign="top">
                                    <input class="text" name="name" value="'.$_POST['name'].'" size="50" maxlength="100">
                                </td>
                            </tr>
                            <tr>
                                <td class="config" valign="top">
                                    '.$FD->text("page", "'").':<br />
                                    <font class="small">'.$FD->text("page", "'").'</font>
                                </td>
                                <td class="config" valign="top">
                                    <input class="text" name="link" size="50" value="http://" maxlength="100">
                                </td>
                            </tr>
                            <tr>
                                <td class="config" valign="top">
                                    '.$FD->text("page", "'").': <font class="small">'.$FD->text("page", "'").'</font><br />
                                    <font class="small">'.$FD->text("page", "'").'</font>
                                </td>
                                <td class="config" valign="top">
                                    '.create_editor('description', $_POST['description'], 330, 130).'
                                </td>
                            </tr>
                            <tr>
                                <td class="config" valign="top">
                                    '.$FD->text("page", "'").':<br />
                                    <font class="small">'.$FD->text("page", "'").'</font>
                                </td>
                                <td class="config" valign="top">
                                    <input type="checkbox" value="1" name="permanent" '.$_POST['permanent'].'>
                                </td>
                            </tr>

                            <tr>
                                <td align="left" colspan="2">
                                    <input class="button" type="submit" value="'.$FD->text("page", "'").'">
                                </td>
                            </tr>
                        </table>
                    </form>
';
?>
