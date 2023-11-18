import {CarteHand} from './CarteHand.js'
import { CarteOpp } from './carteOpp.js'

let delay = 1000
let init = true
let yourTurn = null
let end = false

let spawn = 0

let handPlayer = []
let boardPlayer = []
let uidBdPlayer = []
let hand1 = 0

let handOpp = []
let boardOpp = []
let uidBdOpp = []

let hpOpp = document.querySelector('#hp-opp')
let mpOpp = document.querySelector('#mp-opp')
let ccOpp = document.querySelector('#cc-opp')

let hpPlayer = document.querySelector('#hp-player')
let mpPlayer = document.querySelector('#mp-player')
let ccPlayer = document.querySelector('#cc-perso')

let bdPlayer = document.querySelector('#board-player')
let bdOpp = document.querySelector('#board-opp')
let opp = document.getElementById('avatar-opp')

let cdNumber = document.querySelector('#countdown-number')



const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST"        // l’API (games/state)
    })
    .then(response => response.json())
    .then(data => {
        delay = 1000
        console.log(data)
   
        if (typeof data !== "object") {
            if ((data == 'LAST_GAME_WON' || data == "LAST_GAME_LOST") && !end ) {
                endGame(data)
            }
        } 
        else if (init){
           initDisplay(data)        
        } 
        else {
            updateDisplay(data)
        }

        setTimeout(state, delay); // Attendre 1 seconde avant de relancer l’appel
    })
}

// ------------- SET DRAGGABLE ------------------------------------------------
const playerCardPlayedBoard = (card) => {
    
    let c = card.getTemplate()

    handPlayer.push(card)
    if (3 >= hand1) {
        card.setContainer(document.getElementById("cc1"))
        hand1 += 1
    } else {
        card.setContainer(document.getElementById("cc2"))
    }
    
    Draggable.create('#' + c.id, {
        bounds: document.querySelector('#body'),
        onDrag: function () {
            bdPlayer.style.boxShadow = "0 0 5px 5px #7c725b41"
        },
        onDragEnd: function () {
            c.style.scale = '1'
            bdPlayer.style.boxShadow = "none"
            let hit = this.hitTest(bdPlayer)
                
            if (!hit) {
                gsap.to(this.target, {x: 0, y:0, duration: .5, ease: Back.easeOut(1.7)})
            } else {
                actionPlayerPlay(card)
            }
            // clear style of card
            c.style = ''
        }
    })
    
}

const playerCardSetDragBoard = (cardPlayer) => {
    cardPlayer.setIdBoard()
    let c = cardPlayer.getTemplate()

    if (!Draggable.get('#'+c.id)){
        console.log('set drag board')
        // Set the card on the board draggable
        Draggable.create('#'+c.id, {
            bounds: document.querySelector('#body'),
            onDrag: () => {
              gsap.to('#'+c.id, {scale: .5})
              hittableCard()
            },
            onDragEnd: () => {
                // Get the actualize opponent board to check who's the player is trying to attck
                let hitList = []
                boardOpp.forEach(cardOpp => {
                    hitList.push(document.getElementById('h'+cardOpp.uid))
                })
                console.log(hitList)

                hitList.forEach(hitZone => {
                    if (Draggable.get('#'+c.id).hitTest(hitZone)) {
                        let targetUid = hitZone.id
                        actionPlayerAttack(cardPlayer, targetUid.substring(1))
                    }
                })

                if (Draggable.get('#'+c.id).hitTest(opp)){
                    actionPlayerAttack(cardPlayer, '0')
                }

                gsap.to('#'+c.id, {x:0, y:0, scale:1})                           
            }
        })
    }
    
}

// ------------- ANIMATION CARD OPPONENT --------------------------------------
const oppCardPlayed = () => {
    let playedOpp = handOpp.pop() 
    let card = playedOpp.getTemplate()
    gsap.to(card, {y:200, duration: 1})
    gsap.to(card, {
        rotationY: 360,
        scale:2,
        opacity: 0,
        duration: 1,
        onComplete: function () {
          card.remove()
          }
      })
}

