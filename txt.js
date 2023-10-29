

    

    let test = document.getElementById("cc1")
    console.log(test)

    function actualize() {
        let state = {
            "remainingTurnTime":24,
            "yourTurn":true,
            "heroPowerAlreadyUsed" : false,
            "hp":30,
            "mp":0,
            "maxMp":1,
            "hand":[
                {"id":4,"cost":2,"hp":3,"atk":2,"mechanics":[], "uid":3,"baseHP":3},
                {"id":22,"cost":7,"hp":7,"atk":7,"mechanics":[],"uid":5,"baseHP":7},
                {"id":10,"cost":3,"hp":3,"atk":3,"mechanics":["taunt", "charge"],"uid":6,"baseHP":3}
            ],
            "board":[
                {"id":2,"cost":1,"hp":1,"atk":2,"mechanics":[],"uid":7,"baseHP":1,"state":"SLEEP"}
            ],
            "welcomeText" : "My life for Aiur!",
            "heroClass" : "Warrior",
            "remainingCardsCount":24,
            "opponent":{
                "username":"Dummy-AI",
                "heroClass":"Hunter",
                "hp":30,
                "mp":0,
                "board":[],
                welcomeText : "Die, maggot!",
                "remainingCardsCount":24,
                "handSize" : 3
            },
            latestActions : [] // une liste des dernières actions jouées dans la partie.
        }


        for (let index = 0; index < state['hand'].length; index++) {
            const element = array[index];
            
        }

    for (let i = 0; i < 4; i++) {
        let c = new CarteHand(data, 'player')
        c.setContainer(test)
        hand.push(c)  
    }

    handOpp.push(new CarteOpp())
    handOpp.push(new CarteOpp())
    handOpp.push(new CarteOpp())
    handOpp.push(new CarteOpp())
    handOpp.push(new CarteOpp())
    handOpp.push(new CarteOpp())

    let boardPlayer = document.querySelector('#board-player')
    let boardOpp = document.querySelector('#board-opp')
    
    

    document.querySelector('#container-card-opp').addEventListener('click', () =>{
        
       
    })
        
    }
