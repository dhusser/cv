function createElementWithClass(tag, classList) {
  let newElement = document.createElement(tag);
  newElement.classList.add(classList);
  return newElement;
}

function createList(ulName, items) {
  const newList = createElementWithClass(ul, `${ulName}-list`)
  for (item in items) {
    const newItem = createElementWithClass(li, item.classList)
    newItem.textContent = item.text
    newList.append(newItem)
  }
}

async function getJson(url) {
  let response = await fetch(url)
  if (response.ok) {
    return await response.json()
  }
}

export {createElementWithClass, createList, getJson}