// ------------- PLAYER ACTION -------------------------------------------------
const actionPlayerPlay = (card) => {
  // Increase delay for state by 1sec
  delay += 1000

  let formData = new FormData()
  formData.append("type", "PLAY")
  formData.append("uid", card.uid)

  fetch("ajax-action.php", {   
    method : 'POST',
    body : formData
  })
  .then(response => response.json())
  .then(data => { 
    let c = card.getTemplate()

    if (typeof data !== "object") {
        errManager(data)
      gsap.to('#'+c.id, {x: 0, y: 0})
    } else {
      updateDisplay(data)

        card.mechanics.forEach(mech => {
            if (mech.includes('Spawn')) {
                spawn = mech.match(/(\d+)/);
            }
        })

        if (card.container == 'cc1') {
        hand1 -= 1;
        }

      // remove card from hand put it in board
      document.getElementById(c.id).remove()


      // reset the position of the div after the drag + reset GSAP origin
      c.style.transform = "translate(" + 0 +","+0+')'
      gsap.set('#'+c.id, {x: 0, y: 0})

      // set the new draggable for the moved card
      playerCardSetDragBoard(card)

      // actualize the hand list and counter
      handPlayer = handPlayer.filter(cr => cr.uid != card.uid)

    }
  })
  
}

const actionPlayerEndTurn = () => {
  // Increase delay for state by 1sec
  delay += 1000

  let formData = new FormData()
  formData.append("type", "END_TURN")

  fetch("ajax-action.php", {   
    method : 'POST',
    body : formData
  })
  .then(response => response.json())
  .then(data => {
    if (typeof data == "object") {
        updateDisplay(data)
    } else {
        errManager(data)
    }
  })

}

const actionPlayerAttack = (card, targetUid) => {
  // Increase delay for state by 1sec
  delay += 1000
  
  let formData = new FormData()
  formData.append("type", "ATTACK")
  formData.append("uid", card.uid)
  formData.append("targetuid", targetUid)

  fetch("ajax-action.php", {   
    method : 'POST',
    body : formData
  })
  .then(response => response.json())
  .then(data => { 
    if (typeof data !== "object") {
        errManager(data)      
    } else {
        updateDisplay(data) 
    }
  })
}

const actionPlayerHeroPower = () => {
    // Increase delay for state by 1sec
    delay += 1000
    
    let formData = new FormData()
    formData.append("type", "HERO_POWER")
    
    fetch("ajax-action.php", {   
        method : 'POST',
        body : formData
    })
    .then(response => response.json())
    .then(data => { 
        if (typeof data !== "object") {
            errManager(data)      
        } else {
            updateDisplay(data) 
        }
    })
}

// ----------------- DISPLAY UPDATES -----------------------------
const initDisplay = (data) => {
    yourTurn = data['yourTurn']
    timerBar(data)
    cdNumber.innerHTML = data['remainingTurnTime']

    heroPowerCheck(data)
    actualizeHpMpCc(data)

    // -------------- PLAYER -----------------------------------------
    // Set display of player hand and store data in list handPlayer
    data['hand'].forEach(cardData => {
        let card = new CarteHand(cardData, 'player')
        playerCardPlayedBoard(card)
    })

    // Set display of player board hand store data in 
    data['board'].forEach(cardData => {
        let card = new CarteHand(cardData, 'player')
        card.setContainer(bdPlayer)
        boardPlayer.push(card)
        playerCardSetDragBoard(card)
        uidBdPlayer.push(cardData.uid)
    })


    // ------------------- OPPONENT -----------------------------------
    // Set display of opponent hidden hand
    for (let i = 0; i < data['opponent']['handSize']; i++) {
        handOpp.push(new CarteOpp())
    }

    // Set display of opponent board
    data['opponent']['board'].forEach(cardData => {
        let card = new CarteHand(cardData, 'opponent')
        card.setContainer(bdOpp)
        uidBdOpp.push(cardData.uid)
    })
    boardOpp = data['opponent']['board']
    // Display is set : turn var to false to run the the game from this state (recall if page reloaded during the game to display the actual state)
    init = false
}

