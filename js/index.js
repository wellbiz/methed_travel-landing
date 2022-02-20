import { timer } from './module/timer.js';
import './module/acc.js';
import './module/burger.js';
import './module/animation.js';
import './module/fetch.js';
import './module/send.js';

const showTimer = () => {
    const blockTimer = document.querySelector('.timer');
    blockTimer.dataset.timerDeadline = '2022/02/25 20:45';
    const deadline = blockTimer.dataset.timerDeadline;
    timer(deadline);
};

showTimer();