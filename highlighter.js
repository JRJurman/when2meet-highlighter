// just insert the function in your browser of choice, and run
// example: highlighter("jesse", "blue")
highlighter = function(username, color) {
  AvailableAtSlot.forEach( function(e, i) {
    if (e.indexOf(PeopleIDs[PeopleNames.indexOf(username)]) != -1) { 
      var divDOM = document.getElementById("GroupTime"+TimeOfSlot[i]);
      divDOM.style.background = color;
    };
  });
}
