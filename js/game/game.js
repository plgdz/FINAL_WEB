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

    hand.forEach(card => {
        let c = card.getTemplate()
        c.addEventListener('click', () => {
            console.log(card.getCardInfo())
            hand.pop()
            console.log(hand)
        })
    });

})