import {declOfNum} from './declOfNum.js';

const loadTours = async (cb) => {
    const res = await fetch('data.json');
    const data = await res.json();
    cb(data);
};

const createSelectDateTour = (data) => {
    const selectDate = document.getElementById('tour__date');

    const optionTemplate = document.createElement('option');
    optionTemplate.className = 'tour__option';
    let options = [];

    data.forEach((item) => {
        const option = optionTemplate.cloneNode();
        option.value = item['date'];
        option.textContent = item['date'];
        options.push(option);
    });

    selectDate.append(...options);
};

const createSelectPeopleTour = (data) => {
    const selectDate = document.getElementById('tour__date');

    const optionTemplate = document.createElement('option');
    optionTemplate.className = 'tour__option';

    const firstOption = optionTemplate.cloneNode();
    firstOption.textContent = 'Количество человек';

    const selectWrapper = document.querySelector(
        '.tour__select-wrapper_people'
    );

    selectDate.addEventListener('change', () => {
        if (selectDate.value) {
            let options = [];
            selectWrapper.querySelector('select').remove();

            const select = document.createElement('select');
            select.id = 'tour__people';
            select.name = 'people';
            select.className = 'tour__select';

            let choisedDate = data.find(
                (el) => el['date'] === selectDate.value
            );
            for (
                let i = +choisedDate['min-people'];
                i <= +choisedDate['max-people'];
                i++
            ) {
                const option = optionTemplate.cloneNode();
                option.textContent = i;
                options.push(option);
            }

            select.append(firstOption, ...options);
            selectWrapper.append(select);
        }
    });
};

const bookingTour = (data) => {
    const selectDate = document.getElementById('reservation__date');

    const optionTemplate = document.createElement('option');
    optionTemplate.className = 'tour__option reservation__option';
    let options = [];

    data.forEach((item) => {
        const option = optionTemplate.cloneNode();
        option.value = item['date'];
        option.textContent = item['date'];
        options.push(option);
    });

    selectDate.append(...options);
};

const BookingPeople = (data) => {
    const selectDate = document.getElementById('reservation__date');

    const optionTemplate = document.createElement('option');
    optionTemplate.className = 'tour__option reservation__option';

    const firstOption = optionTemplate.cloneNode();
    firstOption.textContent = 'Количество человек';

    const selectWrapper = document.querySelector(
        '.reservation__select-wrapper_people'
    );
    let choisedDate = {};
    selectDate.addEventListener('change', () => {
        if (selectDate.value) {
            let options = [];
            selectWrapper.querySelector('select').remove();

            const select = document.createElement('select');
            select.id = 'reservation__people';
            select.name = 'people';
            select.className = 'reservation__select';

            choisedDate = data.find((el) => el['date'] === selectDate.value);
            for (
                let i = +choisedDate['min-people'];
                i <= +choisedDate['max-people'];
                i++
            ) {
                const option = optionTemplate.cloneNode();
                option.textContent = i;
                options.push(option);
            }

            select.append(firstOption, ...options);
            selectWrapper.append(select);
        }
    });
    selectWrapper.addEventListener('change', (e) => {
        document.querySelector('.reservation__data').textContent = `${
            choisedDate['date']
        }, ${e.target.value} ${declOfNum(e.target.value, [
            'человек',
            'человека',
            'человек',
        ])}`;
        document.querySelector('.reservation__price').textContent =
            new Intl.NumberFormat('ru', {
                style: 'currency',
                currency: 'RUB',
                maximumFractionDigits: 0,
            }).format(choisedDate['price'] * +e.target.value);
    });
};
loadTours(createSelectDateTour);
loadTours(createSelectPeopleTour);
loadTours(bookingTour);
loadTours(BookingPeople);
