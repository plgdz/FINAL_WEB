window.addEventListener("load", () => {
    let dojo = document.querySelector("#dojo")
    dojo.addEventListener("click", popUpDojo) 

})

function popUpDojo() {
    console.log("dojo")
    
    let back = document.createElement("div")
    back.id = "dojo-menu-bg"
    back.style.backgroundColor = "white"
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
    container.style.alignItems = "center"
    container.style.justifyContent = "space-around"

    let jouer = document.createElement("div")
    jouer.style.width = "45%"
    jouer.style.height = "95%"
    jouer.style.backgroundColor = "red"
    jouer.style.borderRadius = "10px"
    jouer.style.display = "flex"
    jouer.style.alignItems = "center"
    jouer.style.justifyContent = "space-around"
    jouer.innerHTML = "<h1>JOUER</h1>"
    // jouer.style.position = "absolute"

    let practice = document.createElement("div")
    practice.style.width = "48%"
    practice.style.height = "95%"
    practice.style.backgroundColor = "blue"
    practice.style.borderRadius = "10px"
    practice.style.display = "flex"
    practice.style.alignItems = "center"
    practice.style.justifyContent = "space-around"
    practice.innerHTML = "<h1>PRATIQUE</h1>"
    // practice.style.position = "absolute"
    
    container.append(jouer)
    container.append(practice)

    document.querySelector("body").append(back)
    document.querySelector("body").append(container)

    back.addEventListener("click", removeDojoMenu)
}

function removeDojoMenu(){
    document.querySelector("#dojo-menu-bg").remove()
    document.querySelector("#dojo-menu").remove()
}