const updateDisplay = (data) => {
    if (yourTurn != data['yourTurn']) {
        yourTurn = data['yourTurn']
        timerBar(data)
    }
    cdNumber.innerHTML = data['remainingTurnTime']

    actualizeHpMpCc(data)
    heroPowerCheck(data)
    playableCard(data)

    document.querySelector('#container-card-opp').innerHTML = ''
    for (let i = 0; i < data['opponent']['handSize']; i++) {
        handOpp.push(new CarteOpp())
    }
    // if new card in players hand, add Draggable to this card
    if (data['hand'].length > handPlayer.length) {
        playerCardPlayedBoard(new CarteHand(data['hand'].pop()))
    }

    boardManager(data)
    actualizeCardBoard(data)
}

const boardManager = (data) => {
    // Board opp verification
    let tempOpp = [] 
    data['opponent']['board'].forEach(card => {
        tempOpp.push(card.uid)
    })
    let tmpJoinOp = tempOpp.join('-')

    if (tmpJoinOp != uidBdOpp.join('-')) {
        
        if (tmpJoinOp.length > uidBdOpp.length) {
            oppCardPlayed()
            setTimeout(1000, drawBoardOpp(data))
        } else {
            drawBoardOpp(data)
        }
        
    }
    boardOpp = data['opponent']['board']

    // Board player verification
    let tempPlayer = [] 
    data['board'].forEach(card => {
        tempPlayer.push(card.uid)
    })
    let tmpJoinPl = tempPlayer.join('-')

    if (tmpJoinPl != uidBdPlayer.join('-')) {
        bdPlayer.innerHTML = ""
        uidBdPlayer = []
        data['board'].forEach(cardData => {
            let card = new CarteHand(cardData, 'player')
            card.setContainer(bdPlayer)
            boardPlayer.push(card)
            uidBdPlayer.push(cardData.uid)
            playerCardSetDragBoard(card)
        })
    }

}

const drawBoardOpp = (data) => {
    bdOpp.innerHTML = ""
    uidBdOpp = []
    data['opponent']['board'].forEach(cardData => {
        let card = new CarteHand(cardData, 'opponent')
        card.setContainer(bdOpp)
        uidBdOpp.push(cardData.uid)
    })
}

const actualizeCardBoard = (data) => {  
    drawBoardOpp(data)
    
    data['board'].forEach(cardData => {
        boardPlayer.forEach(cardBoard => {
            if (cardData.uid == cardBoard.uid){
                cardBoard.update(cardData)
            }
        })
    })
}

const actualizeHpMpCc = (data) => {
    // display hp and mp for both players
    hpOpp.innerHTML = data['opponent']['hp']
    mpOpp.innerHTML = data['opponent']['mp']
    ccOpp.innerHTML = data['opponent']['remainingCardsCount']

    hpPlayer.innerHTML = data['hp']
    mpPlayer.innerHTML = data['mp']
    ccPlayer.innerHTML = data['remainingCardsCount']
}

const timerBar = () => {
    let timer = document.querySelector('#timer')
    
    if (yourTurn) {
        timer.innerHTML = ""
        document.querySelector('#countdown').style.filter = 'grayscale(0)'
        timer.innerHTML = '<circle class="running-timer" r="40" cx="50" cy="50"></circle>'
    } else {
        timer.innerHTML = ""
        document.querySelector('#countdown').style.filter = 'grayscale(1)'
        timer.innerHTML = '<circle class="running-timer" r="40" cx="50" cy="50"></circle>'
    }
}

const playableCard = (data) => {
    if (yourTurn){
        handPlayer.forEach(card => {
            if (card.cost <= data['mp']) {
                card.getTemplate().classList.add('playable')
            } else {
                card.getTemplate().classList.remove('playable')
            }
        })
        boardPlayer.forEach(card => {
            if (card['state'] == 'IDLE') {
                card.getTemplate().classList.add('playable')
            } else {
                card.getTemplate().classList.remove('playable')
            }
        })
    } else {
        handPlayer.forEach(card => {     
            card.getTemplate().classList.remove('playable')  
        })
        boardPlayer.forEach(card => {
            card.getTemplate().classList.remove('playable')  
        })
    }
}

