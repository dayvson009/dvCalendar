const dvCalendarDate = att => {
try{
  const config = {
    dv : (typeof att == 'object') ? att.calendarId : att
    ,minYear : att.minYear || 2000
    ,maxYear : att.maxYear || 2
    ,typeMonth : att.typeMonth || 'full'
    ,nav: att.nav == false ? false : true
  }

  const dvCalendar = document.querySelector(`#${config.dv}`)

  const selectYear = document.querySelector(`#${config.dv} .dv-year`)
  const selectMonth = document.querySelector(`#${config.dv} .dv-month`)
  const inputDate = document.querySelector(`#${config.dv} .dv-fieldDate`)
  const buttonCalendar = document.querySelector(`#${config.dv} .dv-iconCalendar`)

  let today = new Date()
  let currentMonth = today.getMonth()
  let currentYear = today.getFullYear()

  const months = {
    full : ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    ,short : ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  }
 
  const mountSelectYear = (() => {
    let minYear = config.minYear;
    let maxYear = currentYear+config.maxYear;
    
    for(minYear; minYear <= maxYear; minYear++)
      selectYear.insertAdjacentHTML('beforeend', `<option value="${minYear}">${minYear}</option>`);
  })() //Cria os <options> dentro do select year do ano 2000 até o ano atual+2

  // Cria os <options> dentro do select Month
  const mountSelectMonth = (() => {
    months[config.typeMonth].forEach((item, index) => selectMonth.insertAdjacentHTML('beforeend',`<option value="${index}">${item}</option>`))
  })()

  buttonCalendar.addEventListener('click', () => {
    dvCalendar.classList.add('active')
    if(inputDate.value.length == 10){
      newCurrentDate(inputDate.value)
    }
    showCalendar(currentMonth, currentYear)
  })

  showCalendar(currentMonth, currentYear);

  const newCurrentDate = (newDate = '') => {
    console.log(newDate)
    let [d,m,y] = newDate.split('/')
    today = new Date(`${m}/${d}/${y}`)
    currentMonth = today.getMonth()
    currentYear = today.getFullYear()
  }

  const next = () => {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
  }

  const previous = () => {
      currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
      currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
      showCalendar(currentMonth, currentYear);
  }

  const jump = () => {
      currentYear = parseInt(selectYear.value);
      currentMonth = parseInt(selectMonth.value);
      showCalendar(currentMonth, currentYear);
  }

  function showCalendar(month, year) {
    console.log(month, year)

      let firstDay = (new Date(year, month)).getDay();

      tbl = document.querySelector(`#${config.dv} .dv-calendar-body`); // body of the calendar

      // clearing all previous cells
      tbl.innerHTML = "";

      selectYear.value = year;
      selectMonth.value = month;

      // creating all cells
      let date = 1;
      for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            cell = document.createElement("td");
            cellText = document.createTextNode("");
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
          else if (date > daysInMonth(month, year)) {
            break;
          }

          else {
            cell = document.createElement("td");
            cellText = document.createTextNode(date);
            if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth())
              cell.classList.add("currentDay");// color today's date

            cell.appendChild(cellText);
            row.appendChild(cell);
            date++;
          }
          cell.innerHTML.length > 0 ? cell.addEventListener('click', (e) => dateInInput(e.target.innerHTML,currentMonth,currentYear )) : false
        }
        tbl.appendChild(row); // appending each row into calendar body.
      }

  }

  const dateInInput = (d,m,y) => {
    const selectedDate = new Date(`${m+1}/${d}/${y}`)
    inputDate.value = selectedDate.toLocaleDateString()
    newCurrentDate(selectedDate.toLocaleDateString())
    console.log(selectedDate.toLocaleDateString())
    showCalendar(currentMonth, currentYear)
  }

  // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
  function daysInMonth(iMonth, iYear) {
      return 32 - new Date(iYear, iMonth, 32).getDate();
  }


  //---------

  const maskDateInput = (e) => {
    dvCalendar.classList.remove('active')
    // if not a number
    if (e.keyCode < 47 || e.keyCode > 57) {
      // do nothing
      e.preventDefault()
    }
    const el = e.currentTarget
    const len = el.value.length

    // If we're at a particular place, let the user type the slash
    // i.e., 12/12/1212
    if (len !== 1 || len !== 3) {
      if (e.keyCode == 47) {
        e.preventDefault()
      }
    }

    // If they don't add the slash, do it for them...
    if (len === 2) {
      el.value += '/'
    }

    // If they don't add the slash, do it for them...
    if (len === 5) {
      el.value += '/'
    }
  }
  const checkDate = (e) => {
    const input = e.currentTarget
    if (!/(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}/.test(input.value)) {
      input.classList.add('error')
    } else if(input.classList.contains('error')){
      input.classList.remove('error')
    }
  }

  inputDate.addEventListener('focus', ()=>{inputDate.parentNode.classList.add('active')})
  dvCalendar.addEventListener('click', (event)=>{event.stopPropagation()})
  document.addEventListener('click', ()=>{dvCalendar.classList.remove('active')})

  inputDate.addEventListener('keypress', maskDateInput)
  inputDate.addEventListener('change', checkDate)
  selectYear.addEventListener('change', jump)
  selectMonth.addEventListener('change', jump)
  if(config.nav){
    const buttonNext = document.querySelector(`#${config.dv} .dv-next`)
    const buttonPrev = document.querySelector(`#${config.dv} .dv-previous`)
    buttonNext.addEventListener('click', next)
    buttonPrev.addEventListener('click', previous)
  }

  
}catch{
  console.log('Insira um id na tag que contem a class="dv-calendario", e chame na funcao dvCalendarDate(id)')
}
}