const addListButton = document.getElementById('add-one-list')
const addContentButton = document.getElementById('add-one-content')

// Sections
const mainSection = document.getElementById('main-section');
const listAddingSection = document.getElementById('list-adding-section');
const contentAddingSection = document.getElementById('content-adding-section');

// Toggle button
const toggleButtonContainer = document.getElementById('toggle-button-container')
const toggleButton = document.getElementById('toggle-button')

const listCreationInput = document.getElementById('list-creation-input');
const listCreationLabel = document.getElementById('list-creation-label')

var currentSection = mainSection

function showSection(section) {
    currentSection.style.display = 'none'
    section.style.display = 'block'
    currentSection = section;
}

addListButton.onclick = () => {

    showSection(listAddingSection)

    const colorOptions = Object.values(document.getElementsByClassName('color-option'));
    const defaultOption = colorOptions.splice(0, 1)[0]

    const setCurrentColor = (borderColor, textColor = borderColor, labelColor = borderColor) => {
        listCreationInput.style.borderColor = borderColor
        listCreationInput.style.color = textColor
        listCreationLabel.style.color = labelColor
    }

    defaultOption.setAttribute('style', `background: linear-gradient(#DBDBDB, #FFF)`);
    defaultOption.onclick = () => {setCurrentColor('#DBDBDB', '#000', 'black')}

    colorOptions.forEach(element => {

        let elementColor = element.getAttribute('value');

        element.setAttribute('style', `background: linear-gradient(${elementColor}, #FFF)`)
        element.onclick = () => {setCurrentColor(elementColor)}
    })
}
addContentButton.onclick = () => showSection(contentAddingSection)

function addOverlay() {

    const sendMessage = (tabs) => {
        browser.tabs.sendMessage(
            tabs[0].id,
            "Hello World"
        )
    }

    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessage)
}

toggleButtonContainer.onclick = () => {

    if (toggleButtonContainer.isToggled) {
        toggleButton.style.transform = 'translateX(0)'
        toggleButtonContainer.isToggled = false
        return 0
    }

    toggleButton.style.transform = 'translateX(125%)'
    toggleButtonContainer.isToggled = true
    addOverlay();
}

document.getElementById('back-to-main-section').onclick = () => {
    showSection(mainSection)
}