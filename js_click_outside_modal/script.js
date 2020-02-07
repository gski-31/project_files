const cardButtons = document.querySelectorAll('.card button');

// create blank modals for use in function
const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');

function handleButtonClick() {
        const button = event.currentTarget;
        const card = button.closest('.card'); // finds the closest parent
        // ----- get modal filler data
        const imgSrc = card.querySelector('img').src; // qs can be run on individual elements
        const desc = card.dataset.description; // grab the dataset  dataset.something in js, data-something in html
        const name = card.querySelector('h2').textContent;
        // create modal content
        modalInner.innerHTML = `
            <img src="${imgSrc.replace('200', '600')}" alt ="${name}" /> 
            <p>${desc}</p>
        `;
        // show the modal
        modalOuter.classList.add('open');
}

// close out the modal
function closeModal() {
        modalOuter.classList.remove('open');
}

modalOuter.addEventListener('click', function(e) {
        const isOutside = !e.target.closest('.modal-inner');
        if (isOutside) {
                closeModal();
        }
});

window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
                closeModal();
        }
});

cardButtons.forEach(e => {
        e.addEventListener('click', handleButtonClick);
});
