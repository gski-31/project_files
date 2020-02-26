// closure function
function Gallery(gallery) {
        if (!gallery) {
                throw new Error('Gallery NOT Found!!!!!');
        }
        // console.log(gallery);
        // select needed elements
        // --- array.from since multiple of the same
        const images = Array.from(gallery.querySelectorAll('img'));
        const modal = document.querySelector('.modal');
        // --- look in modal for buttons
        const prevButton = modal.querySelector('.prev');
        const nextButton = modal.querySelector('.next');
        // keep track of current image
        let currentImage;

        // open the modal
        function openModal() {
                // check for open modal
                if (modal.matches('.open')) {
                        return; // exit and do nothing if already open
                }
                modal.classList.add('open');

                // bind event listerners to single modal to avoid issues with multiple galleries
                window.addEventListener('keyup', handleKeyUp);
                nextButton.addEventListener('click', showNextImage);
                prevButton.addEventListener('click', showPrevImage);
        }

        // close the modal
        function closeModal() {
                modal.classList.remove('open');
                // needs to be linked to an outside the target event listener / function
                // clean up modal listeners when modal is closed
                window.removeEventListener('keyup', handleKeyUp);
                nextButton.removeEventListener('click', showNextImage);
                prevButton.removeEventListener('click', showPrevImage);
        }

        function handleClickOutside(e) {
                console.log('outer click');
                // modal is entire page, if clicked on page but not inner modal run...
                if (e.target === e.currentTarget) {
                        closeModal();
                }
        }

        // handle keyboard commands
        function handleKeyUp(e) {
                if (e.key === 'Escape') return closeModal();
                if (e.key === 'ArrowRight') return showNextImage();
                if (e.key === 'ArrowLeft') return showPrevImage();
        }

        function showNextImage() {
                showImage(currentImage.nextElementSibling || gallery.firstElementChild);
        }
        function showPrevImage() {
                showImage(currentImage.previousElementSibling || gallery.lastElementChild);
        }

        // populate things
        function showImage(e) {
                // -- error check
                if (!e) {
                        console.log('no images');
                }
                // -- update the modal with img
                modal.querySelector('img').src = e.src;
                modal.querySelector('h2').textContent = e.title;
                modal.querySelector('figure p').textContent = e.dataset.description;
                currentImage = e;
                openModal();
        }

        // event listeners
        // -- event listener for image click
        images.forEach(image => image.addEventListener('click', e => showImage(e.currentTarget)));
        // -- outisde image click
        modal.addEventListener('click', handleClickOutside);

        // check for enter key for tabbing through images
        images.forEach(image => {
                // attach an event listener for each image
                image.addEventListener('keyup', e => {
                        // check for enter key
                        if (e.key === 'Enter') {
                                showImage(e.currentTarget);
                        }
                });
        });
}

// declare var reference to index galleries
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
