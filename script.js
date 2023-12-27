
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

let playingUser = {
    username: '',
    score: ''
}

let imgsSrcArr = [
    'backgroundImg1','backgroundImg1',
    'backgroundImg2','backgroundImg2',
    'backgroundImg3','backgroundImg3',
    'backgroundImg4','backgroundImg4',
    'backgroundImg5','backgroundImg5',
    'backgroundImg6','backgroundImg6',
    'backgroundImg7','backgroundImg7',
    'backgroundImg8','backgroundImg8',
    
]

let initialTime
let finishTime
let timeSpend

let memoryState = {
    firstImgClass: undefined,
    secondImgClass: undefined,
    firstImgDiv: undefined,
    secondImgDiv: undefined,
}

let startBtn = document.querySelector('.startBtn')
let playAgainBtn = document.querySelector('.playAgainBtn')

let startBox = document.querySelector('.startBox')
let gameBox = document.querySelector('.gameBox')
let resultsBox = document.querySelector('.resultsBox')
let userScoresBox = document.querySelector('.userScoresBox')

let imgDivs = document.querySelectorAll('.pendingImgs')
let winLoseTitle = document.querySelector('.winLoseTitle')
let winLoseTimer = document.querySelector('.winLoseTimer')


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

let generateRandomImgSrc = () => {
    let randomIndex = Math.floor(Math.random()*imgsSrcArr.length)
    let randomSrc = imgsSrcArr[randomIndex]
    imgsSrcArr = [...imgsSrcArr.slice(0,randomIndex),...imgsSrcArr.slice(randomIndex + 1)]
    return randomSrc

}

let startBtnClick = () => {
    if( document.querySelector('.inputUsername').value.length === 0 ){
        alert('Enter username')
        return
    }
    startBtn.removeEventListener('click', startBtnClick)
    playingUser.username = document.querySelector('.inputUsername').value
    imgDivs.forEach( eachImgDiv =>{
        let randomSrc = generateRandomImgSrc()
        eachImgDiv.setAttribute('background-img',randomSrc)
    })
    startBox.classList.add('hidden')
    gameBox.classList.remove('hidden')

    initialTime = new Date().getTime()
}

let imgDivClick = (e) => {

    if( memoryState.firstImgClass === undefined ){    

        memoryState.firstImgClass = e.target.getAttribute('background-img')
        memoryState.firstImgDiv = e.target

        memoryState.firstImgDiv.classList.add(memoryState.firstImgClass)

        memoryState.firstImgDiv.removeEventListener('click', imgDivClick)
        
    }

    else if( memoryState.firstImgClass !== undefined ){

        memoryState.secondImgClass = e.target.getAttribute('background-img')
        memoryState.secondImgDiv = e.target

        memoryState.secondImgDiv.classList.add(memoryState.secondImgClass)

        if (memoryState.firstImgClass === memoryState.secondImgClass ){

            memoryState.firstImgDiv.classList.remove('pendingImgs')
            memoryState.secondImgDiv.classList.remove('pendingImgs')

            memoryState.secondImgDiv.removeEventListener('click', imgDivClick)

            memoryState = {
                firstImgClass: undefined,
                secondImgClass: undefined,
                firstImgDiv: undefined,
                secondImgDiv: undefined,
            }
            
        } else{
            imgDivs.forEach( eachImgDiv => eachImgDiv.removeEventListener('click', imgDivClick ))
            setTimeout(() => {
                memoryState.firstImgDiv.addEventListener('click', imgDivClick)

                memoryState.firstImgDiv.classList.remove( memoryState.firstImgClass )
                memoryState.secondImgDiv.classList.remove( memoryState.secondImgClass )

                memoryState = {
                    firstImgClass: undefined,
                    secondImgClass: undefined,
                    firstImgDiv: undefined,
                    secondImgDiv: undefined,
                }
                
                imgDivs.forEach( eachImgDiv => eachImgDiv.addEventListener('click', imgDivClick ))
            },1300)
        }
    }

    imgDivs = document.querySelectorAll('.pendingImgs')
    if( imgDivs.length === 0 ) {
        imgDivs.forEach( eachImgDiv => eachImgDiv.removeEventListener('click', imgDivClick ))
        finishTime = new Date().getTime()
        timeSpend = finishTime - initialTime
        playingUser.score = timeSpend/1000 + ' seconds'
        users.push(playingUser)
        printUsersResults()    

        winLoseTitle.textContent = 'You won!'
        winLoseTimer.textContent = 'You won in ' + playingUser.score

        gameBox.classList.add('hidden')
        resultsBox.classList.remove('hidden')
    }
    
}


   

let playAgainBtnClick = () => {
    location.reload()
}


document.addEventListener('DOMContentLoaded',() => {
    printUsersResults()
    startBtn.addEventListener('click', startBtnClick)
    imgDivs.forEach( eachImgDiv => eachImgDiv.addEventListener('click', imgDivClick ))
    playAgainBtn.addEventListener('click', playAgainBtnClick)
})

