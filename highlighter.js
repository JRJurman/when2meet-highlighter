// just insert the function in your browser of choice, and run
// example: highlighter("jesse", "blue")
const highlighter = (username, color) => {

  // verify Name is in PeopleNames
  const lowerPeopleNames = PeopleNames.map(name => name.toLowerCase())
  const lowerUsername = username.toLowerCase()
  if (lowerPeopleNames.indexOf(lowerUsername) === -1) {
    throw new Error(`Name ${lowerUsername} not found`)
  }

  const userId = PeopleIDs[lowerPeopleNames.indexOf(lowerUsername)]

  // map slots to the index, if it is the name we're looking for
  // then, filter out null slots
  const slotsForUserName = AvailableAtSlot
    .map( (slotIDs, slotIndex) => slotIDs.indexOf(userId) !== -1 ? slotIndex : null )
    .filter( slotIndex => slotIndex )

  // color each of the slots with the color
  slotsForUserName.forEach( (slotIndex) => {
    const divDOM = document.getElementById("GroupTime"+TimeOfSlot[slotIndex])
    divDOM.style.background = color
  })

  // return all the times for this person
  return slotsForUserName.map( slotIndex => {
    return new Date(TimeOfSlot[slotIndex] * 1000)
  })

}
