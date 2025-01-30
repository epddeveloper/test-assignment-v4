import {X} from './../libraries/X.js';

const libraryX = new X();
const info = document.getElementById('info');

info.classList.add('info-container--hidden');


function getRelativeSelector(element) {
    if (element.id) {
        return `#${element.id}`;
    }
    const parts = [];
    while (element.parentElement) {
        let selector = element.tagName.toLowerCase();
        if (element.className) {
            selector += `.${element.className.trim().split(/\s+/).join('.')}`;
        }
        const siblingIndex = [...element.parentElement.children].indexOf(element) + 1;
        selector += `:nth-child(${siblingIndex})`;
        parts.unshift(selector);
        element = element.parentElement;
    }
    return parts.join(' > ');
}

function displayNodeInfo(node) {
    const nodeSelector = document.getElementById('nodeSelector');
    const nodeInfo = document.getElementById('nodeInfo');

    nodeSelector.textContent = getRelativeSelector(node);
    nodeInfo.textContent = `${node.outerHTML}`;
    info.classList.remove('info-container--hidden');
}

function removeNodeInfo(){
    nodeSelector.textContent = '';
    nodeInfo.textContent = '';
    info.classList.add('info-container--hidden');

}

document.getElementById('init').addEventListener('click', () => {
    const root = document.getElementById('root');

    libraryX.init(root, (error) => {
        const info = document.getElementById('info');
        if (error) {
            console.error('Initialization failed', error);
            info.textContent = `Error: ${error.message}`;
        } else {
            console.log('Initialization completed');
            displayNodeInfo(root);
        }
    });
});

document.getElementById('destroy').addEventListener('click', () => {
    libraryX.destroy(document.getElementById('root'));
    removeNodeInfo();
    console.log('Destroy completed');
});


document.getElementById('done').addEventListener('click', () => {
    console.log('Implementation for marking a widget as done');
});

    document.getElementById('fail').addEventListener('click', () => {
    console.log('Implementation for simulating a widget failure');
});