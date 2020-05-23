var url = 'https://aws.random.cat/meow';
let i = 1;
let newCat = function(){
  fetch(url)
      .then(res => res.json())
      .then((out) => {
let img = document.createElement("img");   // thumbnail
let a = document.createElement("a");
let img2 = document.createElement("img");   // lightbox
let a2 = document.createElement("a");

          img.src= out.file;
          img.classList.add("thumbnail");
          img.loading = "lazy";
          a.classList.add("thumbnail_container");
          a.href = "#img" + i;
          let probability = chance.natural({ min: 1, max: 100 })

if (probability < 30) {img.classList.add("max30");}
if (probability > 60) {img.classList.add("max60");}
if (probability > 75) {img.classList.add("max85");}

          img2.src= out.file;
          img2.loading = "lazy";
          a2.classList.add("lightbox");
          a2.href = "#_";
          a2.id = "img" + i;
          console.log(i);
          i=i+1;
          a.appendChild(img);
          a2.appendChild(img2);
          document.querySelector("main").appendChild(a);
          document.querySelector("main").appendChild(a2);
  }).catch(err => console.error(err));
}
let catter = function() {setTimeout(newCat,0);}
let initCatter = function() {for (let i=0; i < 10; i=i+1) {
catter();
}}
initCatter();

//let autoCat = setInterval(newCat, 10000);

document.addEventListener("scroll", function (event) {
shouldIinfiniteScroll();
});

let working = false;

var shouldIinfiniteScroll = function() {
    if(!working) {
    var lastImg = document.querySelector(".thumbnail_container:nth-last-child(2) img");
    if (lastImg != undefined){
      var lastImgOffset = lastImg.offsetTop + lastImg.clientHeight;
      var pageOffset = window.pageYOffset + window.innerHeight;
      if(pageOffset > lastImgOffset - (window.innerHeight * .5) ) {
        working = true;
        console.log("NEXTING");
        lastImg.style["padding-bottom"] = "30vh";
        initCatter();
        shouldIinfiniteScroll();
        setTimeout(function(){lastImg.style["padding-bottom"] = "0px"; console.log("setting padding bottom to 0");
working = false;
}, 1000);

    }
    }
  } else {
    console.log("working!!!");
  }
};
