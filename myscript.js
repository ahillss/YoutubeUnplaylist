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
    
    function createButton() {
        var element = document.createElement("button");
        element.id = "UNPLAYLIST";
        element.innerHTML = "UNPLAYLIST";
        element.style.backgroundColor = "transparent";
        element.style.border = "none";
        element.onclick = unplaylist;
        return element;
    }

    function go() {
        if(!location.pathname.startsWith('/watch')) {
            return;
        }
        
        var checkExist = setInterval(() => {
            var m = document.querySelector("#menu-container");
            
            if (m) {                
                clearInterval(checkExist);
                
                if(!document.getElementById("UNPLAYLIST")) {
                    //m.querySelector("#top-level-buttons-computed").appendChild(createButton());
                    m.querySelector("#menu").childNodes[0].appendChild(createButton());
                }
            }
        }, 1000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();