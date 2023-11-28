window.addEventListener("load", () => {
    let add = document.querySelector("#new")
    add.addEventListener("click", () => {
        console.log("add")
        notePopUp("add")
    }
    )

    let del = document.querySelectorAll(".comment-delete")
    del.forEach(element => {
        element.addEventListener("click", () => {
            notePopUp("delete", element.children[0].innerText)
            console.log(element.children[0].innerText)
            
        })
    })

    let edit = document.querySelectorAll(".comment-edit")
    edit.forEach(element => {
        element.addEventListener("click", () => {
            notePopUp("edit", element.children[0].innerText)
            console.log(element.children[0].innerText)
        })
    })
})

const notePopUp = (action, idNote) => {
    let bg = document.createElement("div")
    bg.style.position = "absolute"
    bg.style.top = 0
    bg.style.left = 0
    bg.style.width = "100vw"
    bg.style.height = "100vh"
    bg.style.backgroundColor = "white"
    bg.style.opacity = 0.5
        
    let container = document.createElement("div")
    container.style.position = "absolute"
    container.style.top = "50%"
    container.style.left = "50%"
    container.style.transform = "translate(-50%, -50%)"
    container.style.width = "25vw"
    if (action == "delete") {
        container.style.height = "20vh"
    } else {
        container.style.height = "45vh"
    }
    container.style.backgroundColor = "rgb(77, 73, 66)"
    container.style.borderRadius = "10px"
    container.style.alignItems = "center"
    container.style.border = "solid 3px rgb(56, 53, 48)"

    let actionName = document.createElement("input")
    actionName.name = "action"
    actionName.type = "hidden"
    if (action == "add") {
        actionName.value = "add"
        container.innerHTML = "<h1>Ajouter une nouvelle note !</h1>"
    } else if (action == "edit") {
        actionName.value = "edit"
        container.innerHTML = "<h1>Modifier une note !</h1>"
    } else if (action == "delete") {
        actionName.value = "delete"
        container.innerHTML = "<h1>Supprimer une note !</h1>"
    }

    let br = document.createElement("div")
    br.id = "break"
    br.style.width = "100%"
    br.style.height = "2px"

    let form = document.createElement("form")
    form.action = "comments.php"
    form.method = "POST"
    form.style.display = "flex"
    form.style.flexDirection = "column"
    form.style.justifyContent = "space-around"
    form.style.height = "75%"
    form.style.width = "100%"
    form.style.marginTop = "2%"

    form.append(actionName)
        
    if (action !== "delete") {
        if (action == "edit") {
            let id = document.createElement("input")
            id.type = "hidden"
            id.name = "id"
            id.value = idNote
            form.append(id)
        }

        let divTitle = document.createElement("div")
        divTitle.style.width = "60%"
        divTitle.style.marginLeft = "1%"
        divTitle.style.display = "flex"
        divTitle.style.flexDirection = "column"

        let labelTitle = document.createElement("label")
        labelTitle.for = "title"
        labelTitle.innerHTML = "Titre"

        let title = document.createElement("input")
        title.type = "text"
        title.name = "title"
        if (action == "edit") {
            let id = idNote.trim()
            title.value = document.querySelector('#c'+id).children[0].children[0].innerText
        } else {
            title.placeholder = "Titre"
        }
        divTitle.append(labelTitle)
        divTitle.append(title)

        let divDescription = document.createElement("div")
        divDescription.style.width = "98%"
        divDescription.style.margin = "auto"
        divDescription.style.display = "flex"
        divDescription.style.flexDirection = "column"

        let labelDescription = document.createElement("label")
        labelDescription.for = "note"
        labelDescription.innerHTML = "Note"

        let description = document.createElement("textarea")
        description.type = "text"
        description.rows = 10
        description.name = "note"
        if (action == "edit") {
            description.value = document.querySelector('#c'+idNote.trim()).children[1].innerText
        } else {
            description.placeholder = "Note ..."
        }
        divDescription.append(labelDescription)
        divDescription.append(description)
        
        form.append(divTitle)
        form.append(divDescription)
    } else {
        let id = document.createElement("input")
        id.type = "hidden"
        id.name = "id"
        id.value = idNote
        form.append(id)
    }

    let divSubmit = document.createElement("div")
    divSubmit.style.width = "100%"
    divSubmit.style.display = "flex"
    divSubmit.style.justifyContent = "center"

    let submit = document.createElement("button")
    submit.type = "submit"
    if (action == "delete") {
        submit.innerText = "Supprimer"
    } else if (action == "edit") {
        submit.innerText = "Modifier"
    } else if (action == "add") {
        submit.innerText = "Ajouter"
    }

    divSubmit.append(submit)
    form.append(divSubmit)

    container.append(br)
    container.append(form)

    document.querySelector("body").append(bg)
    document.querySelector("body").append(container)

    bg.addEventListener("click", () => {
        bg.remove()
        container.remove()
    })
}