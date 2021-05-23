chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage() {
    const createdCards = [];

    const htmlEl = document.querySelector("html");
    document.body.classList.add("crazyFontsActive");

    const cursor = document.createElement("p");
    cursor.classList.add("crazyFontsCursor");
    htmlEl.appendChild(cursor);

    document.addEventListener("mousemove", updateCursor);

    function updateCursor(e) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        cursor.innerText = getFont(e);
    }

    function getFont(e) {
        const font = window.getComputedStyle(e.target).fontFamily;
        let firstFont = font.substring(0, font.indexOf(","));
        // When there is only one font the "," does not excist in the font family name, so we set the content to the whole font name (with fallbacks)
        if (!firstFont) firstFont = font;
        return firstFont;
    }

    const links = document.querySelectorAll("a");

    document.body.addEventListener("click", createInfoCard);
    for (const link of links) {
        link.addEventListener("click", disableLinks);
    }

    function disableLinks(e) {
        e.preventDefault();
    }

    function createInfoCard(e) {
        if (e.target == exitBtn) return;

        if (createdCards.length >= 3) {
            createdCards[0].remove();
            createdCards.shift();
        }

        const target = window.getComputedStyle(e.target);
        const font = target.fontFamily;
        let firstFont = font.substring(0, font.indexOf(","));
        // When there is only one font the "," does not excist in the font family name,
        // so we set the content to the whole font name (with fallbacks)
        if (!firstFont) firstFont = font;

        const card = document.createElement("div");
        createdCards.push(card);
        card.classList.add("infoCard");
        htmlEl.appendChild(card);
        card.style.left = e.pageX + "px";
        card.style.top = e.pageY + "px";
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

        const cardExitBtn = card.querySelector(".crazyFontsCardExitBtn");
        cardExitBtn.addEventListener("click", closeCrazyFontsMenu);

        function closeCrazyFontsMenu(e) {
            const element = e.target.parentElement;
            element.remove();
        }
    }

    document.addEventListener("keydown", exitCrazyFontsByKey);
    function exitCrazyFontsByKey(e) {
        if (e.key == "Escape") closeMenu();
    }

    const exitBtn = document.createElement("p");
    exitBtn.classList.add("exitButton");
    exitBtn.innerText = "Exit CrazyFonts";
    htmlEl.appendChild(exitBtn);
    exitBtn.addEventListener("click", closeMenu);

    function closeMenu() {
        // Remove all Eventlisteners created by CrazyFonts
        exitBtn.removeEventListener("click", closeMenu);
        document.removeEventListener("mousemove", updateCursor);
        document.body.removeEventListener("click", createInfoCard);
        document.removeEventListener("keydown", exitCrazyFontsByKey);
        document.body.classList.remove("crazyFontsActive");

        // Remove ELements created by CrazyFonts
        cursor.remove();
        exitBtn.remove();
        const cards = document.querySelectorAll(".infoCard");
        for (const card of cards) card.remove();
    }
}
