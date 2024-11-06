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

function try_click_playlist() {
	var playlist_element=get_playlist();
	
	if (playlist_element) {
		playlist_element.click();
		return true;
	}
	
	return false;
}

function run_timer(func) {
	if(func()) {
		return;
	}
	
	setTimeout(function(){
		if(!func()) {
			var checkExist = setInterval(() => {
				if(func()) { clearInterval(checkExist); }
			}, 500);
			
			setTimeout(function(){clearInterval(checkExist);},10000); //give up
		}
	},200);
}

function click_playlist() {
	if(try_click_playlist()) {
		return;
	}
	
	//
	var more_actions_element=get_more_actions();
	
	if(!more_actions_element) {
		return;
	}
	
	//
	more_actions_element.click();
	
	//
	run_timer(try_click_playlist);
}

function try_close_playlist() {
	var iron = document.querySelector('tp-yt-iron-overlay-backdrop');
	
	if(iron) { //checks if popup visible, as button can be clicked before then and therefore do nothing
		let header=document.querySelector('div.ytd-add-to-playlist-renderer#header');
		
		if(header) {
			var btn = header.querySelector('.ytd-add-to-playlist-renderer [aria-label="Cancel"]');
			
			if(btn) {
				btn.click();
				return true;
			}
		}
	}

	return false;
}

function try_uncheck_playlists() {
	var playlists=document.querySelector('div.ytd-add-to-playlist-renderer#playlists');
	
	if(playlists) {
		playlists.querySelectorAll('[aria-checked="true"]').forEach(x => x.click());
		return true;
	}
	
	return false;
}

function unplaylist() {
	click_playlist();
	
	run_timer(try_close_playlist);
	run_timer(try_uncheck_playlists);
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
		// clearInterval(checkExist);
			
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

