// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get("enabled", function(data){
	if(data){
		console.log("Disabling plugin");
		chrome.storage.local.set({enabled: false});		
	}
	else{
		console.log("Enabling plugin");
		chrome.storage.local.set({enabled: true});
	}
	});
	console.log("No enable found");
	chrome.storage.local.set({enabled: true});
});