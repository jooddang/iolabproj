//"use strict";


var FLICK = FLICK || {
    q: document.getElementById("query"),
    api: "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    trail: new TList(),
    clicked: null,
    selectedImg:null,
//    selected: new function(){
//        var selected;
//        this.set = function(){
//            
//        }
//        this.get
//    },

    selectedCell: null,
    isSelectedCell: function(s) {
        return s.substring(1) === this.selectedCell;
    },
    lastCell: null,
    setSelectedCell: function(s) {
        s = s.substring(1);
        if (this.selectedCell === null) {
            console.log("was null, setting to " + s);
            this.selectedCell = s;
        } else {
            if (this.lastCell !== s) {
                this.lastCell = this.selectedCell;
                this.selectedCell = s;
                console.log("now l " + this.lastCell + " and s " + this.selectedCell);
            }
        }
    },
    setClicked: function(c) {
        if (typeof c !== 'undefined') {
            if (c !== '' || null) {
                this.clicked = null;
            } else {

                this.clicked = Number(c.substring(1));
            }
        }
    },
    getClicked: function(opt) {
        if (opt !== undefined) {
            return opt + this.clicked;
        } else {
            return this.trail.dict;
        }
    }

};


function ifUndef(u) {
    return typeof u === 'undefined';
}

function TList() {
    this.currList = null;
    this.list = null;
    this.dict = {};
}

TList.prototype.toHTML = function() {
    var ret = "";
    for (var i = 0; i < this.list.length; i++) {
        console.log("i__" + i);
        ret += '<ul class="tl">';
        for (var j = 0; j < this.list[i].length; j++) {
            console.log(i + " " + j + " " + this.list[i][j]);
            ret += this.list[i][j].toHTML();
        }
        ret += '</ul>';
    }
    ret += "";
    return ret;
};

TList.prototype.addList = function() {
    if (this.list === null || ifUndef(this.list)) {
        this.list = [[]];
    } else {
        console.log("before " + this.list);
        this.list.push([]);
    }
};
TList.prototype.contains = function(k) {
    return k in this.dict;
};
TList.prototype.get = function(k) {
    return this.dict[k];
};
TList.prototype.addTLNode = function(s, l, p) {
    if (this.contains(s)) {
        console.log("has " + s);
        return false;
    }
    console.log(this.list);
    l = ifUndef(l) ? l = this.list.length - 1 : l;
    p = ifUndef(p) ? p = this.list[l].length : p;
    console.log(s);
    var n = new TLNode(s, l, p);
    console.log(n);
    console.log("\n\t:" + n.s + "\n");
    this.dict[s] = n;
    this.list[l][p] = n;
};

function TLNode(s, l, p, n) {
    console.log(s);
    this.val = s;
    this.list = l;
    this.pos = p;
    if (ifUndef(n)) {
        this.con = {};
    } else {
        this.con = n;
    }
}

function tagsToHTML(s) {
    var ret = "";
    if (s === '') {
        ret = 'No tags';
    } else {
        s = s.split(" ");
        for (var i = 0; i < s.length; i++) {
            ret += '<button class="tag">' + s[i] + '</button>';
        }
    }
    return ret;
}

TLNode.prototype.toHTML = function() {
    return '<li class="node">' + this.val + "</li>&#8250;";
};

function addListToTrail(s) {
    if (FLICK.trail.contains(s) === false) {
        FLICK.trail.addList();
        FLICK.trail.addTLNode(s);
        var tl = document.getElementById("tlist");
        console.log(tl.innerHTML);
        tl.innerHTML = FLICK.trail.toHTML();
    } else {
        console.log('already did' + s);
    }

}



var swapDiv = function(s, c) {
    c = (ifUndef(c)) ? "11" : c;
    s = (ifUndef(s)) ? FLICK.selectedCell : s;
    var cd = document.getElementById('s' + c);
    var sd = document.getElementById('s' + s);
    console.log(cd);
    var tmp = cd.innerHTML;
    cd.innerHTML = sd.innerHTML;
    sd.innerHTML = tmp;
};


