/* const todos = [
  {
    author: 'Judit',
    text: 'clean the bathroom',
    done: 'false',
    shouldBeDoneBy: '2024-01-26 15:08',
    created: '2024-01-16 15:08'
  },
  {
    author: 'Judit',
    text: 'do the laundry',
    done: 'false',
    shouldBeDoneBy: '2024-01-25 15:08',
    created: '2024-01-17 15:08'
  },
  {
    author: 'Judit',
    text: 'go programming',
    done: 'false',
    shouldBeDoneBy: '2024-01-21 15:08',
    created: '2024-01-18 15:08'
  },
  {
    author: 'Judit',
    text: 'start the dishwasher',
    done: 'false',
    shouldBeDoneBy: '2024-01-22 15:08',
    created: '2024-01-19 15:08'
  },
  {
    author: 'Judit',
    text: 'gymnastics',
    done: 'false',
    shouldBeDoneBy: '2024-01-20 15:08',
    created: '2024-01-19 15:18'
  },
  {
    author: 'Judit',
    text: 'click attendance list',
    done: 'false',
    shouldBeDoneBy: '2024-01-26 11:09',
    created: '2024-01-20 15:08'
  },
  {
    author: 'Other',
    text: 'read the book',
    done: 'false',
    shouldBeDoneBy: '2024-01-26 11:08',
    created: '2024-01-20 15:10'
  }
] */

//const defaultAuthors = ['Judit', 'All', 'Other']

