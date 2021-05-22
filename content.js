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

    document.body.addEventListener("click", createInfoCart);
    for (const a of links) {
        a.addEventListener("click", disableLinks);
    }

    function disableLinks(event) {
        event.preventDefault();
    }

    function createInfoCart(e) {
        if (e.target == exitBtn) {
            return;
        }

        const target = window.getComputedStyle(e.target);
        const font = target.fontFamily;
        let firstFont = font.substring(0, font.indexOf(","));
        // When there is only one font the "," does not excist in the font family name, so we set the content to the whole font name (with fallbacks)
        if (!firstFont) firstFont = font;

        const card = document.createElement("div");
        card.classList.add("infoCard");
        document.querySelector("html").appendChild(card);
        card.innerHTML = `
            <p>${firstFont} - ${target.fontWeight}</p>
            <h4>Family</h4>
            <p>${font}</p>
            <h4>Style</h4>
            <p>${target.fontStyle}</p>
            <h4>Weight</h4>
            <p>${target.fontWeight}</p>
            <h4>Size</h4>
            <p>${target.fontSize}</p>
            <h4>Line Height</h4>
            <p>${target.lineHeight}</p>
            <h4>Color</h4>
            <p>${target.color}<span class="background-color" style="background-color:${target.color}"></span></p>
            <span class='crazyFontsCardExitBtn'>&times;</span>
        `;
        card.style.left = e.pageX + "px";
        card.style.top = e.pageY + "px";

        const cardExitBtn = card.querySelector(".crazyFontsCardExitBtn");

        cardExitBtn.addEventListener("click", closeCrazyFontsMenu);

        function closeCrazyFontsMenu(e) {
            const element = e.target.parentElement;
            element.remove();
        }
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
