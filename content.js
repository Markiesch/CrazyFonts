chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage() {
  const htmlEl = document.querySelector("html");

  addEventListener("mousemove", updateCursor);
  document.body.addEventListener("click", createInfoCard);

  document.body.classList.add("crazyFontsActive");

  const cursor = document.createElement("p");
  cursor.classList.add("crazyFontsCursor");
  htmlEl.appendChild(cursor);

  const exitBtn = document.createElement("p");
  exitBtn.classList.add("exitButton");
  exitBtn.innerText = "Exit CrazyFonts";
  htmlEl.appendChild(exitBtn);
  exitBtn.addEventListener("click", closeMenu);

  const links = document.querySelectorAll("a");
  for (const link of links) link.addEventListener("click", disableLink);
  function disableLink(event) {
    event.preventDefault();
  }

  function updateCursor(event) {
    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";
    cursor.innerText = getFirstFont(event.target);
  }

  function getFont(target) {
    return window.getComputedStyle(target).fontFamily;
  }

  function getFirstFont(target) {
    const font = window.getComputedStyle(target).fontFamily;
    const firstFont = font.substring(0, font.indexOf(","));
    return firstFont || font;
  }

  function createInfoCard(event) {
    const target = window.getComputedStyle(event.target);

    const infoCard = document.createElement("div");
    htmlEl.appendChild(infoCard);
    infoCard.classList.add("infoCard");
    infoCard.style.left = event.pageX + "px";
    infoCard.style.top = event.pageY + "px";

    infoCard.innerHTML += `
    <div class="crazyFontsHeader">
      <p class="crazyFontsFFirstFont">${getFirstFont(event.target)} - ${target.fontWeight}</p>
      <span class="crazyFontsCardExitBtn">&times;</span>
    </div>
    <div class="crazyFontsInformation">
      <div>
        <div>
          <h4>Family</h4>
          <p class="crazyFontsFFont">${getFont(event.target)}</p>
        </div>
      </div>
      <div>
        <div>
          <h4>Style</h4>
          <p class="crazyFontsFStyle">${target.fontStyle}</p>
        </div>
        <div>
          <h4>Weight</h4>
          <p class="crazyFontsFWeight">${target.fontWeight}</p>
        </div>
        <div></div>
      </div>
    
      <div>
        <div>
          <h4>Size</h4>
          <p class="crazyFontsFSize">${target.fontSize}</p>
        </div>
        <div>
          <h4>Line Height</h4>
          <p class="crazyFontsFHeight">${target.lineHeight}</p>
        </div>
    
        <div>
          <h4>Color</h4>
          <p class="crazyFontsFColor">${target.color}<span class="background-color" style="background-color:${target.color}"></span></p>
        </div>
      </div>
      <div class="message"></div>
    </div>`;

    infoCard.querySelector(".crazyFontsCardExitBtn").addEventListener("click", closeCrazyFontsMenu);

    const message = infoCard.querySelector(".message");

    infoCard.querySelector(".crazyFontsFFirstFont").addEventListener("click", () => copyText(getFirstFont(event.target), message));
    infoCard.querySelector(".crazyFontsFFont").addEventListener("click", () => copyText(getFont(event.target), message));
    infoCard.querySelector(".crazyFontsFStyle").addEventListener("click", () => copyText(target.fontStyle, message));
    infoCard.querySelector(".crazyFontsFWeight").addEventListener("click", () => copyText(target.fontWeight, message));
    infoCard.querySelector(".crazyFontsFSize").addEventListener("click", () => copyText(target.fontSize, message));
    infoCard.querySelector(".crazyFontsFHeight").addEventListener("click", () => copyText(target.lineHeight, message));
    infoCard.querySelector(".crazyFontsFColor").addEventListener("click", () => copyText(target.color, message));
  }

  function copyText(text, message) {
    try {
      navigator.clipboard.writeText(text);
      message.innerHTML = "Succesfully copied!";
    } catch {
      console.warn("CrazyFonts > Failed to copy to clipboard, using propt instead...");
      window.prompt("Copy to clipboard: Ctrl + C, Enter", text);
    }
  }

  document.addEventListener("keydown", exitCrazyFontsByKey);
  function exitCrazyFontsByKey(event) {
    if (event.key == "Escape") closeMenu();
  }

  function closeCrazyFontsMenu(event) {
    const element = event.target.parentElement.parentElement;
    element.remove();
  }

  function closeMenu() {
    exitBtn.removeEventListener("click", closeMenu);
    document.removeEventListener("mousemove", updateCursor);
    document.body.removeEventListener("click", createInfoCard);
    document.removeEventListener("keydown", exitCrazyFontsByKey);
    document.body.classList.remove("crazyFontsActive");

    cursor.remove();
    exitBtn.remove();
    const cards = document.querySelectorAll(".infoCard");
    for (const card of cards) card.remove();
  }
}
