var code = {
          "a": "._",    "b": "_...",  "c": "_._.",  "d": "_..",
          "e": ".",     "f": ".._.",  "g": "__.",   "h": "....",
          "i": "..",    "j": ".___",  "k": "_._",   "l": "._..",
          "m": "__",    "n": "_.",    "o": "___",   "p": ".__.",
          "q": "__._",  "r": "._.",   "s": "...",   "t": "_",
          "u": ".._",   "v": "..._",  "w": ".__",   "x": "_.._",
          "y": "_.__",  "z": "__..",  " ": " ",

          "1": ".____", "2": "..___", "3": "...__", "4": "...._", "5": ".....",
          "6": "_....", "7": "__...", "8": "___..", "9": "____.", "0": "_____",
          
          /*
           * Note: Some operators prefer "!" as "___." and others as "_._.__"
           * ARRL message format has most punctuation spelled out, as many symbols'
           * encodings conflict with procedural signals (e.g. "=" and "BT").
           */
          
          ".": "._._._", ",": "__..__", "?": "..__..",  "'": ".____.",
          "/": "_.._.",  "(": "_.__.",  ")": "_.__._",  "&": "._...",
          ":": "___...", ";": "_._._.", "=": "_..._",   "+": "._._.",
          "-": "_...._", "_": "..__._", "\"": "._.._.", "$": "..._.._",
          "!": "_._.__", "@": ".__._."
};
var skiptag = [ "HTML", "SCRIPT", "HEAD", "META", "BODY", "NOSCRIPT", "IMG",
		"STYLE", "LINK" ];
function translate_morse(el) {

	var tokens = el.split(/\s+/);

	var result = "";
	for (i in tokens) {

		var token = tokens[i];
		var letters = token.split('');
		var symbols = [];

		for (j in letters) {
			var letter = letters[j];
			var symbol = code[letter.toLowerCase()];
			if (symbol) {
				symbols.push(symbol);
			}else{
				symbols.push(letter);
			}
		}
		result = result.concat(" " + symbols.join(''));
	}

	return result;
};
function skiptagcheck(v) {
	for ( var i = 0; i < skiptag.length; i++) {
		if (skiptag[i] == v) {
			return true;
		}
	}
	return false;
}

function gettree(e) {
	var max = e.length;
	for ( var j = 0; j < max; j++) {
		var vl = e[j];
		if (vl.nodeType == Node.TEXT_NODE) {
			var ttt = "" + vl.nodeValue;
			vl.nodeValue = translate_morse(ttt);
		}
	}
};

function replaceMorse() {
	var elm = document.getElementsByTagName("*");
	var ell = elm.length;
	for ( var i = 0; i < ell; i++) {
		var val = elm[i];
		var str = val.nodeName;

		if (!skiptagcheck(str)) {
			var et = val.childNodes;
			gettree(et);
		}
	}

};
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, { file: 'morse.js' }, function(){
	  chrome.tabs.executeScript(null, {code:'replaceMorse()'});
	  });
});
