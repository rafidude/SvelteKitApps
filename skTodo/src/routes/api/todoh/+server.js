import { error, json } from '@sveltejs/kit';
let todos = [
	{ id: crypto.randomUUID(), title: 'Learn JSON APIs', completed: false },
	{ id: crypto.randomUUID(), title: 'Learn SvelteKit', completed: false },
	{ id: crypto.randomUUID(), title: 'Learn Go', completed: false },
	{ id: crypto.randomUUID(), title: 'Learn Prompts', completed: false }
];

/** @type {import('./$types').RequestHandler} */
export function GET() {
	if (!todos) {
		throw error(400, 'Data not available');
	}

	return json({ todos });
}

export async function POST({ request }) {
	const { todo } = await request.json();
	todo['id'] = crypto.randomUUID();
	todos.push(todo);
	return json({ success: true, todo });
}

export async function PUT({ request }) {
	const { todo } = await request.json();
	const todoIndex = todos.findIndex((t) => t.id === todo.id);
	if (todoIndex !== -1) {
		todos[todoIndex].title = todo.title;
		todos[todoIndex].completed = todo.completed;
	}
	return json({ success: true, todo });
}

export async function DELETE({ request }) {
	const { todo } = await request.json();
	const todoIndex = todos.findIndex((t) => t.id === todo.id);
	if (todoIndex !== -1) {
		todos.splice(todoIndex, 1);
	}
	return json({ success: true, todo });
}
