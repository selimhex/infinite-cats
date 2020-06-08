<!DOCTYPE html>
<?php
$lang = $_GET["lang"];
$doggomode = $_GET["doggomode"];
if ($lang <> "" && ($lang === "en" || $lang === "cat")){
  //$lang = "en";
} else {
  $lang = "en";
}
$url = 'dict.json';
$data = file_get_contents($url);
$dict = $data;
$dict = json_decode($dict);
?><html lang="<?=$lang?>" dir="ltr">

<head>
  <meta charset="utf-8">
  <title><?=$dict->$lang->title?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="keywords" content="cat, lots of cats, infinite cats, internet cats, infinte scroll, gats, katze, katzen des internets, catalan cats, random.cat">
  <meta name="description" content="infinite cats for internet's sake🐈">
  <meta name="author" content="SELIM HEX">
  <link rel="me" href="https://selimhex.com/">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐈</text></svg>">
  <meta name="robots" content="index,follow">
  <link rel="stylesheet" href="main.css">
  <meta name="title" property="og:title" content="Infinite Cats">
  <meta name="description" property="og:description" content="infinite cats for internet's sake">
  <meta name="image" property="og:image" content="https://infinite.cat/i/og_infinite_cats.gif">
  <meta name="url" property="og:url" content="https://infinite.cat/">
  <meta name="site_name" property="og:site_name" content="infinite.cat - a lot of cats">
</head>

<body>
  <header><h1><?if (!isset($doggomode)){
     echo $dict->$lang->headertext;?></h1><span><? echo $dict->$lang->headersub;}
     else {
       echo $dict->$lang->doggomodeactivated;?></h1><span><?}
     ?></span>
    <nav id="animode"><a href="#_" id="mode_switcher" title="<?
  if (!isset($doggomode)){ echo $dict->$lang->doggomodetitle ?>">🐶<?}
  else {echo $dict->$lang->catmodetitle ?>">🐈<?}
    ?></a></nav>
    <nav id="langopt"><a href="#_" id="lang_opt" title="<?=$dict->$lang->{"otherlangtitle"}?>"><?=$dict->$lang->otherlang?></a></nav>
  </header>
  <main>
    <div class="thumbs"></div>
    <div class="lightboxes fit2screen"></div>
  </main>
  <footer><?if (!isset($doggomode)){
     echo $dict->$lang->footer;} else {
       echo $dict->$lang->footerdoggomode;}?></footer>
  <script type="text/javascript" src="https://chancejs.com/chance.min.js"></script>
  <script type="text/javascript" defer src="script.js"></script>
</body>

</html>
