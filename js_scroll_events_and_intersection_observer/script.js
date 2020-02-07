const terms = document.querySelector('.terms-and-conditions');
const button = document.querySelector('.accept');

// payload dumps info about element
function obCallback(payload) {
        if (payload[0].intersectionRatio === 1) {
                button.disabled = false;
                console.log('REMOVED');
                // stop observing when button comes in
                ob.unobserve(terms.lastElementChild);
                // can use an else statement to swing in and out
        }
}

// watches for elements // 2nd param of object with position info
const ob = new IntersectionObserver(obCallback, {
        root: terms,
        threshold: 1,
});

// watch for something
ob.observe(terms.lastElementChild);
