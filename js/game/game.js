import {CarteHand} from './CarteHand.js'
import { CarteOpp } from './carteOpp.js'

let init = true

let actions = 0

let hand = []
let deck = []
let sizeHand = 0

let hand1 = 0

let handOpp = []
let deckOpp = []

let handOppSize = 0
let sizeDeckOpp = 0

let hpOpp = document.querySelector('#hp-opp')
let mpOpp = document.querySelector('#mp-opp')

let hpPlayer = document.querySelector('#hp-player')
let mpPlayer = document.querySelector('#mp-player')

let boardPlayer = document.querySelector('#board-player')
let boardOpp = document.querySelector('#board-opp')

const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
 method : "POST"        // l’API (games/state)
    })
.then(response => response.json())
.then(data => {
    console.log(data)

    if (typeof data !== "object") {
        console.log('ERROR : ' + data)

        if (data == 'LAST_GAME_WON' || data == "LAST_GAME_LOST") {
            console.log('PARTIE TERMINEE')
        }
    } 
    else if (init){
        sizeHand = data['hand'].length
        handOppSize = data['opponent']['handSize']

        console.log(sizeHand)
        console.log(handOppSize)

        data['hand'].forEach(cardData => {
            let card = new CarteHand(cardData, 'player')
            if (3 >= hand1) {
                card.setContainer(document.getElementById("cc1"))
                hand1 += 1
            } else {
                card.setContainer(document.getElementById("cc2"))
            }
            hand.push(card)
        });
        playerCardMove()

        data['opponent']['board'].forEach(cardData => {
            oppCardPlayed(cardData)
            sizeDeckOpp += 1
        })

        for (let i = 0; i < handOppSize; i++) {
            handOpp.push(new CarteOpp())
        }
        init = false       
    } 
    else {
        init = false
        if ( data['opponent']['board'].length > sizeDeckOpp) {
            oppCardPlayed(data['opponent']['board'].pop())
            sizeDeckOpp += 1
        }
    }

    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

const playerCardMove = () => {
    hand.forEach(card => {
        let c = card.getTemplate()
        
        // Faire une func a part
        let index = 0
        hand.forEach(card => {
            card.setID(index)
            index++
        });

        Draggable.create('#' + c.id, {
            bounds: document.querySelector('#body'),
            onDrag: function () {
                
                boardPlayer.style.boxShadow = "0 0 5px 5px #7c725b41"
            },
            onDragEnd: function () {
                c.style.scale = '1'
                boardPlayer.style.boxShadow = "none"
                let hit = this.hitTest(boardPlayer)
                
                if (!hit) {
                    gsap.to(this.target, {x: 0, y:0, duration: .5, ease: Back.easeOut(1.7)})
                } else {
                    document.getElementById(c.id).remove()
                    boardPlayer.append(c)
                    c.style.transform = "translate(" + 0 +","+0+')'
                    Draggable.get('#' + c.id).disable()
                }
            }
        })
    });
}

const oppCardPlayed = (cardOppData) => {
    let c = new CarteHand(cardOppData, 'board-opp')

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
            c.setContainer(boardOpp)
        }})
    } catch (error) {
        c.setContainer(boardOpp)
    }
    
}

window.addEventListener("load", () => {
    
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});


