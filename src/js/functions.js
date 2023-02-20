async function getJson(url) {
  let response = await fetch(url)
  if (response.ok) {
    return await response.json()
  }
}

function createElementWithClass(tag, classList) {
  let newElement = document.createElement(tag)
  
    for (let className of classList) {
      newElement.classList.add(className)
    }

  return newElement
}

function createList(ulName, items) {
  const newList = createElementWithClass('ul', [`${ulName}-list`])
  
  for (let item of items) {
    const newItem = createElementWithClass('li', item.classList)
    newItem.textContent = item.text
    newList.append(newItem)
  }

  return newList
}

function createListWithlink(ulName, items) {
  const newList = createElementWithClass('ul', [`${ulName}-list`])
  
  for (let item of items) {
    const newItem = createElementWithClass('li', [`${ulName}-item`])
    const link = createElementWithClass('a', [`${ulName}-link`])
    link.textContent = item.text
    link.href = item.link
    newItem.append(link)
    newList.append(newItem)
  }

  return newList
}

export {getJson, createElementWithClass, createList, createListWithlink}