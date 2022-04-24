const addListButton = document.getElementById('add-one-list')
const addContentButton = document.getElementById('add-one-content')
const listSelection = document.getElementById('list-selection');

const Sections = {
    mainSection: document.getElementById('main-section'),
    listAddingSection: document.getElementById('list-adding-section'),
    contentAddingSection: document.getElementById('content-adding-section')
}

// Toggle button
const toggleButtonContainer = document.getElementById('toggle-button-container')
const toggleButton = document.getElementById('toggle-button')

const listCreationInput = document.getElementById('list-creation-input');
const listCreationLabel = document.getElementById('list-creation-label')

var currentSection = Sections.mainSection

function showSection(section) {
    currentSection.style.display = 'none'
    section.style.display = 'block'
    currentSection = section;
}

addListButton.onclick = () => {
    showSection(Sections.listAddingSection)
}

var listOptions = [
    { name: 'Anime', color: null },
    { name: 'Books', color: null },
    { name: 'Movies', color: null }
]

listSelection.innerHTML = listOptions.map(element => {
    return `<option>${element.name}</option>`
})

addContentButton.onclick = () => showSection(Sections.contentAddingSection)

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

export {Sections, listSelection, listCreationInput, showSection}