chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage() {
    const cursor = document.createElement("p");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    const exitBtn = document.createElement("p");
    exitBtn.classList.add("exitButton");
    exitBtn.innerText = "Exit EpicFont";
    document.body.appendChild(exitBtn);

    document.addEventListener("mousemove", getFont);

    function getFont(e) {
        const font = window.getComputedStyle(e.target).fontFamily;
        let firstFont = font.substring(0, font.indexOf(","));
        // When there is only one font the "," does not excist in the font family name, so we set the content to the whole font name (with fallbacks)
        if (!firstFont) firstFont = font;
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        cursor.innerText = firstFont;
    }

    const links = document.querySelectorAll("a");

    document.addEventListener("click", createInfoCart);
    for (const a of links) {
        a.addEventListener("click", disableLinks);
    }

    function disableLinks(event) {
        event.preventDefault();
    }

    function createInfoCart(e) {
        console.log(e);
        if (e.target == exitBtn) {
            return;
        }

        const target = window.getComputedStyle(e.target);
        const font = target.fontFamily;
        let firstFont = font.substring(0, font.indexOf(","));
        // When there is only one font the "," does not excist in the font family name, so we set the content to the whole font name (with fallbacks)
        if (!firstFont) firstFont = font;

        const card = document.createElement("p");
        card.classList.add("infoCard");
        document.body.appendChild(card);
        card.innerHTML = `${firstFont} - ${target.fontWeight}<br /><br /><span>Family</span><br />${font}<br /><br /><span>Style</span><br />${target.fontStyle}<br /><br /><span>Weight</span><br />${target.fontWeight}<br /><br /><span>Size</span><br />${target.fontSize}<br /><br /><span>Line Height</span><br />${target.lineHeight}<br /><br /><span>Color</span><br />${target.color}<span class="background-color" style="background-color:${target.color}"></span><br /><br />`;
        card.style.left = e.pageX + "px";
        card.style.top = e.pageY + "px";
    }

    exitBtn.addEventListener("click", closeMenu);

    function closeMenu() {
        exitBtn.remove();
        exitBtn.removeEventListener("click", closeMenu);
        document.removeEventListener("click", createInfoCart);
        cursor.remove();
        document.removeEventListener("mousemove", getFont);
        const cards = document.querySelectorAll(".infoCard");

        for (const card of cards) {
            card.remove();
        }
    }
}
