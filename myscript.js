(function(){
    //https://yqnn.github.io/svg-path-editor/
    
    //var like_path="m79,392 127-392 127,392-333-242h412";
    //var unplaylist_path="M12 12h10v3h-10ZM2 7h11v2h-11ZM2 12h8v2h-8ZM2 17h8v2h-8Z";
    //var unplaylist_like_path="m22 12h-10v3h10zm-8-5h-12v2h12zm-12 5h8v2h-8zm0 5h8v2h-8z";
    
    var like_path="M3.95 23l6.35-19.6 6.35 19.6-16.65-12.1h20.6Z";
    var unplaylist_path="M14 12h13v3h-13ZM2 7h13v2h-13ZM2 12h10v2h-10ZM2 17h10v2h-10Z";
    var playlist_path="M14 12h13v3h-13ZM19 7h3v5h-3ZM19 15h3v5h-3ZM2 7h13v2h-13ZM2 12h10v2h-10ZM2 17h10v2h-10Z";
    
    function unplaylist() {
        document.querySelector('[aria-label="Save to playlist"]').click();

        var checkExist = setInterval(() => {
            var btn = document.querySelector('.ytd-add-to-playlist-renderer [aria-label="Cancel"]');
            var iron = document.querySelector('tp-yt-iron-overlay-backdrop');
            
            if (btn && iron) {
                clearInterval(checkExist);
                btn.click();
                document.querySelectorAll('[aria-checked="true"]').forEach(x => x.click());
            }
        }, 100);
    }
    
    function like() {
        var b = document.querySelector('.animated-like-toggle-button button') || document.querySelector('#segmented-like-button button');
        
        if (b.getAttribute('aria-pressed') == 'false') {
            b.click();
        }
    }
    
    //function unplaylist_like() { unplaylist();  like(); }
    
    function playlist() {
        document.querySelector('[aria-label="Save to playlist"]').click(); unplaylist_like_path
    }
    
    function createAttachButton(element,name,onclick,icon) {
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
        button.onclick = onclick;
        button.setAttribute('id',"MY_"+name);
        button.setAttribute('title',name);
        
        //
        svg.classList.add('playerButtonImage');
        svg.setAttributeNS(null,'preserveAspectRatio','xMidYMid slice');
        
        //
        //svg.setAttributeNS(null,'width','24');
        //svg.setAttributeNS(null,'height','24');
        //svg.setAttribute('style', ' width: 100%; height: auto;');
        
        //
        path.setAttributeNS(null,'d',icon);
        path.setAttribute('style', 'fill: white;stroke:white;stroke-opacity=1');
    }
    
    function go() {
        if(!location.pathname.startsWith('/watch')) {
            return;
        }

        var checkExist = setInterval(function() {
            var element=document.querySelector(".ytp-right-controls");
            
            if(element) {
                clearInterval(checkExist);
                createAttachButton(element,"LIKE",like,like_path);
                //createAttachButton(element,"UNPLAYLIST_LIKE",unplaylist_like,unplaylist_like_path);
                createAttachButton(element,"UNPLAYLIST",unplaylist,unplaylist_path);
                createAttachButton(element,"PLAYLIST",playlist,playlist_path);
            }
        }, 1000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();

