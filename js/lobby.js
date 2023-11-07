let started = false
let playing = false

window.addEventListener("load", () => {

    let arene = document.querySelector("#arene")
    let menu = document.querySelector("#burger-menu")
    arene.addEventListener("click", popUpDojo)
    menu.addEventListener("click", burgerMenu)

})

function popUpDojo() {
    console.log("dojo")
    
    let back = document.createElement("div")
    back.id = "dojo-menu-bg"
    back.style.backgroundColor = "white"
    back.style.position = "absolute"
    back.style.top = 0
    back.style.height = "100vh"
    back.style.width = "100vw"
    back.style.opacity = "0.3"

    let container = document.createElement("div")
    container.id = "dojo-menu"
    container.style.width = "30vw"
    container.style.height = "50vh"
    container.style.backgroundColor = "rgb(77, 73, 66)"
    container.style.borderRadius = "10px"
    container.style.position = "absolute"
    container.style.top = "50%"
    container.style.left = "50%"
    container.style.transform = "translate(-50%, -50%)"
    container.style.display = "flex"
    container.style.justifyContent = "space-around"

    let pvp = elemMenu("PVP", "JOUER")
    let training = elemMenu("TRAINING", "PRATIQUE")
    
    container.append(pvp)
    container.append(training)

    document.querySelector("body").append(back)
    document.querySelector("body").append(container)

    back.addEventListener("click", removeDojoMenu)
}

function elemMenu(gameType, title) {

    let element = document.createElement("form")
    element.setAttribute('action', '')
    element.setAttribute('method', 'post')
    element.style.padding = "0"
    element.style.width = "45%"
    element.style.height = "95%"
    element.style.display = "block"
    element.style.backgroundColor = "red"
    element.style.borderRadius = "10px"
    element.style.display = "flex"
    element.style.alignItems = "center"
    element.style.justifyContent = "space-around"
    element.style.position = "relative"
    element.style.top = "50%"
    element.style.transform = "translateY(-50%)"

    let input = document.createElement("input")
    input.setAttribute('name', 'game_mode')
    input.setAttribute('value', gameType)
    input.setAttribute('type', 'hidden')

    let btn = document.createElement("button")
    btn.style.width = "100%"
    btn.style.height = "100%"
    btn.style.margin = "0"

    btn.innerHTML = title
    btn.setAttribute("type", "submit")

    if (gameType == "PVP") {
        btn.style.backgroundImage = 'url("../images/background/pvp.jpg")'  
    } else {
        btn.style.backgroundImage = 'url("../images/background/training.jpg")'
    }

    btn.style.backgroundPosition = "center"
    btn.style.backgroundRepeat = "no-repeat"
    btn.style.backgroundSize = "cover"
    btn.style.backgroundAttachment = "fixed"

    btn.style.color = "white"
    btn.style.fontFamily = "'Ubuntu', sans-serif"
    btn.style.fontSize = "larger"
    btn.style.fontWeight = "700"

    element.append(input)
    element.append(btn)

    return element 
}

function removeDojoMenu(){
    document.querySelector("#dojo-menu-bg").remove()
    document.querySelector("#dojo-menu").remove()
}

function burgerMenu(){
    let menu = document.createElement("div")
    menu.style.height = "250px"
    menu.style.width = "15vw"
    menu.style.position = "absolute"
    menu.style.top = "20px"
    menu.style.right = "40px"
    menu.style.backgroundColor = "#3a3838"
    menu.style.borderRadius = "10px"
    menu.style.border = "solid 4px #252424"

    let menuTitle = document.createElement('h2')
    menuTitle.innerHTML = "PARAMETRES"
    menuTitle.style.textAlign = "center"
    menuTitle.style.fontFamily = "'Ubuntu', sans-serif"
    menuTitle.style.color = "#ebe7e5"
    menu.append(menuTitle)

    let listMenu = document.createElement('ul')

    let music = document.createElement('li')
    music.style.display = "flex"
    music.style.alignItems = "center"
    music.innerHTML = '<p>Musique</p>\
        <label class="switch">\
            <input id="toggle" type="checkbox">\
            <span class="slider round"></span>\
        </label>'    

    let deckCreation = document.createElement('li')
    deckCreation.className = "elem-menu"
    deckCreation.innerHTML = 'Gestion du deck'

    let signout = document.createElement('li')
    signout.className = "elem-menu"
    signout.innerHTML = '\
        <form method="post" class="inline">\
            <button type="submit" name="signout" value="signout">\
              Deconnexion\
            </button>\
        </form>\
    '
    
    listMenu.append(music)
    listMenu.append(deckCreation)
    listMenu.append(signout)

    let close = document.createElement('div')
    close.className = 'close'
    
    close.addEventListener('click', () => {
        menu.remove()
    })

    menu.append(close)
    menu.append(listMenu)
    document.querySelector("body").append(menu)
    
    // Set l'etat du bouton en fonction de la musique
    document.querySelector('#toggle').checked = playing

    document.querySelector('#toggle').addEventListener('change', () => {
        started = true
        if (document.querySelector('#toggle').checked) {
            document.querySelector("#music").play()
        } else {
            document.querySelector("#music").pause()
        }
        playing = !playing
    })

    deckCreation.addEventListener('click', () => {
        openDeck()
        menu.remove()
    })
    
}

function openDeck() {
    let deckDisplay = document.querySelector('#deck-back')
    deckDisplay.style.display = 'block'
    deckDisplay.style.zIndex = '9'

    deckDisplay.addEventListener('click', () => {
        deckDisplay.style.display = 'none'
    })
}

const applyStyles = iframe => {
	let styles = {
		fontColor : "#ebe7e5",
		backgroundColor : "#3a3838",
		fontGoogleName : "Ubuntu",
		fontSize : "1.2rem",
		hideIcons : false,
		inputBackgroundColor : "#252424",
		inputFontColor : "#ebe7e5",
		height : "100%",
        width : "100%",
        zIndex : "1",
		memberListFontColor : "white",
		borderColor : "black",
		memberListBackgroundColor : "#252424",
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}, 100);
}

