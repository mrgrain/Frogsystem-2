<!--section-start::main--> 
<form action="" method="post">
    <input type="hidden" name="go" value="news_add">
    <input type="hidden" name="sended" value="1">
<!--section-import-nolang::admin_news::form_table-->
</form>
<!--section-end::main-->


<!--section-start::link_list-->
        <tr>
            <td colspan="2">
                <table class="spacebottom" cellpadding="0" cellspacing="0" width="100%" id="link_list">
                    <!--TEXT::link_entries-->
                    <!--IF::link_edit-->
                    <tr class="hidden">
                        <td class="right top" style="padding-right: 5px; padding-top: 11px;" colspan="2">
                            <select name="link_action" size="1">
                                <option value="0"><!--LANG::news_link_no--></option>
                                <option value="edit"><!--LANG::news_link_edit--></option>
                                <option value="up"><!--LANG::news_link_up--></option>
                                <option value="down"><!--LANG::news_link_down--></option>
                                <option value="del"><!--LANG::news_link_delete--></option>
                            </select>
                        </td>
                        <td class="center" style="padding-top: 11px;">
                            <input type="submit" name="edit_link" value="<!--COMMON::do_action_button-->">
                        </td>
                    </tr>
                    <!--ENDIF-->
                </table>
            </td>
        </tr>
<!--section-end::link_list-->

<!--section-start::link_entry-->
<tr class="link_entry">
    <td class="left" width="20">
        #<!--TEXT::num-->&nbsp;&nbsp;
    </td>
    <td width="530">
        <!--TEXT::name--> <span class="small">(<!--TEXT::target_text-->)</span><br>
        <a href="<!--TEXT::url-->" target="_blank" title="<!--TEXT::url-->"><!--TEXT::short_url--></a>
        <input type="hidden" name="link_name[<!--TEXT::id-->]" value="<!--TEXT::name-->">
        <input type="hidden" name="link_url[<!--TEXT::id-->]" value="<!--TEXT::url-->">
        <input type="hidden" name="link_target[<!--TEXT::id-->]" value="<!--TEXT::target-->">
    </td>

    <td class="middle" width="140">
        <div class="hidden center">
            <input class="pointer" type="radio" name="link" value="<!--TEXT::id-->">
        </div>
        <div class="ns_hide right">
            <img class="pointer" src="icons/up.gif" onClick="up($(this).parents(\'tr:first\'))" alt="<!--COMMON::up-->" title="<!--COMMON::up-->">&nbsp;
            <img class="pointer" src="icons/down.gif" onClick="down($(this).parents(\'tr:first\'))" alt="<!--COMMON::down-->" title="<!--COMMON::down-->">
            &nbsp;&nbsp;&nbsp;
            <img class="pointer" src="icons/edit.gif" onClick="edit($(this).parents(\'tr:first\'))" alt="<!--COMMON::edit-->" title="<!--COMMON::edit-->">&nbsp;
            <img class="pointer" src="icons/delete.gif" onClick="remove($(this).parents(\'tr:first\'))" alt="<!--COMMON::delete-->" title="<!--COMMON::delete-->">
        </div>
    </td>    
</tr>
<!--section-end::link_entry-->

<!--section-start::link_add-->
        <tr>
            <td colspan="2">
                <!--LANG::news_link_add-->:
            </td>
        </tr>
        
        <tr>
            <td colspan="2">
                <!--TEXT::table-->
            </td>
        </tr>
<!--section-end::link_add-->


<!--section-start::link_edit-->
<tr id="edit_link_<!--TEXT::id-->">
    <td colspan="3">
        <!--TEXT::table-->
    </td>
</tr>
<!--section-end::link_edit-->

<!--section-start::edit_table-->
        <table class="<!--TEXT::class-->" cellpadding="3" cellspacing="0" width="100%">
            <tr>
                <td class="middle">
                    <!--LANG::news_link_title-->:
                </td>
                <td class="middle">
                    <input class="half" maxlength="100" name="<!--TEXT::name_name-->" value="<!--TEXT::name-->">
                </td>
                <td class="middle">
                    <!--LANG::news_link_open-->:
                </td>
                <td></td>
            </tr>
            <tr>
                <td class="middle">
                    <!--LANG::news_link_url-->:
                </td>
                <td class="middle half" style="padding-right:10px;">
                    <input class="half" maxlength="255" name="<!--TEXT::url_name-->" value="<!--TEXT::url-->">
                </td>
                <td class="middle left">
                    <select class="quarter" name="<!--TEXT::target_name-->" size="1">
                        <option value="0" <!--IF::target_0-->selected<!--ENDIF-->>
                            <!--LANG::news_link_self-->
                        </option>
                        <option value="1" <!--IF::target_1-->selected<!--ENDIF-->>
                            <!--LANG::news_link_blank-->
                        </option>
                    </select>
                </td>
                <td class="right">
                <!--IF::button-->
                    <input class="hidden" type="submit" name="add_link" value="<!--COMMON::add_button-->">
                    <input class="ns_hide" type="button" onClick="addLink()" value="<!--COMMON::add_button-->">
                <!--ELSE-->
                    <input type="button" onClick="saveLink(<!--TEXT::id-->)" value="<!--COMMON::save_button-->">
                <!--ENDIF-->
                </td>
            </tr>
        </table>   
<!--section-end::edit_table-->

