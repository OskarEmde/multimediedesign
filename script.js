// =========================================
// ELEMENTER
// =========================================

const menuButton =
    document.getElementById("menuButton");

const menuDropdown =
    document.getElementById("menuDropdown");

const themeButtons =
    document.querySelectorAll(".theme-option");

const body =
    document.body;



// =========================================
// MENU
// =========================================

menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");

    menuDropdown.classList.toggle("active");

});



// Luk menu hvis man klikker udenfor
document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        menuDropdown.contains(event.target);

    const clickedMenuButton =
        menuButton.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        menuDropdown.classList.remove("active");

        menuButton.classList.remove("active");

    }

});



// =========================================
// THEME
// =========================================

function setTheme(theme) {

    body.classList.remove(
        "dark-mode",
        "light-mode"
    );


    body.classList.add(
        `${theme}-mode`
    );


    // Aktiv knap
    themeButtons.forEach(button => {

        button.classList.remove("active");

        if (
            button.dataset.theme === theme
        ) {

            button.classList.add("active");

        }

    });


    // Gem brugerens valg
    localStorage.setItem(
        "multimediedesign-theme",
        theme
    );

}



// =========================================
// THEME BUTTONS
// =========================================

themeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const selectedTheme =
                button.dataset.theme;

            setTheme(selectedTheme);

        }
    );

});



// =========================================
// LOAD THEME
// =========================================

const savedTheme =
    localStorage.getItem(
        "multimediedesign-theme"
    );


// Dark mode er standard
if (savedTheme) {

    setTheme(savedTheme);

} else {

    setTheme("dark");

}



// =========================================
// SMOOTH LINKS
// =========================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetID =
                    this.getAttribute("href");


                if (targetID === "#") {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });



// =========================================
// SIMPLE SCROLL REVEAL
// =========================================

const revealElements =
    document.querySelectorAll(
        ".skill-card, .mini-card, .chart-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal-element"
    );

    observer.observe(element);

});


// =========================================
// CAREER FLOATING CARDS
// =========================================

const careerWrappers =
    document.querySelectorAll(".career-wrapper");


careerWrappers.forEach(wrapper => {

    const button =
        wrapper.querySelector(".career-main-card");


    button.addEventListener("click", () => {

        const alreadyOpen =
            wrapper.classList.contains("active");


        // Luk alle først
        careerWrappers.forEach(item => {

            item.classList.remove("active");

            const card =
                item.querySelector(".career-main-card");

            card.classList.remove("active");

        });


        // Hvis det ikke allerede var åbent,
        // så åbn det valgte
        if (!alreadyOpen) {

            wrapper.classList.add("active");

            button.classList.add("active");

        }

    });

});