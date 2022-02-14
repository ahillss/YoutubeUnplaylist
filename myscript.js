(()=>{
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
        if(document.getElementById("UNPLAYLIST")) {
            return;
        }
        
        var b = document.createElement("button");
        b.id = "UNPLAYLIST";
        //b.innerHTML = "UNPL";
        b.innerText = "UNPL";
        b.title="UNPLAYLIST";
        b.style.backgroundColor = "transparent";
        b.style.border = "none";
        b.onclick = unplaylist;

        //m.querySelector("#top-level-buttons-computed").appendChild(b);
        m.querySelector("#menu").childNodes[0].appendChild(b);
    }

    function go() {
        if(!location.pathname.startsWith('/watch')) {
            return;
        }
        
        var checkExist = setInterval(() => {
            var m = document.querySelector("#menu-container");
            
            if (m) {                
                clearInterval(checkExist);
                createAttachButton(m);
            }
        }, 1000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();