// document.querySelector('#clickMe').addEventListener('click', makeReq)


const play = document.querySelectorAll('.button')
Array.from(play).forEach((element)=>{
  element.addEventListener('click', makeReq)
})
// document.querySelectorAll('.btn').addEventListener('click', makeReq)

function toggleButton(){
  Array.from(play).forEach((element)=>{
    if (!element.disabled){
      element.disabled = true
    }else{
      element.disabled = false
    }
  })
}

function runAnimation(winner) {
  const coin = document.getElementById("coin");
  coin.style.animation = "none";
  toggleButton()
  if(winner == 'tails') {
    coin.style.animation = "flip-tails 3s forwards";
  }else {
    coin.style.animation = "flip-heads 3s forwards";
  }
}

async function makeReq() {
    // const userInput = document.querySelector('input').value
    const userInput = this.value.toLowerCase()
    console.log(userInput)
    const res = await fetch(`/api?coinflip=${userInput}`)
    const data = await res.json()
    document.querySelector(".result").innerHTML = `You chose ${this.value}...<br/><br/>Goodluck!`
    runAnimation(data.winner)
    function winner(){
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve(`Winner: ${data.winner.charAt(0).toUpperCase() + data.winner.slice(1)}<br/><br/>${data.result}`)
          }, 2500)
      })
    }
    const winnerWait = await winner()
    console.log(data)
    // document.querySelector(".result").classList.add('alert alert-primary')
    document.querySelector(".result").innerHTML = winnerWait
    toggleButton()
}





// async function makeReq(){

//   const userName = document.querySelector("#userName").value;
//   const res = await fetch(`/api?student=${userName}`)
//   const data = await res.json()

//   console.log(data);
//   document.querySelector("#personName").textContent = data.name
//   document.querySelector("#personStatus").textContent = data.status
//   document.querySelector("#personOccupation").textContent = data.currentOccupation
// }