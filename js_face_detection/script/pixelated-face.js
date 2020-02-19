const video = document.querySelector('video.webcam');

const canvas = document.querySelector('canvas.video');
const ctx = canvas.getContext('2d');

const faceCanvas = document.querySelector('canvas.face');
const faceCtx = faceCanvas.getContext('2d');

// default sizes
const options = {
        SIZE: 13,
        SCALE: 1.3,
};

// slider sizes
const optionsInputs = document.querySelectorAll('.controls input[type="range"]');

function handleOption(e) {
        const { value, name } = e.currentTarget;
        options[name] = parseFloat(value);
}

optionsInputs.forEach(input => input.addEventListener('input', handleOption));

// make face detector
const faceDetector = new window.FaceDetector();
// console.log(video, canvas, faceCanvas, faceDetector);

// populate users video
// ASYNC and AWAIT
// grab user feed
async function populateVideo() {
        const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 },
        });
        // set object to stream
        video.srcObject = stream;
        // play it
        await video.play();
        // size canvases to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        faceCanvas.width = video.videoWidth;
        faceCanvas.height = video.videoHeight;
}

// detect face
async function detect() {
        const faces = await faceDetector.detect(video); // either image video or canvas
        // console.log(faces.length);
        // ask browser for next animation frame
        faces.forEach(drawFace);
        faces.forEach(censor);
        requestAnimationFrame(detect); // recursive detection
}

function censor({ boundingBox: face }) {
        faceCtx.imageSmoothingEnabled = false;
        faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
        // First draw it small
        faceCtx.drawImage(
                video, // Where should I grab the photo from?
                face.x, // from what x and y should I start capturing from?
                face.y,
                face.width, // how wide and high should I capture from?
                face.height,
                face.x, // now to draw it, where should I start x and y?
                face.y,
                options.SIZE, // how wide and high should it be?
                options.SIZE
        );

        const width = face.width * options.SCALE;
        const height = face.height * options.SCALE;

        // then draw it back on, but scaled up
        faceCtx.drawImage(
                faceCanvas, // Where should I grab the photo from?
                face.x, // from what x and y should I start capturing from?
                face.y, // from what x and y should I start capturing from?
                options.SIZE,
                options.SIZE,
                // Drawing
                face.x - (width - face.width) / 2,
                face.y - (height - face.height) / 2,
                width,
                height
        );
}
function drawFace(face) {
        const { width, height, top, left } = face.boundingBox;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the boxes on movement
        ctx.strokeStyle = '#800080';
        ctx.lineWidth = 2;
        ctx.strokeRect(left, top, width, height);
        ctx.stroke();
}

populateVideo().then(detect);
