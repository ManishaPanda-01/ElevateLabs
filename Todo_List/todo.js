let tasks = [];
        let taskId = 1;

        const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const taskList = document.getElementById('taskList');
        const totalCount = document.getElementById('totalCount');
        const completedCount = document.getElementById('completedCount');
        const remainingCount = document.getElementById('remainingCount');

        addBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        function addTask() {
            const text = taskInput.value.trim();
            if (text === '') return;

            const task = {
                id: taskId++,
                text: text,
                completed: false
            };

            tasks.push(task);
            taskInput.value = '';
            renderTasks();
            updateStats();
        }

        function deleteTask(id) {
            tasks = tasks.filter(task => task.id !== id);
            renderTasks();
            updateStats();
        }

        function toggleTask(id) {
            tasks = tasks.map(task => {
                if (task.id === id) {
                    task.completed = !task.completed;
                }
                return task;
            });
            renderTasks();
            updateStats();
        }

        function renderTasks() {
            if (tasks.length === 0) {
                taskList.innerHTML = '<div class="empty-message">No tasks yet. Add one above!</div>';
                return;
            }

            taskList.innerHTML = tasks.map(task => `
                <div class="task-item ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                           onchange="toggleTask(${task.id})">
                    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `).join('');
        }

        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(task => task.completed).length;
            const remaining = total - completed;

            totalCount.textContent = total;
            completedCount.textContent = completed;
            remainingCount.textContent = remaining;
        }

        // Initialize
        renderTasks();
        updateStats();