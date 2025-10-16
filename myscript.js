//(function(){
var button;

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
    var more_actions_element=get_more_actions();
        
    if(!more_actions_element && try_click_playlist()) { 
		return; 
	} else {
		more_actions_element.click();
		run_timer(try_click_playlist);
	}
}

function try_close_playlist() {
	return try_close_playlist_old() || try_close_playlist_new();
}

function try_close_playlist_old() {
    var iron = document.querySelector('tp-yt-iron-overlay-backdrop'); //tp-yt-paper-dialog

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

function isHidden(elem) {
  const styles = window.getComputedStyle(elem);
  return styles.display === 'none' || styles.visibility === 'hidden' || styles.opacity === '0';
}

function try_close_playlist_new() {
    var irons = document.querySelectorAll('tp-yt-iron-dropdown');
	
	for (var i=0;i<irons.length;i++) {
		var iron=irons[i];
		var header=iron.querySelector('yt-panel-header-view-model[aria-label="Save video to..."]');
		
		if(header) {
			//iron.style.display = "none";
			//iron.setAttribute('aria-hidden', 'true');
			//iron.blur();
			
			run_timer((function(iron){ //necessary for closure?
				return function() {
					if(!isHidden(iron)) {
						document.body.click();
						return true;
					} else {
						return false;
					}
				}
			})(iron));

			//
			return true;
		}
	}
 
	return false;	
}


function try_uncheck_playlists() {
	return try_uncheck_playlists_old() || try_uncheck_playlists_new();
}

function try_uncheck_playlists_new() {
	//buggy, doesn't close more actions, and if watching videos in playlist, might unplaylist from prev video
	
	//|| document.querySelector('ytd-playlist-panel-renderer#playlist')
	//document.querySelector('ytd-playlist-panel-renderer#playlist').querySelectorAll('path[d="M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2ZM5 20.233V4h14v16.233l-6.485-3.89-.515-.309-.515.309L5 20.233Z"]')
	
	//document.querySelectorAll('tp-yt-iron-dropdown')
	//div.ytContextualSheetLayoutContentContainer
    //yt-list-view-model
	
	var elements=Array.from(document.querySelectorAll('tp-yt-iron-dropdown')).filter((x)=>x.querySelector('div.ytContextualSheetLayoutContentContainer'));
	
	if (elements.length==0) {
		return false;
	}
	
	//
	function unchecks(){
		elements[0].querySelectorAll('path[d="M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2Z"]').forEach(function(x){
			var p0=x.parentElement;
			var p1=p0 && p0.parentElement;
			p1.click();
		});
		
		//elements[0].querySelectorAll('path[d="M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2ZM5 20.233V4h14v16.233l-6.485-3.89-.515-.309-.515.309L5 20.233Z"]').forEach(x=>x.click());
	}
	
	unchecks();
	setTimeout(unchecks,500);
	setTimeout(unchecks,1000);
	setTimeout(unchecks,2000);
	
	//
	return true;
}

function try_uncheck_playlists_old() {
    var element=document.querySelector('div.ytd-add-to-playlist-renderer#playlists');
    
    if(!element) {
		return false;
	}
	
	//
	function unchecks(){
		element.querySelectorAll('[aria-checked="true"]').forEach(x=>x.click());
	}
	
	unchecks();
	setTimeout(unchecks,500);
	setTimeout(unchecks,1000);
	setTimeout(unchecks,2000);

	//
	return true;
}

function unplaylist() {
    click_playlist();
    
    run_timer(try_close_playlist);
    run_timer(try_uncheck_playlists);
}

function like() {
	//old
    var b = document.querySelector('.animated-like-toggle-button button') 
        || document.querySelector('#segmented-like-button button')
        || document.querySelector('[title="I like this"]')
		;
	
	//new
	if(!b) {
		b = document.querySelector('like-button-view-model');
		b = b && b.querySelector('button');
	}
	
	//
    if (b && b.getAttribute('aria-pressed') == 'false') { 
		b.click(); 
	}
}

function createAttachButton(element,name,onclick,icon,icon_x,icon_y,icon_w,icon_h,w,h) {
	let id='YT_UNPLAYLIST_'+name.toUpperCase();
	
    if(document.querySelector('#'+id)) {
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
    svg.classList.add('playerButton');
    button.classList.add('ytp-button');
    button.classList.add('ytp-efyt-button');
    button.setAttribute('id',id);
    button.setAttribute('title',name);
	
	button.style.display="flex";
	button.style.alignItems="center"; //vert
	button.style.justifyContent ="center";//hori
	
	//svg.style.display="flex";
	//svg.style.alignItems="center"; //vert
	//svg.style.justifyContent ="center"; //hori
	
    //button.style.width = "auto";
    ////button.style.width = "100%";
    ////button.style.height = "auto";
    //button.style.height = "100%";
            
    //svg.style.width = "auto";
    //svg.style.width = "100%";
    //svg.style.height = "auto";
    //svg.style.height = "100%";
	//svg.style.objectFit = 'contain';
	//svg.style.objectFit = 'cover';
	
	//svg.style.width = icon_w;
	//svg.style.height = icon_h;
	
    svg.classList.add('playerButtonImage');
    svg.setAttributeNS(null,'preserveAspectRatio','xMidYMid meet'); //xMinYMin meet   //xMidYMid slice
    svg.setAttribute('viewBox', icon_x+' '+icon_y+ ' '+icon_w+ ' '+ icon_h);
    //svg.setAttribute('viewBox', 0+' '+0+ ' '+30+ ' '+ 30);
	svg.fill="none"
	svg.style.width = w;
	svg.style.height = h;
	
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

function create_attach_bar() {
	var element=document.querySelector(".ytp-right-controls");
	
	if(!element) {
		return false;
	}
	
	// yqnn.github.io/svg-path-editor
	let size1=26;
	let size2=32;
	
	createAttachButton(element,"Like",function(){like();unplaylist();},
		//"m2 10 3-10 3 10-8-6h10Z",
		//"m 2 10 l 3 -10 l 3 10 l -8 -6 h 10 Z",
		"M 2 10 L 5 0 L 8 10 L 0 4 H 10 Z",
		//-4,-5,18,20,
		//-5,-5,5,5,
		0,0,10,10,
		size1,size1
	);
	
	createAttachButton(element,"Unplaylist",unplaylist,
		//"M10 4h10v2h-10ZM0 0h12v1h-12ZM0 4h8v1h-8ZM0 8h8v1h-8Z",
		//"M 5 4 h 10 v 2 h -10 Z M 0 0 h 12 v 1 h -12 Z M 5 4 h 8 v 1 h -8 Z M 0 8 h 8 v 1 h -8 Z",
		"M 10 4 H 20 V 6 H 10 Z M 0 0 H 12 V 1 H 0 Z M 0 4 H 8 V 5 H 0 Z M 0 8 H 8 V 9 H 0 Z",
		//"M 10 7 H 20 V 9 H 10 Z M 0 3 H 12 V 4 H 0 Z M 0 7 H 8 V 8 H 0 Z M 0 11 H 8 V 12 H 0 Z",
		//-5,-10,30,30,
		0,0,20,10,
		//0,0,25,15,
		size2,size2
	);
	
	createAttachButton(element,"Playlist",click_playlist,
		//"M10 4h10v2h-10ZM0 0h12v1h-12ZM0 4h8v1h-8ZM0 8h8v1h-8ZM14 0h2v10h-2Z",
		"M 10 4 H 20 V 6 H 10 Z M 0 0 H 12 V 1 H 0 Z M 0 4 H 8 V 5 H 0 Z M 0 8 H 8 V 9 H 0 Z M 14 0 H 16 V 10 H 14 Z",
		//"M 10 7 H 20 V 9 H 10 Z M 0 3 H 12 V 4 H 0 Z M 0 7 H 8 V 8 H 0 Z M 0 11 H 8 V 12 H 0 Z M 14 3 H 16 V 13 H 14 Z",
		
		//-5,-10,30,30,
		0,0,20,10,
		//0,0,25,15,
		size2,size2
	);
	
	return true;
}

function go() {
    if(!location.pathname.startsWith('/watch')) {
        return;
    }

	run_timer(create_attach_bar);
}

document.addEventListener('yt-navigate-finish', go);
go();

//})();

