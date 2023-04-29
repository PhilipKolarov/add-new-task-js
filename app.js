window.addEventListener("load", solve);

function solve() {
  const taskState = {
    title: null,
    category: null,
    content: null,
  };

    const inputDOMSelectors = {
        title: document.getElementById('task-title'),
        category: document.getElementById('task-category'),
        content: document.getElementById('task-content'),
    }

    const otherDOMSelectors = {
        publishForm: document.querySelector('.newPostContent'),
        reviewContainer: document.getElementById('review-list'),
        uploadedContainer: document.getElementById('published-container'),
        publishBtn: document.getElementById('publish-btn'),
    }

    otherDOMSelectors.publishBtn.addEventListener('click', addTaskHandler);

    function addTaskHandler(event) {
        if (event) {
            event.preventDefault();
        }

        let allFieldsHaveValue = Object.values(inputDOMSelectors)
            .every((i) => i.value !== '');

        if(!allFieldsHaveValue) {
            console.log('EMPTY FIELD');
            console.log(inputDOMSelectors.title.value);
            console.log(inputDOMSelectors.category.value);
            console.log(inputDOMSelectors.content.value);
            return;
        }

        const { title, category, content } = inputDOMSelectors;
        const listItem = createElement('li', otherDOMSelectors.reviewContainer, '', ['rpost'])
        const taskContainer = createElement('article', listItem);
        createElement('h4', taskContainer, `${title.value}`);
        createElement('p', taskContainer, `Category: ${category.value}`);
        createElement('p', taskContainer, `Content: ${content.value}`);
        editBtn = createElement('button', listItem, 'Edit', ['action-btn', 'edit']);
        postBtn = createElement('button', listItem, 'Post', ['action-btn', 'post']);
        
        editBtn.addEventListener('click', editTaskHandler);
        postBtn.addEventListener('click', postTaskHandler);

        for(const key in inputDOMSelectors) {
          taskState[key] = inputDOMSelectors[key].value;
        }

        clearAllInputs();
    }

    function editTaskHandler(event) {
      if (event) {
        event.preventDefault();
      }

      for (const key in inputDOMSelectors) {
        inputDOMSelectors[key].value = taskState[key];
      }
    
      otherDOMSelectors.reviewContainer.innerHTML = '';
    }

    function clearAllInputs() {
        Object.values(inputDOMSelectors)
            .forEach((i) => {
                i.value = '';
            })
    }

    function postTaskHandler() {
        const taskReference = this.parentNode;

        otherDOMSelectors.uploadedContainer.appendChild(taskReference);
        postBtn.remove();
        editBtn.remove();
    }

    function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
        const htmlElement = document.createElement(type);
      
        if (content && useInnerHtml) {
          htmlElement.innerHTML = content;
        } else {
          if (content && type !== 'input') {
            htmlElement.textContent = content;
          }
          
          if (content && type === 'input') {
            htmlElement.value = content;
          }
        }
        
        // parse as an array
        if (classes && classes.length > 0) {
          htmlElement.classList.add(...classes);
        }
      
        if (id) {
          htmlElement.id = id;
        }
      
        // { src: 'ink', href: 'http' }
        if (attributes) {
          for (const key in attributes) {
            htmlElement.setAttribute(key, attributes[key])
          }
        }
      
        if (parentNode) {
          parentNode.appendChild(htmlElement)
        }
      
        return htmlElement;
    }
}