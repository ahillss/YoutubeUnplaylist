(()=>{
    function unplaylist() {
        document.querySelector('[aria-label="Save to playlist"]').click();

        var checkExist = setInterval(() => {
            var m = document.querySelector('.ytd-add-to-playlist-renderer [aria-label="Cancel"]');
            
            if (m) {
                clearInterval(checkExist);
                        
                setTimeout(() => {
                    document.querySelector('.ytd-add-to-playlist-renderer [aria-label="Cancel"]').click();
                }, 200);

                setTimeout(() => {
                    document.querySelectorAll('[aria-checked="true"]').forEach((x) => {x.click();});
                }, 2000);
            }
        }, 100);
    }

    function doThing() {
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

    document.addEventListener('yt-navigate-finish', doThing);

    doThing();
})();