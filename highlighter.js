// just insert the function in your browser of choice, and run
// example: highlighter("jesse")
const highlighter = (username) => {

  // verify Name is in PeopleNames
  const lowerPeopleNames = PeopleNames.map(name => name.toLowerCase())
  const lowerUsername = username.toLowerCase()
  if (lowerPeopleNames.indexOf(lowerUsername) === -1) {
    throw new Error(`Name ${lowerUsername} not found`)
  }

  // get the id for username
  const userId = PeopleIDs[lowerPeopleNames.indexOf(lowerUsername)]

  // map slots to the index, if it contains the id we're looking for
  // then, filter out null slots
  const slotsForUserName = AvailableAtSlot
    .map( (slotIDs, slotIndex) => slotIDs.indexOf(userId) !== -1 ? slotIndex : null )
    .filter( slotIndex => slotIndex )

  // color each of the slots with the color
  slotsForUserName.forEach( (slotIndex) => {
    const divDOM = document.getElementById(`GroupTime${TimeOfSlot[slotIndex]}`)
    divDOM.style.filter = 'hue-rotate(90deg)'
  })

  // return all the times for this person
  return slotsForUserName.map( slotIndex => {
    return new Date(TimeOfSlot[slotIndex] * 1000)
  })

}
