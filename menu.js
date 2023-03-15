// highlight function
// takes in a name, and the number of degrees to rotate the hue
const highlight = (name, deg) => {
  // get the id for username
  const userId = PeopleIDs[PeopleNames.indexOf(name)]

  // map slots to the index, if it contains the id we're looking for
  // then, filter out null slots
  AvailableAtSlot
    .map( (slotIDs, slotIndex) => slotIDs.indexOf(userId) !== -1 ? slotIndex : null )
    .filter( slotIndex => slotIndex !== null )
    .forEach( slotIndex => {
      // grab the DOM element for this slotId and apply the css style
      const divDOM = document.getElementById(`GroupTime${TimeOfSlot[slotIndex]}`)
      divDOM.style.filter = `hue-rotate(${deg}deg)`

      // if the color is white, we need to change it so that hue-rotate works
      if (divDOM.style.background === 'rgb(255, 255, 255)') {
        divDOM.style.background = '#ddeed5'
        divDOM.fakeColor = true
      }
    })
}

// resetColors function
// resets all the colors back to normal
// Note: can't really do a per-user basis, because highlighting users overlaps
// it would require significant logic, and state management
const resetColors = () => {
  AvailableAtSlot
    .forEach( (slot, slotIndex) => {
      const divDOM = document.getElementById(`GroupTime${TimeOfSlot[slotIndex]}`)
      divDOM.style.filter = ''
      // if the color was faked, we need to change it back to white
      if (divDOM.fakeColor) {
        divDOM.style.background = 'rgb(255, 255, 255)'
        divDOM.fakeColor = false
      }
    })
}

const buttonStyle = (on, hue) => `
  font-size: 1em;
  border-radius: 0.5em;
  border-color: #339900;
  border-width: 0.15em;
  color: ${on ? 'white' : '#339900'};
  background-color: ${on ? '#339900' : 'white'};
  cursor: pointer;
  outline: none;
  margin: 0.25em;
  filter: hue-rotate(${hue}deg);
`

const main = document.getElementById('MainBody')
const menu = document.createElement('div')
menu.style.padding = '1em'

PeopleNames.map((name, index) => {
  const hue = (index+1)*100
  const button = document.createElement('button')
  button.innerText = name
  button.style.cssText = buttonStyle(false, hue)
  button.highlight = highlight.bind(this, name, hue)
  button.reset = resetColors.bind(this)
  button.isHighlighted = false
  button.onreset = () => {
    button.style.cssText = buttonStyle(false, hue)
    button.isHighlighted = false
  }
  button.onclick = () => {
    if (button.isHighlighted) {
      // reset cells
      resetColors();
      [...document.querySelectorAll('button')].forEach((button) => {
        button.onreset()
      })
    } else {
      // highlight cells
      highlight(name, hue)
      button.style.cssText = buttonStyle(true, hue)
      button.isHighlighted = true
    }
  }
  return button
}).forEach(button => menu.appendChild(button))

main.appendChild(menu)
