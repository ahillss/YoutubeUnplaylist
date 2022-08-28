(function(){
    function unplaylist() {
        document.querySelector('[aria-label="Save to playlist"]').click();

        var checkExist = setInterval(() => {
            var btn = document.querySelector('.ytd-add-to-playlist-renderer [aria-label="Cancel"]');
            var iron = document.querySelector("tp-yt-iron-overlay-backdrop");
            
            if (btn && iron) {
                clearInterval(checkExist);
                btn.click();
                document.querySelectorAll('[aria-checked="true"]').forEach(x => x.click());
            }
        }, 100);
    }
         
    function createAttachButton(m) {
        if(m.querySelector("#UNPLAYLIST")) {return;}
        
        var b = document.createElement("button");
        
        b.id = "UNPLAYLIST";
        b.title="UNPLAYLIST";
        b.style.backgroundColor = "transparent";
        b.style.border = "none";
        b.onclick = unplaylist;
        
        b.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid slice"><path d="M22 13h-10v-2h10V13zM14 7H2v1h12V7zM2 12h8v-1H2V12zM2 16h8v-1H2V16z"></path></svg>';
        //b.innerText="UNPL";
        
        m.appendChild(b);
        
        //
        let tmp=document.createTextNode("Unsave");
        b.appendChild(tmp);
        setTimeout(function(){b.removeChild(tmp);}, 2000);

    }
    
    function go() {
        if(!location.pathname.startsWith('/watch')) {
            return;
        }
        
        var checkExist = setInterval(function() {
            //more than one for some reason ...
            var ms = document.querySelectorAll("div#top-level-buttons-computed");
            
            if (ms.length>0) {
                for(var i=0;i<ms.length;i++) {
                    var m=ms[i];
                    m=m && m.parentNode;
                    
                    clearInterval(checkExist);
                    createAttachButton(m);
                }
            }
        }, 1000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();