async function getJson(url) {
  let response = await fetch(url)
  if (response.ok) {
    return await response.json()
  }
}

function createElementWithClass(tag, classList) {
  let newElement = document.createElement(tag)
  
    for (className of classList) {
      newElement.classList.add(className)
    }

  return newElement
}

function createList(ulName, items) {
  const newList = createElementWithClass('ul', [`${ulName}-list`])
  
  for (item of items) {
    const newItem = createElementWithClass('li', item.classList)
    newItem.textContent = item.text
    newList.append(newItem)
  }

  return newList
}

function createListWithlink(ulName, items) {
  const newList = createElementWithClass('ul', [`${ulName}-list`])
  
  for (item of items) {
    const newItem = createElementWithClass('li', [`${ulName}-item`])
    const link = createElementWithClass('a', [`${ulName}-link`])
    link.textContent = item.text
    link.href = item.link
    newItem.append(link)
    newList.append(newItem)
  }

  return newList
}

// add menu items
getJson('./assets/json/menu.json').then(response => {
  const hardSkillsList = document.querySelector('.nav')
  hardSkillsList.append(createListWithlink(response.name, response.items))

})

// add Hard skills
getJson('./assets/json/hard-skills.json').then(response => {
  const hardSkillsList = document.querySelector('.hard-skills')
  hardSkillsList.append(createList(response.name, response.items))

})

// add Language skills
getJson('./assets/json/language-skills.json').then(response => {
  const hardSkillsList = document.querySelector('.language-skills')
  hardSkillsList.append(createList(response.name, response.items))
})
