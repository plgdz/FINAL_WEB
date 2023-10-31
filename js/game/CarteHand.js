export class CarteHand {
    constructor(card, whom){
        this.id = card['id']
        this.uid = card['uid']
        this.cost = card['cost']
        this.hp = card['hp']
        this.baseHP = card['baseHP']
        this.atk = card['atk']
        this.mechanics = card['mechanics']

        this.whom = 'card-' + whom

        this.initCard()
    }

    initCard(){

        this.template = document.createElement('div')
        this.template.className = 'card-hand ' + this.whom
        this.template.id = 'h' + this.uid

        let cardHp = document.createElement('div')
        cardHp.className = 'card-hand-details card-hp'
        cardHp.innerHTML = this.hp
        this.template.append(cardHp)

        let cardAtk = document.createElement('div')
        cardAtk.className = 'card-hand-details card-atk'
        cardAtk.innerHTML = this.atk
        this.template.append(cardAtk)

        let cardCost = document.createElement('div')
        cardCost.className = 'card-hand-details card-cost'
        cardCost.innerHTML = this.cost
        this.template.append(cardCost)

        let cardImg = document.createElement('div')
        cardImg.className = 'card-hand-img'
        this.template.append(cardImg)

        let cardDesc = document.createElement('div')
        cardDesc.className = 'card-hand-desc'
        cardDesc.style.overflow = 'hidden'
        this.template.append(cardDesc)  

        if (this.mechanics.length > 0) {
            this.mechanics.forEach(mech => {
                cardDesc.innerHTML += mech + '<br>'
            });

            if (this.mechanics[0].includes('Battlecry')) { cardImg.style.backgroundImage = 'url("./images/assets/Battlecry.png")' }
            else if (this.mechanics[0].includes('Charge')) { cardImg.style.backgroundImage = 'url("./images/assets/Charge.png")' }
            else if (this.mechanics[0].includes('Taunt')) { cardImg.style.backgroundImage = 'url("./images/assets/Taunt.png")' }
            else if (this.mechanics[0].includes('Stealth')) { cardImg.style.backgroundImage = 'url("./images/assets/Stealth.png")' }
            else if ( this.mechanics[0].includes('Confused')) { cardImg.style.backgroundImage = 'url("./images/assets/Confused.png")' }
            else if (this.mechanics[0].includes('Deathrattle')) { cardImg.style.backgroundImage = 'url("./images/assets/Deathrattle.png")' }
            else { cardImg.style.backgroundImage = 'url("./images/assets/Rand.png")' }  
        }
        else {
            cardImg.style.backgroundImage = 'url("./images/assets/Rand.png")'
        }
    }
    
    setContainer(node){
        document.getElementById(node.id).append(this.template)
    }

    getId(){
        return this.template.id
    }

    getTemplate(){ return this.template }

    getCardInfo(){
        return {
            'id' : this.id,
            'uid' : this.uid ,
            'cost' : this.cost,
            'hp' : this.hp,
            'cost' : this.atk,
            'mechanics' : this.mechanics,
        }
    }

    setIdBoard() {
        // Set a new ID for the new board Dragabble instance 
        this.template.id = 'b'+this.uid
    }
}