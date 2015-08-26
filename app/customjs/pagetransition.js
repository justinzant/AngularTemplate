"use strict";
var viewcontainer = document.getElementById("view-container");

var myPartialsArr = [];

// Url getter for json files
function Get(targeturl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", targeturl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

// Fetch json object containing all PartialId's; 
// Each page represents a PartialId, which in turn its own content-frame .class 
var json_obj = JSON.parse(Get('views/partials/partials.json'));
myPartialsArr = json_obj.PartialsList;

function Replace (o, n) {
    //Remove old class
    $('#view-container').removeClass(o);

    //Set new class after view content has loaded
    setTimeout(
    function () { $('#view-container').addClass(n) }
    , 1);
}

var id = document.getElementById("routeid").classList.item(0);
TransitionCaller(id);

// TransitionCaller is called on button click
function TransitionCaller(nextPartialId) {
    var cList = viewcontainer.classList;
    for (var i = 0; i < myPartialsArr.length; i++) {
        var currentPartialId = myPartialsArr[i].PartialId;
        if (cList.contains("content-frame-"+currentPartialId)) {
           Replace("content-frame-"+currentPartialId, "content-frame-" + nextPartialId);
            break;
        }
    }
}