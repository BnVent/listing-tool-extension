const addListButton = document.getElementById('add-one-list')
const addContentButton = document.getElementById('add-one-content')

const categoryList = document.getElementById('category-list'); // Change name to category list
const contentList = document.getElementById('content-list')

const categoryListLabel = document.getElementsByClassName('input-label')[0]

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

refreshCategoryList();

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
        categoryList.disabled = false
        contentList.disabled = false
        addContentButton.disabled = false
        addListButton.disabled = false
        toggleButton.style.backgroundColor = '#DBDBDB'
        toggleButtonContainer.style.backgroundColor = '#FFF'
        return 0
    }

    toggleButton.style.transform = 'translateX(125%)'
    toggleButtonContainer.isToggled = true
    categoryList.disabled = true
    contentList.disabled = true
    addContentButton.disabled = true
    addListButton.disabled = true
    toggleButtonContainer.style.backgroundColor = 'rgb(128, 255, 128)'
    toggleButton.style.backgroundColor = 'rgb(64, 128, 64)'
    addOverlay();
}

categoryList.onchange = () => { colorVerification() }

function refreshCategoryList() {

    categoryList.innerHTML = listOptions.map((element, index, array) => {
        return `<option>${element.name}</option>`
    })

    // The last added element will be selected.
    let childrensList = categoryList.children
    childrensList[childrensList.length - 1].setAttribute('selected', true);
}

function colorVerification() {

    listOptions.forEach(element => {
        if (element.name === categoryList.value) {
            // Assigned color | default color
            categoryList.style.color = element.color ?? '#000'
            categoryList.style.borderColor = element.color ?? '#DBDBDB'
            categoryListLabel.style.color = element.color ?? '#6C6C6C'
            return 0
        }
    });
}

function addNewOption(name, color) {
    listOptions.push({ name: name, color: color })
    refreshCategoryList();
    colorVerification();
}

export { Sections, showSection, addNewOption }