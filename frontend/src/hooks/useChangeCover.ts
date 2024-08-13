import type { Ref } from "vue";

let coverEventListener = (inputElement:HTMLInputElement,displayElement:HTMLElement | HTMLImageElement,watchImage:Ref) => {
    inputElement.addEventListener("change", (e: Event) => {
        handleFiles(e.target.files, inputElement, displayElement,watchImage)
    },true)
}

function handleFiles(files: FileList, inputElement: HTMLInputElement, displayElement: HTMLElement | HTMLImageElement , watchImage:Ref) {
    
        const file = files[0];
        const imageType = /^image\/(png|jpeg|gif)$/;

        if (!file.type.match(imageType)) {
            alert(t('warn2'))
            inputElement.value = '';
            return;
        }

        const reader = new FileReader();
        if (displayElement.innerText != '') {
            const img = document.createElement("img");
            //setting style due to scope can't effort on this
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';

            img.file = file;
            displayElement.innerText = '';
            displayElement.appendChild(img);
            reader.onload = (e => img.src = e.target.result);
        } else {
            reader.onload = (e => {
                displayElement.src = e.target.result;

                // to watch image change
                watchImage.value = e.target.result;
            } );
        }
        reader.readAsDataURL(file);
        inputElement.value = '';
    
}

export { coverEventListener, handleFiles };

