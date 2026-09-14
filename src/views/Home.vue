<script setup>
import { onMounted, ref } from 'vue';
import { appDataDir, downloadDir, join, resolveResource } from '@tauri-apps/api/path';
import { open, save } from '@tauri-apps/plugin-dialog';
import { convertFileSrc } from '@tauri-apps/api/core';
import { readFile, writeFile } from '@tauri-apps/plugin-fs';
import jsPDF from 'jspdf';
import TshirtMockup from '../components/TshirtMockup.vue';
import PantsMockup from '../components/PantsMockup.vue';

const tshirtMockup = ref(null);
const pantsMockup = ref(null);
const isNew = ref(true);
const activeCreateNew = ref(0);
const apparelCode = ref([
    "tshirt", "longsleeve", "jersey", "shorts", "pants"
])
const apparels = ref([
    "T-Shirt", "Long Sleeve Shirt", "Jersey", "Shorts", "Long Pants"
])
const designs = ref([
    ["front", "back", "right-sleeve", "left-sleeve", "collar-color", "base-color"],
    ["front", "back", "left-sleeve", "right-sleeve", "collar-color", "base-color"],
    ["front", "back"],
    ["right", "left"],
    ["right", "left"]
])
const sizes = ref([
    ["21x29.5in", "21x30.5in", "18x10in", "18x10in", "", ""],
    ["front", "back", "left-sleeve", "right-sleeve", "collar-color", "base-color"],
    ["front", "back"],
    ["left", "right"],
    ["26x40in", "26x40in"]    
])
const apparelData = ref({});
const isModalOpen = ref(false);
const isCreateNew = ref(false);
const isResetNew = ref(false);
const isResetOld = ref(false);
const isMenuOpen = ref(false);
const isExportOpen = ref(false);
const isNotifOpen = ref(false);
const isColorValueOpen = ref(false);
const isSettingsOpen = ref(false);
const selectedColor = ref("");
const currentColorDesign = ref();
const currentMockupBg = ref("");
const viewBoxWidth = 670;
const viewBoxHeight = 297;
const notifMessage = ref("");
const previousDirectory = ref("");

const startCreateNewMockup = () => {
    isModalOpen.value = true;
    isCreateNew.value = true;
}
const createNewMockup = () => {
    isNew.value = false;
    apparelData.value = {};
    designs.value[activeCreateNew.value].forEach(design => {
        apparelData.value[design] = "";
    });
    closeModal();
}

const startResetMockup = () => {
    isModalOpen.value = true;
    isResetNew.value = true;
}
const resetMockup = () => {
    isNew.value = true;
    activeCreateNew.value = 0;
    closeModal()
}

const startExportMockup = () => {
    isModalOpen.value = true;
    isExportOpen.value = true;
}
const exportMockup = async(type) => {
    if (type === 'png') {
        await exportAsPNG();
    } else if (type === 'jpg') {
        await exportAsJPG();
    } else {
        await exportAsPDF();
    }
    closeModal();
}

const startClearMockupDesigns = () => {
    isModalOpen.value = true;
    isResetOld.value = true;
}
const clearMockupDesigns = () => {
    apparelData.value = {};
    designs.value[activeCreateNew.value].forEach(design => {
        apparelData.value[design] = "";
    });    
    if (activeCreateNew.value === 0 ){
        tshirtMockup.value.clearDesign();
    } else if (activeCreateNew.value === 4) {
        pantsMockup.value.clearDesign();
    }
    closeModal();
}

