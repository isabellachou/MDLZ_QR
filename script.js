const canvas = document.getElementById("polaroidCanvas");
const ctx = canvas.getContext("2d");

const imageInput = document.getElementById("imageInput");
const captionInput = document.getElementById("caption");

let uploadedImage = null;

imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
        const img = new Image();
        img.onload = function() {
            uploadedImage = img;
            document.fonts.ready.then(drawPolaroid);
        };
        img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
    }
});

captionInput.addEventListener("input", () => {
    document.fonts.ready.then(drawPolaroid);
});

function drawPolaroid() {
    // Clear canvas with purple background
    ctx.fillStyle = "#4f2170";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!uploadedImage) return;

    const imgWidth = 400;
    const imgHeight = uploadedImage.height * (imgWidth / uploadedImage.width);
    const imgX = (canvas.width - imgWidth) / 2;
    const imgY = 50;

    // Draw image
    ctx.drawImage(uploadedImage, imgX, imgY, imgWidth, imgHeight);

    // Draw caption text using custom font
    ctx.font = "40px 'MDLZ'";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(captionInput.value, canvas.width / 2, imgY + imgHeight + 80);
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'purple_polaroid.png';
    link.href = canvas.toDataURL();
    link.click();
}