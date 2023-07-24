import { fail } from '@sveltejs/kit';
import { get_all, create, update, remove } from '$lib/models/todo.server.js';
let todos = [];

export async function load() {
	const todos = await get_all();
	return { todos };
}

export const actions = {
	create: async ({ request }) => {
		let todo = {};
		const data = await request.formData();
		todo.title = String(data.get('title'));
		todo.completed = Boolean(data.get('completed'));
		try {
			todo.id = await create(todo);
			todos.push(todo);
		} catch (error) {
			return fail(422, {
				error: error.message
			});
		}
	},

	edit: async ({ request }) => {
		const data = await request.formData();
		let todo = {};
		todo.id = data.get('id');
		todo.title = String(data.get('title'));
		todo.completed = Boolean(data.get('completed'));

		try {
			await update(todo);
			const todoIndex = todos.findIndex((todo) => todo.id === id);

			if (todoIndex !== -1) {
				todos[todoIndex].title = todo.title;
				todos[todoIndex].completed = todo.completed;
			}
		} catch (error) {
			return fail(422, {
				error: error.message
			});
		}
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		try {
			await remove(id);
			todos = todos.filter((todo) => todo.id !== id);
		} catch (error) {
			return fail(422, {
				error: error.message
			});
		}
	}
};
