let todos = [];

export async function load() {
	const response = await fetch('http://localhost:3000/todos');
	const todos_res = await response.json();
	todos = todos_res.Todos;
	return {
		todos: todos
	};
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title');
		const completed = data.get('completed') === 'on' ? true : false;

		const response = await fetch('http://localhost:3000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: title,
				completed: completed
			})
		});
		if (response.ok) {
			const createdTodo = await response.json();
			console.log(createdTodo);
			todos.push(createdTodo);
		}
	},

	edit: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const title = data.get('title');
		const completed = data.get('completed') === 'on' ? true : false;

		const response = await fetch(`http://localhost:3000/todos`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: id,
				title: title,
				completed: completed
			})
		});

		if (response.ok) {
			const updatedTodo = await response.json();
			const todoIndex = todos.findIndex((todo) => todo.id === id);

			if (todoIndex !== -1) {
				todos[todoIndex] = updatedTodo;
			}
		} else {
			console.log('Error:', response);
		}
	},

	delete: async ({ request }) => {
		const data = await request.formData();

		const id = data.get('id');

		const response = await fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE'
		});
		if (!response.ok) {
			todos = todos.filter((todo) => todo.id !== data.get('id'));
		}
	}
};
