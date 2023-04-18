function createElementWithClass(tag, classes, textContent) {
  const element = document.createElement(tag);

  if (classes) {
    if (Array.isArray(classes)) {
      element.classList.add(...classes);
    } else {
      element.classList.add(classes);
    }
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

function createListItem(item, ulName) {
  const newItem = createElementWithClass('li', item.classList, item.text);
  if (ulName) {
    newItem.classList.add(`${ulName}-item`);
  }
  if (item.link) {
    const link = createElementWithClass('a', [`${ulName}-link`], item.text);
    link.href = item.link;
    newItem.textContent = '';
    newItem.append(link);
  }
  return newItem;
}

function createList(ulName, items, className) {
  const newList = createElementWithClass('ul', [`${ulName}-list`]);

  for (let item of items) {
    const newItem = createListItem(item, ulName);
    newList.append(newItem);
  }

  if (!className) {
    return newList;
  } else {
    const container = document.querySelector(className);
    const existingList = container.querySelector('ul');

    if (existingList) {
      existingList.remove();
    }

    container.append(newList);
  }
}

function getBaum() {
  const heute = new Date();
  const month = heute.getMonth();

  return month < 2 || month === 11 ?
    "./assets/svg/baums/winterbaum.svg" :
    month < 5 ?
      "./assets/svg/baums/fruehlingbaum.svg" :
      month < 8 ?
        "./assets/svg/baums/sommerbaum.svg" :
        "./assets/svg/baums/herbstbaum.svg";
}

function createTable(array) {
  const newTable = createElementWithClass('table', 'table');

  for (let item of array) {
    const row = document.createElement('tr');
    const place = document.createElement('td');
    const position = document.createElement('td');

    place.innerHTML = item[0];
    position.innerHTML = item[1];

    row.append(place, position);
    newTable.append(row);
  }

  return newTable;
}

function createProject(array, currentLanguage) {
  const projects = createElementWithClass('div', ['projects', 'dragscroll']);

  for (const item of array) {
    const project = createElementWithClass('div', ['project']);
    const preview = createPreview(item);
    const title = createTitle(item, currentLanguage);
    const desc = createDesc(item, currentLanguage);
    const link = createLink(item);

    project.append(preview, title, desc, link);
    projects.append(project);
  }

  return projects;
}

function createPreview(item) {
  const preview = createElementWithClass('video', ['project__preview']);
  preview.src = item.preview;

  return preview;
}

function createTitle(item, language) {
  return createElementWithClass('h3', ['project__title'], item.title[language]);
}

function createDesc(item, language) {
  return createElementWithClass('p', ['project__desc'], item.description[language]);
}

function createLink(item) {
  const link = createElementWithClass('a', ['project__link']);
  link.href = `https://${item.link}`;
  link.textContent = item.link;

  return link;
}

export { createElementWithClass, createList, getBaum, createTable, createProject }