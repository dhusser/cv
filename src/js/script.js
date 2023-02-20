import { getJson, createElementWithClass, createList, createListWithlink } from './functions';

// add menu items
getJson('../assets/json/menu.json').then(response => {
  const hardSkillsList = document.querySelector('.nav')
  hardSkillsList.append(createListWithlink(response.name, response.items))

})

// add Hard skills
getJson('../assets/json/hard-skills.json').then(response => {
  const hardSkillsList = document.querySelector('.hard-skills')
  hardSkillsList.append(createList(response.name, response.items))

})

// add Language skills
getJson('../assets/json/language-skills.json').then(response => {
  const hardSkillsList = document.querySelector('.language-skills')
  hardSkillsList.append(createList(response.name, response.items))
})