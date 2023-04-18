const functions = require('./functions'),
  { reset } = require('./dragscroll'),
  menuJson = require('../assets/json/menu.json'),
  hardSkillsJson = require('../assets/json/hard-skills.json'),
  languageSkillsJson = require('../assets/json/language-skills.json'),
  sectionVolunteeringJson = require('../assets/json/section-volunteering.json'),
  sectionAboutJson = require('../assets/json/section-about.json'),
  sectionProjectsJson = require('../assets/json/section-projects.json'),
  sectionWorkJson = require('../assets/json/section-work.json'),
  sectionEducationJson = require('../assets/json/section-education.json'),
  selectLanguage = document.querySelector('.language__select'),
  currentLanguage = document.querySelector('.language__current');

  document.querySelector('.baum').src = functions.getBaum();

function renderPage(){
  setCurrentLanguage();
  createMenu();
  createHardSkills();
  createLanguageSkills();
  createAboutSection();
  createWorkSection();
  createEducationSection();
  createVolunteeringSection();
  updateProjectsSection(sectionProjectsJson.title[selectLanguage.value], sectionProjectsJson.content);
  reset();
}


function setCurrentLanguage(){
  currentLanguage.src = `./assets/svg/${selectLanguage.value}.svg`;
}


function createMenu(){
  functions.createList(menuJson.name, menuJson.items[selectLanguage.value], '.menu');
}


function createHardSkills(){
  functions.createList(hardSkillsJson.name, hardSkillsJson.items, '.section-skills');
}


function createLanguageSkills(){
  functions.createList(languageSkillsJson.name, languageSkillsJson.items[selectLanguage.value], '.section-language');
}


function createAboutSection(){
  document.querySelector('.section-about .section__title').textContent = sectionAboutJson.title[selectLanguage.value]
  document.querySelector('.section-about .section__desc').textContent = sectionAboutJson.content[selectLanguage.value]
}


function createWorkSection(){
  const sectionWork = document.querySelector('.section-work .content__text')
  sectionWork.querySelector('.section__title').textContent = sectionWorkJson.title[selectLanguage.value];
  if (sectionWork.querySelector('.table')) sectionWork.querySelector('.table').remove();
  sectionWork.append(functions.createTable(sectionWorkJson.content[selectLanguage.value]));
}


function createEducationSection(){
  const sectionEducation = document.querySelector('.section-education .content__text')
  sectionEducation.querySelector('.section__title').textContent = sectionEducationJson.title[selectLanguage.value];
  if (sectionEducation.querySelector('.table')) sectionEducation.querySelector('.table').remove();
  sectionEducation.append(functions.createTable(sectionEducationJson.content[selectLanguage.value]));
}


function createVolunteeringSection(){
  const sectionVolunteering = document.querySelector('.section-volunteering')
  sectionVolunteering.querySelector('.section__title').textContent = sectionVolunteeringJson.title[selectLanguage.value];
  if (sectionVolunteering.querySelectorAll('p')) sectionVolunteering.querySelectorAll('p').forEach(e => {e.remove();})
  sectionVolunteering.innerHTML += sectionVolunteeringJson.content[selectLanguage.value];
}

function updateProjectsSection(title, content) {
  const sectionProjects = document.querySelector('.section-projects')
  sectionProjects.querySelector('.section__title').textContent = title;
  
  const projectsSection = sectionProjects.querySelector('.projects');
  if (projectsSection) projectsSection.remove();
  
  sectionProjects.querySelector('.content__text').append(functions.createProject(content, selectLanguage.value))
}

renderPage();

selectLanguage.addEventListener('change', renderPage);