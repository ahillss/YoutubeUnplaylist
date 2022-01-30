function unplaylist() {
    document.querySelector('[aria-label="Save to playlist"]').click();

    var checkExist1 = setInterval(() => {
        var m = document.querySelector('.ytd-add-to-playlist-renderer [aria-label="Cancel"]');
        
        if (m) {
            clearInterval(checkExist1);
                    
            setTimeout(() => {
                document.querySelector('.ytd-add-to-playlist-renderer [aria-label="Cancel"]').click();
                document.querySelectorAll('[aria-checked="true"]').forEach((x) => {x.click();});
            }, 200);
        }
    }, 100);
}

var checkExist2 = setInterval(() => {
    var m = document.querySelector("#menu-container");
    
    if (m) {
        var element = document.createElement("button");
        
        element.innerHTML = "UNPLAYLIST";
        element.style.backgroundColor = "transparent";
        element.style.border = "none";
        element.onclick = unplaylist;

        //m.querySelector("#top-level-buttons-computed").appendChild(element);
        m.querySelector("#menu").childNodes[0].appendChild(element);
        
        clearInterval(checkExist2);
    }
}, 1000);