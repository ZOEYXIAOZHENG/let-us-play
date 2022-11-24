const games = document.querySelectorAll(".profile-details")
games.forEach((game)=> {
  game.addEventListener('mouseover', () => {
    console.log("from listener")
   const removeIcon = game.querySelector(".remove").classList.remove("hidden")
  })
  game.addEventListener('mouseout', () => {
    const removeIcon = game.querySelector(".remove").classList.add("hidden")
   })
})


