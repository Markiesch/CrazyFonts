chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage() {
    const cursor = document.createElement("p");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", getFont);

    function getFont(e) {
        const font = window.getComputedStyle(e.target).fontFamily;
        const firstFont = font.substring(0, font.indexOf(","));
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        cursor.innerText = firstFont;
    }

    document.addEventListener("click", createInfoCart);

    function createInfoCart(e) {
        console.log(e);
        if (e.target == exitBtn) {
            return;
        }

        const target = window.getComputedStyle(e.target);
        const font = target.fontFamily;
        const firstFont = font.substring(0, font.indexOf(","));

        const card = document.createElement("p");
        card.classList.add("infoCard");
        document.body.appendChild(card);
        card.innerHTML = `${firstFont} - ${target.fontWeight}<br /><br /><span>Family</span><br />${font}<br /><br /><span>Style</span><br />${target.fontStyle}<br /><br /><span>Weight</span><br />${target.fontWeight}<br /><br /><span>Size</span><br />${target.fontSize}<br /><br /><span>Line Height</span><br />${target.lineHeight}<br /><br /><span>Color</span><br />${target.color}<span class="background-color" style="background-color:${target.color}"></span><br /><br />`;
        card.style.left = e.pageX + "px";
        card.style.top = e.pageY + "px";
    }

    const exitBtn = document.createElement("p");
    exitBtn.classList.add("exitButton");
    exitBtn.innerText = "Exit EpicFont";
    document.body.appendChild(exitBtn);

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