$(function() {
    ////////////
    $("#tag-btn").on('click keydown keyup keypress', function(event) {
        event.preventDefault();
        var query = document.getElementById("query").value;
        var qtype = true;
        console.log('q:' + query);
        if (query === '' || query.match(/\s+/) !== null) {

            console.log('q is false');
            qtype = false;
        }
        var obj = {format: "json"};
        if (qtype) {
            obj.tags = query;
            console.log("y" + obj);
       /* }*/
        $.getJSON(FLICK.api, obj).done(function(data) {
            if (qtype) {
                console.log("yes " + query);
                addListToTrail(query);
            }
            document.getElementById("grid").innerHTML = "";
            console.log(data);
            var arr = [];
            $.each(data.items, function(i, item) {
                if (i === 9) {
                    return false;
                }
                if (i % 3 === 0) {
                    arr.push([]);
                }
                var xx = ~~(i / 3);
                arr[xx].push({id: "c" + 1, src: item.media.m, tags: item.tags});
            });

            ///
            makeGrid(arr);
            ///
            $("img").on('hover', imgOnClick);
            $("button.tag").on('click', buttonOnClick);
        });
    }
    });

    function flickrIter(data, arr) {
        $.each(data.items, function(i, item) {
            if (i === 9) {
                return false;
            }
            if (i % 3 === 0) {
                arr.push([]);
            }
            if (FLICK.selectedImg !== null) {
                if (FLICK.selectedImg === item.media.m) {
                    i -= 1;
                } else {
                    var xx = ~~(i / 3);
                    arr[xx].push({id: "c" + 1, src: item.media.m, tags: item.tags});
                }
            } else {
                var xx = ~~(i / 3);
                arr[xx].push({id: "c" + 1, src: item.media.m, tags: item.tags});
            }
        });

    }
//$(document).on('keydown keyup keypress', function(e) {
//    if (e.keycode === 13){
//    e.preventDefault();
//    e.stopPropagation();
//    }
//    
//});


    //////////////
    function makeGrid(arr) {
        var grid = $("#grid");
        for (var i = 0; i < arr.length; i++) {
            var r = $("<div>").attr({"class": "row", "id": "r" + i});
            for (var j = 0; j < arr[i].length; j++) {
                r.append(
                        $("<div>").attr({"class": "swap", "id": "s" + "" + i + "" + j})
                        .append(
                        ($("<div>").attr({"class": "cell", "id": "c" + "" + i + "" + j})
                                .append(
                                ($('<div class="img">')
                                        .append($("<img>")
                                        .attr({
                                    "src": arr[i][j].src,
                                    "id": "i" + i + "" + j
                                }
                                )
                                        )),
                                $('<div class="tag">')
                                .html(tagsToHTML(arr[i][j].tags))
                                ))
                        )

                        );
            }
            grid.append(r);
        }
    }

    function buttonOnClick(e) {
        console.log("e: " + e);
        console.log("this: " + this);
        console.log("v: " + this.value);
        console.log(this.innerHTML);
        console.log("\n");
        searchByTagButton(this.innerHTML);
    }

    $("form").on("submit", function(e) {
        e.stopPropagation();
        e.preventDefault();
    });

//  $(window).keydown(function(event){
//    if(event.keyCode === 13) {
//      event.preventDefault();
//      return false;
//    }
//  });
    function imgOnClick(e) {
        if (!FLICK.isSelectedCell(this.id)) {
            FLICK.setSelectedCell(this.id);
//      
//          if (FLICK.lastCell !== null) {
//            $("#c" + FLICK.selectedCell).removeClass("selected");
//        }
            swapDiv();
            $(".cell").each(function(i, item) {
                var $i = $(item);
                console.log($i.attr('id'));
                $i.removeClass("selected");
                $i.animate({opacity: .2}, 500);
            });
            var $c;

            $c = $("#c" + FLICK.selectedCell);
            ($c.animate({opacity: 1}, 1000)).addClass("selected");
            console.log("________________--");
            $("button.tag").on('click', buttonOnClick);

//            var ts, tcl, tct;
//            ts = $("#c" + FLICK.selectedCell).offset().left;
//            tcl = $($("#s11").children()[0]).offset().left;
//            tct = $($("#s11").children()[0]).offset().top;

//        console.log(ts);
//
//        console.log(tcl + ' xx ' + tct);

//        $("#c" + FLICK.selectedCell).animate({
//            left: tcl, top: tct
//        });
//        console.log("check_" + ts);

//        $($($("#s11").children()[0])).animate({
//            left: tcl, top: tct
//        });

        }
    }
    ///////////////
    function searchByTagButton(s) {
        $.getJSON(FLICK.api, {
            tags: s,
            // tagmode: "any",
            format: "json"
        }).done(function(data) {
            console.log(s);
            console.log("s by button");
            document.getElementById("grid").innerHTML = '';
            console.log(data);
            FLICK.trail.addTLNode(s);
            var tl = document.getElementById("tlist");
            console.log(tl.innerHTML);
            tl.innerHTML = FLICK.trail.toHTML();
            var arr = [];
            $.each(data.items, function(i, item) {
                if (i === 9) {
                    return false;
                }
                if (i % 3 === 0) {
                    arr.push([]);
                }
                var xx = ~~(i / 3);
                arr[xx].push({id: "c" + 1, src: item.media.m, tags: item.tags});
            });
            ///
            makeGrid(arr);
            ///
            $("img").on('hover', imgOnClick);
            $("button.tag").on('click', buttonOnClick);
        });
    }

});

//////////////////

//function pJson(l){
//    l = l || "json/flickr";
// window.JSON.parse( data );
//}