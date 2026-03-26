document.addEventListener('DOMContentLoaded', () => {
    const datetimeContainer = document.getElementById('datetime-container');
    const captureBtn = document.getElementById('capture-btn');
    
    function updateDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        datetimeContainer.textContent = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);

    captureBtn.addEventListener('click', () => {
        // Hide the capture button temporarily to avoid it appearing in the screenshot
        const originalDisplay = captureBtn.style.display;
        captureBtn.style.display = 'none';

        html2canvas(document.body, {
            backgroundColor: '#121212',
            useCORS: true,
            scale: 2 // Higher resolution
        }).then(canvas => {
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            link.download = `practice-routine-${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Restore button visibility
            captureBtn.style.display = originalDisplay;
        }).catch(err => {
            console.error('Capture failed:', err);
            captureBtn.style.display = originalDisplay;
        });
    });

    const routines = [
        { name: '1번 동작', reps: '10회', interval: 90000 },
        { name: '2번 동작', reps: '5분' },
        { name: '3번 동작', reps: '10회', interval: 60000 },
        { name: '4번 동작', reps: '100회', interval: 5000 },
        { name: 'C무브', reps: '10분' },
        { name: 'T무브', reps: '300회', interval: 1500, restInterval: 50, restDuration: 30000 },
        { name: 'L무브', reps: '300회', interval: 2500, restInterval: 100, restDuration: 60000 },
        { name: 'SC무브', reps: '10분' },
        { name: '호흡 집중', reps: '5분' },
        { name: '자애 명상', reps: '5분' },
    ];

    const snpeBasicNames = ['1번 동작', '2번 동작', '3번 동작', '4번 동작', 'C무브', 'T무브', 'L무브', 'SC무브'];

    const generateBtn = document.getElementById('generate-btn');
    const snpeBasicBtn = document.getElementById('snpe-basic-btn');
    const routineContainer = document.getElementById('routine');
    const startSound = document.getElementById('start-sound');
    const completionSound = document.getElementById('completion-sound');
    let timersState = {}; // Holds the state of all timers

    function clearTimers() {
        Object.values(timersState).forEach(state => {
            if (state.intervalId) clearInterval(state.intervalId);
        });
        timersState = {};
    }

    generateBtn.addEventListener('click', () => {
        routineContainer.innerHTML = '';
        routineContainer.classList.remove('grid-layout');
        clearTimers();

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

    snpeBasicBtn.addEventListener('click', () => {
        routineContainer.innerHTML = '';
        routineContainer.classList.add('grid-layout');
        clearTimers();

        const selectedRoutines = snpeBasicNames.map(name => routines.find(r => r.name === name)).filter(Boolean);
        createRoutineCards(selectedRoutines);
    });

    function handleCardClick(card, routine, id) {
        const currentState = timersState[id];

        // If a timer is already running, clicking it will stop/pause it
        if (currentState && currentState.intervalId) {
            clearInterval(currentState.intervalId);
            currentState.intervalId = null;
            return;
        }

        // Stop all other running timers before starting/resuming this one
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
        const total = isTimeBased ? parseInt(routine.reps) * 60 : parseInt(routine.reps);
        
        let remaining;
        if (currentState) {
            // If it was paused, resume from where it was
            remaining = currentState.remaining;
        } else {
            // If it's a fresh start or was completed, start from the beginning
            remaining = total;
            startSound.currentTime = 0;
            startSound.play();
        }
        
        // Re-initialize or update state
        timersState[id] = {
            routine,
            remaining,
            intervalId: null,
            midpoint: Math.floor(total / 2),
            midpointSoundPlayed: currentState ? currentState.midpointSoundPlayed : false,
            currentIntervalSeconds: (currentState && currentState.remaining > 0) ? currentState.currentIntervalSeconds : (routine.interval ? routine.interval / 1000 : 0),
            isResting: currentState ? currentState.isResting : false,
            restRemainingSeconds: currentState ? currentState.restRemainingSeconds : 0,
            repsSinceLastRest: currentState ? currentState.repsSinceLastRest : 0
        };
        
        const state = timersState[id];
        let intervalId;

        if (isTimeBased) {
            const timerFunction = () => {
                if (!timersState[id]) {
                    clearInterval(intervalId);
                    return;
                }

                const min = Math.floor(remaining / 60);
                const sec = remaining % 60;
                timerDisplay.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

                if (!state.midpointSoundPlayed && remaining <= state.midpoint) {
                    startSound.currentTime = 0;
                    startSound.play();
                    state.midpointSoundPlayed = true;
                }

                if (remaining === 0) {
                    clearInterval(intervalId);
                    timerDisplay.textContent = "완료!";
                    completionSound.currentTime = 0;
                    completionSound.play();
                    delete timersState[id];
                    return;
                }

                remaining--;
                state.remaining = remaining;
            };
            timerFunction();
            intervalId = setInterval(timerFunction, 1000);
        } else { // Reps-based
            const hasSubTimer = routine.interval >= 5000;
            const updateDisplay = () => {
                if (!timersState[id]) return;
                
                if (state.isResting) {
                    timerDisplay.innerHTML = `${remaining} <span class="sub-timer">(Rest ${state.restRemainingSeconds}s)</span>`;
                } else if (hasSubTimer) {
                    timerDisplay.innerHTML = `${remaining} <span class="sub-timer">(${state.currentIntervalSeconds}s)</span>`;
                } else {
                    timerDisplay.textContent = remaining;
                }
            };

            updateDisplay();

            const timerFunction = () => {
                if (!timersState[id]) {
                    clearInterval(intervalId);
                    return;
                }

                if (state.isResting) {
                    state.restRemainingSeconds--;
                    if (state.restRemainingSeconds <= 0) {
                        state.isResting = false;
                        state.currentIntervalSeconds = routine.interval / 1000;
                    }
                } else {
                    if (hasSubTimer || routine.restInterval) {
                        state.currentIntervalSeconds--;
                        if (state.currentIntervalSeconds <= 0) {
                            remaining--;
                            state.remaining = remaining;
                            state.repsSinceLastRest++;
                            
                            if (routine.restInterval && state.repsSinceLastRest >= routine.restInterval && remaining > 0) {
                                state.isResting = true;
                                state.restRemainingSeconds = routine.restDuration / 1000;
                                state.repsSinceLastRest = 0;
                            } else {
                                state.currentIntervalSeconds = routine.interval / 1000;
                            }
                        }
                    } else {
                        remaining--;
                        state.remaining = remaining;
                    }
                }
                
                if (!state.isResting && !state.midpointSoundPlayed && remaining <= state.midpoint) {
                    startSound.currentTime = 0;
                    startSound.play();
                    state.midpointSoundPlayed = true;
                }

                if (remaining === 0 && !state.isResting) {
                    clearInterval(intervalId);
                    timerDisplay.textContent = "완료!";
                    completionSound.currentTime = 0;
                    completionSound.play();
                    delete timersState[id];
                } else {
                    updateDisplay();
                }
            };
            
            const tickRate = (hasSubTimer || routine.restInterval) ? 1000 : routine.interval;
            intervalId = setInterval(timerFunction, tickRate);
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
