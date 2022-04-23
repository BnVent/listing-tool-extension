browser.runtime.onMessage.addListener(request => {

    const date = new Date();
    const today = date.toDateString()

    let newElement = document.createElement('div')

    newElement.setAttribute('style', `
        width: 100%;
        display: flex;
        justifyContent: center;
        gap: 1rem;
        padding: 0.5rem 1rem 0.5rem 1rem;
        background-color: rgb(64, 255, 64);
        color: rgb(32, 128, 32);
        font-family: sans-serif;
        transition: top 0.5s;
        position: fixed;
        left: 0;
        z-index: 9999;
    `)

    let content = `This content has already been viewed. ${today}`
    newElement.innerText = content;

    document.body.style.transition = 'margin-top 0.5s'
    document.body.insertAdjacentElement("afterbegin", newElement)

    newElement.style.top = `-${newElement.clientHeight}px`

    setTimeout(() => {
        document.body.style.marginTop = `${newElement.clientHeight}px`
        newElement.style.top = '0'
    }, 100);
});