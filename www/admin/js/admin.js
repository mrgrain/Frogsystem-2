/*! Frogsystem2 - v2.0.0-alix7 - 2015-01-15
* https://github.com/mrgrain/Frogsystem-2
* Copyright (c) 2015 ; Licensed CC BY-SA 3.0 DE */
//--------------------------------
// START - Document Ready Functions
//--------------------------------
$().ready(function(){
    $("head > link#noscriptcss").remove();
});
//--------------------------------
// END - Document Ready Functions
//--------------------------------


function popUp(url, target, width, height, pos_x, pos_y) {
    if (typeof pos_x =="undefined") { pos_x = "center"; }
    if (typeof pos_y =="undefined") { pos_y = "middle"; }

    var x;
    var y;

    // get x pos
    switch (pos_x) {
        case "left":
            x = 0;
            break;
        case "right":
            x = screen.width - width;
            break;
        default: //center
            x = screen.width/2 - width/2;
            break;
    }

    // get y pos
    switch (pos_y) {
        case "top":
            y = 0;
            break;
        case "bottom":
            y = screen.height - height;
            break;
        default: //middle
            y = screen.height/2 - height/2;
            break;
    }

    window.open(url, target, 'width='+width+',height='+height+',left='+x+',top='+y+',screenX='+x+',screenY='+y+',scrollbars=YES,location=YES,status=YES');
}

function popTab(url, target) {
    window.open(url, target);
}



/**
* From http://www.massless.org/mozedit/
*/
function mozWrap(txtarea, open, close)
{
        var selLength = txtarea.textLength;
        var selStart = txtarea.selectionStart;
        var selEnd = txtarea.selectionEnd;
        var scrollTop = txtarea.scrollTop;

        if (selEnd == 1 || selEnd == 2)
        {
                selEnd = selLength;
        }

        var s1 = (txtarea.value).substring(0,selStart);
        var s2 = (txtarea.value).substring(selStart, selEnd)
        var s3 = (txtarea.value).substring(selEnd, selLength);

        txtarea.value = s1 + open + s2 + close + s3;
        txtarea.selectionStart = selEnd + open.length + close.length;
        txtarea.selectionEnd = txtarea.selectionStart;
        txtarea.focus();
        txtarea.scrollTop = scrollTop;

        return;
}

///////////////////////////////////////////////
//// Short string by cutting in the middle ////
///////////////////////////////////////////////
function cut_in_string (string, maxlength, replacement)
{
	if (string.length > maxlength) {
		var part_lenght = Math.ceil(maxlength/2)-Math.ceil(replacement.length/2);
		var string_start = string.substr(0, part_lenght);
		var string_end = string.substr(-1*part_lenght);
		string = string_start+replacement+string_end;
	}
	return string;
}