let storedTodo = localStorage.getItem('defaultTodosStorage')
let defaultTodos = JSON.parse(storedTodo)
var allTodos = []
let authors = localStorage.getItem('authors')
var allAuthors = []
let userStorage = localStorage.getItem('userStorage')

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
            <span class='shouldBeDoneTimeSpan notShow'>${todoItem.shouldBeDoneBy}</span>  
            <span hidden class='created '>${todoItem.created}</span>     
        </div>
        <div class='action-icons'>
            <span class='material-symbols-outlined upButton'>arrow_upward</span>
            <span class='material-symbols-outlined downButton'>arrow_downward</span>
            <span class='material-symbols-outlined deleteButton'>delete</span>
            <span class='material-symbols-outlined doneButton'>done</span>
            <span class="material-symbols-outlined editButton">edit</span>
        </div>
    </article> `
}

if (defaultTodos !== null && defaultTodos.length > 0) {
  if (userStorage == 'All') {
    let defaultTodosAsHtml = defaultTodos.map(todo => {
      return createTodoItemAsHtml(todo)
    })
    let htmlString = defaultTodosAsHtml.join('')
    let todoList = document.getElementById('todoSection')
    todoList.innerHTML = htmlString
  } else {
    let defaultTodosAsHtml = defaultTodos.map(todo => {
      if (todo.author == userStorage) {
        return createTodoItemAsHtml(todo)
      }
    })
    let htmlString = defaultTodosAsHtml.join('')
    let todoList = document.getElementById('todoSection')
    todoList.innerHTML = htmlString
  }
}

//Show authors in dropdown-----------------------------------
if (authors !== null && authors.length > 0) {
  let select = document.getElementById('userNames')
  for (let oldAut of authors) {
    if (oldAut != ',') {
      let opt = document.createElement('option')
      opt.value = oldAut
      opt.innerHTML = oldAut
      select.appendChild(opt)
      if (opt.innerHTML == userStorage) {
        opt.selected = 'selected'
      }
    }
  }
}

//Save author function----------------------------------------
const authorForm = document.querySelector('#authorInputForm')
authorForm.addEventListener('submit', function (e) {
  const newAuthor = e.target['author'].value

  if (authors !== null && authors.length > 0) {
    for (oldAuthor of authors) {
      allAuthors.push(oldAuthor)
    }
  }

  allAuthors.push(newAuthor)
  localStorage.setItem('authors', allAuthors)

  const newOption = document.createElement('option')
  newOption.value = newAuthor
  newOption.innerHTML = newAuthor
  document.getElementById('userNames').appendChild(newOption)
})

//Choose user function----------------------------------------
if (defaultTodos !== null && defaultTodos.length > 0) {
  document.getElementById('userNames').addEventListener('change', function (e) {
    defaultTodosAsHtml = defaultTodos.map(todo => {
      if (todo.author == e.target.value || e.target.value == 'All') {
        return createTodoItemAsHtml(todo)
      }
    })
    htmlString = defaultTodosAsHtml.join('')
    todoList = document.getElementById('todoSection')
    todoList.innerHTML = htmlString
  })
}

//Adding item function----------------------------------------
const form = document.querySelector('#todoInputForm')
form.addEventListener('submit', function (e) {
  user = document.getElementById('userNames')
  const newTodoItem = {
    author: user.value,
    text: e.target['text'].value,
    shouldBeDoneBy: e.target['timeInput'].value.substring(0, 10),
    created: new Date()
  }
  localStorage.setItem('userStorage', user.value)

  if (storedTodo !== null && storedTodo.length > 0) {
    for (oldTodos of defaultTodos) {
      allTodos.push(oldTodos)
    }
  }
  allTodos.push(newTodoItem)
  localStorage.setItem('defaultTodosStorage', JSON.stringify(allTodos))

  const newTodoHtml = createTodoItemAsHtml(newTodoItem)
  if (defaultTodos !== null && defaultTodos.length > 0) {
    todoList.insertAdjacentHTML('beforeend', newTodoHtml)
  } else {
    todoList = document.getElementById('todoSection')
    todoList.innerHTML = newTodoHtml
    document.getElementById('userNames').value = user
  }
})

let dateIsShown = false

//Show time function----------------------------------------
document
  .getElementById('showTimeButton')
  .addEventListener('click', function () {
    const todoCreatedSpan = document.getElementsByClassName(
      'shouldBeDoneTimeSpan'
    )

    for (span of todoCreatedSpan) {
      if (span.classList.contains('notShow')) {
        span.classList.remove('notShow')
        span.classList.add('show')
        document.getElementById('showTimeButton').innerText = 'Hide due date'
        dateIsShown = true
      } else {
        span.classList.add('notShow')
        span.classList.remove('show')
        document.getElementById('showTimeButton').innerText = 'Show due date'
        dateIsShown = false
      }
    }
  })

function pad_2 (number) {
  return (number < 10 ? '0' : '') + number
}

function hours (date) {
  var hours = date.getHours()
  return hours
}

function date_format (date) {
  return (
    date.getFullYear() +
    '-' +
    pad_2(date.getMonth() + 1) +
    '-' +
    pad_2(date.getDate()) +
    ' ' +
    pad_2(hours(date)) +
    ':' +
    pad_2(date.getMinutes())
  )
}

//sort todo by time function---------------------------
document
  .getElementById('sortTodoByTime')
  .addEventListener('click', function (e) {
    let buttonLabel = document.getElementById('sortTodoByTime').innerText

    //sort according to due date
    if (buttonLabel == 'Sort by due date') {
      document.getElementById('sortTodoByTime').innerText = 'Show original list'
      defaultTodos.sort(function (a, b) {
        return new Date(a.shouldBeDoneBy) - new Date(b.shouldBeDoneBy)
      })
    } else {
      //sort according to todo createing date
      defaultTodos.sort(function (a, b) {
        return new Date(a.created) - new Date(b.created)
      })
      document.getElementById('sortTodoByTime').innerText = 'Sort by due date'
    }

    defaultTodosAsHtml = defaultTodos.map(todo => {
      return createTodoItemAsHtml(todo)
    })

    htmlString = defaultTodosAsHtml.join('')
    todoList = document.getElementById('todoSection')
    todoList.innerHTML = htmlString

    //show/hide due date
    const todoCreatedSpan = document.getElementsByClassName(
      'shouldBeDoneTimeSpan'
    )

    if (dateIsShown) {
      for (span of todoCreatedSpan) {
        span.classList.add('show')

        if (span.classList.contains('notShow')) {
          span.classList.remove('notShow')
        }
      }
    }
  })

function pad_2 (number) {
  return (number < 10 ? '0' : '') + number
}

function hours (date) {
  var hours = date.getHours()
  return hours
}

function date_format (date) {
  return (
    date.getFullYear() +
    '-' +
    pad_2(date.getMonth() + 1) +
    '-' +
    pad_2(date.getDate()) +
    ' ' +
    pad_2(hours(date)) +
    ':' +
    pad_2(date.getMinutes())
  )
}

//Removing + ready moveup + move down functions-----------------
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
  localStorage.setItem('defaultTodosStorage', JSON.stringify(defaultTodos))
}

function doneItem (defaultTodos, textSpan) {
  if (textSpan.classList.contains('lineThrough')) {
    textSpan.classList.remove('lineThrough')
    defaultTodos.map(t => {
      if (t.text == textSpan.innerText) {
        let index = defaultTodos.indexOf(t)
        if (index >= 0) {
          t.done = false
        }
      }
    })
  } else {
    textSpan.classList.add('lineThrough')
    defaultTodos.map(t => {
      if (t.text == textSpan.innerText) {
        let index = defaultTodos.indexOf(t)
        if (index >= 0) {
          t.done = true
        }
      }
    })
  }
  localStorage.setItem('defaultTodosStorage', JSON.stringify(defaultTodos))
}

function editText (defaultTodos, textSpan, s) {
  const parent = textSpan.parentNode
  const text = parent.firstElementChild

  if (s.innerText == 'edit') {
    const inputChild = document.createElement('input')
    parent.appendChild(inputChild)
    parent.replaceChild(inputChild, text)
    s.innerText = 'bookmark_added'
  } else {
    if (parent.firstElementChild.value.length > 0) {
      const spanChild = document.createElement('span')
      parent.appendChild(spanChild)
      spanChild.innerText = text.value
      spanChild.classList.add('text')
      parent.replaceChild(spanChild, parent.firstElementChild)
      s.innerText = 'edit'
      const createdAt = parent.children[2].innerText

      defaultTodos.map(t => {
        if (t.created == createdAt) {
          t.text = text.value
          console.log(t)
        }
      })
    }
  }
  localStorage.setItem('defaultTodosStorage', JSON.stringify(defaultTodos))
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
  localStorage.setItem('defaultTodosStorage', JSON.stringify(defaultTodos))
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
    reWriteTodoList(defaultTodos)
  }
  localStorage.setItem('defaultTodosStorage', JSON.stringify(defaultTodos))
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

    if (s.classList.contains('editButton')) {
      editText(defaultTodos, textSpan, s)
    }
  })
