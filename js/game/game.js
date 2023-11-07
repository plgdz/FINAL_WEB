import {CarteHand} from './CarteHand.js'
import { CarteOpp } from './carteOpp.js'

let delay = 1000
let init = true

let actions = 0

let handPlayer = []
let boardPlayer = []
let sizeHandPlayer = 0
let sizeBoardPlayer = 0
let hand1 = 0

let handOpp = []
let boardOpp = []

let handOppSize = 0
let sizeBoardOpp = 0

let hpOpp = document.querySelector('#hp-opp')
let mpOpp = document.querySelector('#mp-opp')

let hpPlayer = document.querySelector('#hp-player')
let mpPlayer = document.querySelector('#mp-player')

let bdPlayer = document.querySelector('#board-player')
let bdOpp = document.querySelector('#board-opp')



const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST"        // l’API (games/state)
    })
    .then(response => response.json())
    .then(data => {
      delay = 2000
        
        console.log(data)
   
        if (typeof data !== "object") {
            console.log('ERROR : ' + data)

            if (data == 'LAST_GAME_WON' || data == "LAST_GAME_LOST") {
                console.log('PARTIE TERMINEE')
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
    let c = cardPlayer.getTemplate()

    // Set the card on the board draggable
    Draggable.create('#'+c.id, {
        bounds: document.querySelector('#body'),
        onDrag: () => {
          gsap.to('#'+c.id, {scale: .5}) 
        },
        onDragEnd: () => {
            // Get the actualize opponent board to check who's the player is trying to attck
            let hitList = []
            boardOpp.forEach(cardOpp => {
                hitList.push(document.getElementById(cardOpp.getId()))
            })

            hitList.forEach(hitZone => {
                if (Draggable.get('#'+c.id).hitTest(hitZone)) {
                    let targetUid = hitZone.id
                    actionPlayerAttack(cardPlayer, targetUid.substring(1))
                }
            })

            gsap.to('#'+c.id, {x:0, y:0, scale:1})                           
        }
    })
    
}

// ------------- ANIMATION CARD OPPONENT --------------------------------------
const oppCardPlayed = (cardOppData) => {
  let c = new CarteHand(cardOppData, 'board-opp')
  boardOpp.push(c)
  try {
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
          c.setContainer(bdOpp)
      }})
  } catch (error) {
      c.setContainer(bdOpp)
  }
    
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
      console.log('ERROR : ' + data)
      gsap.to('#'+c.id, {x: 0, y: 0})
      // c.style = ''
    } else {
      updateDisplay(data)

      // remove card from hand put it in board
      document.getElementById(c.id).remove()
      bdPlayer.append(c)
      boardPlayer.push(card)

      // reset the position of the div after the drag + reset GSAP origin
      c.style.transform = "translate(" + 0 +","+0+')'
      gsap.set('#'+c.id, {x: 0, y: 0})

      // set the newTab id for the card played (for newTab draggable in playerCardSetDragBoard)
      Draggable.get('#'+c.id).kill()
      card.setIdBoard()

      // set the new draggable for the moved card
      playerCardSetDragBoard(card)

      // actualize the hand list and counter
      handPlayer = handPlayer.filter(cr => cr.uid != card.uid)
      sizeHandPlayer -= 1
      sizeBoardPlayer += 1
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
    if (typeof data !== "object") {
      console.log('ERROR : ' + data)
    } else {
      updateDisplay(data)
    }
  })

}

const actionPlayerAttack = (card, targetUid) => {
  // Increase delay for state by 1sec
  delay += 1000

  console.log(card)
  console.log(card.uid)
  
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
        console.log('ERROR : ' + data)
      
    } else {
        console.log('attack')
        updateDisplay(data) 
    }
  })
}

// ----------------- REMOVE CARD FROM BOARD ----------------------------------
const getDiffElem = (newTab, oldTab, whom) => {
    // Compare the newTab and the old opponent board to find the removed card
    oldTab.forEach(cardSaved => {
        let found = false
        newTab.forEach(newCard => {
            if (cardSaved.uid == newCard.uid) {
                found = true
            }
        })

        // Delete the removed card from the saved board and from the display
        if (!found){
            console.log("INDEX")
            console.log(oldTab.findIndex(c => c.uid == cardSaved.uid))
            let index = oldTab.findIndex(c => c.uid == cardSaved.uid)
            
            let div = document.getElementById(oldTab[index].getTemplate().id)
            div.remove()

            oldTab.splice(index, 1)      
        }
    })
}

// ----------------- DISPLAY UPDATES -----------------------------
const initDisplay = (data) => {
    actualizeHpMp(data)

    // get hand size for both players
    sizeHandPlayer = data['hand'].length
    handOppSize = data['opponent']['handSize']

    // -------------- PLAYER -----------------------------------------
    // Set display of player hand and store data in list handPlayer
    data['hand'].forEach(cardData => {
        let card = new CarteHand(cardData, 'player')
        if (3 >= hand1) {
            card.setContainer(document.getElementById("cc1"))
            hand1 += 1
        } else {
            card.setContainer(document.getElementById("cc2"))
        }
        handPlayer.push(card)
        playerCardPlayedBoard(card)
        sizeHandPlayer += 1    
    })

    // Set display of player board hand store data in 
    console.log(data['board'])
    data['board'].forEach(cardData => {
        let card = new CarteHand(cardData, 'player')
        console.log(card)
        card.setContainer(bdPlayer)
        boardPlayer.push(card)
        playerCardSetDragBoard(card)
    })


    // ------------------- OPPONENT -----------------------------------
    // Set display of opponent hidden hand
    for (let i = 0; i < handOppSize; i++) {
        handOpp.push(new CarteOpp())
    }

    // Set display of opponent board
    data['opponent']['board'].forEach(cardData => {
        oppCardPlayed(cardData)
        sizeBoardOpp += 1
    })
    
    // Display is set : turn var to false to run the the game from this state (recall if page reloaded during the game to display the actual state)
    init = false
}

const updateDisplay = (data) => {
  actualizeHpMp(data)
            
  // Check if the opponent played a card on the board
  if ( data['opponent']['board'].length > sizeBoardOpp) {
      oppCardPlayed(data['opponent']['board'].pop())  // Call the opponent played card func (animation + data storage)
      sizeBoardOpp += 1                               // Actualize the opponent board size
  }
  // Check if the opponent lost a card on the board
  else if (data['opponent']['board'].length < sizeBoardOpp) {
    console.log('BREAK POINT //// ' + sizeBoardOpp)
    getDiffElem(data['opponent']['board'], boardOpp)
    sizeBoardOpp -= 1 
  }

  // if new card in players hand, add Draggable to this card
  if (data['hand'].length > sizeHandPlayer) {
      sizeHandPlayer += 1
      playerCardPlayedBoard(new CarteHand(data['hand'].pop()))
  }

  // If card destroyed from players board, remove it from the board display and list
  if (data['board'].length < sizeBoardPlayer){
      console.log('BREAK POINT //// ' + sizeBoardPlayer)
      getDiffElem(data['board'], boardPlayer)
      sizeBoardPlayer -= 1
  }
}


const actualizeHpMp = (data) => {
    // display hp and mp for both players
    hpOpp.innerHTML = data['opponent']['hp']
    mpOpp.innerHTML = data['opponent']['mp']

    hpPlayer.innerHTML = data['hp']
    mpPlayer.innerHTML = data['mp']
}

window.addEventListener("load", () => {
    // ----------------- STATIC ACTION -----------------------
    document.querySelector('#end-turn').addEventListener('click', () => {
      actionPlayerEndTurn()
    })
    
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});


