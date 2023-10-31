import {CarteHand} from './CarteHand.js'
import { CarteOpp } from './carteOpp.js'

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
        data = {
            "remainingTurnTime": 5,
            "heroPowerAlreadyUsed": false,
            "yourTurn": true,
            "hp": 2,
            "maxHp": 30,
            "heroClass": "Rogue",
            "talent": "ExtraCard",
            "mp": 6,
            "maxMp": 6,
            "hand": [
              {
                "id": 13,
                "cost": 3,
                "hp": 3,
                "atk": 3,
                "mechanics": [
                  "Taunt"
                ],
                "dedicated": "",
                "uid": 2,
                "baseHP": 3
              },
              {
                "id": 71,
                "cost": 1,
                "hp": 1,
                "atk": 1,
                "mechanics": [
                  "Deathrattle : Deal 2 to the opponent's hero"
                ],
                "dedicated": "",
                "uid": 3,
                "baseHP": 1
              },
              {
                "id": 56,
                "cost": 4,
                "hp": 3,
                "atk": 2,
                "mechanics": [
                  "Taunt",
                  "Battlecry : Spawn a 2/1 charge minion"
                ],
                "dedicated": "ShortyLogos (2ième place, H2022)",
                "uid": 4,
                "baseHP": 3
              },
              {
                "id": 33,
                "cost": 10,
                "hp": 1,
                "atk": 1,
                "mechanics": [
                  "Battlecry : Destroy all minions"
                ],
                "dedicated": "",
                "uid": 5,
                "baseHP": 1
              },
              {
                "id": 2,
                "cost": 1,
                "hp": 2,
                "atk": 1,
                "mechanics": [
                  "Taunt"
                ],
                "dedicated": "",
                "uid": 6,
                "baseHP": 2
              },
              {
                "id": 23,
                "cost": 5,
                "hp": 1,
                "atk": 3,
                "mechanics": [
                  "Battlecry : Spawn 2 minions"
                ],
                "dedicated": "",
                "uid": 7,
                "baseHP": 1
              },
              {
                "id": 64,
                "cost": 10,
                "hp": 7,
                "atk": 7,
                "mechanics": [
                  "Deathrattle : Spawn a 7/7 card with taunt"
                ],
                "dedicated": "",
                "uid": 8,
                "baseHP": 7
              },
              {
                "id": 41,
                "cost": 5,
                "hp": 3,
                "atk": 2,
                "mechanics": [
                  "Battlecry : Destroy a random enemy minion"
                ],
                "dedicated": "cbouv (2ième place, A2019)",
                "uid": 9,
                "baseHP": 3
              }
            ],
            "board": [],
            "remainingCardsCount": 20,
            "welcomeText": "Hey",
            "opponent": {
              "username": "Assassin-AI",
              "heroClass": "Rogue",
              "talent": "SpawnMinion",
              "trophyCount": 0,
              "winCount": 0,
              "lossCount": 0,
              "hp": 30,
              "maxHp": 30,
              "mp": 3,
              "maxMp": 6,
              "board": [
                {
                  "id": 1,
                  "cost": 0,
                  "hp": 2,
                  "atk": 1,
                  "mechanics": [
                    "Charge",
                    "Taunt"
                  ],
                  "dedicated": "",
                  "uid": 63,
                  "baseHP": 2,
                  "state": "IDLE"
                },
                {
                  "id": 1,
                  "cost": 0,
                  "hp": 1,
                  "atk": 0,
                  "mechanics": [
                    "Battlecry : Get 1 crystal (this turn only)"
                  ],
                  "dedicated": "",
                  "uid": 62,
                  "baseHP": 1,
                  "state": "IDLE"
                },
                {
                  "id": 52,
                  "cost": 2,
                  "hp": 2,
                  "atk": 2,
                  "mechanics": [
                    "Charge",
                    "Battlecry : Gain +1/+1 for each 1 attack minion your control"
                  ],
                  "dedicated": "",
                  "uid": 35,
                  "baseHP": 2,
                  "state": "IDLE"
                },
                {
                  "id": 1,
                  "cost": 0,
                  "hp": 1,
                  "atk": 1,
                  "mechanics": [
                    "Charge"
                  ],
                  "dedicated": "",
                  "uid": 64,
                  "baseHP": 1,
                  "state": "IDLE"
                },
                {
                  "id": 90,
                  "cost": 3,
                  "hp": 3,
                  "atk": 2,
                  "mechanics": [
                    "Charge"
                  ],
                  "dedicated": "",
                  "uid": 33,
                  "baseHP": 3,
                  "state": "IDLE"
                },
                {
                  "id": 91,
                  "cost": 4,
                  "hp": 1,
                  "atk": 1,
                  "mechanics": [
                    "Charge",
                    "Taunt",
                    "Battlecry : Add a random card to your hand"
                  ],
                  "dedicated": "",
                  "uid": 34,
                  "baseHP": 1,
                  "state": "IDLE"
                },
                {
                  "id": 1,
                  "cost": 0,
                  "hp": 1,
                  "atk": 1,
                  "mechanics": [
                    "Charge"
                  ],
                  "dedicated": "",
                  "uid": 66,
                  "baseHP": 1,
                  "state": "IDLE"
                }
              ],
              "handSize": 7,
              "remainingCardsCount": 21,
              "welcomeText": "Quick as an arrow"
            },
            "latestActions": [
              {
                "id": 38,
                "from": "Assassin-AI",
                "action": {
                  "type": "HERO_POWER"
                }
              },
              {
                "id": 39,
                "from": "Assassin-AI",
                "action": {
                  "type": "ATTACK",
                  "uid": 66,
                  "targetuid": null
                }
              },
              {
                "id": 40,
                "from": "Assassin-AI",
                "action": {
                  "type": "END_TURN"
                }
              }
            ]
          }
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
            actualizeHpMp(data)
            // DEBUG -------------- TO DELETE -----------------------
            // console.log(boardOpp)
            // console.log(data['opponent']['board'])

            // Check if the opponent played a card on the board
            if ( data['opponent']['board'].length > sizeBoardOpp) {
                oppCardPlayed(data['opponent']['board'].pop())  // Call the opponent played card func (animation + data storage)
                sizeBoardOpp += 1                               // Actualize the opponent board size
            }
            // Check if the opponent lost a card on the board
            else if (data['opponent']['board'].length < sizeBoardOpp) {
                removeOppCardPlayed(getDiffElem(data['opponent']['board'], boardOpp))
                sizeBoardOpp -= 1 
            }

            // if new card in players hand, add Draggable to this card
            if (data['hand'].length > sizeHandPlayer) {
                sizeHandPlayer += 1
                playerCardPlayedBoard(new CarteHand(data['hand'].pop()))
            }

            // If card destroyed from players board, remove it from the board display and list
            if (data['board'].length < sizeBoardPlayer){
                removePlayerCardDestroyed(getDiffElem(data['board'], boardPlayer))
            }

        }

        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

