var img = 'https://i.imgur.com/uGDCaln.jpg';
var fadeLength = 100;
var fadeWait = 1000;
var textWait = 1000;

var fade = function(element, isFadingIn, cb) {
  var op = isFadingIn ? 0.1 : 1;
  element.style.display = 'block';
  var timer = setInterval(function () {
    if ((isFadingIn && (op >= 1)) || (op < 0.1)){
      clearInterval(timer);
      cb();
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    if (isFadingIn) {
      op += op * 0.1;
    } else {
      op -= op * 0.1;
    }
  }, fadeLength);
}

var replaceImg = function() {
  var images = document.getElementsByTagName('img');
  var num = images.length;
  var i = 0;
  var offset = Math.floor(Math.random() * num);
  while (i < num && images[i + offset].src == retardo) { i++; }
  if (i < num) {
    var image = images[i + offset];
    fade(image, false, function() {
      image.src = img;
      fade(image, true, replaceImg);
    });
  } else {
    setTimeout(replaceImg, fadeWait);
  }
}    

var getNewText = function(text) {
  var speech = 'i wll nvr let go '
  if (text.length > speech.length) {
    var num = Math.floor(text.length / speech.length);
    var leftover = text.length % speech.length;
    return Array(num + 1).join(speech) + speech.substr(0, leftover);
  }
  if (text.length >= 4) {
    return 'j' + Array(text.length - 2).join('a') + 'ck';
  }
  return text;
}

var getTextNodes = function(parent){
	var all = [];
	for (parent = parent.firstChild; parent; parent = parent.nextSibling) {
		if (['SCRIPT','STYLE'].indexOf(parent.tagName) >= 0) continue;
		if (parent.nodeType === Node.TEXT_NODE) all.push(parent);
		else all = all.concat(getTextNodes(parent));
	}
	return all;
}

var body = document.getElementsByTagName('body')[0];

var replaceText = function() {
  var textNodes = getTextNodes(body);
  var random = Math.floor(Math.random() * textNodes.length);
  var node = textNodes[random];
  node.nodeValue = getNewText(node.nodeValue);
  setTimeout(replaceText, textWait);
}

var playMusic = function() {
  var div = document.createElement('div');
  div.style.display = 'none';
  div.innerHTML = "<iframe src='https://www.youtube.com/embed/KolfEhV-KiA?autoplay=1&loop=1'></iframe>";
  document.getElementsByTagName('body')[0].appendChild(div);
}

replaceText();
replaceImg();
playMusic();
