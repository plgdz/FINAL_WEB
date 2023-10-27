import {CarteHand} from './CarteHand.js'
import { CarteOpp } from './carteOpp.js'

window.addEventListener('load', () => {

    let hand = []
    let handOpp = []

    let test = document.getElementById("cc1")
    console.log(test)

    let data = {
        "id":4,
        "cost":2,
        "hp":3,
        "atk":2,
        "mechanics":["caca", 'pipi'],
        "uid":3,
        "baseHP":3
    }

    hand.push(new CarteHand(data, test))
    hand.push(new CarteHand(data, test))
    hand.push(new CarteHand(data, test))

    handOpp.push(new CarteOpp())
    handOpp.push(new CarteOpp())
    handOpp.push(new CarteOpp())
    handOpp.push(new CarteOpp())
    handOpp.push(new CarteOpp())
    handOpp.push(new CarteOpp())

    let boardPlayer = document.querySelector('#board-player')
    
    hand.forEach(card => {
        let c = card.getTemplate()
        setIDs()

        console.log(c.id)

        Draggable.create('#' + c.id, {
            bounds: document.querySelector('#body'),
            onClick: function () {
                console.log(glow)
                boardPlayer.style.boxShadow = "0 0 50px 15px red"
            },
            onRelease: function () {
                boardPlayer.style.boxShadow = "0"
            },
            onDragEnd: function () {
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

        c.addEventListener('click', () => {
            console.log(card.getCardInfo())
            hand.pop()
            console.log(hand)
        })
    });

    function setIDs() {
        let index = 0
        hand.forEach(card => {
            card.setID(index)
            index++
        });
    }

})

