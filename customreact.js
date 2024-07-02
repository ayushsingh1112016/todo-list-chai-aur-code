class Item {
    constructor(time, title) {
        this.time = time;
        this.title = title;
        this.status = false;
        this.statusd = 'Not Done';
        this.stared = false;
    }
}

let list = [];

function add(x) {
    const obj = new Item(x.time, x.title);
    list.push(obj);
    render();
}

function deleteItem(index) {
    list.splice(index, 1);
    render();
}

function toggleStatus(index) {
    list[index].status = !list[index].status;
    if (list[index].status) {
        list[index].statusd = 'Done';
    } else {
        list[index].statusd = 'Not Done';
    }
    render();
}

function render() {
    const container = document.getElementById('root');
    // Clear current container
    container.innerHTML = '';
    const heading = document.createElement('h1');
    heading.innerText = 'Todo List';
    container.appendChild(heading);

    list.forEach((item, index) => {
        const subcontainer = document.createElement('div');
        subcontainer.id = index;

        const fields = document.createElement('div');
        fields.className = 'fields';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.innerText = 'Title : ' + item.title;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'time';
        timeDiv.innerText = 'Time : ' + item.time;

        fields.appendChild(titleDiv);
        fields.appendChild(timeDiv);

        const buttons = document.createElement('div');
        buttons.className = 'buttons';

        const statusButton = document.createElement('button');
        statusButton.className = 'status';
        statusButton.innerText = item.statusd;
        statusButton.addEventListener('click', () => toggleStatus(index));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteItem(index));

        buttons.appendChild(statusButton);
        buttons.appendChild(deleteButton);

        subcontainer.appendChild(fields);
        subcontainer.appendChild(buttons);
        container.appendChild(subcontainer);
    });

    // Add new task input and button
    const addTaskContainer = document.createElement('div');
    addTaskContainer.className = 'add-task';

    const timeInput = document.createElement('input');
    timeInput.type = 'text';
    timeInput.placeholder = 'Time';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Title';

    const addButton = document.createElement('button');
    addButton.innerText = 'Add Task';
    addButton.addEventListener('click', () => {
        const time = timeInput.value;
        const title = titleInput.value;
        if (time && title) {
            add({ time, title });
            timeInput.value = '';
            titleInput.value = '';
        }
    });

    addTaskContainer.appendChild(timeInput);
    addTaskContainer.appendChild(titleInput);
    addTaskContainer.appendChild(addButton);

    container.appendChild(addTaskContainer);
}

// Add initial items
add({ time: "8:00 AM", title: "Coding Session 1" });
add({ time: "1:00 PM", title: "Coding Session 2" });
