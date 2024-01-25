const defaultTodos = [
  { author: 'Judit', text: 'clean the bathroom' },
  { author: 'Judit', text: 'do the laundry' },
  { author: 'Judit', text: 'go programming' },
  { author: 'Judit', text: 'start the dishwasher' },
  { author: 'Judit', text: 'gymnastics' },
  { author: 'Judit', text: 'click attendance list' }
]

function createTodoItemAsHtml (todoItem) {
  return `
    <article class='todo-item'>
        <div class='content'>
            <span class='text'>${todoItem.text}</span>            
        </div>
        <div class='action-icons'>
            <span class='material-symbols-outlined deleteButton'>delete</span>
            <span class='material-symbols-outlined doneButton'>done</span>
        </div>
    </article> `
}

const defaultTodosAsHtml = defaultTodos.map(todo => {
  return createTodoItemAsHtml(todo)
})

const htmlString = defaultTodosAsHtml.join('')
const todoList = document.querySelector('.todo-list')
todoList.innerHTML = htmlString

//Removing + ready function----------------------------------------
const spans = Array.from(document.querySelectorAll('span'))
spans.map(s => {
  s.addEventListener('click', function () {
    const grandParent = s.parentElement.parentElement
    const textSpan = grandParent.firstElementChild.firstElementChild

    if (s.classList.contains('deleteButton')) {
      defaultTodos.map(t => {
        if (t.text == textSpan.innerText) {
          let index = defaultTodos.indexOf(t)
          if (index > -1) {
            defaultTodos.splice(index, 1)
            console.log(defaultTodos)
          }
        }
      })
      grandParent.parentNode.removeChild(grandParent)
    }

    if (s.classList.contains('doneButton')) {
      textSpan.classList.contains('lineThrough')
        ? textSpan.classList.remove('lineThrough')
        : textSpan.classList.add('lineThrough')
    }
  })
})
