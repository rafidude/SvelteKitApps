<script>
    import { onMount } from 'svelte';

    // Page State
    let title = '';
    let completed = false;
    let editId = null;
	let todos = [];

    const editTodo = (todo) => {
        title = todo.title;
        completed = todo.completed;
        editId = todo.id;
    };

    const resetTodoState = () => {
        title = '';
        completed = false;
        editId = null;
    };

    const callTodoAPI = async (todo, method_type) => {
        const response = await fetch('api/tododb', {
            method: method_type,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo })
        });
        return response.json();
    }

    onMount(async () => {
        const response = await fetch('http://localhost:5173/api/tododb');
        if (response.ok) {
            const json = await response.json();
            todos = json.todos;
        }
    });

    async function updateTodo() {
        const todo = { id: editId, title, completed };
        const method_type = "PUT";
        const json = await callTodoAPI(todo, method_type)
        if (json.success) {
            const index = todos.findIndex((todo) => todo.id === editId);
            todos[index].title = todo.title;
            todos[index].completed = todo.completed;
            resetTodoState();
        }
    };

    async function saveNewTodo() {
        const todo = { title, completed };
        const method_type = "POST";
        const json = await callTodoAPI(todo, method_type)
        if (json.success) {
            todos = [...todos, json.todo];
            resetTodoState();
        }
    };

    async function deleteTodo(todo) {
        const method_type = "DELETE";
        const json = await callTodoAPI(todo, method_type)
        if (json.success) {
            const todoIndex = todos.findIndex((t) => t.id === todo.id);
            console.log("delete", todoIndex)
            if (todoIndex !== -1) {
                todos.splice(todoIndex, 1);
            }
            todos = [...todos];
        }
    };
</script>

<h1 class="text-2xl font-bold mb-5">Manage Todos</h1>

<form id="todoForm" class="mb-5 bg-white p-5 rounded shadow">
    <div class="mb-4">
        <label for="todo" class="block text-sm font-bold mb-2">Todo:</label>
        <input
            bind:value={title}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
    <div class="mb-4">
        <label for="completed" class="block text-sm font-bold mb-2"
            >Completed:</label
        >
        <input
            bind:checked={completed}
            type="checkbox"
            id="completed"
            name="completed"
            class="mr-2 leading-tight"
        />
    </div>
    {#if editId}
        <button
                type="submit"
                id="saveButton"
                on:click={updateTodo}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Update
        </button>
    {:else}
        <button
                type="submit"
                id="saveButton"
                on:click={saveNewTodo}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Save
        </button>
    {/if}
</form>
<table id="todoTable" class="w-full bg-white p-5 rounded shadow">
    <thead>
        <tr>
            <th class="border px-4 py-2 text-left text-sm font-medium">
                Title
            </th>
            <th class="border px-4 py-2 text-left text-sm font-medium">
                Status
            </th>
            <th class="border px-4 py-2 text-left text-sm font-medium">Edit</th>
            <th class="border px-4 py-2 text-left text-sm font-medium">
                Delete
            </th>
        </tr>
    </thead>
    <tbody>
        {#each todos as todo, i}
        <tr class="todo-row" data-id="{todo.id}">
            <td class="todo-title border px-4 py-2 text-sm">{todo.title}</td>
            <td class="todo-completed border px-4 py-2 text-sm">
                {#if todo.completed}Done{:else}Not Done{/if}
            </td>
            <td class="border px-4 py-2 text-sm">
               <button
                    class="edit-button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    on:click={() => editTodo(todo)}
                >
                    Edit
                </button>
            </td>
            <td class="border px-4 py-2 text-sm">
                <button
                    class="edit-button bg-red-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    on:click={() => deleteTodo(todo)}
                >
                    Delete
                </button>
            </td>
        </tr>
        {/each}
    </tbody>
</table>
