export class CarteOpp {
    constructor(){
        this.template = document.createElement('div')
        this.template.className = 'card-opp'

        document.querySelector('#container-card-opp').append(this.template)
    }

    getTemplate = () => {return this.template }

    getBack = () => {return this.back }
}