// Подключение плагина AirDatepicker
new AirDatepicker('#airdatepicker',{})

// Скрит чекбокса ежемесячного пополнения
function Appearance(){
  document.getElementById('sumAdd').classList.toggle('req')
  document.getElementById('calc-month').classList.toggle('calc-month-pay-on')
  document.getElementById('sumAdd-error').style.visibility = 'hidden'
}
// Валидация формы
const form = document.getElementById('calcForm')

function formValidate(form){
  let error = 0
  let formReq = document.querySelectorAll('.req')
  let term = document.querySelector('.term')
  let type = document.querySelector('#type')

  if (type.value == 'year') {
    term.value = term.value * 12
    if (term.value > 60) {
      term.value = ''
    }
    else
    type.value = 'month'
  }
  // Проверка всех полей на наличие ошибок
  for (let i = 0; i < formReq.length; i++) {
    const input = formReq[i]
    removeError(input)

    if (input.classList.contains('sum')) {
      if (input.value < 1000 || input.value > 3000000 || input.value < 0) {
        addError(input)
        error++
        document.getElementById('sum-error').style.visibility = 'visible'
      }
      else {
        document.getElementById('sum-error').style.visibility = 'hidden'
      }
    }
    else if (input.classList.contains('term')) {
      if (input.value < 1 || input.value > 60) {
        addError(input)
        error++
        document.getElementById('term-error').style.visibility = 'visible'
      }
      else {
        document.getElementById('term-error').style.visibility = 'hidden'
      }
    }
    else if (input.classList.contains('sumAdd')) {
      if ( input.value < 0 || input.value > 3000000 || input.value === '') {
        addError(input)
        error++
        document.getElementById('sumAdd-error').style.visibility = 'visible'
      }
      else {
        document.getElementById('sumAdd-error').style.visibility = 'hidden'
      }
    }
    else if (input.classList.contains('percent')) {
      if (input.value < 3 || input.value > 100) {
        addError(input)
        error++
        document.getElementById('percent-error').style.visibility = 'visible'
      }
      else {
        document.getElementById('percent-error').style.visibility = 'hidden'
      }
    }
    else if (input.value === ''){
      addError(input)
      error++
      document.getElementById('date-error').style.visibility = 'visible'
    }
    else {
      document.getElementById('date-error').style.visibility = 'hidden'
      error = 0
    }
  }

  console.log(error)
  // Вывод окна с финальной суммой
  if (error == 0) {
    document.getElementById('response').style.display = 'block'
  }
  else {
    document.getElementById('response').style.display = 'none'
  }
}
function addError(input){
  input.classList.add('error')
}
function removeError(input){
  input.classList.remove('error')
}
// Обработка формы
function SendJSON(){
  event.preventDefault()

  formValidate(form)

  // Переменная для финальной суммы
  let servResponse = document.querySelector('#answer')

  // Переменные для отправки в обработчик
  let startDate = document.querySelector('._date')
  let term = document.querySelector('.term')
  let sum = document.querySelector('.sum')
  let percent = document.querySelector('.percent')
  let sumAdd = document.querySelector('.sumAdd')

  let xhr = new XMLHttpRequest()

  xhr.open('POST', 'calc.php', true)

  xhr.setRequestHeader('Content-Type',
  'application/json')

  // Проверка статуса запроса
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200) {
      servResponse.textContent = xhr.responseText
    }
  }
  // Конвертация данных в формат JSON
  var data = JSON.stringify({'date': startDate.value,'term': term.value,
                              'sum': sum.value,'percent': percent.value,
                              'sumAdd': sumAdd.value,})
  // Отправка данных в обработчик
    xhr.send(data)
}
