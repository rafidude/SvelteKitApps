import { redirect } from '@sveltejs/kit';

let todos = [
	{ id: crypto.randomUUID(), title: 'Learn SvelteKit', completed: false },
	{ id: crypto.randomUUID(), title: 'Learn Go', completed: false }
];

export async function load(event) {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(307, 'auth/signin');
	}
	let todos_from_api = null;
	const response = await event.fetch('api/todos');
	if (response.ok) {
		const json = await response.json();
		todos_from_api = json.todos;
	}
	if (!todos_from_api) {
		todos_from_api = todos;
	}
	return {
		session,
		todos: todos_from_api
	};
}

export const actions = {
	create: async ({ request, fetch }) => {
		const data = await request.formData();
		const todo = {
			title: String(data.get('title')),
			completed: Boolean(data.get('completed'))
		};
		// Call /api/todos post endpoint
		const response = await fetch('api/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ todo })
		});
	},

	edit: async ({ request, fetch }) => {
		const data = await request.formData();
		const todo = {
			id: String(data.get('id')),
			title: String(data.get('title')),
			completed: Boolean(data.get('completed'))
		};
		// Call /api/todos PUT endpoint
		const response = await fetch('api/todos', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ todo })
		});
	},

	delete: async ({ request, fetch }) => {
		const data = await request.formData();

		// Call /api/todos DELETE endpoint
		const response = await fetch('api/todos', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ todo: { id: String(data.get('id')) } })
		});
	}
};
