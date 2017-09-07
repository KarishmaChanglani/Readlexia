
$(document).ready( function() {
var newStyle = document.createElement('style');
newStyle.appendChild(document.createTextNode("\
@font-face {\
    font-family: Open Dyslexic; \
    src: url(open-dyslexic/OpenDyslexic3-Regular.ttf); \
}\
@font-face {\
    font-family: Open Dyslexic; \
    src: url(open-dyslexic/OpenDyslexic3-Bold.ttf); \
	font-weight: bold; \
}\
@font-face {\
    font-family: Open Dyslexic; \
    src: url(open-dyslexic/OpenDyslexic3-Italic.ttf); \
	font-italic: italic; \
}\
"));

document.head.appendChild(newStyle);
})


chrome.storage.sync.get(["font", "translate"], function(data){
	console.log(data['font']);
	$('*').css('font-family', data['font']);
	if(data["translate"]){
		$("img").hover(function() {
			var $img = $(this);

			var context = document.createElement('canvas').getContext('2d');
			context.drawImage($img[0], 0, 0);

			var imageData = context.getImageData(0, 0, $img.width(), $img.height());

			var string = OCRAD(imageData);
			if(string){
				alert(string);
			}
			$("<div class=\"translation\">"+string+"</div>").insertAfter(this);
			 
		}, function(){
			//$(document).unbind("mousemove");
			$(".translation").remove();
		});
	}
	else{
		$('img').unbind('mouseenter mouseleave');
	}
})