//////////////////////////
//// htmlspecialchars ////
//////////////////////////
function htmlspecialchars(str,typ) {
    if(typeof str=="undefined") str="";
    if(typeof typ!="number") typ=2;
    typ=Math.max(0,Math.min(3,parseInt(typ)));
    var from=new Array(/&/g,/</g,/>/g);
    var to=new Array("&amp;","&lt;","&gt;");
    if(typ==1 || typ==3) {from.push(/'/g); to.push("&#039;");}
    if(typ==2 || typ==3) {from.push(/"/g); to.push("&quot;");}
    for(var i in from) str= str.replace(from[i],to[i]);
    return str;
}


//////////////////////////////////////////////////////////////////////////////////////
//Einfachen Code einf�gen (B,I,U, etc.) => Keine Abfrage
//////////////////////////////////////////////////////////////////////////////////////
function insert(eName, aTag, eTag) {
  var input = document.getElementById(eName);
  input.focus();
  /* f�r Internet Explorer */
  if(typeof document.selection != 'undefined') {
    /* Einf�gen des Formatierungscodes */
    var range = document.selection.createRange();
    var insText = range.text;
    range.text = aTag + insText + eTag;
    /* Anpassen der Cursorposition */
    range = document.selection.createRange();
    if (insText.length == 0) {
      range.move('character', -eTag.length);
    } else {
      range.moveStart('character', aTag.length + insText.length + eTag.length);
    }
    range.select();
  }
  /* f�r neuere auf Gecko basierende Browser */
  else if(typeof input.selectionStart != 'undefined')
  {
    /* Anpassen der Cursorposition nach dem einf�gen */
    var selection_start = input.selectionStart;
    var selection_end = input.selectionEnd;
    var insText = input.value.substring(selection_start, selection_end);
    var pos;
    if (insText.length == 0) {
      pos = selection_start + aTag.length;
    } else {
      pos = selection_start + aTag.length + insText.length + eTag.length;
    }
    mozWrap(input, aTag, eTag)
    input.selectionStart = pos;
    input.selectionEnd = pos;
  }
  /* f�r die �brigen Browser */
  else
  {
    /* Abfrage der Einf�geposition */
    var pos = input.value.length;
    /* Einf�gen des Formatierungscodes */
    var insText = prompt("Bitte gib den zu formatierenden Text ein:");
    input.value = input.value.substr(0, pos) + aTag + insText + eTag + input.value.substr(pos);
  }
}
//////////////////////////////////////////////////////////////////////////////////////
//Mittel Komplexen Code einf�gen (IMG, CIMG, etc.) => Abfrage bei nicht Markiertem Text
//////////////////////////////////////////////////////////////////////////////////////
function insert_mcom(eName, aTag, eTag, Frage, Vorgabe) {
  var input = document.getElementById(eName);
  input.focus();
  /* f�r Internet Explorer */
  if(typeof document.selection != 'undefined') {
    /* Einf�gen des Formatierungscodes */
    var range = document.selection.createRange();
    var insText = range.text;
    if (insText.length == 0) {
      /* Ermittlung des einzuf�genden Textes*/
      insText = prompt(Frage, Vorgabe);
      if (insText == null) {
        insText = "";
      }
    }
    range.text = aTag + insText + eTag;
    /* Anpassen der Cursorposition */
    range = document.selection.createRange();
    if (insText.length == 0) {
      range.move('character', -eTag.length);
    } else {
      range.moveStart('character', aTag.length + insText.length + eTag.length);
    }
    range.select();
  }
  /* f�r neuere auf Gecko basierende Browser */
  else if(typeof input.selectionStart != 'undefined')
  {
    /* Anpassen der Cursorposition nach dem einf�gen */
    var selection_start = input.selectionStart;
    var selection_end = input.selectionEnd;
    var insText = input.value.substring(selection_start, selection_end);
    var addText = "";

    /* Ermittlung des einzuf�genden Textes*/
    if (insText.length == 0) {
      addText = prompt(Frage, Vorgabe);
      if (addText == null) {
        addText = "";
      }
      insText = addText;
    }

    var pos;
    if (insText.length == 0) {
      pos = selection_start + aTag.length;
    } else {
      pos = selection_start + aTag.length + insText.length + eTag.length;
    }

    mozWrap(input, aTag+addText, eTag)
    input.selectionStart = pos;
    input.selectionEnd = pos;
  }
  /* f�r die �brigen Browser */
  else
  {
    /* Abfrage der Einf�geposition */
    var pos = input.value.length;
    /* Einf�gen des Formatierungscodes */
    var insText = prompt(Frage, Vorgabe);
    if (insText == null) {
      insText = "";
    }
    input.value = input.value.substr(0, pos) + aTag + insText + eTag + input.value.substr(pos);
  }
}
//////////////////////////////////////////////////////////////////////////////////////
//Komplexen Code einf�gen (FONT, SIZE, COLOR, etc.) => Abfrage wird immer durchgef�hrt
//////////////////////////////////////////////////////////////////////////////////////
function insert_com(eName, Tag, Frage, Vorgabe) {
  var input = document.getElementById(eName);
  input.focus();
  /* Ermittlung des einzuf�genden Textes*/
  var attText = prompt(Frage, Vorgabe);
  if (attText == null) {
    attText = "";
  }
  /* f�r Internet Explorer */
  if(typeof document.selection != 'undefined') {
    /* Einf�gen des Formatierungscodes */
    var range = document.selection.createRange();
    var insText = range.text;
    range.text = "["+Tag+"="+attText+"]"+ insText +"[/"+Tag+"]";
    /* Anpassen der Cursorposition */
    range = document.selection.createRange();
    if (insText.length == 0) {
      range.move('character', -(Tag.length + 2));
    } else {
      range.moveStart('character', Tag.length + 3 + attText.length + insText.length + Tag.length + 3);
    }
    range.select();
  }
  /* f�r neuere auf Gecko basierende Browser */
  else if(typeof input.selectionStart != 'undefined')
  {
    /* Tags definieren */
    var aTag = "["+Tag+"="+attText+"]";
    var eTag = "[/"+Tag+"]";

    /* Anpassen der Cursorposition nach dem einf�gen */
    var selection_start = input.selectionStart;
    var selection_end = input.selectionEnd;
    var insText = input.value.substring(selection_start, selection_end);

    var pos;
    if (insText.length == 0) {
      pos = selection_start + aTag.length;
    } else {
      pos = selection_start + aTag.length + insText.length + eTag.length;
    }

    mozWrap(input, aTag, eTag)
    input.selectionStart = pos;
    input.selectionEnd = pos;
  }
  /* f�r die �brigen Browser */
  else
  {
    /* Abfrage der Einf�geposition */
    var pos = input.value.length;
    /* Einf�gen des Formatierungscodes */
    var insText = prompt("Bitte gib den zu formatierenden Text ein:");
    input.value = input.value.substr(0, pos) +"["+Tag+"="+attText+"]"+ insText +"[/"+Tag+"]"+ input.value.substr(pos);
  }
}

//--------------------------------
// START - Document Ready Functions
//--------------------------------
$().ready(function(){

    //~ Remove No Script CSS
    $("head > link#noscriptcss").remove();

    //~ Image Checkboxes
    $("input[type='checkbox']:enabled").prev("img.checkbox").each(function(){
        colorcb($(this), false, "checkbox");
    ;});
    $("input[type='checkbox']:enabled").prev("img.checkbox").hover(function(){
        colorcb($(this), true, "checkbox");
    }, function(){
        colorcb($(this), false, "checkbox");
    });
    $("input[type='checkbox']:enabled").prev("img.checkbox").click(function(){
        var checkbox = $(this).next("input[type='checkbox']:enabled");
        checkbox.trigger('click');
        $(this).trigger('mouseenter');
    });
    $("img.checkbox+input[type='checkbox']:enabled").change(function(){
        colorcb($(this).prev("img.checkbox"), false, "checkbox");
    ;});

    //~ Image Radios
    $("input[type='radio']:enabled").prev("img.checkbox").each(function(){
        colorcb($(this), false, "radio");
    ;});
    $("input[type='radio']:enabled").prev("img.checkbox").hover(function(){
        colorcb ($(this), true, "radio");
    }, function(){
        colorcb($(this), false, "radio");
    });
    $("input[type='radio']:enabled").prev("img.checkbox").click(function(){
        var checkbox = $(this).next("input[type='radio']:enabled");
        checkbox.trigger('click');
        $(this).trigger('mouseenter');
    });
    $("img.checkbox+input[type='radio']:enabled").change(function(){
        $("input[type='radio'][name='"+$(this).attr("name")+"']:enabled").prev("img.checkbox").each(function(index, img){
            colorcb($(img), false, "radio");
        ;});
    ;});
});
//--------------------------------
// END - Document Ready Functions
//--------------------------------


//--------------------------------
// START - Functions
//--------------------------------

    //~ Image Checkboxes
    function colorcb (cb, hover, type) {
        var checkbox = cb.next("input[type='"+type+"']:enabled");
        
        if (checkbox.hasClass("cb-red")) {
            var color = "red";
        } else {
            var color = "green";
        }
        
        if (checkbox.is(":checked")) {
            if (hover) {
                cb.attr("src", "?images="+type+"-"+color+"-active-hover.png");
            } else {
                cb.attr("src", "?images="+type+"-"+color+"-active.png");
            }

            if (type == "radio") {
                cb.attr("alt", "(x)");
            } else {
                cb.attr("alt", "[x]");
            }
        } else {
            if (hover) {
                cb.attr("src", "?images="+type+"-"+color+"-hover.png");
            } else {
                cb.attr("src", "?images="+type+".png");
            }

            if (type == "radio") {
                cb.attr("alt", "(_)");
            } else {
                cb.attr("alt", "[_]");
            }
        }
    }

    //~ (De-)Select Checkboxes of paragraph
    function permselect (obj, checked) {
        obj.parents("p:first").find("input[type=checkbox]:enabled").each(function (index, ele) {
            $(ele).prop("checked", checked);
            $(ele).change();
        });
    }
    
    //~ (De-)Select Checkboxes of generic parent
    function groupselect (parentstr, checked) {
        var par = $(parentstr).find("input[type=checkbox]:enabled");
        if (checked == "invert") {
            par.each(function (index, ele) {
                $(ele).prop("checked", !$(ele).prop("checked"));
                $(ele).change();
            });
        } else {
            par.each(function (index, ele) {
                $(ele).prop("checked", checked);
                $(ele).change();
            });
        }
    }    

//--------------------------------
// END - Functions
//--------------------------------

//--------------------------------
// START - Document Ready Functions
//--------------------------------
$(document).ready(function(){
		$('.colorpickerInput').ColorPicker({
			onSubmit: function(hsb, hex, rgb, ele) {
                $(ele).val(hex.toUpperCase());
                $(ele).parents('.colorpickerParent').find('.colorpickerSelector div').css('background-color', '#' + hex);
				$(ele).ColorPickerHide();
			},
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(this.value);
			},
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb, ele) {
                $(ele).val(hex.toUpperCase());
                $(ele).parents('.colorpickerParent').find('.colorpickerSelector div').css('background-color', '#' + hex);
            }
		})
		.bind('keyup', function(){
			$(this).ColorPickerSetColor(getCorrectHex(this.value));
		});

        $('.colorpickerSelector, .colorpickerSelector div').click(function() {
            $(this).parents('.colorpickerParent').find('.colorpickerInput').ColorPickerShow();
        });
        
        $('.colorpickerInput').change(function() {
            var newhex = getCorrectHex($(this).val());
            $(this).parents('.colorpickerParent').find('.colorpickerSelector div').css('background-color', '#' + newhex);
        });
        
        $('.colorpickerInput').keydown(function() {
            $(this).change();
        });
        $('.colorpickerInput').keyup(function() {
            $(this).change();
        });
        
        $('.colorpickerInput').focusout(function() {
            $(this).val(getCorrectHex($(this).val()));
        });
        
        
});
//--------------------------------
// END - Document Ready Functions
//--------------------------------

function getCorrectHex (wrongVal) {
    wrongVal = wrongVal.toUpperCase();
    if (wrongVal.length == 3) {
        var first = wrongVal.charAt(0);
        var second = wrongVal.charAt(1);
        var third = wrongVal.charAt(2);
        return first+first+second+second+third+third;
    } else {
        var full = wrongVal+"000000";
        return full.substr(0,6);
    }
}

//--------------------------------
// START - Document Ready Functions
//--------------------------------
$().ready(function(){

var lastJQBox;

//////////////////////////////
//// HTML-Editor: Buttons ////
//////////////////////////////

    //add hover class
    $(".html-editor-button").hover(
        function () {
            $(this).addClass("html-editor-button-hover");
        },
        function () {
            $(this).removeClass("html-editor-button-hover");
        }
    );


///////////////////////////////
//// HTML-Editor: Tag-List ////
///////////////////////////////

    // Colorize tag-list
    $(".html-editor-container-list .html-editor-list-popup tr:nth-child(even)").css("background-color","#FFFFFF");
    $(".html-editor-container-list .html-editor-list-popup tr:nth-child(even)").hover( function () {
        $(this).css("background-color","#CCCCCC");
    }, function () {
        $(this).css("background-color","#FFFFFF");
    });
    $(".html-editor-container-list .html-editor-list-popup tr:nth-child(odd)").hover( function () {
        $(this).css("background-color","#CCCCCC");
    }, function () {
        $(this).css("background-color","#EEEEEE");
    });
    $(".html-editor-container-list .html-editor-list-popup tr:first-child").find("td").css("border","none");


    // html-editor-list hover
    $(".html-editor-container-list").hover (
        function () {
            $(this).find(".html-editor-list").css("border","1px solid #555555");
            $(this).find(".html-editor-list-arrow").css("border","1px solid #555555");
            $(this).find(".html-editor-list-arrow").css("border-left","none");
            $(this).find(".html-editor-list-arrow").css("background-color","#CCCCCC");
        },
        function () {
            $(this).find(".html-editor-list").css("border","1px solid #BBBBBB");
            $(this).find(".html-editor-list-arrow").css("border","1px solid #BBBBBB");
            $(this).find(".html-editor-list-arrow").css("border-left","none");
            $(this).find(".html-editor-list-arrow").css("background-color","#EEEEEE");
        }
    );

    // Show tag-list on hover
    $(".html-editor-container-list").hover (
        function () {
            $(this).find(".html-editor-list-popup").show();
        },
        function () {
            $(this).find(".html-editor-list-popup").hide();
        }
    );


/////////////////////
//// Select-List ////
/////////////////////

    // Add Pointer to clickable area
    $(".select_entry").addClass("pointer");

    // create mouseover effect depending on Box State and color
    $(".select_entry").hover(
        function () {
            theTable = $(this).parents(".select_list:first");
            if ( $(this).find("input.select_box:first").is(":checked") ) {
                setBGcolorCompare ( $(this), theTable.find("select.select_type:first option:selected").hasClass("select_red"), "#DE5B5B", "#64DC6A" );
            } else {
                $(this).css("background-color", "#EEEEEE");
            }
        },
        function () {
            theTable = $(this).parents(".select_list:first");
            if ( $(this).find("input.select_box:first").is(":checked") ) {
                setBGcolorCompare ( $(this), theTable.find("select.select_type:first option:selected").hasClass("select_red"), "#C24949", "#49C24f" );
            } else {
                $(this).css("background-color", "transparent");
            }
        }
    );

    // Prevent "double-click" error, don't use default click functionality of boxes
    $(".select_entry input.select_box").click(
        function () {
            if ( $(this).is(":checked") ) {
                $(this).removeProp("checked");
            } else {
                $(this).prop("checked", true);
            }
        }
    );

    // Create Click depending on select type and color
    $(".select_entry").click(
        function () {
            theTable = $(this).parents(".select_list:first");
            if ( theTable.find("select.select_type:first option:selected").hasClass("select_one") ) {
                theTable.find(".select_entry input.select_box").removeProp("checked");
                theTable.find(".select_entry").css("background-color", "transparent");
            }

            var theBox = $(this).find("input.select_box:first");

            if ( theBox.is(":checked") ) {
                theBox.removeProp("checked");
                $(this).css("background-color", "#EEEEEE");
            } else {
                theBox.prop("checked", true);
                setBGcolorCompare ( $(this), theTable.find("select.select_type:first option:selected").hasClass("select_red"), "#DE5B5B", "#64DC6A" );
                lastJQBox = theBox;
            }
        }
    );
            //
    // Create change of select type and color
    $(".select_list select.select_type").change(
        function () {
            theTable = $(this).parents(".select_list:first");
            theLines = theTable.find(".select_entry");

            if ( $(this).find("option:selected").hasClass("select_one") && lastJQBox != undefined) {
                theLines.find("input.select_box").removeProp("checked");
                theLines.css("background-color", "transparent");
                lastJQBox.prop("checked", true);
            }

            setBGcolorCompare ( theLines.find("input.select_box:checked").parents(".select_entry:first"), $(this).find("option:selected").hasClass("select_red"), "#C24949", "#49C24f" );
        }
    );


});
//--------------------------------
// END - Document Ready Functions
//--------------------------------



///////////////////////////////////
//// OLD select-list functions ////
///////////////////////////////////


// set BG color depending on
function setBGcolorCompare (theObject, theCompare, firstColor, secondColor) {
    if (theCompare) {
        theObject.css("background-color", firstColor);
    } else {
        theObject.css("background-color", secondColor);
    }
    return true;
}


// show or hide an element
function show_hidden (showObject, checkObject, compareWith) {
  if (checkObject.checked == compareWith) {
      showObject.className = "default";
    } else {
      showObject.className = "hidden";
    }
  return true;
}

function show_one (oneString, valueString, checkObject) {
  oneArray = oneString.split("|");
  valueArray = valueString.split("|");
  for (var i = 0; i < oneArray.length && i < valueArray.length; ++i) {
    if ( checkObject.value == valueArray[i] ) {
      document.getElementById(oneArray[i]).className = "default";
    } else {
      document.getElementById(oneArray[i]).className = "hidden";
    }
  }
  return true;
}


//Use Confirm-Box on Checkbox
function delalert (elementID, alertText) {
  if (document.getElementById(elementID).checked == true) {
    var Check = confirm(alertText);
    if (Check == true) {
      document.getElementById(elementID).checked = true;
    } else {
      document.getElementById(elementID).checked = false;
    }
  }
  return true;
}


var last;
var lastBox;

//colorize Entry
function colorEntry (theBox, defaultColor, checkedColor, object) {
    if (theBox.checked == true) {
        object.style.backgroundColor = checkedColor;
    } else {
        object.style.backgroundColor = defaultColor;
    }
    return true;
}

//create Change onClick
function createClick (theBox, defaultColor, checkedColor, object) {
    if (theBox.type == 'radio') {
        if (theBox.checked != true) {
             theBox.checked = !(theBox.checked);
        }
    } else {
        theBox.checked = !(theBox.checked);
    }
    colorEntry (theBox, defaultColor, checkedColor, object);
    return true;
}

// save last objects
function saveLast (theBox, object) {
    if (theBox.checked == true) {
        last = object;
        lastBox = theBox;
    }
    return true;
}

// save preselcted object as las
function savePreSelectedLast (theBox, object) {
    last = object;
    lastBox = theBox;
    return true;
}

//reset Not selected
function resetOld (resetColor, last, lastBox, object) {
    if (object != last) {
        if (last) {
            last.style.backgroundColor = resetColor;
        }
        if (lastBox) {
            lastBox.checked = false;
        }
        return true;
    }
}



//////////////////////////
//// Editor Functions ////
//////////////////////////

// Toggle textWrapping
function toggelTextWrapping ( theButton, editorId ) {
    if ($(theButton).hasClass("html-editor-button-active")) {
        $(theButton).removeClass("html-editor-button-active");
        var newBool = false;
    } else {
        $(theButton).addClass("html-editor-button-active");
        var newBool = true;
    }
    eval ( ""+editorId+".setTextWrapping(newBool);" );
}

// Toggle lineNumbers
function toggelLineNumbers ( theButton, editorId ) {
    if ($(theButton).hasClass("html-editor-button-active")) {
        $(theButton).removeClass("html-editor-button-active");
        var newBool = false;
    } else {
        $(theButton).addClass("html-editor-button-active");
        var newBool = true;
    }
    eval ( ""+editorId+".setLineNumbers(newBool);" );
}

// Toggle Original
function toggelOriginal ( editorId ) {
    eval ( "var theCheck = $(\"#"+editorId+"_original\").is(\":visible\");" );

    if (theCheck == true) {
        eval ( "$(\"#"+editorId+"_original\").hide()" );
        eval ( "$(\"#"+editorId+"_editor-bar .html-editor-row\").show()" );
        eval ( "$(\"#"+editorId+"_content\").show()" );
        eval ( "$(\"#"+editorId+"_original-row\").hide()" );
    } else {
        eval ( "$(\"#"+editorId+"_content\").hide()" );
        eval ( "$(\"#"+editorId+"_editor-bar .html-editor-row\").hide()" );
        eval ( "$(\"#"+editorId+"_original-row .html-editor-button\").addClass(\"html-editor-button-active\")" );
        eval ( "$(\"#"+editorId+"_original-row\").show()" );
        eval ( "$(\"#"+editorId+"_original\").show()" );
    }
}


//Open Editor-PopUp
var EditorWindow;
function open_editor(what) {
    $("#section_select").val(what);

    if (screen.availWidth >= 1000) {
        var editorWidth = 1000;
    } else {
        var editorWidth = screen.availWidth;
    }

    if (screen.availHeight >= 800) {
        var editorHeight = 800;
    } else {
        var editorHeight = screen.availHeight;
    }

    x = screen.width/2 - editorWidth/2;
    y = screen.height/2 - editorHeight/2;

    EditorWindow = window.open("admin_frogpad.php?height="+editorHeight,"editor","width="+editorWidth+",height="+editorHeight+",left="+x+",top="+y+",screenX="+x+",screenY="+y+"");
}
//Close Editor-PopUp
function close_editor() {
    EditorWindow.close();
}

//Get Editor Object
function new_editor ( textareaId, editorHeight, readOnlyState, syntaxHighlight )
{
  switch (syntaxHighlight) {
    case 3:
        var parser = ["tokenizejavascript.js", "parsejavascript.js"];
        var css = "../resources/codemirror/css/jscolors.css";
        break;
    case 2:
        var parser = "parsecss.js";
        var css = "../resources/codemirror/css/csscolors.css";
        break;
    default:
        var parser = ["parsexml.js", "parsecss.js", "tokenizejavascript.js", "parsejavascript.js", "parsehtmlmixed.js"];
        var css = ["../resources/codemirror/css/xmlcolors.css", "../resources/codemirror/css/jscolors.css", "../resources/codemirror/css/csscolors.css"];
        break;
  }

  var textarea = document.getElementById(textareaId);
  var editor = CodeMirror.fromTextArea(textareaId, {
    parserfile: parser,
    stylesheet: css,
    path: "../resources/codemirror/js/",
    content: textarea.value,
    lineNumbers: true,
    //textWrapping: false,
    continuousScanning: 500,
    tabMode: "shift",
    height: editorHeight+"px",
    iframeClass:"CodeMirror-iframe",
    readOnly: readOnlyState
  });
  //editor.setLineNumbers(true);
  return editor;
}
//Switch to Inline-Editor
function switch2inline_editor( editorId ) {
    close_editor();
    eval ( "$(\"#"+editorId+"_content\").css(\"visibility\", \"visible\")" );
    eval ( "$(\"#"+editorId+"_editor-bar\").css(\"visibility\", \"visible\")" );
    eval ( "$(\"#"+editorId+"_inedit\").hide()" );
}

//Insert Tag into Editor
function insert_editor_tag( editorObject, insertText ) {
    editorObject.replaceSelection(insertText);
}





/////////////////////////
//// Date Operations ////
/////////////////////////

//Schaltjahr
function schaltJahr(Jhr)
{
    var sJahr;
    S4Jahr = Jhr%4;
    SHJahr = Jhr%100;
    S4HJahr = Jhr%400;
    sJahr = ((S4HJahr == "0") ? (1) : ((SHJahr == "0") ? (0) : ((S4Jahr == "0") ? (1) : (0))));

    return sJahr;
}

//change date
function changeDate (dayID, monthID, yearID, hourID, minID, dayShift, monthShift, yearShift, hourShift, minShift)
{
    var oldDate = new Date(parseInt(document.getElementById(yearID).value, 10),
                           parseInt(document.getElementById(monthID).value, 10) - 1,
                           parseInt(document.getElementById(dayID).value, 10),
                           parseInt(document.getElementById(hourID).value, 10),
                           parseInt(document.getElementById(minID).value, 10),
                           "0");

    var newDate = new Date();
    newDate.setTime(oldDate.getTime());

   var sJahr;
    if (oldDate.getMonth <= 1) {
       sJahr = schaltJahr(oldDate.getFullYear());
    } else {
       sJahr = schaltJahr(oldDate.getFullYear() + 1)
    }
    if (sJahr == 1) {
        yearShift = parseInt(yearShift, 10)*366*24*60*60*1000;
    } else {
        yearShift = parseInt(yearShift, 10)*365*24*60*60*1000;
    }
    newDate.setTime(newDate.getTime() + yearShift);

    if (parseInt(monthShift, 10) > 0) {
        for (var i=0; i < parseInt(monthShift, 10); i++) {
            newDate.setMonth(newDate.getMonth() + 1);
        }
    } else if (parseInt(monthShift, 10) < 0) {
        for (var i=0; i < (parseInt(monthShift, 10) * -1); i++) {
            newDate.setMonth(newDate.getMonth() - 1);
        }
    }

    dayShift = parseInt(dayShift, 10)*24*60*60*1000;
    newDate.setTime(newDate.getTime() + dayShift);

    hourShift = parseInt(hourShift, 10)*60*60*1000;
    newDate.setTime(newDate.getTime() + hourShift);

    minShift = parseInt(minShift, 10)*60*1000;
    newDate.setTime(newDate.getTime() + minShift);

    var newDay = newDate.getDate();
      if (newDay < 10) {newDay = "0" + newDay;}
    var newMonth = newDate.getMonth() + 1;
      if (newMonth < 10) {newMonth = "0" + newMonth;}
    var newYear = newDate.getFullYear();
    var newHour = newDate.getHours();
      if (newHour < 10) {newHour = "0" + newHour;}
    var newMin = newDate.getMinutes();
      if (newMin < 10) {newMin = "0" + newMin;}

    document.getElementById(dayID).value = newDay;
    document.getElementById(monthID).value = newMonth;
    document.getElementById(yearID).value = newYear;
    document.getElementById(hourID).value = newHour;
    document.getElementById(minID).value = newMin;
    return true;
}

//setNow
function setNow(y, m, d, h, i, s) {
    if (document.getElementById(y) != null)
        document.getElementById(y).value=getCurYear();

    if (document.getElementById(m) != null)
        document.getElementById(m).value=getCurMonth();

    if (document.getElementById(d) != null)
        document.getElementById(d).value=getCurDate();

    if (document.getElementById(h) != null)
        document.getElementById(h).value=getCurHours();

    if (document.getElementById(i) != null)
        document.getElementById(i).value=getCurMinutes();

    if (document.getElementById(s) != null)
        document.getElementById(s).value=getCurSeconds();
}


//getCurDate()
function getCurDate () {
  var curDateTime = new Date();
  var curD = curDateTime.getDate();
  if (curD < 10) {
    curD = "0" + curD;
  }
  return curD;
}
//getCurMonth()
function getCurMonth () {
  var curDateTime = new Date();
  var curM = curDateTime.getMonth() + 1;
  if (curM < 10) {
    curM = "0" + curM;
  }
  return curM;
}
//getCurYear()
function getCurYear () {
  var curDateTime = new Date();
  var curY = curDateTime.getFullYear();
  return curY;
}
//getCurHours()
function getCurHours () {
  var curDateTime = new Date();
  var curH = curDateTime.getHours();
  if (curH < 10) {
    curH = "0" + curH;
  }
  return curH;
}
//getCurMinutes()
function getCurMinutes () {
  var curDateTime = new Date();
  var curI = curDateTime.getMinutes();
  if (curI < 10) {
    curI = "0" + curI;
  }
  return curI;
}
//getCurSeconds()
function getCurSeconds () {
  var curDateTime = new Date();
  var curS = curDateTime.getSeconds();
  if (curS < 10) {
    curS = "0" + curS;
  }
  return curS;
}
