'use strict';
let main = document.querySelector("main");
let body = document.querySelector("body");

var url = 'https://aws.random.cat/meow';
//let status = { };
let i = 1;
let fetchloop = 1;
let fetchloopDone = true;
let working = false;
let loadedimgcount = 0;
let debugMode = false;
if (debugMode) {body.classList.add("debugMode");}

let checkIfWorking = function() {
let wasWorking = working;
logger();
   if (loadedimgcount < i-3 || !fetchloopDone) {working = true} else {working = false;}
   if(wasWorking != working){
     //console.log("working:", working, "fetchloopDone", fetchloopDone, loadedimgcount + "/" + (i-1));
   }
if(!working) {shouldIinfiniteScroll();}
}

let logger = function() {
  //console.log(`${loadedimgcount} / ${i-1} ::: ${fetchloop-1} / 10`);
}
let logger2 = function(msg) {
  if (debugMode) {
    if (!msg){ msg = ""}else{ msg += " ";}
    console.log(`${msg}working: ${working} ::: loaded: ${loadedimgcount} / ${i-1} ::: fetchloop ${fetchloop-1} / 10 ${fetchloopDone}`);
  }
}

let initCatter = function(catcount) {
  fetchloop = 1;
  for (let forlooper = 0; forlooper < catcount; forlooper++) {
      let prev_fetchloopDone = fetchloopDone;
      fetchloopDone = false;
      if (prev_fetchloopDone != fetchloopDone) {
        logger2();
      }
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
          img.onload = function() {loadedimgcount++; /* logger();*/ checkIfWorking();}
          a.classList.add("thumbnail_container");
          a.href = "#img" + i;
          let probability = chance.natural({ min: 1, max: 100 })

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
        .finally(() => {fetchloop++; i++;logger();
                        if (fetchloop-1 == catcount) {
                        fetchloopDone = true;
                        logger2();
                        checkIfWorking();
                        //setTimeout(function() {working = false; /*shouldIinfiniteScroll();*/}, 1000);
                        //working = false;

                      } else {fetchloopDone = false;}
      })

  }
}
initCatter(10);

//let autoCat = setInterval(newCat, 10000);
//let loadedImgCounter = setInterval(function(){console.log("loaded imgs:",loadedimgcount)}, 1000);
let logger2clicker = setInterval(logger2, 1000, "🕰");

document.addEventListener("scroll", function(event) {
  shouldIinfiniteScroll();
});


var shouldIinfiniteScroll = function() {
  //checkIfWorking();
  if (!working) {
    var lastImg = document.querySelector(".thumbnail_container:nth-last-child(2) img");
    if (lastImg != undefined) {
      var lastImgOffset = lastImg.offsetTop + lastImg.clientHeight;
      var pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastImgOffset - (window.innerHeight * .5)) {
        working = true;
        //console.log("NEXTING", loadedimgcount +"/"+ (i-1));
        logger2("🔄")
        lastImg.style["padding-bottom"] = "30vh";
        initCatter(10);
        shouldIinfiniteScroll();
        setTimeout(function() {
          lastImg.style["padding-bottom"] = "0px";
          //console.log("setting padding bottom to 0");
        }, 0);

      }
    }
  } else {
    checkIfWorking();
    logger2();
  }
};
