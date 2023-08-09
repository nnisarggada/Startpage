/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"VLXpH67q22PFQugV","label":"reddit","bookmarks":[{"id":"JUHuG8h2bdwwhiE4","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"JkWh4fUKBSa2dqZi","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"YASfXx8abG1Zw3HH","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"MYb4sajYkza2KtPV","label":"dev","bookmarks":[{"id":"ljHQVE21cO0lYrAt","label":"github","url":"https://github.com/nnisarggada"},{"id":"7VedEdzZAUCP2RYu","label":"vercel","url":"https://vercel.com"},{"id":"3RbHZHoBnRlmUpLY","label":"devdocs","url":"https://devdocs.io/"}]},{"id":"qmKspszbBO3q2swd","label":"work","bookmarks":[{"id":"mIA71ORaROuRhqMr","label":"mail","url":"https://mail.google.com"},{"id":"tHGUwAG8IgZZpczV","label":"teams","url":"https://teams.microsoft.com"},{"id":"iMPyUuuDSoKSbaVp","label":"linkedin","url":"https://linkedin.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
