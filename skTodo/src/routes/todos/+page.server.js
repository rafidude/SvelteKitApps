import { db } from '$lib/db.server.js';

let todos = [
	{ id: '1ff9df5d-80fa-409d-bed3-e68b944cd962', title: 'Learn Svelte', completed: false },
	{ id: '3a7b0a79-a380-4edc-8346-2af51034d9e4', title: 'Learn Sapper', completed: false }
];

export async function load() {
	try {
		const rows = await db.any('SELECT id, todo as title, completed FROM todos');
		todos = rows;
	} catch (error) {
		console.error('Error selecting todos:', error);
		throw error;
	}
	return {
		todos: todos
	};
}

export const actions = {
	create: async ({ request }) => {
		let id;
		const data = await request.formData();
		const newTitle = String(data.get('title'));
		const newCompleted = Boolean(data.get('completed'));
		const createQuery = `
  				INSERT INTO todos (todo, completed) VALUES ($1, $2) RETURNING *;`;
		try {
			const row = await db.one(createQuery, [newTitle, newCompleted]);
			id = row.id;
		} catch (error) {
			console.error('Error creating todo:', error);
			throw error;
		}
		todos.push({
			id: id,
			title: newTitle,
			completed: newCompleted
		});
	},

	edit: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const newTitle = String(data.get('title'));
		const newCompleted = Boolean(data.get('completed'));

		try {
			await db.none('UPDATE todos SET todo = $2, completed = $3 WHERE id = $1;', [
				id,
				newTitle,
				newCompleted
			]);
		} catch (error) {
			console.error('Error editing todo:', error);
			throw error;
		}

		const todoIndex = todos.findIndex((todo) => todo.id === id);

		if (todoIndex !== -1) {
			todos[todoIndex].title = newTitle;
			todos[todoIndex].completed = newCompleted;
		}
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		try {
			await db.none('DELETE FROM todos WHERE id = $1;', [id]);
		} catch (error) {
			console.error('Error deleting todo:', error);
			throw error;
		}

		todos = todos.filter((todo) => todo.id !== id);
	}
};
