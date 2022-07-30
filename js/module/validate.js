const validation = new window.JustValidate('.reservation__form');


validation
    .addField('#reservation__date', [
        {
            rule: 'required',
            errorMessage: 'Выберите дату!',
        },
    ])
    .addField('#reservation__people', [
        {
            rule: 'required',
            errorMessage: 'Выберите количество людей!',
        },
    ])
    .addField('#reservation__name', [
        {
            rule: 'required',
            errorMessage: 'Обязательно заполните имя!',
        },
        {
            rule: 'customRegexp',
            value: /[а-яА-ЯЁё]{2,}\s+[а-яА-ЯЁё]{2,}\s+[а-яА-ЯЁё]{2,}/gm,
            errorMessage: 'Введите ФИО на кириллице 3 слова!',
        },
    ])
    .addField('#reservation__phone', [
        {
            rule: 'required',
            errorMessage: 'Обязательно заполните телефон!',
        },
        {
            rule: 'customRegexp',
            value: /\+[0-9]+/gm,
            errorMessage: 'Вводите  только цифры и символ + вначале',
        },
    ]);



        const inputNumber = document.querySelector('#reservation__phone');
    
        const im = new Inputmask('+9(999)999-99-99');
        im.mask(inputNumber);
    
 