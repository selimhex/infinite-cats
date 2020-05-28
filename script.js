'use strict';
const $ = (a) => {return document.querySelector(a)};
const qA = (a) => {return document.querySelectorAll(a)};
let main = document.querySelector("main");
let mainThumbs = $("main .thumbs");
let mainLightboxes = $("main .lightboxes");

let body = document.querySelector("body");

var url = 'https://aws.random.cat/meow';
//let status = { };
let i = 1;
let fetchloop = 1;
var fetchloopDone = true;
var working = false;
let loadedimgcount = 0;
let debugMode = false;
let debuglite = true;
let loggerclicker;
let debug = function(){};

let json_file_key = "file"; // for RandomCat meow json
var searchParams = new URLSearchParams(window.location.search);
let doggomode = searchParams.has("doggomode");
if (doggomode) {var url = 'https://random.dog/woof.json';
json_file_key = "url";}
let isVideo = (fileInput) => !(fileInput.match(/.(jpg|jpeg|png|gif)$/i));

let checkIfWorking = function() {
  let wasWorking = working;
  if (loadedimgcount < i-3 || !fetchloopDone) {working = true} else {working = false;}
  if(/* wasWorking != working || */
    loadedimgcount == i-1){
      logger();
    }
    if(!debuglite){logger()};
    if(!working) {shouldIinfiniteScroll();}
  }

let icons = {fetchloopDone : {true: "✅", false: "🔄" },
            loading: function(){return this.idle[(loadedimgcount == (i-1))];},
            idle : {true: "✅", false: "🔄" },
            working : {true: "💪", false: "😎"}
            }
let icon = function(e){return icons[e][window[e]];}

let logger = function(msg, standardOutput) {
  let output;
  if (debugMode) {
    if (!msg){ msg = ""}else{ msg += " ";}
    //msg += `standardOutput: ${standardOutput} `;
    if (standardOutput != false) {
      output = `working: ${icon("working")} ::: loaded: ${loadedimgcount} / ${i-1} ${icons.loading()} ::: fetchloop ${fetchloop-1} / 10 ${icon("fetchloopDone")}`;
    } else {output = ""}
    console.log(`${msg}${output}`);
  }
}

debug = function(b){
  if (b)
    { debugMode = true; body.classList.add("debugMode");  loggerclicker = setInterval(logger, 1000, "🕰");
  } else { debugMode = false; body.classList.remove("debugMode"); clearInterval(loggerclicker); }
}
debug(debugMode);

let initCatter = function(catcount, lazyload) {
  fetchloop = 1;
  for (let forlooper = 0; forlooper < catcount; forlooper++) {
    let prev_fetchloopDone = fetchloopDone;
    fetchloopDone = false;
    if (prev_fetchloopDone != fetchloopDone) { logger(); }
    fetch(url)
      .then(res => res.json())
      .then((out) => {
        if (isVideo(out[json_file_key])) {throw Error("not in the mood for a Video RN")}
        let img = document.createElement("img"); // thumbnail
        let a = document.createElement("a"); // thumbnail_container
        let img2 = document.createElement("img"); // lightbox
        let a2 = document.createElement("a"); // lightbox container named #img1, #img2 etc.

        img.src = out[json_file_key];

        img.classList.add("thumbnail");
        img.onload = function() {loadedimgcount++; checkIfWorking();}
        a.classList.add("thumbnail_container");
        a.href = "#img" + i;
        a.id = "th" + i;
        let probability = chance.natural({ min: 1, max: 100 }) // https://github.com/chancejs/chancejs

        if (probability < 30) {img.classList.add("max30");}
        if (probability > 60) {img.classList.add("max60");}
        if (probability > 75) {img.classList.add("max85");}

        img2.src = out[json_file_key];
        a2.classList.add("lightbox");
        a2.href = "#th" +i;
        //a2.href = "#_";
        a2.id = "img" + i;

        if (lazyload != false) {
        img.loading = "lazy";
        img2.loading = "lazy"; }

        a.appendChild(img);
        a2.appendChild(img2);
        mainThumbs.appendChild(a);
        mainLightboxes.appendChild(a2);
        i++;
      }).catch(err => {if (debugMode){console.error(err)}})
      .finally(() => {fetchloop++;
                      if (fetchloop-1 == catcount) {
                      fetchloopDone = true;
                      logger();
                      checkIfWorking(); //working = false;

                      } else {fetchloopDone = false;}
      })

  }
}
initCatter(10, false);


//let autoCat = setInterval(newCat, 10000);
//let loggerclicker = setInterval(logger, 1000, "🕰");

document.addEventListener("scroll", function(event) {
  shouldIinfiniteScroll();
});


var shouldIinfiniteScroll = function() {
  if (!working) {
    var lastImg = document.querySelector(".thumbnail_container:nth-last-child(2) img");
    if (lastImg != undefined) {
      var lastImgOffset = lastImg.offsetTop + lastImg.clientHeight;
      var pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastImgOffset - (window.innerHeight * .5)) {
        working = true;
        //lastImg.style["padding-bottom"] = "30vh";
        logger("⏩⏩⏩ NEXTING ⏩⏩⏩", false);
        initCatter(10);
        shouldIinfiniteScroll();
      }
    }
  } else { // says it's working + check if really true
    checkIfWorking();
  }
};

var key, idnum, targetId, clearcheck;
let repeatcheck;


document.addEventListener('keydown', event => {
//console.log(event);
key = event.key;
  if(event.target.classList.contains("lightbox")) {

    targetId = event.target.id;
    idnum = event.target.id.slice(3);
    console.log(idnum);
    //console.log(key);
    if (key === "ArrowRight") {
      idnum++;
//#################################################### this part could be better
      if (!$("#img" + idnum)) { //if the next lightbox img is not generated yet
        //clearcheck = setInterval(repeatcheck,500,idnum);
        checkIfWorking();
        if(!fetchloopDone || loadedimgcount < (i-7)){

        } else {initCatter(10);clearcheck = setTimeout(repeatcheck,100,idnum);} // setInterval led to chaos. trying to control it with setTimeout.

        repeatcheck = function(idnum) {
            //console.log("ping");
            if ($("#img" + idnum)) {
                clearTimeout(clearcheck);
                console.log("clicking");
                $("#th" +idnum).click();
            } else {console.log("ping");clearcheck = setTimeout(repeatcheck,100,idnum);}
        }
//#################################################### this part could be better
      } else {
        $("#th" +idnum).click();
      }

    } else if (key === "ArrowLeft") {
      idnum--;
        if ($("#img" + idnum)) {
          $("#th" +idnum).click();
        }
    } else if (key === "Escape") {
        $("#" +targetId).click();
    } else if (key === "c" || key === "C") {
      mainLightboxes.classList.toggle("fit2screen");

    }
  //console.log(idnum);
  }






});
