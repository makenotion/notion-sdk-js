// Assign the database form to a variable for later use
const dbForm = document.getElementById("databaseForm");
// Assign the empty table cell to a variable for later use
const dbResponseEl = document.getElementById("dbResponse");

// Add a submit handler to the form
dbForm.onsubmit = async function (event) {
  event.preventDefault()

// Get the database name from the form
  const dbName = event.target.dbName.value
  const body = JSON.stringify({ dbName })

// Make a request to /databases endpoint in server.js
  const newDBResponse = await fetch("/databases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
  const newDBData = await newDBResponse.json()

// Pass the new database info and the empty table cell
// to a function that will append it.
  appendApiResponse(newDBData, dbResponseEl)
}
