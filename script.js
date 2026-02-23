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

    // ALL BOOK LOGIC HERE

    const sectionsContainer = document.getElementById("sectionsContainer");
    const rightPageTitle = document.querySelector(".right-page .page-title");

    /* BOOK OPEN */
    book.addEventListener("click", () => {
        playClick();
        bookUI.classList.add("visible");
        resetBook();
    });

    /* BOOK CLOSE */
    exitBook.addEventListener("click", () => {
        playClick();
        bookUI.classList.remove("visible");
    });

    /* BACK TO TOC */
    backtoTOC.addEventListener("click", () => {
        playClick();
        resetBook();
    });

    function resetBook() {
        sectionsContainer.innerHTML = "";
        rightPageTitle.textContent = "Select a Chapter";
        backtoTOC.style.display = "none";
    }

    const bookData = {
    about: {
        title: "I. ABOUT",
        sections: [
            {title: "What is the Lorebook?",
                content: `
                <p>The Lorebook serves as an extension of the archive inside the creator's mind.</p>
                <p>It also serves as a record for the evolution of the main character throughout the years</p>
                `
            },
        ]
    },

    beginning: {
        title: "II. THE BEGINNING",
        sections: [
            {title: "Where did it all began?",
                content: `
                <p>It all started with a boy who longed for...</p>
                `
            },
        ]
    },

    document.querySelectorAll(".chapter-btn").forEach(button => {
        button.addEventListener("click", () => {

            playClick();
            const chapter = button.dataset.chapter;

            if (!chapters[chapter]) return;

            sectionsContainer.innerHTML = "";
            rightPageTitle.textContent = button.textContent;

            chapters[chapter].forEach(section => {

                const sectionBtn = document.createElement("button");
                sectionBtn.classList.add("section-btn");
                sectionBtn.textContent = "• " + section;

                sectionBtn.addEventListener("click", () => {
                    playClick();
                    showSectionContent(section);
                });

                sectionsContainer.appendChild(sectionBtn);
            });

            backtoTOC.style.display = "block";
        });
    // END OF BOOK LOGIC

    function showSectionContent(section) {
        sectionsContainer.innerHTML = `
            <h3>${section}</h3>
            <p style="font-size:14px;">
                Content for "${section}" goes here.
            </p>
        `;
    }

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
