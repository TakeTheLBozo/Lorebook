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
    document.querySelectorAll(".screen").forEach((s) => {
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

  // ===============================
  // BOOK SYSTEM (CLEAN VERSION)
  // ===============================

  const bookData = {
    about: {
      title: "I. ABOUT",
      sections: [
        {
          title: "What is the Lorebook?",
          content: `
                <p>The Lorebook serves as an extension of the archive inside the creator's mind.</p>
                <p>It records the evolution of the main character throughout the years.</p>
                `,
        },
      ],
    },

    beginning: {
      title: "II. THE BEGINNING",
      sections: [
        {
          title: "The Origin",
          content: `
                <p>Magic? There was no such thing back then.</p>
                <p>Only a kid with a dream.</p>
                `,
        },
        {
          title: "01: Jasmine",
          content: `
                <p>Jasmine was perfect. Too perfect.</p>
                <p>And perfection leaves no room for growth.</p>
                `,
        },
      ],
    },
  };

  // ---------- STATE ----------
  let currentChapterIndex = null;
  let currentSectionIndex = null; // null = viewing section list

  const chapterKeys = Object.keys(bookData);

  const leftPage = document.getElementById("leftPage");
  const rightPage = document.getElementById("rightPage");

  // ==========================================
  // TABLE OF CONTENTS
  // ==========================================
  function renderTOC() {
    currentChapterIndex = null;
    currentSectionIndex = null;

    leftPage.innerHTML = `<h2 class="page-title">Table of Contents</h2>`;
    rightPage.innerHTML = `<h2 class="page-title">Select a Chapter</h2>`;

    chapterKeys.forEach((key, index) => {
      const btn = document.createElement("button");
      btn.className = "chapter-btn";
      btn.dataset.chapterIndex = index;
      btn.textContent = bookData[key].title;
      leftPage.appendChild(btn);
    });

    backtoTOC.style.display = "none";
  }

  // ==========================================
  // SHOW CHAPTER (SECTION LIST)
  // ==========================================
  function renderChapter(chapterIndex) {
    currentChapterIndex = chapterIndex;
    currentSectionIndex = null;

    const chapterKey = chapterKeys[chapterIndex];
    const chapter = bookData[chapterKey];

    leftPage.innerHTML = `<h2 class="page-title">${chapter.title}</h2>`;
    rightPage.innerHTML = "";

    chapter.sections.forEach((section, index) => {
      const btn = document.createElement("button");
      btn.className = "section-btn";
      btn.dataset.sectionIndex = index;
      btn.textContent = "• " + section.title;
      rightPage.appendChild(btn);
    });

    backtoTOC.style.display = "block"; // SHOW BUTTON HERE
  }

  // ==========================================
  // SHOW SECTION CONTENT
  // ==========================================
 function renderSection(sectionIndex) {

    currentSectionIndex = sectionIndex;

    const chapterKey = chapterKeys[currentChapterIndex];
    const chapter = bookData[chapterKey];
    const section = chapter.sections[sectionIndex];

    leftPage.innerHTML = `<h2 class="page-title">${section.title}</h2>`;
    rightPage.innerHTML = "";

    const contentWrapper = document.createElement("div");
    contentWrapper.innerHTML = section.content;

    leftPage.appendChild(contentWrapper);
}

  // ==========================================
  // NAVIGATION
  // ==========================================
  function goNext() {
    if (currentChapterIndex === null) return;

    const chapterKey = chapterKeys[currentChapterIndex];
    const sections = bookData[chapterKey].sections;

    // If viewing section list → open first section
    if (currentSectionIndex === null) {
      renderSection(0);
      return;
    }

    // Next section
    if (currentSectionIndex < sections.length - 1) {
      renderSection(currentSectionIndex + 1);
      return;
    }

    // Next chapter
    if (currentChapterIndex < chapterKeys.length - 1) {
      renderChapter(currentChapterIndex + 1);
    }
  }

  function goPrevious() {
    if (currentChapterIndex === null) return;

    // If viewing section list → go back to TOC
    if (currentSectionIndex === null) {
      renderTOC();
      return;
    }

    // Previous section
    if (currentSectionIndex > 0) {
      renderSection(currentSectionIndex - 1);
      return;
    }

    // Go to previous chapter last section
    if (currentChapterIndex > 0) {
      const prevChapterIndex = currentChapterIndex - 1;
      const prevChapterKey = chapterKeys[prevChapterIndex];
      const prevSections = bookData[prevChapterKey].sections;

      currentChapterIndex = prevChapterIndex;
      renderSection(prevSections.length - 1);
    }
  }

  // ==========================================
  // CLICK HANDLING (DELEGATION)
  // ==========================================
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("chapter-btn")) {
      playClick();
      renderChapter(parseInt(e.target.dataset.chapterIndex));
    }

    if (e.target.classList.contains("section-btn")) {
      playClick();
      renderSection(parseInt(e.target.dataset.sectionIndex));
    }
  });

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================
  document.addEventListener("keydown", (e) => {
    if (!bookUI.classList.contains("visible")) return;

    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrevious();
  });

  // ==========================================
  // OPEN / CLOSE
  // ==========================================
  book.addEventListener("click", () => {
    playClick();
    bookUI.classList.add("visible");
    renderTOC();
  });

  exitBook.addEventListener("click", () => {
    playClick();
    bookUI.classList.remove("visible");
  });

  backtoTOC.addEventListener("click", () => {
    playClick();
    renderTOC();
  });

  /*FLOATING WINDOWS (COMPUTER APPS)*/
  document.querySelectorAll(".desktop-icon").forEach((icon) => {
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
