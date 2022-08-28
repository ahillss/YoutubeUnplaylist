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
        
        b.innerHTML = '<svg width="24" height="24" viewBox="0 -12 24 36" preserveAspectRatio="xMidYMid slice"><path d="M22 13h-10v-2h10V13zM14 7H2v1h12V7zM2 12h8v-1H2V12zM2 16h8v-1H2V16z"></path></svg>';
        
        //b.innerText="UNPL";
        
        m.append(b);
    }
    
    function go() {
        if(!location.pathname.startsWith('/watch')) {
            return;
        }
        
        var checkExist = setInterval(function() {
            var a = document.querySelector("#actions-inner");
            var m = a.querySelector("#top-level-buttons-computed");
            
            if(m) {
                clearInterval(checkExist);
                createAttachButton(m.parentNode);
            }
            
        }, 1000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();