export class CarteHand {
    constructor(card, whom){
        this.id = card['id']
        this.uid = card['uid']
        this.cost = card['cost']
        this.hp = card['hp']
        this.baseHP = card['baseHP']
        this.atk = card['atk']
        this.mechanics = card['mechanics']
        this.container = ''

        this.whom = 'card-' + whom

        this.initCard()
    }

    initCard(){

        this.template = document.createElement('div')
        this.template.className = 'card-hand ' + this.whom
        this.template.id = 'h' + this.uid

        this.cardHp = document.createElement('div')
        this.cardHp.className = 'card-hand-details card-hp'
        this.cardHp.innerHTML = this.hp
        this.template.append(this.cardHp)

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
        cardImg.style.backgroundColor = '#f0a02d'
        this.template.append(cardImg)

        this.cardDesc = document.createElement('div')
        this.cardDesc.className = 'card-hand-desc'
        this.cardDesc.style.overflow = 'hidden'
        this.template.append(this.cardDesc)  

        if (this.mechanics.length > 0) {
            this.mechanics.forEach(mech => {
                this.cardDesc.innerHTML += mech + '<br>'
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
        this.container = node.id
    }

    getId(){ return this.template.id }

    getTemplate(){ return this.template }

    setIdBoard() {
        // Set a new ID for the new board Dragabble instance 
        this.template.id = 'b'+this.uid
    }

    update(card) {
        this.hp = card['hp']
        this.mechanics = card['mechanics']
        this.cardDesc.innerHTML = ''

        this.cardHp.innerHTML = this.hp
        if (this.mechanics.length > 0) {
            this.mechanics.forEach(mech => {
                this.cardDesc.innerHTML += mech + '<br>'
            });
        }
    }
}