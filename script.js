'use strict';
let main = document.querySelector("main");
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

let initCatter = function(catcount) {
  fetchloop = 1;
  for (let forlooper = 0; forlooper < catcount; forlooper++) {
    let prev_fetchloopDone = fetchloopDone;
    fetchloopDone = false;
    if (prev_fetchloopDone != fetchloopDone) { logger(); }
    fetch(url)
      .then(res => res.json())
      .then((out) => {
        let img = document.createElement("img"); // thumbnail
        let a = document.createElement("a"); // thumbnail_container
        let img2 = document.createElement("img"); // lightbox
        let a2 = document.createElement("a"); // lightbox container named #img1, #img2 etc.

        img.src = out.file;
        img.classList.add("thumbnail");
        img.loading = "lazy";
        img.onload = function() {loadedimgcount++; checkIfWorking();}
        a.classList.add("thumbnail_container");
        a.href = "#img" + i;
        let probability = chance.natural({ min: 1, max: 100 }) // https://github.com/chancejs/chancejs

        if (probability < 30) {img.classList.add("max30");}
        if (probability > 60) {img.classList.add("max60");}
        if (probability > 75) {img.classList.add("max85");}

        img2.src = out.file;
        img2.loading = "lazy";
        a2.classList.add("lightbox");
        a2.href = "#_";
        a2.id = "img" + i;

        a.appendChild(img);
        a2.appendChild(img2);
        main.appendChild(a);
        main.appendChild(a2);
      }).catch(err => console.error(err))
      .finally(() => {fetchloop++; i++;
                      if (fetchloop-1 == catcount) {
                      fetchloopDone = true;
                      logger();
                      checkIfWorking(); //working = false;

                      } else {fetchloopDone = false;}
      })

  }
}
initCatter(10);


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