<!--section-start::script-->
<script type="text/javascript">
    jQuery(document).ready(function(){
        $("tr.link_entry").live("mouseover mouseout", function(event) {
            if ( event.type == "mouseover" ) {
                $(this).css("background-color", "#EEEEEE");
            } else {
                $(this).css("background-color", "transparent");
            }
        });
    
    
        renderLinks(link_arr);
    });
    
    link_arr = new Array();
    link_arr[0] = new Object();
    link_arr[0]['name'] = "Test";
    link_arr[0]['url'] = "http://www.test.de";
    link_arr[0]['target'] = 1;
    link_arr[1] = new Object();
    link_arr[1]['name'] = "WoP";
    link_arr[1]['url'] = "http://www.worldofplayers.de";
    link_arr[1]['target'] = 1;
    link_arr[2] = new Object();
    link_arr[2]['name'] = "Home";
    link_arr[2]['url'] = "http://localhost/fs2.6/";
    link_arr[2]['target'] = 0;
    
    function edit(l) {
        var id = parseInt(l.find("input[name=link]").val());
        
        // insert data
        var line = '<!--TEXT::link_edit-->';
        line = line.replace(/<!--TEXT::id-->/g, id);
        line = line.replace(/<!--TEXT::name-->/g, htmlspecialchars(link_arr[id]['name']));
        line = line.replace(/<!--TEXT::url-->/g, htmlspecialchars(link_arr[id]['url']));
        l.replaceWith(line);
        
        var edit_tr = $("tr#edit_link_"+id);
        edit_tr.find("select[name=edit_target]").val(link_arr[id]['target']);
    }

    function saveLink(id) {        
        // assign vars
        var edit_tr = $("tr#edit_link_"+id);
        var name = edit_tr.find("input[name=edit_name]:first");
        var url = edit_tr.find("input[name=edit_url]:first");
        var target = edit_tr.find("select[name=edit_target]");          
    
        // add link
        if (name.val() != "" && url.val() != "" && url.val() != "http://" && url.val() != "https://") {
              
            // add new link
            var newlink = new Object();
            link_arr[id]['name'] = name.val();
            link_arr[id]['url'] = url.val();
            link_arr[id]['target'] = target.val();
            
            //render link
            var line = getLinkHtml(id, link_arr[id]['name'], link_arr[id]['url'], link_arr[id]['target']);
            edit_tr.replaceWith(line);
            
        // error
        } else {
            alert("<!--LANG::link_not_saved-->\n<!--COMMON::form_not_filled-->");            
        }
    }        
    
    function remove(l) {
        var id = parseInt(l.find("input[name=link]").val());
        
        if (id < link_arr.length) {
            link_arr.splice(id, 1);
        
            renderLinks(link_arr);
        }
    }
    
    function down(l) {
        var id = parseInt(l.find("input[name=link]").val());

        if (id < link_arr.length-1) {
            var bu = link_arr[id+1];
            link_arr[id+1] = link_arr[id];
            link_arr[id] = bu;

            renderLinks(link_arr);
        }
    }   
    
    function up(l) {
        var id = parseInt(l.find("input[name=link]").val());
        
        if (id >= 1) {
            var bu = link_arr[id-1];
            link_arr[id-1] = link_arr[id];
            link_arr[id] = bu;
        
            renderLinks(link_arr);
        }
    }
    
 
 
    
    function addLink() {
        // assign vars
        var name = $("input[name=new_link_name]:first");
        var url = $("input[name=new_link_url]:first");
        var target = $("select[name=new_link_target]");        
        
        // add link
        if (name.val() != "" && url.val() != "" && url.val() != "http://" && url.val() != "https://") {
              
            // add new link
            var newlink = new Object();
            newlink['name'] = name.val();
            newlink['url'] = url.val();
            newlink['target'] = target.val();
        
            link_arr.push(newlink);

            // reset form                
            name.val("");
            url.val("http://");
            target.val(0);
            
            //render links
            renderLinks(link_arr);  
        
        // error
        } else {
            alert("<!--LANG::link_not_added-->\n<!--COMMON::form_not_filled-->");            
        }        
    }
    
    function renderLinks(data) {
        var line = "";
        
        // get HTML for all Links
        for (var i=0; i<data.length; i++) {
            line += getLinkHtml(i, data[i]['name'], data[i]['url'], data[i]['target']);
        }
        
        // remove old html
        $("#link_list tr.link_entry").remove();
        
        //insert new one
        $("#link_list").prepend(line);
    }    
    
    function getLinkHtml (id, name, url, target) { 
        // insert data
        var line = '<!--TEXT::link_entry-->';
        line = line.replace(/<!--TEXT::id-->/g, id); 
        line = line.replace(/<!--TEXT::name-->/g, htmlspecialchars(name));
        line = line.replace(/<!--TEXT::url-->/g, htmlspecialchars(url));
        line = line.replace(/<!--TEXT::target-->/g, target);
        line = line.replace(/<!--TEXT::num-->/g, id+1);
        line = line.replace(/<!--TEXT::short_url-->/g, htmlspecialchars(cut_in_string(url, <!--TEXT::sul-->, "<!--TEXT::sur-->")));
        if (target == 1) {
            line = line.replace(/<!--TEXT::target_text-->/g, '<!--LANG::news_link_blank-->');
        } else {
            line = line.replace(/<!--TEXT::target_text-->/g, '<!--LANG::news_link_self-->');
        }
        
        return line;
    }
    
</script>
<!--section-end::script-->
