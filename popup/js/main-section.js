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

refreshSelectionList();

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

listSelection.onchange = () => {colorVerification()}

function refreshSelectionList(){

    listSelection.innerHTML = listOptions.map((element, index, array) => {
        return `<option>${element.name}</option>`
    })

    let childrensList = listSelection.children
    childrensList[childrensList.length - 1].setAttribute('selected', true);
}

function colorVerification(){

    listOptions.forEach(element => {
        if (element.name === listSelection.value) {
            // Assigned color | default color
            listSelection.style.color = element.color ?? '#000'
            listSelection.style.borderColor = element.color ?? '#DBDBDB'
            return 0
        }
    });
}

function addNewOption(name, color) {
    listOptions.push({ name: name, color: color })
    refreshSelectionList();
    colorVerification();
}

export { Sections, listSelection, showSection, addNewOption }