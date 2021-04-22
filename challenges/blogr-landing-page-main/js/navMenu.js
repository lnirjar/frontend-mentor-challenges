const menu = document.querySelector('header .menu');
const menuItems = menu.querySelectorAll('.menu > li');
const navBar = document.querySelector('#navbar');
const hamburger = document.querySelector('.hamburger');

/* Media Queries */
const isVerticalNav = () => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw <= 900) {
        return true;
    }
}

const smallDevice = window.matchMedia("(max-width: 900px)");

// addListener is Deprecated, but using it to support safari
smallDevice.addListener(handleDeviceChange);

function handleDeviceChange(e) {
    if (e.matches) {
        navBar.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-hidden', 'false');
    } else {
        navBar.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-hidden', 'true');
    }
}

// Run it initially
handleDeviceChange(smallDevice);


/* Code for Navbar toggle */
const toggleNavbar = e => {
    if (hamburger.getAttribute('aria-expanded') === 'false') {
        navBar.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        navBar.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

hamburger.addEventListener('click', toggleNavbar);


/* code for submenu */
const handleMouseEnterLeave = e => {
    if (isVerticalNav()) return;
    const targetMenuItem = e.target;
    if (!targetMenuItem) return;

    const targetSubMenu = targetMenuItem.querySelector('.sub-menu');
    const targetMenuButton = targetMenuItem.querySelector('button');

    if (targetMenuItem.dataset.lastEvent == 'click' && targetSubMenu.getAttribute('aria-hidden') == 'false') return;
    if (e.type == 'mouseenter') {
        targetMenuItem.dataset.lastEvent = 'mouseenter';
        // hide the currently visible submenu
        const currentSubMenu = menu.querySelector('.sub-menu[aria-hidden="false"]');
        if (currentSubMenu) {
            const currentMenuButton = currentSubMenu.parentNode.querySelector('button');
            currentSubMenu.setAttribute('aria-hidden', 'true');
            currentMenuButton.setAttribute('aria-expanded', 'false');
            currentMenuButton.blur();
        }

        // show the target submenu
        targetSubMenu.setAttribute('aria-hidden', 'false');
        targetMenuButton.setAttribute('aria-expanded', 'true');

    } else if (e.type == 'mouseleave') {
        targetMenuItem.dataset.lastEvent = 'mouseleave';
        // hide submenu
        targetSubMenu.setAttribute('aria-hidden', 'true');
        targetMenuButton.setAttribute('aria-expanded', 'false');
        targetMenuButton.blur();
    }
}

menuItems.forEach(item => {
    item.addEventListener('mouseenter', handleMouseEnterLeave);

    item.addEventListener('mouseleave', handleMouseEnterLeave);

    item.addEventListener('focusout', e => {
        if (isVerticalNav()) return;
        const subMenu = item.querySelector('.sub-menu');
        const subMenuButton = item.querySelector('button');
        const focusedOrHasFocused = item.matches(':focus-within');
        if (!focusedOrHasFocused) {
            // hide submenu
            subMenu.setAttribute('aria-hidden', 'true');
            subMenuButton.setAttribute('aria-expanded', 'false');
        }
    })
})


menu.addEventListener('click', e => {
    e.preventDefault();
    const targetMenuButton = e.target.closest('button');
    if (!targetMenuButton) return;

    const targetSubMenu = targetMenuButton.parentNode.querySelector('.sub-menu');
    const currentSubMenu = menu.querySelector('.sub-menu[aria-hidden="false"]');

    // hide the submenu if the target submenu is already visible
    if (targetSubMenu.getAttribute('aria-hidden') == 'false' && targetMenuButton.parentNode.dataset.lastEvent != 'mouseenter') {
        targetSubMenu.setAttribute('aria-hidden', 'true');
        targetMenuButton.setAttribute('aria-expanded', 'false');
        targetMenuButton.parentNode.dataset.lastEvent = 'click';
        return;
    }

    // hide the currently visible submenu
    if (currentSubMenu) {
        const currentMenuButton = currentSubMenu.parentNode.querySelector('button');
        currentSubMenu.setAttribute('aria-hidden', 'true');
        currentMenuButton.setAttribute('aria-expanded', 'false');
        targetMenuButton.parentNode.dataset.lastEvent = 'click';
    }


    // show the target submenu
    targetSubMenu.setAttribute('aria-hidden', 'false');
    targetMenuButton.setAttribute('aria-expanded', 'true');
    targetMenuButton.parentNode.dataset.lastEvent = 'click';
})