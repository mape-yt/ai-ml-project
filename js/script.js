/* =========================================
   AI × ML RESEARCH PROJECT
   Interactive UI
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    initScrollReveal();
    initCursorGlow();
    initCardInteraction();
    initOrbParallax();
    initButtonRipples();
    initNavbar();
    initMobileMenu();
    initNetworkAnimation();
    initSmoothAnchorLinks();

});



/* =========================================
   SCROLL REVEAL
========================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".section-header, " +
            ".large-placeholder-card, " +
            ".small-placeholder-card, " +
            ".topic-card, " +
            ".ai-summary, " +
            ".about-action, " +
            ".visual-text, " +
            ".visual-network, " +
            ".final-content"
        );


    if (!elements.length) {
        return;
    }


    elements.forEach((element, index) => {

        element.classList.add("reveal");


        const isCard =
            element.classList.contains(
                "small-placeholder-card"
            ) ||
            element.classList.contains(
                "topic-card"
            );


        if (isCard) {

            element.style.setProperty(
                "--reveal-delay",
                `${(index % 4) * 90}ms`
            );

        }

    });


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach((element) => {

            element.classList.add(
                "revealed"
            );

        });

        return;
    }


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
                threshold: 0.10,

                rootMargin:
                    "0px 0px -45px 0px"
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

        },
        {
            passive: true
        }
    );


    function animate() {

        currentX +=
            (mouseX - currentX) * 0.10;


        currentY +=
            (mouseY - currentY) * 0.10;


        glow.style.transform =
            `translate3d(${currentX}px, ${currentY}px, 0)`;


        requestAnimationFrame(
            animate
        );

    }


    animate();

}



/* =========================================
   CARD INTERACTION
========================================= */

function initCardInteraction() {

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


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -1.6;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 1.6;


                if (
                    card.classList.contains(
                        "topic-card"
                    )
                ) {

                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-7px)`;

                } else {

                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-3px)`;

                }

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
   HERO ORB PARALLAX
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


    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
        "mousemove",
        (event) => {

            targetX =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 14;


            targetY =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 14;

        },
        {
            passive: true
        }
    );


    function animate() {

        currentX +=
            (targetX - currentX) * 0.08;


        currentY +=
            (targetY - currentY) * 0.08;


        visual.style.setProperty(
            "--parallax-x",
            `${currentX}px`
        );


        visual.style.setProperty(
            "--parallax-y",
            `${currentY}px`
        );


        requestAnimationFrame(
            animate
        );

    }


    animate();

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

                }, 700);

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


    function updateNavbar() {

        if (window.scrollY > 30) {

            navbar.classList.add(
                "navbar-scrolled"
            );

        } else {

            navbar.classList.remove(
                "navbar-scrolled"
            );

        }


        navbar.classList.remove(
            "navbar-hidden"
        );

    }


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
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

    }


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


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMenu();

            }
        );

    });


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
   NETWORK ANIMATION
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
                `${index * 650}ms`
            );

        }
    );

}



/* =========================================
   SMOOTH ANCHOR LINKS
========================================= */

function initSmoothAnchorLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navbar =
                    document.querySelector(
                        ".navbar"
                    );


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight -
                    12;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });

}