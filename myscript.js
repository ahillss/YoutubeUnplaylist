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
        
        var b = document.createElement("span");
        
        b.id = "UNPLAYLIST";
        b.title="UNPLAYLIST";
        b.onclick = unplaylist;
                
        b.innerHTML = '<svg width="24" height="24" viewBox="0 -6 24 24" preserveAspectRatio="xMidYMin slice"><path d="m22 13h-10v-2h10v2zm-8-6h-12v1h12v-1zm-12 5h8v-1h-8v1zm0 4h8v-1h-8v1z"></path></svg>';
        
        //b.innerText="UNPL";
        
        m.append(b);
    }
    
    function go() {
        if(!location.pathname.startsWith('/watch')) {
            return;
        }

        var checkExist = setInterval(function() {
            var a = document.querySelector("div#actions-inner,div#info-contents");
            var m = a && a.querySelector("#top-level-buttons-computed");
            
            if(m) {
                clearInterval(checkExist);
                createAttachButton(m.parentNode);
            }
            
        }, 1000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();