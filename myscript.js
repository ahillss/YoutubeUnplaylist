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
        var b = document.createElement("button");
        b.id = "UNPLAYLIST";
        //b.innerHTML = "UNPL";
        b.innerText = "UNPL";
        b.title="UNPLAYLIST";
        b.style.backgroundColor = "transparent";
        b.style.border = "none";
        b.onclick = unplaylist;
        b.setAttribute("class", "style-scope ytd-button-renderer style-default size-default");

        m.appendChild(b);
        //m.prepend(b);
    }
    
    function go() {
        if(!location.pathname.startsWith('/watch')) {
            return;
        }
        
        var checkExist = setInterval(function() {
            var a = document.querySelector("#actions-inner");
            //var m = a.querySelector("#flexible-item-buttons");
            var m = a.querySelector("#top-level-buttons-computed");
            
            if (m) {                
                clearInterval(checkExist);
                createAttachButton(m);
            }
        }, 1000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();