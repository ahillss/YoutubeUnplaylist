(()=>{
    function unplaylist() {
        document.querySelector('[aria-label="Save to playlist"]').click();

        var checkExist = setInterval(() => {
            var btn = document.querySelector('.ytd-add-to-playlist-renderer [aria-label="Cancel"]');
            var iron = document.querySelector("tp-yt-iron-overlay-backdrop");
            
            if (btn && iron) {
                clearInterval(checkExist);
                btn.click();
                setTimeout(() => { document.querySelectorAll('[aria-checked="true"]').forEach((x) => {x.click();}); }, 1000);
            }
        }, 100);
    }

    function go() {
        if(!location.pathname.startsWith('/watch')) {
            return;
        }
        
        var checkExist = setInterval(() => {
            var m = document.querySelector("#menu-container");
            
            if (m) {
                if(!document.getElementById("UNPLAYLIST")) {
                    var element = document.createElement("button");
                    
                    element.id = "UNPLAYLIST";
                    element.innerHTML = "UNPLAYLIST";
                    element.style.backgroundColor = "transparent";
                    element.style.border = "none";
                    element.onclick = unplaylist;

                    //m.querySelector("#top-level-buttons-computed").appendChild(element);
                    m.querySelector("#menu").childNodes[0].appendChild(element);
                }
                
                clearInterval(checkExist);
            }
        }, 1000);
    }

    go();
    document.addEventListener('yt-navigate-finish', go);
})();