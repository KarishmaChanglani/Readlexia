
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

var font_family = "Arial";
chrome.storage.sync.get(['font', 'translate'], function(data){
	font_family = data['font'];
	
	$(".dropdown-menu li a").parents('.dropdown').find('.btn-default').html(font_family+'<span class="caret"></span>');
	$(".dropdown-menu li a").parents('.col-md-6').find('.font-example').css('font-family', font_family);
	$('#image2text').prop('checked',data['translate']);
	
});

$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  font_family = selText;
  console.log(selText);
  console.log($(this).parents('.col-md-6').find('.font-example').html())
  $(this).parents('.dropdown').find('.btn-default').html(selText+'<span class="caret"></span>');
  $(this).parents('.col-md-6').find('.font-example').css('font-family', font_family);
  chrome.storage.sync.set({'font': font_family}, function() {
        console.log("Font saved");
  });
});
$('#image2text').change(function(){
	if(this.checked === true){
		chrome.storage.sync.set({'translate': true}, function() {
        console.log('Image Translation enabled');
		});
		$("img").unbind("hover");
		$("img").hover(function() {
			alert("This image is here just for demonstration");
			$("<div class=\"translation\" style=\"font-family: "+font_family+"\">This image is here just for demonstration</div>").insertAfter(this);  
		}, function(){
			//$(document).unbind("mousemove");
			$(".translation").remove();
		});
		return;
	}
	else{
		chrome.storage.sync.set({'translate': false}, function() {
        console.log('Image Translation disabled');
		});
		$('img').unbind('mouseenter mouseleave');
	}
})


