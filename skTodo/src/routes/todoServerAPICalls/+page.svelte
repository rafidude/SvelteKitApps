<script>
	export let data;
    let title = '';
    let completed = false;
    let editId = null;

    const editTodo = (todo) => {
        title = todo.title;
        completed = todo.completed;
        editId = todo.id;
    };
</script>

<h1 class="text-2xl font-bold mb-5">Manage Todos</h1>

<form id="todoForm" class="mb-5 bg-white p-5 rounded shadow" method="POST" action={editId ? `?/edit` : '?/create'}>
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
        <input type="hidden" name="id" bind:value={editId} />
    {/if}
   <button
        type="submit"
        id="saveButton"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
        {editId ? 'Update' : 'Save'}
    </button>
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
        {#each data.todos as todo, i}
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
				<form method="POST" action="?/delete">
					<input type="hidden" name="id" value={todo.id} />
					<button
                    class="edit-button bg-red-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                    Delete
                </button>
				</form>            
            </td>
        </tr>
        {/each}
    </tbody>
</table>
