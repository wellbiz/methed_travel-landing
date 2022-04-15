import {fetchRequest} from './fetchRequest.js';
import {loadDb} from './loadDb.js';
import { createPopupStatusFalse,createPopupStatus201 } from '../modal.js';

const formEmail = document.querySelector('.footer__form');

export const formEmailControl = () => {
    const form = document.querySelector('.footer__form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const emailData = Object.fromEntries(formData);

        dbEmailControl(emailData);

        return {emailData};
    });
};
export const dbEmailControl = (email) => {
    fetch('http://localhost:3000/emails', {
        method: 'POST',
        body: JSON.stringify({
            email: email.email,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.status === 201) createPopupStatus201();
            if (response.status != 201) createPopupStatusFalse();
        })
        .catch((error) => console.error(error));
};
loadDb(formEmailControl);
