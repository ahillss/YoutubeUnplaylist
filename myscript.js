(function(){
    
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
        if (b.getAttribute('aria-pressed') == 'false') { b.click(); }
    }
    
    function playlist() {
        document.querySelector('[aria-label="Save to playlist"]').click();
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
        svg.style.height = "45%";        
        svg.classList.add('playerButtonImage');
        svg.setAttributeNS(null,'preserveAspectRatio','xMidYMid slice'); //xMinYMin meet
        svg.setAttribute('viewBox', icon_x+' '+icon_y+ ' '+icon_w+ ' '+ icon_h);
        svg.style.border="1px solid transparent";
        //svg.style.border="1px solid white";
        
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
            svg.style.border="1px solid white";
            setTimeout(function(){ svg.style.border="1px solid transparent"; }, 100);
        };
    }
    
    function go() {
        if(!location.pathname.startsWith('/watch')) {
            return;
        }

        var checkExist = setInterval(function() {
            var element=document.querySelector(".ytp-right-controls");
            
            if(element) {
                clearInterval(checkExist);
                
                // yqnn.github.io/svg-path-editor
                
                var w=6;
                var x=0;//-w*0.5;
                var h=6;
                var y=-h*0.5;
                
                createAttachButton(element,"Like",like,
                    "m2 10 3-10 3 10-8-6h10Z",
                    x,0,10+w,10
                );
                
                createAttachButton(element,"Unplaylist",unplaylist,
                    "M10 4h10v2h-10ZM0 0h12v1h-12ZM0 4h8v1h-8ZM0 8h8v1h-8Z",
                    x,y,20+w,10+h
                );
                
                createAttachButton(element,"Playlist",playlist,
                    "M10 4h10v2h-10ZM0 0h12v1h-12ZM0 4h8v1h-8ZM0 8h8v1h-8ZM14 0h2v10h-2Z",
                    x,y,20+w,10+h
                );
                
            }
        }, 1000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();

