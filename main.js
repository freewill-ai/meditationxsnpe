document.addEventListener('DOMContentLoaded', () => {
    const routines = [
        { name: '1번 동작', reps: '10회', interval: 60000 },
        { name: '2번 동작', reps: '5분' },
        { name: '3번 동작', reps: '10회', interval: 30000 },
        { name: '4번 동작', reps: '100회', interval: 5000 },
        { name: 'C무브', reps: '10분' },
        { name: 'T무브', reps: '300회', interval: 2000 },
        { name: 'L무브', reps: '300회', interval: 3000 },
        { name: 'SC무브', reps: '10분' },
        { name: '호흡 집중', reps: '5분' },
        { name: '자애 명상', reps: '5분' },
    ];

    const generateBtn = document.getElementById('generate-btn');
    const routineContainer = document.getElementById('routine');
    const startSound = document.getElementById('start-sound');
    const completionSound = document.getElementById('completion-sound');
    let timersState = {}; // Holds the state of all timers

    generateBtn.addEventListener('click', () => {
        routineContainer.innerHTML = '';
        Object.values(timersState).forEach(state => {
            if (state.intervalId) clearInterval(state.intervalId);
        });
        timersState = {};

        const selectedRoutines = [];
        while (selectedRoutines.length < 3) {
            const randomIndex = Math.floor(Math.random() * routines.length);
            const candidate = routines[randomIndex];
            if (!selectedRoutines.some(r => r.name === candidate.name)) {
                selectedRoutines.push(candidate);
            }
        }
        createRoutineCards(selectedRoutines);
    });

    function handleCardClick(card, routine, id) {
        const currentState = timersState[id];

        if (currentState && currentState.intervalId) {
            clearInterval(currentState.intervalId);
            currentState.intervalId = null;
            return;
        }

        startSound.play();

        Object.keys(timersState).forEach(timerId => {
            if (timersState[timerId] && timersState[timerId].intervalId) {
                clearInterval(timersState[timerId].intervalId);
                timersState[timerId].intervalId = null;
            }
        });

        let timerDisplay = card.querySelector('.timer');
        if (!timerDisplay) {
            timerDisplay = document.createElement('div');
            timerDisplay.classList.add('timer');
            card.appendChild(timerDisplay);
        }

        const isTimeBased = routine.reps.includes('분');
        let remaining;

        if (currentState) {
            remaining = currentState.remaining;
        } else {
            const total = isTimeBased ? parseInt(routine.reps) * 60 : parseInt(routine.reps);
            remaining = total;
            timersState[id] = {
                routine,
                remaining,
                intervalId: null,
                midpoint: Math.floor(total / 2),
                midpointSoundPlayed: false
            };
        }

        if (isNaN(remaining) || remaining <= 0) {
            timerDisplay.textContent = "완료!";
            completionSound.play();
            delete timersState[id];
            return;
        }

        let intervalId;

        if (isTimeBased) {
            const timerFunction = () => {
                if (remaining < 0) {
                    clearInterval(intervalId);
                    timerDisplay.textContent = "완료!";
                    completionSound.play();
                    delete timersState[id];
                    return;
                }

                const state = timersState[id];
                if (state && !state.midpointSoundPlayed && remaining <= state.midpoint) {
                    startSound.play();
                    state.midpointSoundPlayed = true;
                }

                const min = Math.floor(remaining / 60);
                const sec = remaining % 60;
                timerDisplay.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
                if(state) state.remaining = remaining;
                remaining--;
            };
            timerFunction();
            intervalId = setInterval(timerFunction, 1000);
        } else { // Reps-based
            const timerFunction = () => {
                const state = timersState[id];
                if (state && !state.midpointSoundPlayed && remaining <= state.midpoint) {
                    startSound.play();
                    state.midpointSoundPlayed = true;
                }
                
                remaining--;
                if(state) state.remaining = remaining;

                if (remaining < 0) { // reps can go to 0
                    clearInterval(intervalId);
                    timerDisplay.textContent = "완료!";
                    completionSound.play();
                    delete timersState[id];
                } else {
                    timerDisplay.textContent = remaining + 1;
                }
            };
            timerDisplay.textContent = remaining;
            intervalId = setInterval(timerFunction, routine.interval);
        }

        if(timersState[id]) timersState[id].intervalId = intervalId;
    }

    function createRoutineCards(selectedRoutines) {
        routineContainer.innerHTML = '';
        selectedRoutines.forEach((routine, index) => {
            const routineCard = document.createElement('div');
            routineCard.classList.add('routine-card');
            const uniqueId = `routine-${Date.now()}-${index}`;
            routineCard.dataset.id = uniqueId;

            const routineName = document.createElement('h3');
            routineName.textContent = routine.name;

            const routineReps = document.createElement('p');
            routineReps.textContent = routine.reps;

            routineCard.appendChild(routineName);
            routineCard.appendChild(routineReps);

            if (routine.reps.includes('분') || (routine.reps.includes('회') && routine.interval)) {
                routineCard.style.cursor = 'pointer';
                routineCard.addEventListener('click', () => handleCardClick(routineCard, routine, uniqueId));
            } else {
                routineCard.style.cursor = 'default';
            }

            routineContainer.appendChild(routineCard);
        });
    }
});
