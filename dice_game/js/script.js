function refreshPage() {
        location.reload(true);
}

const p1_text = document.querySelector('.p1');
const p2_text = document.querySelector('.p2');

const dice01 = document.querySelector('.img1');
const dice02 = document.querySelector('.img2');

const randomImage = () => `dice${Math.floor(Math.random() * 6) + 1}.png`;

dice01.src = `img/${randomImage()}`;
dice02.src = `img/${randomImage()}`;

if (dice01.src === dice02.src) {
        p1_text.innerHTML = 'TIED';
        p2_text.innerHTML = 'TIED';
} else if (dice01.src > dice02.src) {
        p1_text.innerHTML = 'P1 WINS 😀';
        p2_text.innerHTML = 'P2 LOSES 😢';
} else if (dice01.src < dice02.src) {
        p1_text.innerHTML = 'P1 LOSES 😢';
        p2_text.innerHTML = 'P2 WINS 😀';
}
