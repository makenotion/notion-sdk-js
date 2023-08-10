// This file is run by the browser each time your view template is loaded

/**
 * Define variables that reference elements included in /views/index.html:
 */

// Forms
const dbForm = document.getElementById("databaseForm")
const pageForm = document.getElementById("pageForm")
const blocksForm = document.getElementById("blocksForm")
const commentForm = document.getElementById("commentForm")
// Table cells where API responses will be appended
const dbResponse = document.getElementById("dbResponse")
const pageResponse = document.getElementById("pageResponse")
const blocksResponse = document.getElementById("blocksResponse")
const commentResponse = document.getElementById("commentResponse")

/**
 * Functions to handle appending new content to /views/index.html
 */

// Appends the API response to the UI
const appendApiResponse = function (res, el) {
  console.log(res)

  const result = document.createElement("p")
  result.innerHTML = "Result: " + res.message
  el.appendChild(result)
  // See browser console for more information
  if (res.message === "error") return

  const id = document.createElement("p")
  id.innerHTML = "ID: " + res.data.id
  el.appendChild(id)

  if (res.data.url) {
    var url = document.createElement("a")
    url.setAttribute("href", res.data.url)
    url.innerText = res.data.url
    el.appendChild(url)
  }
}

// Appends the blocks API response to the UI
const appendBlocksResponse = function (res, el) {
  const result = document.createElement("p")
  result.innerHTML = "Result: " + res.message
  el.appendChild(result)
  const id = document.createElement("p")
  id.innerHTML = "ID: " + res.data.results[0].id
  el.appendChild(id)
}

/**
 * Attach submit event handlers to each form included in /views/index.html
 */

// Attach submit event to each form
dbForm.onsubmit = async function (event) {
  event.preventDefault()
  console.log(event.target.dbName.value)
  const dbName = event.target.dbName.value

  const body = JSON.stringify({ dbName })

  const res = await fetch("/databases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
  const data = await res.json()

  appendApiResponse(data, dbResponse)
}

pageForm.onsubmit = async function (event) {
  event.preventDefault()
  const dbID = event.target.newPageDB.value
  const pageName = event.target.newPageName.value
  const header = event.target.header.value

  const body = JSON.stringify({ dbID, pageName, header })

  const res = await fetch("/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
  const data = await res.json()

  appendApiResponse(data, pageResponse)
}

blocksForm.onsubmit = async function (event) {
  event.preventDefault()
  const pageID = event.target.pageID.value
  const content = event.target.content.value

  const body = JSON.stringify({ pageID, content })

  const res = await fetch("/blocks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
  const data = await res.json()
  console.log(data)

  appendBlocksResponse(data, blocksResponse)
}

commentForm.onsubmit = async function (event) {
  event.preventDefault()
  const pageID = event.target.pageIDComment.value
  const comment = event.target.comment.value

  const body = JSON.stringify({ pageID, comment })

  const res = await fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
  const data = await res.json()
  console.log(data)

  appendApiResponse(data, commentResponse)
}
