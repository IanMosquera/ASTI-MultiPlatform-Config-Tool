chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create(
  	/*'index.html', 
  	{
  		id:"ASTI Config Tool", 
  		resizable: false,
  		innerBounds: {width: 809, height: 500}
  	}, 
  	function(win){});*/
  	'newASTI.html', 
  	{
  		id:"ASTI Config Tool", 
  		resizable: false,
  		innerBounds: {width: 626, height: 500}
  	}, 
  	function(win){});
});
