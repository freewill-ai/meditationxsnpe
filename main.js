document.addEventListener('DOMContentLoaded', () => {
    const routines = [
        { name: '1번 동작', reps: '10회' },
        { name: '2번 동작', reps: '1회' },
        { name: '3번 동작', reps: '10회' },
        { name: '4번 동작', reps: '100회' },
        { name: 'C무브', reps: '10분' },
        { name: 'T무브', reps: '300회' },
        { name: 'L무브', reps: '300회' },
        { name: 'SC무브', reps: '10분' },
        { name: '호흡 집중', reps: '5분' },
        { name: '자애 명상', reps: '5분' },
    ];

    const generateBtn = document.getElementById('generate-btn');
    const routineContainer = document.getElementById('routine');

    generateBtn.addEventListener('click', () => {
        routineContainer.innerHTML = '';
        const selectedRoutines = [];
        while (selectedRoutines.length < 3) {
            const randomIndex = Math.floor(Math.random() * routines.length);
            if (!selectedRoutines.includes(routines[randomIndex])) {
                selectedRoutines.push(routines[randomIndex]);
            }
        }

        selectedRoutines.forEach(routine => {
            const routineCard = document.createElement('div');
            routineCard.classList.add('routine-card');

            const routineName = document.createElement('h3');
            routineName.textContent = routine.name;

            const routineReps = document.createElement('p');
            routineReps.textContent = routine.reps;

            routineCard.appendChild(routineName);
            routineCard.appendChild(routineReps);

            routineContainer.appendChild(routineCard);
        });
    });
});
