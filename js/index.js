const connectionRequest = () => {
    console.log("connectionRequest")
    let formData = new FormData();
    formData.append("username", document.querySelector("#username").value)
    formData.append("password", document.querySelector("#password").value)
    fetch("ajax-connection.php", {   
        method : 'POST',
        body : formData
      })
      .then(response => response.json())
      .then(data => {
        if (typeof data == "object") {
            localStorage.setItem('key', data.key)
            let opacity = 0
            let transition = document.createElement("div")
            transition.style.width = "100vw"
            transition.style.height = "100vh"
            transition.style.backgroundColor = "white"
            transition.style.position = "absolute"
            transition.style.top = 0
            transition.style.left = 0
            transition.style.opacity = 0
            document.querySelector("body").append(transition)
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    opacity += 0.01
                    transition.style.opacity = opacity
                }, 10 * i)
            }
            setTimeout(() => {
                window.location.href = "lobby.php"
            }, 2000)
        } else {
            console.log(data)
        }
    })
}

window.addEventListener("load", () => {
    document.querySelector("button").addEventListener("click", connectionRequest)
})
