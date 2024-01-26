const defaultTodos = [
  { author: 'Judit', text: 'clean the bathroom', done: 'false' },
  { author: 'Judit', text: 'do the laundry', done: 'false' },
  { author: 'Judit', text: 'go programming', done: 'false' },
  { author: 'Judit', text: 'start the dishwasher', done: 'false' },
  { author: 'Judit', text: 'gymnastics', done: 'false' },
  { author: 'Judit', text: 'click attendance list', done: 'false' }
]

/* document.getElementById('userNames').addEventListener('change', function (e) {
  alert(e.target.value)
}) */


function createTodoItemAsHtml (todoItem) {
  let addedClass = ''
  if (todoItem.done == true) {
    addedClass = 'lineThrough'
  } else {
    addedClass = ''
  }
  return `
    <article class='todo-item'>
        <div class='content'>
            <span class='text ${addedClass}'>${todoItem.text}</span>            
        </div>
        <div class='action-icons'>
            <span class='material-symbols-outlined upButton'>arrow_upward</span>
            <span class='material-symbols-outlined downButton'>arrow_downward</span>
            <span class='material-symbols-outlined deleteButton'>delete</span>
            <span class='material-symbols-outlined doneButton'>done</span>
        </div>
    </article> `
}

let defaultTodosAsHtml = defaultTodos.map(todo => {
  return createTodoItemAsHtml(todo)
})

let htmlString = defaultTodosAsHtml.join('')
let todoList = document.getElementById('todoSection')
todoList.innerHTML = htmlString

//Adding item function----------------------------------------
const form = document.querySelector('form')
form.addEventListener('submit', function (e) {
  e.preventDefault()
  const newTodoItem = {
    author: 'Judit',
    text: e.target['text'].value
  }
  defaultTodos.push(newTodoItem)

  const newTodoHtml = createTodoItemAsHtml(newTodoItem)
  todoList.insertAdjacentHTML('beforeend', newTodoHtml)
})

//Removing + ready function----------------------------------------

function swap (arr, from, to) {
  arr.splice(from, 1, arr.splice(to, 1, arr[from])[0])
}

function reWriteTodoList (defaultTodos) {
  defaultTodosAsHtml = defaultTodos.map(todo => {
    return createTodoItemAsHtml(todo)
  })
  htmlString = defaultTodosAsHtml.join('')
  todoList = document.getElementById('todoSection')
  todoList.innerHTML = htmlString
}

function deleteItem (defaultTodos, textSpan, grandParent) {
  defaultTodos.map(t => {
    if (t.text == textSpan.innerText) {
      let index = defaultTodos.indexOf(t)
      if (index > -1) {
        defaultTodos.splice(index, 1)
      }
    }
  })
  grandParent.parentNode.removeChild(grandParent)
}

function doneItem (defaultTodos, textSpan) {
  if (textSpan.classList.contains('lineThrough')) {
    textSpan.classList.remove('lineThrough')
    defaultTodos.map(t => {
      if (t.text == textSpan.innerText) {
        let index = defaultTodos.indexOf(t)
        if (index > 0) {
          t.done = false
        }
      }
    })
  } else {
    textSpan.classList.add('lineThrough')
    defaultTodos.map(t => {
      if (t.text == textSpan.innerText) {
        let index = defaultTodos.indexOf(t)
        if (index > 0) {
          t.done = true
        }
      }
    })
  }
}

function moveUp (defaultTodos, textSpan) {
  defaultTodos.map(t => {
    if (t.text == textSpan.innerText) {
      let index = defaultTodos.indexOf(t)
      if (index > 0) {
        let beforeItem = defaultTodos[index - 1]
        let thisItem = defaultTodos[index]
        defaultTodos[index] = beforeItem
        defaultTodos[index - 1] = thisItem
        reWriteTodoList(defaultTodos)
      }
    }
  })
}

function moveDown (defaultTodos, textSpan) {
  let index = -1
  defaultTodos.map(t => {
    if (t.text == textSpan.innerText) {
      index = defaultTodos.indexOf(t)
    }
  })
  if (index < defaultTodos.length - 1) {
    swap(defaultTodos, index, index + 1)
    console.log(defaultTodos)
    reWriteTodoList(defaultTodos)
  }
}

document
  .getElementById('todoSection')
  .addEventListener('click', clickedSection => {
    let s = clickedSection.target

    let grandParent = s.parentElement.parentElement
    let textSpan = grandParent.firstElementChild.firstElementChild

    if (s.classList.contains('deleteButton')) {
      deleteItem(defaultTodos, textSpan, grandParent)
    }

    if (s.classList.contains('doneButton')) {
      doneItem(defaultTodos, textSpan)
    }

    if (s.classList.contains('upButton')) {
      moveUp(defaultTodos, textSpan)
    }

    if (s.classList.contains('downButton')) {
      moveDown(defaultTodos, textSpan)
    }
  })


