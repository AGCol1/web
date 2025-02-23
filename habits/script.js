const habitForm = document.getElementById('habit-form');
const habitsContainer = document.getElementById('habits-container');

let habits = [];

habitForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const habitName = document.getElementById('habit-name').value;

    const habit = {
        name: habitName,
        days: Array(7).fill(false),
    };

    habits.push(habit);
    document.getElementById('habit-name').value = '';
    renderHabits();
});

function renderHabits() {
    habitsContainer.innerHTML = '';
    habits.forEach((habit, index) => {
        const habitDiv = document.createElement('div');
        habitDiv.classList.add('habit');

        const habitName = document.createElement('span');
        habitName.classList.add('habit-name');
        habitName.textContent = habit.name;

        const habitDays = document.createElement('div');
        habitDays.classList.add('habit-days');

        habit.days.forEach((day, dayIndex) => {
            const dayCircle = document.createElement('div');
            dayCircle.textContent = dayIndex + 1;
            if (day) dayCircle.classList.add('completed')
            

            dayCircle.addEventListener('click', function () {
                habit.days[dayIndex] = !habit.days[dayIndex];
                renderHabits();
            });

            habitDays.appendChild(dayCircle);
        });

        habitDiv.appendChild(habitName);
        habitDiv.appendChild(habitDays);
        habitsContainer.appendChild(habitDiv);

        });
}
