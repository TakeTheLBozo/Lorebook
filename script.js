document.addEventListener("DOMContentLoaded", () => {

    /*ELEMENT REFERENCES*/
    const landingPage = document.getElementById("landingpage");
    const homeScreen = document.getElementById("homescreen");
    const bookUI = document.getElementById("bookUI");
    const startBtn = document.getElementById("startbtn");
    const book = document.getElementById("book");
    const exitBook = document.getElementById("exitBook");
    const backtoTOC = document.getElementById("backtoTOC");
    const toc = document.getElementById("toc");
    const chapterContent = document.getElementById("ChapterContent");
    const windowTemplate = document.getElementById("windowTemplate");

    /*SOUND SYSTEM*/
    const clickSound = new Audio("Assets/Clicky.mp3");
    clickSound.volume = 0.5;

    function playClick() {
        clickSound.currentTime = 0;
        clickSound.play();
    }

    /*SCREEN SWITCHING*/
    function showScreen(screen) {
        document.querySelectorAll(".screen").forEach(s => {
            s.classList.remove("active");
        });
        screen.classList.add("active");
    }

    /*START BUTTON - Go to home screen*/
   startBtn.addEventListener("click", () => {
    playClick();

    bookUI.classList.remove("visible"); 
    landingPage.style.opacity = "0";

    setTimeout(() => {
        showScreen(homeScreen);
    }, 600);
});

    /*BOOK LOGIC*/
book.addEventListener("click", () => {
    playClick();
    bookUI.classList.add("visible"); // show overlay
    showTOC();
});

exitBook.addEventListener("click", () => {
    playClick();
    bookUI.classList.remove("visible"); // hide overlay
});

backtoTOC.addEventListener("click", () => {
    playClick();
    showTOC();
});

function showTOC() {
    toc.style.display = "block";
    chapterContent.innerHTML = "";
}

    /*CHAPTER CONTENT DATA*/
    const chapters = {
        about: "<h2>About</h2><p>What is the Lorebook?</p>",
        beginning: "<h2>The Beginning</h2><p>Where did it all began?</p>",
        bh: "<h2>Blackened Heart</h2><p>The first spark of magic was never that of color</p>",
        bic: "<h2>Bathed in Color</h2><p>When darkness sought the light</p>",
        tpg: "<h2>The Perfect Gem</h2><p>There's no such thing as perfect, those who believe they are only deepens those cracks</p>",
        change: "<h2>Change</h2><p>It's a play of annihilation, when power surges exponentially higher, would you need anything when you've become a god?</p>",
        tlg: "<h2>The Looking Glass</h2><p>A mirror sees, a mirror reflects, but one thing a mirror shouldn,t do, is to deflect.</p>"
    };

    document.querySelectorAll(".chapter-btn").forEach(button => {
        button.addEventListener("click", () => {
            playClick();
            const chapter = button.dataset.chapter;
            toc.style.display = "none";
            chapterContent.innerHTML = chapters[chapter] || "<p>Coming soon...</p>";
        });
    });

    /*FLOATING WINDOWS (COMPUTER APPS)*/
    document.querySelectorAll(".desktop-icon").forEach(icon => {
        icon.addEventListener("click", () => {
            playClick();
            createWindow(icon.dataset.window);
        });
    });

    function createWindow(type) {
        const newWindow = windowTemplate.cloneNode(true);
        newWindow.classList.remove("hidden");
        newWindow.removeAttribute("id");

        const title = newWindow.querySelector(".window-title");
        title.innerText = type.toUpperCase();

        // Add content
        const body = document.createElement("div");
        body.style.padding = "10px";
        body.innerHTML = "Hi";
        newWindow.appendChild(body);

        // Close button
        newWindow.querySelector(".closeWindow").addEventListener("click", () => {
            newWindow.remove();
        });

        document.body.appendChild(newWindow);
    }

});
