'use strict';

/* Grid Module */

var tumbGrid = [];
var size = 5;

function coroutine(f) {
    var o = f(); // instantiate the coroutine
    o.next(); // execute until the first yield
    return function(x) {
        o.next(x);
    }
}

var clock = coroutine(function*(_) {
    for (var i = 0; i < size; i++) {
        var newElement = document.createElement('div');
        var cellName = " ";
        newElement.className = "nav-button";
        newElement.innerHTML = cellName;
        document.body.appendChild(newElement);
        tumbGrid.push(newElement);  
       
        yield _;
     
    }
});

    setInterval(clock, 200);