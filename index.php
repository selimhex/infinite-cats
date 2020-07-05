<!DOCTYPE html>
<?php
$lang = $_GET["lang"];
$doggomode = $_GET["doggomode"];
$isdoggomode = (isset($doggomode));
#if ($isdoggomode) {echo "is doggomode";}else{echo "is not doggomode";}
if ($lang <> "" && ($lang === "en" || $lang === "cat")){
} else {
  $lang = "en";
}
$url = 'dict.json';
$data = file_get_contents($url);
$dict = $data;
$dict = json_decode($dict);
  if (!$isdoggomode) { $qs2 = "";
    if ($dict->$lang->otherlang === "cat"){$qs2 .= "?lang=cat";} else {$qs2 = "/";}
  } else {
  $qs2 = "?doggomode";
    if ($dict->$lang->otherlang === "cat"){$qs2 .= "&lang=cat";}
  }
#$baseurl= $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER['HTTP_HOST'];
$HTTP_or_HTTPS = (((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS']!=='off') || $_SERVER['SERVER_PORT']==443) ? 'https://':'http://' );            //in some cases, you need to add this condition too: if ('https'==$_SERVER['HTTP_X_FORWARDED_PROTO'])  ...
$baseurl= $HTTP_or_HTTPS . $_SERVER['HTTP_HOST'];
?><html lang="<?=$dict->$lang->htmllang?>" dir="ltr">

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
  <link rel="alternate" hreflang="<?
  #$other=$dict->$lang->otherlang
  echo $dict->{$dict->$lang->otherlang}->htmllang?>" href="<?=$baseurl?><?=$qs2?>">
  <meta name="title" property="og:title" content="Infinite Cats">
  <meta name="description" property="og:description" content="infinite cats for internet's sake">
  <meta name="image" property="og:image" content="https://infinite.cat/i/og_infinite_cats.gif">
  <meta name="url" property="og:url" content="https://infinite.cat/">
  <meta name="site_name" property="og:site_name" content="infinite.cat - a lot of cats">
</head>

<body>
  <header><h1><?if (!$isdoggomode){
     echo $dict->$lang->headertext;?></h1><span><? echo $dict->$lang->headersub;}
     else {
       echo $dict->$lang->doggomodeactivated;?></h1><span><?}
     ?></span>
    <nav id="animode"><a href="<?
      if (!$isdoggomode) { $qs1 = "?doggomode";
        if ($dict->$lang->otherlang === "cat"){$qs1 .= "";} else {$qs1 .= "&lang=cat";}
      } else {
      $qs1 = "";
        if ($lang === "cat"){$qs1 = "?lang=cat";} else {$qs1 = "/";}
      }
echo $qs1;
       ?>" id="mode_switcher" title="<?
  if (!$isdoggomode){ echo $dict->$lang->doggomodetitle ?>">🐶<?}
  else {echo $dict->$lang->catmodetitle ?>">🐈<?}
    ?></a></nav>
    <nav id="langopt"><a href="<?
echo $qs2;
       ?>" id="lang_opt" title="<?=$dict->$lang->{"otherlangtitle"}?>"><?=$dict->$lang->otherlang?></a></nav>
  </header>
  <main>
    <div class="thumbs"></div>
    <div class="lightboxes fit2screen"></div>
  </main>
  <footer><?if (!$isdoggomode){
     echo $dict->$lang->footer;} else {
       echo $dict->$lang->footerdoggomode;}?></footer>
  <script type="text/javascript" src="https://chancejs.com/chance.min.js"></script>
  <script type="text/javascript" defer src="script.js"></script>
</body>

</html>
