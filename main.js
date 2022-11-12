const form = document.querySelector('form')
const input = document.querySelector('input')
const pokemomNumber = document.querySelector('.pokemom-number')
const pokemomName = document.querySelector('.pokemom-name')
const pokemomGif = document.querySelector('.pokemom')
const previous = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')

let idPokemom = 1

const fetchPokemom = async (pokemom) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemom}`
  )
  if (APIResponse.status === 200) {
    return await APIResponse.json()
  } else {
    const data = APIResponse.json()
    alert(`Erro: ${APIResponse.status}\nO pokemom ${input.value} não existe`)
    input.value = ''
  }
}

const renderPokemom = async (pokemom) => {
  pokemomName.innerHTML = 'Loading'

  const data = await fetchPokemom(pokemom)
  if (data) {
    pokemomName.innerHTML = data.name
    pokemomNumber.innerHTML = data.id
    pokemomGif.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    idPokemom = data.id
    input.value = ''
  } else {
    pokemomName.innerHTML = 'Not found!'
    pokemomNumber.innerHTML = ''
    pokemomGif.src =
      'https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png'
    pokemomGif.style.height = '20%'
  }
}
form.addEventListener('submit', (event) => {
  event.preventDefault()
  renderPokemom(input.value.toLowerCase())
})

previous.addEventListener('click', () => {
  if (idPokemom > 1) {
    renderPokemom((idPokemom -= 1))
  }
})

next.addEventListener('click', () => {
  renderPokemom((idPokemom += 1))
})
