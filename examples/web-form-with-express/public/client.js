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
const dbResponseEl = document.getElementById("dbResponse")
const pageResponseEl = document.getElementById("pageResponse")
const blocksResponseEl = document.getElementById("blocksResponse")
const commentResponseEl = document.getElementById("commentResponse")

/**
 * Functions to handle appending new content to /views/index.html
 */

// Appends the API response to the UI
const appendApiResponse = function (apiResponse, el) {
  console.log(apiResponse)

  // Add success message to UI
  const newParagraphSuccessMsg = document.createElement("p")
  newParagraphSuccessMsg.textContent = "Result: " + apiResponse.message
  el.appendChild(newParagraphSuccessMsg)
  // See browser console for more information
  if (apiResponse.message === "error") return

  // Add ID of Notion item (db, page, comment) to UI
  const newParagraphId = document.createElement("p")
  newParagraphId.textContent = "ID: " + apiResponse.data.id
  el.appendChild(newParagraphId)

  // Add URL of Notion item (db, page) to UI
  if (apiResponse.data.url) {
    const newAnchorTag = document.createElement("a")
    newAnchorTag.setAttribute("href", apiResponse.data.url)
    newAnchorTag.innerText = apiResponse.data.url
    el.appendChild(newAnchorTag)
  }
}

// Appends the blocks API response to the UI
const appendBlocksResponse = function (apiResponse, el) {
  console.log(apiResponse)

  // Add success message to UI
  const newParagraphSuccessMsg = document.createElement("p")
  newParagraphSuccessMsg.textContent = "Result: " + apiResponse.message
  el.appendChild(newParagraphSuccessMsg)

  // Add block ID to UI
  const newParagraphId = document.createElement("p")
  newParagraphId.textContent = "ID: " + apiResponse.data.results[0].id
  el.appendChild(newParagraphId)
}

/**
 * Attach submit event handlers to each form included in /views/index.html
 */

// Attach submit event to each form
dbForm.onsubmit = async function (event) {
  event.preventDefault()

  const dbName = event.target.dbName.value
  const body = JSON.stringify({ dbName })

  const newDBResponse = await fetch("/databases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
  const newDBData = await newDBResponse.json()

  appendApiResponse(newDBData, dbResponseEl)
}

pageForm.onsubmit = async function (event) {
  event.preventDefault()

  const dbID = event.target.newPageDB.value
  const pageName = event.target.newPageName.value
  const header = event.target.header.value
  const body = JSON.stringify({ dbID, pageName, header })

  const newPageResponse = await fetch("/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })

  const newPageData = await newPageResponse.json()
  appendApiResponse(newPageData, pageResponseEl)
}

blocksForm.onsubmit = async function (event) {
  event.preventDefault()

  const pageID = event.target.pageID.value
  const content = event.target.content.value
  const body = JSON.stringify({ pageID, content })

  const newBlockResponse = await fetch("/blocks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })

  const newBlockData = await newBlockResponse.json()
  appendBlocksResponse(newBlockData, blocksResponseEl)
}

commentForm.onsubmit = async function (event) {
  event.preventDefault()

  const pageID = event.target.pageIDComment.value
  const comment = event.target.comment.value
  const body = JSON.stringify({ pageID, comment })

  const newCommentResponse = await fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })

  const newCommentData = await newCommentResponse.json()
  appendApiResponse(newCommentData, commentResponseEl)
}