const openFileAsDesign = async(key) => {
    let selectedPath;
    try {
        selectedPath = await open({
            defaultPath: previousDirectory.value === "" ? await downloadDir() : previousDirectory.value,
            multiple: false,
            filters: [{ name: 'Image', extensions: ['png', 'jpg', 'jpeg'] }]
    });
    } catch(err) {
        showNotif(err);
    }
    if (!selectedPath) return;
    previousDirectory.value = selectedPath;
    if (activeCreateNew.value === 0) {
        const design = key;
        if (key.includes('sleeve')) {
            tshirtMockup.value.setDesign('front',`front-${design}`,convertFileSrc(selectedPath));
            tshirtMockup.value.setDesign('back',`back-${design}`,convertFileSrc(selectedPath));
        } else {
            tshirtMockup.value.setDesign(key,`${design}-design`,convertFileSrc(selectedPath));
        }
    } else if (activeCreateNew.value === 4) {
        if (key === 'left') {
            pantsMockup.value.setDesign('front', 'front-left', convertFileSrc(selectedPath));
            pantsMockup.value.setDesign('back', 'back-left', convertFileSrc(selectedPath));
        } else {
            pantsMockup.value.setDesign('front', 'front-right', convertFileSrc(selectedPath));
            pantsMockup.value.setDesign('back', 'back-right', convertFileSrc(selectedPath));
        }
    }
    apparelData.value[key] = "filled";
}

const selectColorAsDesign = () => {
    const key = currentColorDesign.value;
    if (activeCreateNew.value === 0) {
        if (key === 'collar-color') {
            tshirtMockup.value.setColor('front','front-collar',selectedColor.value);
            tshirtMockup.value.setColor('back','back-collar',selectedColor.value);
        } else {
            tshirtMockup.value.setColor('front',key,selectedColor.value);
        }
    }
    apparelData.value[key] = "filled";
    currentColorDesign.value = "";
    selectedColor.value = "";
    closeModal();
}

const setCurrentDesign = async(key) => {
    if (key.includes('color')) {
        currentColorDesign.value = key;
        isModalOpen.value = true;
        isColorValueOpen.value = true;
    } else {
        openFileAsDesign(key);
    }
}


