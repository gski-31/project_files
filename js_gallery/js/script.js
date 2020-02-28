// LINE BY LINE REFACTOR to PROTOTYPE
function Gallery(gallery) {
        if (!gallery) {
                throw new Error('Gallery NOT Found!!!!!');
        }

        // save reference to passed gallery div element
        this.gallery = gallery;

        // bind broken pieces
        this.showNextImage = this.showNextImage.bind(this);
        this.showPrevImage = this.showPrevImage.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        // move methods to prototype
        // remove const and add this
        this.images = Array.from(gallery.querySelectorAll('img'));
        this.modal = document.querySelector('.modal');
        this.prevButton = this.modal.querySelector('.prev');
        this.nextButton = this.modal.querySelector('.next');

        this.images.forEach(image => image.addEventListener('click', e => this.showImage(e.currentTarget)));
        this.modal.addEventListener('click', this.handleClickOutside);

        this.images.forEach(image => {
                image.addEventListener('keyup', e => {
                        if (e.key === 'Enter') {
                                this.showImage(e.currentTarget);
                        }
                });
        });
}

// paste old functions and make each into prototype of gallery function
// open the modal

Gallery.prototype.openModal = function() {
        if (this.modal.matches('.open')) {
                return;
        }
        this.modal.classList.add('open');
        window.addEventListener('keyup', this.handleKeyUp);
        this.nextButton.addEventListener('click', this.showNextImage);
        this.prevButton.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function() {
        this.modal.classList.remove('open');
        window.removeEventListener('keyup', this.handleKeyUp);
        this.nextButton.removeEventListener('click', this.showNextImage);
        this.prevButton.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.handleClickOutside = function(e) {
        if (e.target === e.currentTarget) {
                this.closeModal();
        }
};

Gallery.prototype.handleKeyUp = function(e) {
        if (e.key === 'Escape') return this.closeModal();
        if (e.key === 'ArrowRight') return this.showNextImage();
        if (e.key === 'ArrowLeft') return this.showPrevImage();
};

Gallery.prototype.showNextImage = function() {
        this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
};
Gallery.prototype.showPrevImage = function() {
        this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
};

Gallery.prototype.showImage = function(e) {
        if (!e) {
                console.log('no images');
        }
        this.modal.querySelector('img').src = e.src;
        this.modal.querySelector('h2').textContent = e.title;
        this.modal.querySelector('figure p').textContent = e.dataset.description;
        this.currentImage = e;
        this.openModal();
};

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
