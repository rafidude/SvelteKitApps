import { redirect } from '@sveltejs/kit';

let todos = [
	{ id: crypto.randomUUID(), title: 'Learn SvelteKit', completed: false },
	{ id: crypto.randomUUID(), title: 'Learn Go', completed: false },
	{ id: crypto.randomUUID(), title: 'Learn Prompts', completed: false }
];

export async function load(event) {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(307, 'auth/signin');
	}

	return {
		session,
		todos: todos
	};
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		todos.push({
			id: crypto.randomUUID(),
			title: String(data.get('title')),
			completed: Boolean(data.get('completed'))
		});
	},

	edit: async ({ request }) => {
		const data = await request.formData();
		const id = String(data.get('id'));
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

		todos = todos.filter((todo) => todo.id !== String(data.get('id')));
	}
};