const getMimeType = (filePath) => {
    const ext = filePath.split('.').pop().toLowerCase();
    const map = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' };
    return map[ext] || 'image/png';
}
const loadLocalFileAsDataURL = async(filePath) => {
    const bytes = await readFile(filePath);
    const blob = new Blob([bytes], { type: getMimeType(filePath) });
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
const loadPublicAssetAsDataURL = async(path) => {
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
    });
}
const dataUrlToBytes = (dataUrl) => {
    const base64 = dataUrl.split(',')[1];
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}
const exportAsPNG = async() => {
    try {
        const canvas = await buildMockupCanvas();
        const dataUrl = canvas.toDataURL('image/png');
    
        const filePath = await save({ defaultPath: `${apparelCode.value[activeCreateNew.value]}-mockup.png`, filters: [{ name: 'PNG Image', extensions: ['png'] }] })
        if (!filePath) return
        await writeFile(filePath, dataUrlToBytes(dataUrl))

        showNotif("Mockup exported to files!");
    } catch (err) {
        showNotif('PNG export failed: ' + err);
    }
}
const exportAsJPG = async() => {
    try {
        const canvas = await buildMockupCanvas();

        const ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

        const filePath = await save({ defaultPath: `${apparelCode.value[activeCreateNew.value]}-mockup.jpg`, filters: [{ name: 'JPG Image', extensions: ['jpg'] }] })
        if (!filePath) return
        await writeFile(filePath, dataUrlToBytes(dataUrl))

        showNotif("Mockup exported to files!");
    } catch (err) {
        showNotif('JPG export failed: ' + err);
    }
}
const exportAsPDF = async() => {
    try {
        const canvas = await buildMockupCanvas();
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const mockupWidth = viewBoxWidth;
        const mockupHeight = viewBoxHeight;
        const mockupRatio = mockupWidth / mockupHeight;

        let renderWidth = pageWidth;
        let renderHeight = renderWidth / mockupRatio;

        if (renderHeight > pageHeight) {
            renderHeight = pageHeight;
            renderWidth = renderHeight * mockupRatio;
        }

        const x = (pageWidth - renderWidth) / 2;
        const y = (pageHeight - renderHeight) / 2;

        pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);

        const filePath = await save({ defaultPath: `${apparelCode.value[activeCreateNew.value]}-mockup.pdf`, filters: [{ name: 'PDF Document', extensions: ['pdf'] }] })
        if (!filePath) return
        const pdfBytes = pdf.output('arraybuffer')
        await writeFile(filePath, new Uint8Array(pdfBytes))

        showNotif("Mockup exported to files!");
    } catch (err) {
        showNotif('PDF export failed: ' + err);
    }
}
const buildMockupCanvas = async() => {
    const svg = document.querySelector('.mockup svg');
    if (!svg) {
        showNotif('Mockup SVG not found');
        return;
    }

    const SCALE = 3;

    try {
        const svgClone = svg.cloneNode(true);
        const images = svgClone.querySelectorAll('image');
        for (const imageEl of images) {
            const currentHref = imageEl.getAttribute('href') || imageEl.getAttribute('xlink:href');
            if (!currentHref || currentHref.startsWith('data:')) continue;
            let dataUrl;
            
            if (currentHref.startsWith('/')) {
                dataUrl = await loadPublicAssetAsDataURL(currentHref);
            } else {
                dataUrl = await loadLocalFileAsDataURL(currentHref);
            }
            imageEl.setAttribute('href', dataUrl);
        }

        const svgString = new XMLSerializer().serializeToString(svgClone);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const bgDataUrl = await loadLocalFileAsDataURL(currentMockupBg.value);
        
        const [bgImg, mockupImg] = await Promise.all([
            loadImage(bgDataUrl),
            loadImage(svgUrl)
        ]);

        const canvas = document.createElement('canvas');
        canvas.width = (viewBoxWidth * SCALE);
        canvas.height = viewBoxHeight * SCALE;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

        ctx.drawImage(mockupImg, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/png');

        URL.revokeObjectURL(svgUrl);

        return canvas;

    } catch (err) {
        showNotif('Export failed: ' + err);
        return;
    }
}

const showNotif = (message) => {
    isNotifOpen.value = true;
    notifMessage.value = message;
    setTimeout(() => {
        isNotifOpen.value = false;
        notifMessage.value = "";
    }, 3000);
}

const closeModal = () => {
    isCreateNew.value = false;
    isResetNew.value = false;
    isResetOld.value = false;
    isMenuOpen.value = false;
    isExportOpen.value = false;
    isColorValueOpen.value = false;
    isModalOpen.value = false;
}

const getBackgroundImage = async() => {
    let currentBg = localStorage.getItem('bg');
    if (currentBg === null || currentBg === undefined) {
        localStorage.setItem('bg','bg.png');
        currentBg = 'bg.png';
    }
    currentMockupBg.value = currentBg;
    // currentMockupBg.value = '/home/radz/Documents/Projects/RDZ2K26/mockups/shirt-mockup-bg.png';
}

const setBackgroundImage = async() => {
    let selectedPath;
    try {
        selectedPath = await open({
            defaultPath: previousDirectory.value === "" ? await downloadDir() : previousDirectory.value,
            multiple: false,
            filters: [{ name: 'Image', extensions: ['png', 'jpg', 'jpeg'] }]
    });
    } catch(err) {
        showNotif(err);
    }
    if (!selectedPath) return;
    previousDirectory.value = selectedPath;
    localStorage.setItem('bg',selectedPath);
    currentMockupBg.value = selectedPath;
    showNotif('Mockup Background Updated!');
}

onMounted(async() => {
    await getBackgroundImage();
})

</script>

<template>
    <div class="main">
        <div class="dock left">
            <div class="header">
                <div><img src="../assets/logo.png" @click="isMenuOpen = true; isModalOpen = true; isSettingsOpen = false;"></div>
                <div class="title">Project Kamiseta</div>
            </div>
            <div v-if="isNew">
                <div class="label">Mockup Type</div>
                <div class="selections">
                    <div :class="activeCreateNew === index && 'active'" @click="activeCreateNew = index" v-for="apparel,index in apparels" :style="{ display : (index !== 0 && index !== 4) && 'none' }"> {{ apparel }}</div>
                </div>
                <div class="buttons">
                    <button @click="startCreateNewMockup">Create a Mockup</button>
                </div>
            </div>
            <div v-else>
                <div class="buttons">
                    <button @click="startResetMockup">Create New Mockup</button>
                </div>
                <div class="current-config">
                    <div class="label">
                        Mockup Type:
                        <span class="active"> {{ apparels[activeCreateNew] }} </span>
                    </div>
                    <div class="label">Set Design:</div>
                    <div class="selections">
                        <div v-for="design,index in designs[activeCreateNew]" @click="setCurrentDesign(design)" :class="apparelData[design] !== '' && 'supplied'"> {{ design.toLocaleUpperCase().replaceAll('-', ' ') }}<span>{{ sizes[activeCreateNew][index] }}</span></div>
                    </div>
                </div>
                <div class="buttons">
                    <button class="alternate" @click="startClearMockupDesigns">Reset Mockup Design</button>
                </div>
            </div>
        </div>
        <div class="dock right">
            <div class="title">Mockup Display</div>
            <div v-if="isNew" class="no-display">
                <div>No mockup to display. Select a Mockup Type and then click on 'Create a Mockup' to get started...</div>
            </div>
            <div v-else class="display">
                <div 
                    class="mockup"
                    :style="{backgroundImage : `url(${convertFileSrc(currentMockupBg)})`}"
                >
                    <TshirtMockup ref="tshirtMockup" v-if="activeCreateNew === 0"/>
                    <PantsMockup ref="pantsMockup" v-else-if="activeCreateNew === 4"/>
                </div>
                <div class="buttons">
                    <button class="btnExport" @click="startExportMockup">Export Mockup to File</button>
                </div>
            </div>
        </div>
    </div>

    <div class="notif" v-if="isNotifOpen">
        <div class="msg">{{ notifMessage }}</div>
    </div>
    <div v-if="isModalOpen" class="modal-bg">
        <div class="modal" v-if="isCreateNew">
            <div class="title">Create New Mockup</div>
            <div class="content">Create a new {{ apparels[activeCreateNew] }} mockup?</div>
            <div class="buttons">
                <button @click="createNewMockup">Yes</button>
                <button @click="closeModal">No</button>
            </div>
        </div>
        <div class="modal" v-else-if="isResetNew">
            <div class="title">Create New Mockup</div>
            <div class="content">Reset current {{ apparels[activeCreateNew] }} mockup and create a new one?</div>
            <div class="buttons">
                <button @click="resetMockup">Yes</button>
                <button @click="closeModal">No</button>
            </div>
        </div>
        <div class="modal" v-else-if="isResetOld">
            <div class="title">Reset Mockup Design</div>
            <div class="content">Reset current {{ apparels[activeCreateNew] }} mockup design?</div>
            <div class="buttons">
                <button @click="clearMockupDesigns">Yes</button>
                <button @click="closeModal">No</button>
            </div>
        </div>
        <div class="modal" v-else-if="isExportOpen">
            <div class="title">Export Mockup As</div>
            <div class="buttons alt">
                <button @click="exportMockup('jpg')">JPEG</button>
                <button @click="exportMockup('png')">PNG</button>
                <button @click="exportMockup('pdf')">PDF</button>
                <button @click="closeModal">Cancel</button>
            </div>
        </div>
        <div class="modal" v-else-if="isColorValueOpen">
            <div class="title">Write Color Hex Value</div>
            <input type="text" v-model="selectedColor" maxlength="7">
            <div class="buttons alt">
                <button @click="selectColorAsDesign">Done</button>
                <button @click="closeModal">Cancel</button>
            </div>
        </div>
        <div class="modal about" v-else-if="isMenuOpen">
            <div><img src="../assets/logo.png"></div>
            <div class="title">Project Kamiseta</div>
            <div class="subtitle">v0.1</div>
            <div class="content">A Free and Quick 2D Apparel Mockup Generator for Graphic Designers.</div>
            <div class="content">Copyright &copy; 2026<br><a href="https://designedbyrdz.com/home" target="_blank">designed.by.rdz</a></div>
            <div class="buttons alt">
                <button @click="isSettingsOpen === true ? isSettingsOpen = false : isSettingsOpen = true">Settings</button>
                <div v-if="isSettingsOpen">
                    <div class="subtitle">Mockup Background</div>
                    <div class="bg-group">
                        <img :src="currentMockupBg === 'bg.png' ? 'src/assets/imgs/bg.png' : convertFileSrc(currentMockupBg)">
                        <button @click="setBackgroundImage">Upload New Background <span>(2000x886px)</span></button>
                    </div>
                </div>
                <a href="https://github.com/designed-by-rdz/kamiseta"><button>GitHub Page</button></a>
                <a href="https://designedbyrdz.com/studio" target="_blank"><button>Developers</button></a>
                <button @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .main {
        display: flex;
        width: calc(100vw - 20px);
        height: calc(100dvh - 20px);
        padding: 10px;
        gap: 10px;
        overflow: hidden;
    }
    .dock {
        padding: 20px;
        background-color: var(--gray);
        border-radius: var(--border-s-radius);
    }
    .dock.left {
        width: 230px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .dock.right {
        width: 85vw;
    }
    .dock.left .header {
        display: flex;
        gap: 10px;
        height: 50px;
        align-items: center;
        border-bottom: 1px solid var(--l-gray);
    }
    .dock.left .header img {
        cursor: pointer;
        height: 40px;
    }
    .dock.left .header .title {
        font-size: 1.15em;
    }
    .dock.left .label {
        font-size: 0.9em;
        margin-bottom: 10px;
    }
    .dock.left .selections {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-bottom: 15px;
    }
    .dock.left .selections div {
        height: 75px;
        background-color: var(--l-gray);
        border-radius: var(--border-s-radius);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 10px;
    }
    .dock.left .selections span {
        font-size: 0.7em;
        font-style: italic;
        opacity: 0.5;
    }
    .dock.left .selections div.active {
        outline: 2px solid var(--blue);
    }
    .dock.left .selections div.supplied {
        background-color: var(--blue);
    }
    .dock.left .selections div:hover, 
    .dock.left .buttons button:hover, 
    .dock.left .header img:hover, 
    .modal-bg .modal .buttons button:hover, 
    .modal-bg .modal .content a:hover
    ,.dock.right .display .buttons button:hover {
        filter: brightness(1.1);
    }
    .dock.left .buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .dock.left .buttons button {
        width: -webkit-fill-available;
        cursor: pointer;
        border: 0;
        border-radius: var(--border-s-radius);
        font-size: 1.1em;
        padding: 10px 5px;
        background-color: var(--blue);
    }
    .dock.left .buttons button.alternate {
        background-color: var(--gray);
        outline: 2px solid var(--blue);
        color: var(--l-blue);
    }
    .dock.left .label .active {
        color: var(--l-blue);
    }
    .dock.left .current-config {
        margin-top:10px;
    }

    .modal-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100dvh;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 4;
    }
    .modal-bg .modal {
        padding: 15px 20px;
        background-color: var(--gray);
        border-radius: var(--border-s-radius);
        width: 200px;
    }
    .modal-bg .modal.about {
        width: 300px;
        font-size: 1.1em;
    }
    .modal-bg .modal.about .buttons {
        margin-top: 20px;
    }
    .modal-bg .modal .title {
        font-size: 1.2em;
        margin-bottom: 5px;
    }
    .modal-bg .modal.about .title {
        font-size: 1.4em;
    }
    .modal-bg .modal img {
        margin: 10px 0 5px;
        height: 50px;
    }
    .modal-bg .modal .content {
        opacity: 0.8;
        font-size: 0.9em;
        margin-bottom: 10px;
    }
    .modal-bg .modal .buttons {
        display: flex;
        gap: 5px;
    }
    .modal-bg .modal .buttons.alt {
        flex-direction: column;
        margin-bottom: 10px;
    }
    .modal-bg .modal .buttons.alt .subtitle {
        padding: 20px 0 0;
    }
    .modal-bg .modal .buttons.alt .bg-group {
        display: flex;
        gap: 10px;
        align-items: center;
        margin: -20px 0 10px;
    }
    .modal-bg .modal .buttons.alt .bg-group img {
        height: 50px;
        width: 190px;
        border-radius: var(--border-s-radius);
    }
    .modal-bg .modal .buttons.alt .bg-group button {
        font-size: 0.8em;
        height: fit-content;
    }
    .modal-bg .modal .buttons.alt .bg-group button span {
        font-size: 0.8em;
        font-style: italic;
        opacity: 0.5;
    }
    .modal-bg .modal .buttons button {
        width: -webkit-fill-available;
        cursor: pointer;
        border: 0;
        border-radius: var(--border-s-radius);
        font-size: 1em;
        padding: 7px 3px;
        background-color: var(--blue);
    }
    .modal-bg .modal .subtitle {
        font-size: 0.8em;
        opacity: 0.7;
        margin: -5px 0 10px;
    }
    .modal-bg .modal.about .subtitle {
        margin-bottom: 20px;
        font-style: italic;
        font-size: 0.7em;
    }
    .modal-bg .modal .content a {
        text-decoration: none;
        color: var(--l-blue);
        font-weight: 600;
    }
    .modal-bg .modal input {
        width: -webkit-fill-available;
        margin-bottom: 10px;
        font-size: 1.2em;
        padding: 5px;
    }
    .dock.right .title {
        border-bottom: 1px solid var(--l-gray);
        padding: 15px 10px;
    }
    .dock.right .no-display {
        padding: 20px;
        font-style: italic;
        opacity: 0.5;
    }
    .dock.right .display {
        padding: 20px;
    }
    .dock.right .display .mockup {
        height: 65dvh;
        background-color: var(--d-gray);
        border-radius: var(--border-s-radius);
        display: flex;
        align-items: center;
        justify-content: center;
        background-position: center;
        background-size: 100%;
    }
    .dock.right .display .buttons {
        display: flex;
        justify-content: end;
        gap: 10px;
        margin-top: 15px;
        font-size: 1.1em;
    }
    .dock.right .display .buttons button {
        cursor: pointer;
        border: 0;
        border-radius: var(--border-s-radius);
        font-size: 1em;
        padding: 10px 40px;
        background-color: var(--blue);
    }
    .dock.right .display .mockup .design {
        max-height: 50dvh;
    }
    .dock.right .display .mockup .overlay {
        position: absolute;
        height: 55dvh;
        z-index: 1;
        filter: opacity(0.6);
    }
    .dock.right .display .mockup .parts {
        display: flex;
        gap: 23dvh;
    }
    .dock.right .display .mockup .parts .left-parts,.dock.right .display .mockup .parts .right-parts {
        display: flex;
        align-items: start;
    }
    .dock.right .display .mockup .parts .sleeve {
        height: 20dvh;
        position: relative;
        top: 4dvh;
        margin-right: 7.1dvh;
    }
    .dock.right .display .mockup .parts .sleeve.left {
        margin-right: 0;
        margin-left: -4.1dvh;
    }
    .dock.right .display .mockup .parts .torso {
        height: 55dvh;
    }
    .dock.right .display .mockup .parts .collar {
        height: 8.5dvh;
        position: relative;
        top: -0.2dvh;
        margin-right: -14.35dvh;
    }
    .dock.right .display .mockup .parts .back {
        height: 6.5dvh;
        margin-right: -26.5dvh;
        position: relative;
        top: 0.75dvh;
    }
    .notif {
        position: fixed;
        bottom: 80px;
        width: -webkit-fill-available;
        display: flex;
        justify-content: center;
        z-index: 5;
    }
    .notif .msg {
        padding: 20px 40px;
        border-radius: var(--border-s-radius);
        background-color: var(--l-gray);
        filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.15));
        text-align: center;
        max-width: 50vw;
    }
</style>