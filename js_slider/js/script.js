// WILL BE REFACTORED IN LATER LESSON
function Slider(slider) {
        // instance of verifies it is actual proper data
        if (!(slider instanceof Element)) {
                throw new Error('No slider passed in');
        }

        // create vars to work with slider
        let prev;
        let current;
        let next;

        // select slider elements
        const slides = slider.querySelector('.slides');
        const prevButton = slider.querySelector('.goToPrev');
        const nextButton = slider.querySelector('.goToNext');

        // populate vars
        function startSlider() {
                current = slider.querySelector('.current') || slides.firstElementChild;
                prev = current.previousElementSibling || slides.lastElementChild;
                next = current.nextElementSibling || slides.firstElementChild;
                // console.log({ current, prev, next });
        }

        function applyClasses() {
                current.classList.add('current');
                prev.classList.add('prev');
                next.classList.add('next');
        }

        function applyClasses() {
                current.classList.add('current');
                prev.classList.add('prev');
                next.classList.add('next');
        }

        function move(direction) {
                // remove classes from current slides
                const classesToRemove = ['prev', 'current', 'next'];
                prev.classList.remove(...classesToRemove);
                current.classList.remove(...classesToRemove);
                next.classList.remove(...classesToRemove);
                if (direction === 'back') {
                        // create array of the new values, and destructure them inot the variables
                        [prev, current, next] = [
                                // get the prev slide, if none, get last slide from the entire slider for wrapping
                                prev.previousElementSibling || slides.lastElementChild,
                                prev,
                                current,
                        ];
                } else {
                        [prev, current, next] = [
                                current,
                                next,
                                // get next slide, if at end, loop around and grab the first slide
                                next.nextElementSibling || slides.firstElementChild,
                        ];
                }

                applyClasses();
        }

        // constructor, data is needed on page load
        startSlider();
        applyClasses();

        // event listeners
        prevButton.addEventListener('click', () => move('back'));
        nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
