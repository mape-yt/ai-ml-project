/* =========================================
   AI × ML RESEARCH PROJECT
   Interactive UI
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initScrollReveal();
    initCursorGlow();
    initCardTilt();
    initOrbParallax();
    initButtonRipples();
    initNavbar();
    initMobileMenu();
    initNetworkAnimation();

});



/* =========================================
   SCROLL REVEAL
========================================= */

function initScrollReveal() {

    const elements = document.querySelectorAll(
        ".section-header, " +
        ".large-placeholder-card, " +
        ".small-placeholder-card, " +
        ".topic-card, " +
        ".visual-text, " +
        ".visual-network, " +
        ".final-content"
    );


    elements.forEach((element, index) => {

        element.classList.add("reveal");


        if (
            element.classList.contains(
                "small-placeholder-card"
            ) ||
            element.classList.contains(
                "topic-card"
            )
        ) {

            element.style.setProperty(
                "--reveal-delay",
                `${(index % 4) * 80}ms`
            );

        }

    });


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "revealed"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach((element) => {

        observer.observe(element);

    });

}



/* =========================================
   CURSOR GLOW
========================================= */

function initCursorGlow() {

    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (isTouchDevice) {
        return;
    }


    const glow =
        document.createElement("div");


    glow.className =
        "cursor-glow";


    document.body.appendChild(
        glow
    );


    let mouseX =
        window.innerWidth / 2;


    let mouseY =
        window.innerHeight / 2;


    let currentX =
        mouseX;


    let currentY =
        mouseY;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        }
    );


    function animate() {

        currentX +=
            (mouseX - currentX) * 0.12;


        currentY +=
            (mouseY - currentY) * 0.12;


        glow.style.transform =
            `translate3d(${currentX}px, ${currentY}px, 0)`;


        requestAnimationFrame(
            animate
        );

    }


    animate();

}



/* =========================================
   CARD 3D TILT
========================================= */

function initCardTilt() {

    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (isTouchDevice) {
        return;
    }


    const cards =
        document.querySelectorAll(
            ".topic-card, " +
            ".small-placeholder-card, " +
            ".large-placeholder-card"
        );


    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -3;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 3;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}



/* =========================================
   ORB PARALLAX
========================================= */

function initOrbParallax() {

    const visual =
        document.querySelector(
            ".hero-visual"
        );


    if (!visual) {
        return;
    }


    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (isTouchDevice) {
        return;
    }


    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth -
                0.5;


            const y =
                event.clientY /
                window.innerHeight -
                0.5;


            const moveX =
                x * 18;


            const moveY =
                y * 18;


            visual.style.transform =
                `translate3d(${moveX}px, ${moveY}px, 0)`;

        }
    );

}



/* =========================================
   BUTTON RIPPLE
========================================= */

function initButtonRipples() {

    const buttons =
        document.querySelectorAll(
            ".button"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                const rect =
                    button.getBoundingClientRect();


                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.className =
                    "button-ripple";


                ripple.style.left =
                    `${event.clientX - rect.left}px`;


                ripple.style.top =
                    `${event.clientY - rect.top}px`;


                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });

}



/* =========================================
   NAVBAR
========================================= */

function initNavbar() {

    const navbar =
        document.querySelector(
            ".navbar"
        );


    if (!navbar) {
        return;
    }


    window.addEventListener(
        "scroll",
        () => {

            const currentScrollY =
                window.scrollY;


            /*
                Add the scrolled state so the
                navbar can change appearance
                after the user starts scrolling.
            */

            if (currentScrollY > 30) {

                navbar.classList.add(
                    "navbar-scrolled"
                );

            } else {

                navbar.classList.remove(
                    "navbar-scrolled"
                );

            }


            /*
                The navbar intentionally stays
                visible while scrolling.
            */

            navbar.classList.remove(
                "navbar-hidden"
            );

        },
        {
            passive: true
        }
    );

}



/* =========================================
   MOBILE MENU
========================================= */

function initMobileMenu() {

    const navbar =
        document.querySelector(
            ".navbar"
        );


    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );


    const mobileMenu =
        document.querySelector(
            ".mobile-menu"
        );


    if (
        !navbar ||
        !menuToggle ||
        !mobileMenu
    ) {

        return;
    }


    const mobileLinks =
        mobileMenu.querySelectorAll(
            ".mobile-nav-link"
        );



    /* =================================
       OPEN MENU
    ================================= */

    function openMenu() {

        navbar.classList.add(
            "menu-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );


        navbar.classList.remove(
            "navbar-hidden"
        );

    }



    /* =================================
       CLOSE MENU
    ================================= */

    function closeMenu() {

        navbar.classList.remove(
            "menu-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }



    /* =================================
       TOGGLE MENU
    ================================= */

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navbar.classList.contains(
                    "menu-open"
                );


            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );



    /* =================================
       CLOSE AFTER NAVIGATION
    ================================= */

    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMenu();

            }
        );

    });



    /* =================================
       ESCAPE KEY
    ================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navbar.classList.contains(
                    "menu-open"
                )
            ) {

                closeMenu();

                menuToggle.focus();

            }

        }
    );



    /* =================================
       CLOSE ON DESKTOP RESIZE
    ================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 600
            ) {

                closeMenu();

            }

        }
    );

}



/* =========================================
   NETWORK NODE ANIMATION
========================================= */

function initNetworkAnimation() {

    const nodes =
        document.querySelectorAll(
            ".network-node"
        );


    if (!nodes.length) {
        return;
    }


    nodes.forEach(
        (node, index) => {

            node.style.setProperty(
                "--node-delay",
                `${index * 700}ms`
            );

        }
    );

}