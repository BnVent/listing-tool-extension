const createListButton = document.getElementById('create-list-button');
const colorOptions = Object.values(document.getElementsByClassName('color-option'));
const defaultOption = colorOptions.splice(0, 1)[0]
const listCreationInput = document.getElementById('list-creation-input');
const listCreationLabel = document.getElementById('list-creation-label');

import { Sections, showSection, addNewOption } from './main-section.js'


document.getElementById('back-to-main-section').onclick = () => {
    showSection(Sections.mainSection)
}

createListButton.onclick = () => {

    let color = listCreationInput.style.color !== '#000'
        ? listCreationInput.style.color
        : null

    addNewOption(listCreationInput.value, color)
    showSection(Sections.mainSection)
}

createListButton.disabled = true;

listCreationInput.oninput = (event) => {

    if (event.target.value === '') {
        createListButton.disabled = true;
        return 0
    }

    createListButton.disabled = false;
}

const setCurrentColor = (borderColor, textColor = borderColor, labelColor = borderColor) => {
    listCreationInput.style.borderColor = borderColor
    listCreationInput.style.color = textColor
    listCreationLabel.style.color = labelColor
}

defaultOption.setAttribute('style', `background: linear-gradient(#DBDBDB, #FFF)`);
defaultOption.onclick = () => { setCurrentColor('#DBDBDB', '#000', '#6C6C6C') }

colorOptions.forEach(element => {

    let elementColor = element.getAttribute('value');

    element.setAttribute('style', `background: linear-gradient(${elementColor}, #FFF)`)
    element.onclick = () => { setCurrentColor(elementColor) }
})