
let users = [
    {
        username: 'Juan',
        score: '11 second'
    },
    {
        username: 'Maria',
        score: '40 seconds'
    },
    {
        username: 'Pedro',
        score: '14 seconds'
    },
    {
        username: 'Anna',
        score: '5 seconds'
    },
    {
        username: 'Lidia',
        score: '7 seconds'
    },
]

let words = ['banana', 'elephant', 'computer', 'jazz', 'xylophone', 'quasar', 'jungle', 'python', 'oxygen', 'vortex', 'guitar', 'zeppelin', 'zebra', 'kangaroo', 'oasis', 'mango', 'cucumber', 'rocket', 'whiskey', 'jigsaw', 'rhythm', 'symphony', 'penguin', 'quokka']
let playingWord = ''
let playingWordArray

let attempsLeft = 7
let hangManImgSrcsArr = ['assets/imgs/hangman8.png','assets/imgs/hangman7.png','assets/imgs/hangman6.png','assets/imgs/hangman5.png','assets/imgs/hangman4.png','assets/imgs/hangman3.png','assets/imgs/hangman2.png','assets/imgs/hangman1.png']

let playingUser = {
    username: '',
    score: ''
}

let initialTime

let startBtn = document.querySelector('.startBtn')
let startGameBtn = document.querySelector('.startGameBtn')
let letterBtns = document.querySelectorAll('.letterBtn')
let playAgainBtn = document.querySelector('.playAgainBtn')

let startBox = document.querySelector('.startBox')
let startGameBox = document.querySelector('.startGameBox')
let gameBox = document.querySelector('.gameBox')
let resultsBox = document.querySelector('.resultsBox')
let userScoresBox = document.querySelector('.userScoresBox')
let wordGeneratedBox = document.querySelector('.wordContainer')

let attempsLeftSpan = document.querySelector('.attempsLeftSpan')
let hangManImg = document.querySelector('.hangManImg')
let winLoseTitle = document.querySelector('.winLoseTitle')
let winLoseTimer = document.querySelector('.winLoseTimer')


let getAllIndexs = (array, element) => {
    let arrayOfIndexs = []
    for (i = 0; i < array.length ; i++ ){
        if( array[i] === element ){
            arrayOfIndexs.push(i)
        }
    }
    return arrayOfIndexs
}

let printUsersResults = () => {
    let newDiv = document.createElement('div')
    
    users.forEach( user => {
        let newUserBox = document.createElement('div')
        let newUserNameP = document.createElement('p')
        newUserNameP.classList.add('bold')
        let newUserScoreP = document.createElement('p')
        newUserNameP.textContent = user.username
        newUserScoreP.textContent = user.score
        newUserBox.appendChild(newUserNameP)
        newUserBox.appendChild(newUserScoreP)

        newDiv.appendChild(newUserBox)        
    })

    userScoresBox.innerHTML = `<h3>User Scores</h3>`
    userScoresBox.appendChild(newDiv)



}

let startBtnClick = () => {
    if( document.querySelector('.inputUsername').value.length === 0 ){
        alert('Enter username')
        return
    }
    startBtn.removeEventListener('click', startBtnClick)
    playingUser.username = document.querySelector('.inputUsername').value
    startBox.classList.add('hidden')
    startGameBox.classList.remove('hidden')

}
let startGameBtnClick = () => {
    startGameBtn.removeEventListener('click', startBtnClick)
    startGameBox.classList.add('hidden')
    gameBox.classList.remove('hidden')
    playingWord = words[Math.floor(Math.random()*words.length)]
    playingWordArray = playingWord.split('')
    let newDocumentFragment = document.createDocumentFragment()
    playingWordArray.forEach( letter =>{
        let newSpan = document.createElement('span')
        newSpan.textContent = letter
        newSpan.classList.add('hangLetter')
        newDocumentFragment.appendChild(newSpan)
    })
    wordGeneratedBox.appendChild(newDocumentFragment)

    initialTime = new Date().getTime()
    
}
let letterBtnClick = (e) => {
   let letter = e.target.textContent.toLowerCase()
    e.target.classList.add('hidden')
   if( playingWordArray.includes(letter)){
        let allLettersBlack = true
        let allLetterSpans = document.querySelectorAll('.hangLetter')
        allLetterSpans.forEach( eachHangLetter => {
            if( eachHangLetter.textContent === letter ) eachHangLetter.classList.add('black-color')
            if ( eachHangLetter.classList.contains('black-color')){}else{ allLettersBlack = false }
        })
        if (allLettersBlack) { 
            winLoseTitle.textContent = 'You Won!'
            let finishTime = new Date().getTime()
            let timeSpend = finishTime - initialTime
            playingUser.score = timeSpend/1000 + ' seconds'
            winLoseTimer.textContent = 'You won in ' + timeSpend/1000 + ' seconds'
            users.push(playingUser)
            printUsersResults()
            gameBox.classList.add('hidden')
            resultsBox.classList.remove('hidden')
            letterBtns.forEach( eachLetterBtn =>{
                eachLetterBtn.removeEventListener('click', letterBtnClick)
            })
        }
        
   } else{
    attempsLeft--
    attempsLeftSpan.textContent = attempsLeft
    hangManImg.setAttribute('src', hangManImgSrcsArr[attempsLeft])

    if( attempsLeft === 0 ){ 
        winLoseTitle.textContent = 'You Lost!'
        let finishTime = new Date().getTime()
        let timeSpend = finishTime - initialTime
        playingUser.score = timeSpend/1000 + ' seconds'
        winLoseTimer.textContent = 'You lost in ' + timeSpend/1000 + ' seconds'
        let allLetterSpans = document.querySelectorAll('.hangLetter')
        allLetterSpans.forEach( eachHangLetter => {
            if( !eachHangLetter.classList.contains('black-color') ) eachHangLetter.classList.add('red-color')
        })
        letterBtns.forEach( eachLetterBtn =>{
            eachLetterBtn.removeEventListener('click', letterBtnClick)
        })
        setTimeout(() => {
            gameBox.classList.add('hidden')
            resultsBox.classList.remove('hidden')
        },2500)
    }
}


   
    

}
let playAgainBtnClick = () => {
    location.reload()
}


document.addEventListener('DOMContentLoaded',() => {
    printUsersResults()
    startBtn.addEventListener('click', startBtnClick)
    startGameBtn.addEventListener('click', startGameBtnClick)
    letterBtns.forEach( eachLetterBtn =>{
        eachLetterBtn.addEventListener('click', letterBtnClick)
    })
    playAgainBtn.addEventListener('click', playAgainBtnClick)
})

