# Plugin dvCalendar

O plugin foi desenvolvido para simplificar a forma de escolher uma data com calendário.

### Benefícios

* Máscara de Data
* Liberdade de Front-end
* Calendário Simples
* Código Legivel

---

## Uso

O uso do plugin é muito simples só precisamos criar a estrutura html, e na div que contém `class="dv-calendario"` insira um id a ser chamado ex: `calendario`

```html
<div class="dv-calendario" id="calendario">
  <form>
    <select name="month" class="dv-month"></select>
    <select name="year" class="dv-year"></select>
  </form>
  <div>
    <button class="dv-previous">Previous</button>
    <button class="dv-next">Next</button>
  </div>
  <table class="dv-calendar">
    <thead>
      <tr>
        <th>Dom</th>
        <th>Seg</th>
        <th>Ter</th>
        <th>Qua</th>
        <th>Qui</th>
        <th>Sex</th>
        <th>Sáb</th>
      </tr>
    </thead>
    <tbody class="dv-calendar-body"></tbody>
  </table>

  <label for="date">Data Inicial</label>
  <input type="text" class="dv-fieldDate" maxlength="10" placeholder="dd/mm/yyyy">
  <span class="dv-iconCalendar">📅</span>
</div>
```

importe o Plugin no head e adicione o CSS:

```html
<head>

  <style>
    .dv-calendario input {
      font-size: 12px;
      margin-top: 10px;
      padding: 10px 15px;
      border: black solid 1px;
      border-radius: 3px;
    }

    .currentDay{
      color: red;
    }
  </style>

  <script type="text/javascript" src="dvCalendar.js"></script>

</head>
``` 

J
Agora invocamos a função e escolhemos a melhor opção, vamos ver da forma mais simples possível:

```javascript
  dvCalendarDate('calendario')
``` 

Código completo simplificado:

```html
<html>
<head>

  <style>
    .dv-calendario input {
      font-size: 12px;
      margin-top: 10px;
      padding: 10px 15px;
      border: black solid 1px;
      border-radius: 3px;
    }

    .currentDay{
      color: red;
    }
  </style>

  <script type="text/javascript" src="dvCalendar.js"></script>

</head>
<body>
  <div class="dv-calendario" id="calendario">
    <form>
      <select name="month" class="dv-month"></select>
      <select name="year" class="dv-year"></select>
    </form>
    <div>
      <button class="dv-previous">Previous</button>
      <button class="dv-next">Next</button>
    </div>
    <table class="dv-calendar">
      <thead>
        <tr>
          <th>Dom</th>
          <th>Seg</th>
          <th>Ter</th>
          <th>Qua</th>
          <th>Qui</th>
          <th>Sex</th>
          <th>Sáb</th>
        </tr>
      </thead>
      <tbody class="dv-calendar-body"></tbody>
    </table>

    <label for="date">Data Inicial</label>
    <input type="text" class="dv-fieldDate" maxlength="10" placeholder="dd/mm/yyyy">
    <span class="dv-iconCalendar">📅</span>
  </div>

  <script type="text/javascript">
    dvCalendarDate('calendario')
  </script>
</body>
</html>
```

## Opções / Configs

Podemos chamar o plugin e inserirmos algumas configurações básicas

```javascript
dvCalendarDate({
    calendarId : 'calendario' // Id do Grupo de Elemento dv-calendar
    ,minYear : 1993 // Ano inicial
    ,maxYear : 5 // Ano atual + 5
    ,typeMonth : 'short' // Typo de Meses a mostrar, full ou short
    ,nav: false // abilitar/desabilita o next | prev
  })
```

|   Opção     |         Valor         |   Tipo  |                             Especificação                             |
| ----------- | --------------------- | ------- | --------------------------------------------------------------------- |
| calendarId  | **'calendario'**      | String  | Id do elemento html (na tag onde está a class="dv-calendario")        |
| minYear     | **1993**              | Inteiro | Ano mínimo mostrado no select de anos                                 |
| maxYear     | **5**                 | Inteiro | Soma do Ano atual + **N** anos a frente ex: 2021 + 5 = 2026           |
| typeMonth   | **short** ou **full** | String  | Tipo de Mês que será mostrado no select, short = Curto, full Completo |
| nav         | **false** ou **true** | String  | nav é pra habilitar ou não a opção de passar de mês pelos botões      |


### Exemplos

Veja alguns exemplos a seguir:

* Simples
* Calendario Oculto
* Calendário com Data Mês curto
* Sem o menu PROX e Anterior
