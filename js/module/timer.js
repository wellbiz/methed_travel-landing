import {declOfNum} from './declOfNum.js';

export const timer = (deadline) => {
    const daysValue = document.querySelector('.timer__count_days');
    const daysDescr = document.querySelector('.timer__units_days');

    const hoursValue = document.querySelector('.timer__count_hours');
    const hoursDescr = document.querySelector('.timer__units_hours');

    const minutesValue = document.querySelector('.timer__count_minutes');
    const minutesDescr = document.querySelector('.timer__units_minutes');

    const getTimeRemaining = () => {
        const dateExpired = new Date(deadline).getTime();
        const dateNow = Date.now();

        const timeRemaining = dateExpired - dateNow;

        const days =
            timeRemaining > 0 ? ~~(timeRemaining / 1000 / 60 / 60 / 24) : 0;
        const hours =
            timeRemaining > 0 ? ~~(timeRemaining / 1000 / 60 / 60) % 24 : 0;
        const minutes =
            timeRemaining > 0 ? ~~(timeRemaining / 1000 / 60) % 60 : 0;
        const seconds = timeRemaining > 0 ? ~~(timeRemaining / 1000) % 60 : 0;

        return {timeRemaining, seconds, minutes, hours, days};
    };

    const start = () => {
        const timer = getTimeRemaining();

        daysValue.textContent = timer.days.toString().padStart(2, '0');
        daysDescr.textContent = declOfNum(timer.days, ['день', 'дня', 'дней']);

        hoursValue.textContent = timer.hours.toString().padStart(2, '0');
        hoursDescr.textContent = declOfNum(timer.hours, [
            'час',
            'часа',
            'часов',
        ]);

        minutesValue.textContent = timer.minutes.toString().padStart(2, '0');
        minutesDescr.textContent = declOfNum(timer.minutes, [
            'минута',
            'минуты',
            'минут',
        ]);

        const intervalId = setTimeout(start, 1000);

        if (timer.timeRemaining <= 0) {
            clearTimeout(intervalId);

            document.querySelector('.hero__text').remove();
            document.querySelector('.hero__timer').remove();
        }
    };

    start();
};
