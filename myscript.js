//(function(){

function get_playlist() {
	var element=document.querySelector('[aria-label="Save to playlist"]');
	
	if (!element) {
		element=[...document.querySelectorAll("yt-formatted-string.style-scope.ytd-menu-service-item-renderer")].find((element) => element.innerHTML=="Save");
	}

	if (!element) {
		var a=document.querySelector('[d="M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z"]');
		
		if(a && a.parentElement && a.parentElement.parentElement) {
			element=a.parentElement.parentElement;
		}
	}
	
	return element;
}

function get_more_actions() {
	let actions_element=document.querySelector('div#actions');
	if(!actions_element) {return;}
	
	var element=actions_element.querySelector('[aria-label="More actions"]');
	
	if(!element) {
		var a=actions_element.querySelector('[d="M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"]');

		if(a && a.parentElement && a.parentElement.parentElement) {
			element = a.parentElement.parentElement;
		}
	}
	
	return element;
}

function click_playlist() {
	var playlist_element=get_playlist();
	
	if (!playlist_element) {
		var more_actions_element=get_more_actions();
		
		if(more_actions_element) {
			more_actions_element.click();
			
			//
			var checkExist = setInterval(() => {
				var playlist_element=get_playlist();
				
				if (playlist_element) {
					function abc() {
						playlist_element.click();
					}
					
					clearInterval(checkExist);
					
					abc();
					//setTimeout(abc,1000);
					//setTimeout(abc,2000);
				}
			}, 500);
			
			setTimeout(function(){clearInterval(checkExist);},10000);
			//
			// var abc = function() {
				// var playlist_element=get_playlist();
				
				// if (playlist_element) {
					// playlist_element.click();
				// }
			// };
			
			// setTimeout(abc,500);
		}
	} else {
		playlist_element.click();
	}
}

function unplaylist() {
	click_playlist();

	var checkExist = setInterval(() => {
		var btn = document.querySelector('.ytd-add-to-playlist-renderer [aria-label="Cancel"]');
		var iron = document.querySelector('tp-yt-iron-overlay-backdrop');
		
		if (btn && iron) {
			function abc() {
				document.querySelectorAll('[aria-checked="true"]').forEach(x => x.click());
				btn.click();
			}
			
			clearInterval(checkExist);
			
			abc();
			//setTimeout(abc,1000);
			setTimeout(abc,2000);
		}
	}, 500);
	
	setTimeout(function(){clearInterval(checkExist);},10000);
}

function like() {
	var b = document.querySelector('.animated-like-toggle-button button') 
		|| document.querySelector('#segmented-like-button button')
		|| document.querySelector('[title="I like this"]');        
	if (b && b.getAttribute('aria-pressed') == 'false') { b.click(); }
}
	
function createAttachButton(element,name,onclick,icon,icon_x,icon_y,icon_w,icon_h) {
	if(document.querySelector('#MY_'+name)) {
		return;
	}
	
	//
	var button = document.createElement("button");
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	var path = document.createElementNS('http://www.w3.org/2000/svg','path');

	//
	svg.append(path);
	button.append(svg);
	element.prepend(button);
	
	//
	button.classList.add('playerButton');
	button.classList.add('ytp-button');        
	button.setAttribute('id',"MY_"+name);
	button.setAttribute('title',name);
	button.style.width = "auto";
	button.style.height = "100%";
			
	svg.style.width = "auto";
	svg.style.height = "100%";

	svg.classList.add('playerButtonImage');
	svg.setAttributeNS(null,'preserveAspectRatio','xMidYMid slice'); //xMinYMin meet
	svg.setAttribute('viewBox', icon_x+' '+icon_y+ ' '+icon_w+ ' '+ icon_h);
	
	path.setAttributeNS(null,'d',icon);
	path.style.fill="white";
	
	//
	button.onpointerdown = function() {
		path.style.fill="#c3c3c3";
	}
			
	button.onpointerup = function() {
		path.style.fill="white";
	}
	
	button.onclick = function() {
		onclick();
		path.style.stroke="white";
		setTimeout(function(){ path.style.stroke="transparent"; }, 100);
	};

	button.classList.add('ytp-button');
}

function go() {
	if(!location.pathname.startsWith('/watch')) {
		return;
	}

	//var checkExist = setInterval(function() {
	var element=document.querySelector(".ytp-right-controls");
	
	if(element) {
	//        clearInterval(checkExist);
			
		// yqnn.github.io/svg-path-editor
		
		createAttachButton(element,"Like",function(){like();unplaylist();},
			"m2 10 3-10 3 10-8-6h10Z",
			-4,-5,18,20
		);
		
		createAttachButton(element,"Unplaylist",unplaylist,
			"M10 4h10v2h-10ZM0 0h12v1h-12ZM0 4h8v1h-8ZM0 8h8v1h-8Z",
			-5,-10,30,30
		);
		
		createAttachButton(element,"Playlist",click_playlist,
			"M10 4h10v2h-10ZM0 0h12v1h-12ZM0 4h8v1h-8ZM0 8h8v1h-8ZM14 0h2v10h-2Z",
			-5,-10,30,30
		);
	}
	//}, 1000);
}

document.addEventListener('yt-navigate-finish', go);
go();

//})();