const hittableCard = () => {
    let taunt = 0
    if (yourTurn){
        boardOpp.forEach(card => {
            if (card.mechanics.length > 0){
                card['mechanics'].forEach(mech => {
                    if (mech.includes('Taunt')) {
                        document.querySelector('#h'+card.uid).className += 'hittable'
                        taunt += 1
                    }
                })

            }
        })
        if (taunt == 0) {
            boardOpp.forEach(card => {
                document.querySelector('#h'+card.uid).className += ' hittable'
                opp.className += ' hittable'                 
            })
        }
    } else {
        boardOpp.forEach(card => {
            document.querySelector('#h'+card.uid).classList.remove('hittable')
            opp.classList.remove('hittable')                    
        })
    }
}

const errManager = (data) => {
    let err = document.createElement('div')
    err.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); width:25%; height: 15%; z-index:1001; text-align:center;'
    err.id = 'error'

    switch (data) {
        case 'INVALID_ACTION':
            err.innerHTML = "Action invalide"
            break;
        case 'ACTION_IS_NOT_AN_OBJECT':
            err.innerHTML = "Action invalide"
            break;
        case 'NOT_ENOUGH_ENERGY':
            err.innerHTML = "Pas assez d'énergie"
            break;
        case 'BOARD_IS_FULL':
            err.innerHTML = "Le plateau est plein"
            break;
        case 'CARD_NOT_IN_HAND':
            err.innerHTML = "La carte n'est pas dans la main"
            break;
        case 'CARD_IS_SLEEPING':
            err.innerHTML = "La carte est endormie"
            break;
        case 'MUST_ATTACK_TAUNT_FIRST':
            err.innerHTML = "Vous devez attaquer la carte avec Provocation"
            break;
        case 'OPPONENT_CARD_NOT_FOUND':
            err.innerHTML = "La carte adverse n'a pas été trouvée"
            break;
        case 'OPPONENT_CARD_HAS_STEALTH':
            err.innerHTML = "La carte adverse est furtive"
            break;
        case 'CARD_NOT_FOUND':
            err.innerHTML = "La carte n'a pas été trouvée"
            break;
        case 'ERROR_PROCESSING_ACTION':
            err.innerHTML = "Erreur lors du traitement de l'action"
            break;
        case 'INTERNAL_ACTION_ERROR':
            err.innerHTML = "Erreur interne"
            break;
        case 'HERO_POWER_ALREADY_USED':
            err.innerHTML = "Le pouvoir héroïque a déjà été utilisé"
            break;
    }

    document.querySelector('body').appendChild(err)

    err.style.opacity = '1'
    setTimeout(() => {
        err.style.opacity = '0'
        document.querySelector('body').removeChild(err)
    }, 2000);
}

const endGame = (data) => {
    end = true
    let main = document.querySelector('body')
    let bg = document.createElement('div')
    bg.style = 'position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,.5); z-index:1000'

    let endGame = document.createElement('div')
    endGame.style = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); width:25%; height: 15%; background-color:#5C4033; border-radius:10px; z-index:1001; border: 5px solid #7c725b;'
    let endText = document.createElement('h1')
    endText.style = "text-align:center;font-size:2rem; color:#fff; margin:0; padding-top:5%;"

    if (data == 'LAST_GAME_WON') {
        endText.innerHTML = 'YOU WON !'
    } else {
        endText.innerHTML = 'YOU LOST !'
    }

    let endButton = document.createElement('button')
    endButton.style = 'position:absolute; bottom:10%; left:50%; transform:translateX(-50%); width:50%; height:20%; border:none; border-radius:10px; background-color:#7c725b; color:#fff; font-size:1.5rem; cursor:pointer;'
    endButton.innerHTML = 'RETOUR'

    endButton.addEventListener('click', () => {
        window.location.href = 'lobby.php'
    })

    endGame.appendChild(endText)
    endGame.appendChild(endButton)
    bg.appendChild(endGame)
    
    main.appendChild(bg)
}

const heroPowerCheck = (data) => {
    if (data['heroPowerAlreadyUsed']) {
        document.querySelector('#hero-power').style.filter = 'grayscale(1)'
    }
}

// -------------------------------------------------------------------------------------
window.addEventListener("load", () => {
    // ----------------- STATIC ACTIONS -----------------------
    document.querySelector('#end-turn').addEventListener('click', () => {
      actionPlayerEndTurn()
    })

    document.querySelector('#hero-power').addEventListener('click', () => {
        actionPlayerHeroPower()
    })
    
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});


