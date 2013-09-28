//"use strict";

GLOBAL = (typeof GLOBAL === 'undefined') ? {
    q: document.getElementById("query"),
    api: "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
} : GLOBAL;

//function searchBy(e, type) {
//
//    var q = document.getElementById("query").value;
//    console.log(q).value;
//    if (type === "username") {
//
//    } else {
//
//    }
//    return q.value;
//}
//

$(function() {
//    $("img").click(function(event){
//        console.log("CLICK!");
//    });
  function notify() {
  alert( "clicked" );
}
$( "button" ).on( "click", notify );
  
   $('.cell').on("click","div", function (e) {
      e.preventDefault();
      console.log("sdas");
      alert('You Clicked Me');
 });
  
// jQuery('img').on('click',function(e){
//     console.log('HBHBH');
//   alert('It came here!');
////   window.open($(this).attr('href'));    
//   return false;   
//});
    ////////////
    console.log("called");
    $("#tag-btn").click(function(event) {
          event.preventDefault();

        console.log("start");
        $.getJSON(GLOBAL.api, {
            //tags: "mount rainier",
            // tagmode: "any",
            format: "json"
        }).done(function(data) {
            console.log(data);
            arr = [];
//            arr[0] = new Array();
            
        //for ()
             //arr = [new Array(3), [], []];

            s = "";
            for(var i = 0; i < 9; i++){
                console.log("__"+i);
                var item = data.items[i];
                arr.push ( {link:item.media.m, tags: item.tags});
                console.log(item);
                console.log(item.media);
                console.log(item.media.m);
            console.log(i);
            console.log(arr[i]);
        }
//            $.each(data.items, function(i, item) {
//                
//                                console.log("______"+i);
//
//                if (i === 9) {
//                    return false;
//                }
//                console.log(arr);
////            
////            
////            arr[i/3].push({name: "c" + i, link: item.media.m, tags: item.tags});
//           
//                arr[i/3][i%3].name = "c" + i;
//            });
            console.log(arr.length);
            //console.log(arr[0]);
                 for (var i = 0 ; i < arr.length;){
                s += '<div class="row">';
                for(var j = 0; j < 3; j++, i++){
                    console.log(i);
                    s+='<div class="cell"><img src="'+arr[i].link+'">';
                    s+='<div class="tags">';
                    s+="<button>" + arr[i].tags + "</button>";
                    s+='</div></div>';
                }
                s+='</div>';
            }
            console.log(s);
            console.log(document.getElementById("grid"));
            document.getElementById("grid").innerHTML=s;
//            document.getElementById("grid").innerHTML = s;




        });
    });
});
//
//function searchBy(e, type) {
//    var q = document.getElementById("query").value;
//    console.log(q.value);
//    if (type === "username") {
//
//    } else {
//
//    }
//    console.log("start");
//    $.getJSON(GLOBAL.api, {
//        //tags: "mount rainier",
//        // tagmode: "any",
//        format: "json"
//    })
//            .done(function(data) {
//        console.log(data);
//        //var arr = [];
//        //arr = data.items;
////        for ()
//
//        var s = "";
//        for (var j = 0; j < 3; j++) {
//            s += "<div id=\r" + j + "\" class=\"row\">";
//            // $( "<div id=\g"+j+"\" class=\"grid\"><div>" ).appendTo( "#images" );
//            var k = 0;
//            $.each(data.items, function(i, item) {
//
//                console.log("_____________" + item.tags);
//                // var t = document.getElementById("g"+j);
//                //t.innerHTML="<img src='"+item.media.m+"'>"
//                // s+='<img src=+item.media.m+"'>';
//                console.log(data.items[k].media.m);
//
//                console.log("____-" + data.items[k].tags);
//
//
//                var tt = ("" + data.items[k].tags).split(" ");
//                var tts = "";
//                for (var xx = 0; xx < tt.length; xx++) {
//                    if (xx === 3) {
//                        break;
//                    }
//
//                    tts += "<button>" + tt[xx] + "</button>";
//
//                }
//
//                var imgsrc = data.items[k].media.m;
//                s += '<div class="cell"><div id="img"><img src="' + data.items[k].media.m + '"></div>' + tts + '</div>';
//                var imgl = new Image();
//                imgl.src = imgsrc;
//                imgl.onload = function() {
//
//                    console.log(imgl.width = ' ' + imgl.height);
//                };
//                // s+='<img src="';
//                // s+=""+item.media.m;
//                // s+='>';
//                // $( "<img>" ).attr( "src", item.media.m ).appendTo( "#g"+j );
//                console.log("____" + j);
//                // if(i % 3 === 0){
//                k += 1;
//                // }
//                if (k === 3) {
//                    return false;
//                }
//            });
//            s += "</div>";
//        }
//        document.getElementById("grid").innerHTML = s;
//
//
//
//        // for (var j = 0; j<3; j++){
//        //          $( "<div id=\g"+j+"\" class=\"grid\"></div>" ).appendTo( "#images" );
//
//        // $.each( data.items, function( i, item ) {
//        //   console.log(item.tags);
//        //   $( "<img>" ).attr( "src", item.media.m ).appendTo( "#g"+j );
//        //   if(i % 3 === 0){
//
//        //   }
//        //   if ( i === 9 ) {
//        //     return false;
//        //   }
//        // });
//
//        // $( "</div>" ).appendTo( "#images" );
//
//
//        // }
//
//
//    });
//}
