// grab text area // also: try to keep var names similar to html elements
const textarea = document.querySelector('[name="text"]');

// grab results
const result = document.querySelector('.result');

// grab inputs
const filterInputs = Array.from(document.querySelectorAll('[name="filter"]'));

/* eslint-disable */
const funkifyChar = {
    '-': '₋', '!': 'ᵎ', '?': 'ˀ', '(': '⁽', ')': '₎', '+': '⁺', '=': '₌', '0': '⁰', '1': '₁', '2': '²', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', '8': '⁸', '9': '⁹', a: 'ᵃ', A: 'ᴬ', B: 'ᴮ', b: 'ᵦ', C: '𝒸', d: 'ᵈ', D: 'ᴰ', e: 'ₑ', E: 'ᴱ', f: '𝒻', F: 'ᶠ', g: 'ᵍ', G: 'ᴳ', h: 'ʰ', H: 'ₕ', I: 'ᵢ', i: 'ᵢ', j: 'ʲ', J: 'ᴶ', K: 'ₖ', k: 'ₖ', l: 'ˡ', L: 'ᴸ', m: 'ᵐ', M: 'ₘ', n: 'ₙ', N: 'ᴺ', o: 'ᵒ', O: 'ᴼ', p: 'ᵖ', P: 'ᴾ', Q: 'ᵠ', q: 'ᑫ', r: 'ʳ', R: 'ᵣ', S: 'ˢ', s: 'ˢ', t: 'ᵗ', T: 'ₜ', u: 'ᵘ', U: 'ᵤ', v: 'ᵛ', V: 'ᵥ', w: '𝓌', W: 'ʷ', x: 'ˣ', X: 'ˣ', y: 'y', Y: 'Y', z: '𝓏', Z: 'ᶻ'
  };
  /* eslint-enable */

// create an object of filter functions
const filters = {
        // every other letter is CAPS
        askew(letter, index) {
                if (index % 2 === 0) {
                        return letter.toUpperCase();
                }
                return letter.toLowerCase();
        },
        funkify(char) {
                // check for corresponding kvp
                let funkyChar = funkifyChar[char];
                if (funkyChar) return funkyChar;
                funkyChar = funkifyChar[char.toLowerCase()];
                if (funkyChar) return funkyChar;
                return char;
        },
        punctuation(char) {
                // every space has 33 percent chanc eof being an elipses
                const random = Math.floor(Math.random() * 3);
                if (char === ' ' && random === 2) {
                        return '...';
                }
                return char;
        },
};

// assign the new text to a variable y using filter functions
function transformText(text) {
        // grab active filter
        const filter = document.querySelector('[name="filter"]:checked').value;
        console.log(filter);
        // loop over each letter of text
        const modded = Array.from(text).map(filters[filter]); // [brackets] because its a var and not a property
        console.log(modded);
        result.textContent = modded.join('');
}

// listen for text input in textbox
textarea.addEventListener('input', e => {
        transformText(e.target.value);
});

// change output between clicks
filterInputs.forEach(input =>
        input.addEventListener('input', () => {
                transformText(textarea.value);
        })
);