const action = (formData) => {
    // fetch("ajax-action.php", {   // Il faut créer cette page et son contrôleur appelle 
    //     method : "POST",       // l’API (games/state)
    //     data : formData
    // })
    // .then(response => response.json())
    // .then(data => { 
        
    // })
}

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
                // remove card from hand put it in board
                document.getElementById(c.id).remove()
                bdPlayer.append(c)
                boardPlayer.push(card)

                // reset the position of the div after the drag + reset GSAP origin
                c.style.transform = "translate(" + 0 +","+0+')'
                gsap.set('#'+c.id, {x: 0, y: 0})

                // set the newTab id for the card played (for newTab draggable in playerCardSetDragBoard)
                Draggable.get(this.target).kill()
                card.setIdBoard()

                // set the new draggable for the moved card
                playerCardSetDragBoard(card)

                // actualize the hand list and counter
                handPlayer = handPlayer.filter(cr => cr.uid != card.uid)
                sizeHandPlayer -= 1
            }
            // clear style of card
            c.style = ''
        }
    })
    sizeBoardPlayer += 1
}

const playerCardSetDragBoard = (cardPlayer) => {
    let c = cardPlayer.getTemplate()

    let hitList = []

    boardOpp.forEach(cardOpp => {
        hitList.push(document.getElementById(cardOpp.getId()))
    })
    // console.log(hitList) //------DEBUG TO DELETE-----------------------------------------

    // Set the card on the board draggable
    Draggable.create('#'+c.id, {
        bounds: document.querySelector('#body'),
        onDragEnd: () => {
            hitList.forEach(hitZone => {
                if (Draggable.get('#'+c.id).hitTest(hitZone)) {
                    console.log(hitZone)
                }
            })
            gsap.to('#'+c.id, {x:0, y:0})                           
        }
    })
    
}

const playerCardPlayedAttack = () => {

}

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

const getDiffElem = (newTab, oldTab) => {
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
            return oldTab.findIndex(c => c.uid == cardSaved.uid)
            
        }
    })
}

const removeOppCardPlayed = (index) => {
    let div = document.getElementById(boardOpp[index].getTemplate().id)
    div.remove()

    boardOpp.splice(index, 1)
}

const removePlayerCardDestroyed = (index) => {
    let div = document.getElementById(boardPlayer[index].getTemplate().id)
    div.remove()

    boardPlayer.splice(index, 1)
}

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
    data['board'].forEach(cardData => {
        let card = new CarteHand(cardData, 'player')
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

const actualizeHpMp = (data) => {
    // display hp and mp for both players
    hpOpp.innerHTML = data['opponent']['hp']
    mpOpp.innerHTML = data['opponent']['mp']

    hpPlayer.innerHTML = data['hp']
    mpPlayer.innerHTML = data['mp']
}

window.addEventListener("load", () => {
    
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});


