const uploadImage = document.querySelector('[upload-image-input]'); // input preview
if (uploadImage) {
    uploadImage.addEventListener('change', function (event) {
        const file = event.target.files[0]; // file image if you choose

        const reader = new FileReader(); // read a file

        reader.onload = function (e) {
            document.querySelector('[upload-image-preview]').setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(file);
    });
}