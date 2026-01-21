
const state = {
  showCompleted: false,
  tasks: [
    {
      name: 'Task 1',
      deadline: new AppDate().getDateInXMonth(1),
    },
    {
      name: 'Task 2',
      deadline: new AppDate().getDateInXMonth(2),
    },
    {
      name: 'Task 3',
      deadline: new AppDate().getDateInXMonth(3),
    },
  ]
}

// ↓↓↓ ここを実装

function renderTasks(container) {
  if (!container) return

  container.innerHTML = ''

  const visibleTasks = state.showCompleted
    ? state.tasks
    : state.tasks.filter((task) => !task.completed)

  for (const task of visibleTasks) {
    const li = document.createElement('li')

    li.innerHTML = `
      <div class="list__item">
              <div class="list__item-col list__item-col-checkbox">
                <label class="checkbox">
                  <input type="checkbox" class="checkbox__input">
                  <i class="icon icon--check fa-solid fa-check" aria-hidden="true"></i>
                </label>
              </div>
              <div class="list__item-col list__item-col-name">
              </div>
              <div class="list__item-col list__item-col-deadline">
              </div>
              <div class="list__item-col list__item-col-actions">
                <i class="icon icon--trash fa-solid fa-trash" aria-hidden></i>
              </div>
            </div>
    `

    const checkbox = li.querySelector('.checkbox__input')
    const row = li.querySelector('.list__item')
    const nameEl = li.querySelector('.list__item-col-name')
    const deadlineEl = li.querySelector('.list__item-col-deadline')
    const trashIcon = li.querySelector('.icon--trash')

    nameEl.textContent = task.name
    deadlineEl.textContent = String(task.deadline ?? '')

    checkbox.checked = Boolean(task.completed)


    checkbox.addEventListener('change', (event) => {
      task.completed = event.target.checked

      // checkbox.addEventListener('change', () => {
      //   task.completed = checkbox.checked
      // })

      if (!state.showCompleted && task.completed) {
        row.classList.add('is-removing')

        setTimeout(() => {
          renderTasks(container)
        }, 1500)
        // return
      }
    })


    nameEl.style.cursor = 'pointer'

    nameEl.addEventListener('click', (e) => {
      e.stopPropagation()

      if (nameEl.querySelector('input')) return

      const beforeName = task.name

      const input = document.createElement('input')
      input.type = 'text'
      input.value = task.name

      input.addEventListener('click', (e) => e.stopPropagation())

      nameEl.textContent = ''
      nameEl.appendChild(input)

      input.focus()
      // input.select()
      const end = input.value.length
      input.setSelectionRange(end, end)

      const commit = () => {
        const newName = input.value.trim()

        // if (!newName) {
        //   task.name = beforeName
        //   renderTasks(container)
        //   return
        // }

        task.name = newName ? newName : beforeName
        renderTasks(container)
      }

      input.addEventListener('blur', commit)

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') commit()
        if (e.key === 'Escape') {
          task.name = beforeName
          renderTasks(container)
        }
      })
    })

    // deadlineEl.computedStyleMap().cursor = 'pointer'
    deadlineEl.style.cursor = 'pointer'

    deadlineEl.addEventListener('click', () => {
      // if (deadlineEl.querySelector('input')) return
      const existing = deadlineEl.querySelector('input[type="date"]')

      if (existing) {
        existing.showPicker?.()
        existing.focus()
        existing.click()
        return
      }

      const beforeDeadline = task.deadline

      const input = document.createElement('input')
      input.type = 'date'
      input.value = typeof task.deadline === 'string' ? task.deadline : ''

      deadlineEl.textContent = ''
      deadlineEl.appendChild(input)

      input.focus()

      // input.showPicker?.()
      if (input.showPicker) {
        input.showPicker()
      }

      // setTimeout(() => input.click(), 0)

      const commit = () => {
        const newDeadline = input.value.trim()

        // if (!newDeadline) {
        //   task.deadline = beforeDeadline
        //   renderTasks(container)
        //   return
        // }

        // task.deadline = newDeadline
        task.deadline = newDeadline ? newDeadline : beforeDeadline
        renderTasks(container)
      }

      input.addEventListener('blur', commit)

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') commit()
        if (e.key === 'Escape') {
          task.deadline = beforeDeadline
          renderTasks(container)
        }
      })
    })


    trashIcon.addEventListener('click', () => {
      state.tasks = state.tasks.filter(
        (t) => t !== task)
      renderTasks(container)
    })

    container.appendChild(li)
  }
}

function onSubmitTask(container) {
  const form =
    document.querySelector('.js-form') ?? document.querySelector('form')
  // if (!form) return

  const nameInput =
    form.querySelector('.form__input-name .form__input-field') ??
    form.querySelector('input[type="text"]')

  const dateInput =
    form.querySelector('.form__input-date .form__input-field') ??
    form.querySelector('input[type="date"]')

  const name = (nameInput?.value ?? '').trim()
  const deadline = (dateInput?.value ?? '').trim()

  if (!name) {
    alert('タスク名を入力してください。')
    // nameInput?.focus()
    return
  }

  if (!deadline) {
    alert('期限日を入力してください。')
    // dateInput?.focus()
    return
  }


  state.tasks.unshift({
    id: crypto?.randomUUID?.() ?? String(Date.now() + Math.random()),
    name,
    deadline,
    completed: false,
  })

  if (nameInput) nameInput.value = ''
  if (dateInput) dateInput.value = ''

  renderTasks(container)
}

// ↑↑↑

function main() {
  const todoContainer = document.querySelector('.js-list-container')

  document.querySelector('.js-form').addEventListener('submit', (e) => {
    e.preventDefault()
    onSubmitTask(todoContainer)
  })

  document.querySelector('.js-show-completed').addEventListener('change', (e) => {
    state.showCompleted = e.target.checked
    renderTasks(todoContainer)
  })
  renderTasks(todoContainer)
}

main()
