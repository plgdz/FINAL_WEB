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
            localStorage.setItem('username', document.querySelector("#username").value)
            console.log(data)
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
            let err = document.createElement('div')
            err.style = 'position:fixed; top:25%; left:50%; transform:translate(-50%, -50%); width:25%; height: 15%; z-index:1001;\
                        display: flex; justify-content:center;align-items:center;background-color: rgb(77, 73, 66);; height:5vh;border:solid 3px rgb(56, 53, 48);\
                        border-radius:20px;color:white'
            err.id = 'error'
            err.innerHTML = "IDENTIFIANT OU MOT DE PASSE INCORRECT"

            document.querySelector('body').appendChild(err)

            err.style.opacity = '1'
            setTimeout(() => {
                err.style.opacity = '0'
                document.querySelector('body').removeChild(err)
            }, 2000);
        }
    })
}

window.addEventListener("load", () => {
    if (localStorage.getItem('username')) {
        document.querySelector('#username').value = localStorage.getItem('username')
    }

    document.querySelector("button").addEventListener("click", connectionRequest)
})
