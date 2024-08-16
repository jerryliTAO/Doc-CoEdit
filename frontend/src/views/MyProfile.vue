<template>
    <div class="flex justify-center w-full mt-10" ref="profile">
        <div class="w-4/5">
            <div class="font-semibold text-3xl">{{ $t("profile") }}</div>
            <hr class="w-32">
            <div class="ml-3 text-sm text-gray-400">⚠️{{ $t("warn") }}</div>

            <div class="sm:flex ">
                <div class="w-1/2" ref="left">
                    <div class="mt-10">
                        <div class="font-semibold">{{ $t("name") }}</div>
                        <input type="text" name="name" value="123" id="name" class="border text-gray-500">
                    </div>
                    <div class="mt-10">
                        <div class="font-semibold">{{ $t("photo_sticker") }}</div>
                        <div class="mt-3">
                            <div class="rounded-full w-32 h-32  border-2 flex">
                                <img src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                                    class="w-full h-full rounded-full object-cover" alt="" ref="photoSticker">
                            </div>
                            <label for="image"
                                class="mt-3 ml-4 rounded-sm w-24 h-9 flex justify-center items-center shadow-md border text-xs font-semibold">{{
                                    $t("image") }}</label>
                            <input type="file" accept="image/gif, image/jpeg, image/png" class="border ml-5 hidden"
                                id="image" name="image" ref="stickerUploader">
                        </div>
                    </div>
                </div>

                <div class="w-1/2" ref="right">
                    <div class="mt-10">
                        <div class="font-semibold">{{ $t("cover") }}</div>
                    </div>
                    <input type="file" id="coverUploader" class="hidden" accept="image/gif,image/jpg,image/png"
                        ref="coverUploader" />
                    <div class="w-60 h-72 border sm:w-60 md:w-80 hover:cursor-pointer" ref="coverFrame">
                        <div id="preview" class="w-full h-full flex flex-col justify-center items-center" ref="preview">
                            <img src="@/images/uploadPicture.png" alt="">
                            <div class="w-full truncate text-center">{{ $t('uploadDesc1') }}</div>
                            <div>{{ $t('uploadDesc2') }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end mt-10 mb-5">
                <button for="image"
                    class="mt-3 ml-4 rounded-sm w-24 h-9 flex justify-center items-center shadow-md bg-gray-300 border font-semibold">{{
                        $t("save") }}</button>
            </div>
        </div>
    </div>
</template>


<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();



// =========== photo sticker  ============
const stickerUploader = ref()
const photoSticker = ref()
let stickerEventListener = () => {
    stickerUploader.value.addEventListener("change", (e: Event) => {
        handleFiles(e.target.files, stickerUploader.value, photoSticker.value)
    })
}

// =========== cover image drag to upload  ============
const coverFrame = ref()
const preview = ref()
const coverUploader = ref()

function handleFileSelect(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    coverUploader.value.click();
}
const click = (e: Event) => handleFileSelect(e);


// prevent the default method working
function dragenter(e: Event) {
    // add the styling to div
    coverFrame.value.classList.add("upload_zone_enter");
    e.stopPropagation();
    e.preventDefault();
}

const dragleave = () => coverFrame.value.classList.remove("upload_zone_enter");

// prevent the default method working
function dragover(e: Event) {
    e.stopPropagation();
    e.preventDefault();
}

function handleFiles(files: FileList, inputElement: HTMLInputElement, displayElement: HTMLElement | HTMLImageElement) {
    for (var i = 0; i < files.length; i++) {
        const file = files[i];
        const imageType = /^image\/(png|jpeg|gif)$/;

        if (!file.type.match(imageType)) {
            alert(t('warn2'))
            inputElement.value = '';
            continue;
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
            reader.onload = (e => displayElement.src = e.target.result);
        }
        reader.readAsDataURL(file);
    }
}

function drop(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files, coverUploader.value, preview.value);
    coverFrame.value.classList.remove("upload_zone_enter");
}

let coverEventListener = () => {
    coverUploader.value.addEventListener("change", (e: Event) => {
        handleFiles(e.target.files, coverUploader.value, preview.value)
    })
    coverFrame.value.addEventListener("click", click, false);
    coverFrame.value.addEventListener("dragenter", dragenter, false);
    coverFrame.value.addEventListener("dragleave", dragleave, false);
    coverFrame.value.addEventListener("dragover", dragover, false);
    coverFrame.value.addEventListener("drop", drop, false);
}



onMounted(() => {
    stickerEventListener();
    coverEventListener();

})
</script>



<style scoped>
.upload_zone_enter {
    border: 3px dashed rgba(0, 0, 0, 0.066);
    background-clip: content-box;
    background-color: rgba(120, 120, 120, 0.167);
}

.obj {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>