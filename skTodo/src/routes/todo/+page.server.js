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
		todos.push({
			id: todos.length + 1,
			title: String(data.get('title')),
			completed: false
		});
	},

	edit: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const newTitle = String(data.get('title'));
		const newCompleted = Boolean(data.get('completed'));
		const todoIndex = todos.findIndex((todo) => todo.id === id);

		if (todoIndex !== -1) {
			todos[todoIndex].title = newTitle;
			todos[todoIndex].completed = newCompleted;
		}
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		const response = await fetch(`http://localhost:3000/todos/${id}`, {
			method: 'DELETE'
		});
		if (!response.ok) {
			todos = todos.filter((todo) => todo.id !== Number(data.get('id')));
		}
	}
};
