import { json } from '@sveltejs/kit';
import { get_all, create, update, remove } from '$lib/server/models/todo.server.js';

export async function GET() {
	try {
		const todos = await get_all();
		return json({ success: true, todos });
	} catch (error) {
		console.log(error.message);
		return json({ success: false, error: 'Data not available' });
	}
}

export async function POST({ request }) {
	const { todo } = await request.json();

	try {
		todo.id = await create(todo);
		return json({ success: true, todo });
	} catch (error) {
		console.log(error.message);
		return json({ success: false, error: 'Error Creating' });
	}
}

export async function PUT({ request }) {
	const { todo } = await request.json();
	try {
		await update(todo);
		return json({ success: true, todo });
	} catch (error) {
		console.log(error.message);
		return json({ success: false, error: 'Error Updating' });
	}
}

export async function DELETE({ request }) {
	const { todo } = await request.json();
	try {
		await remove(todo.id);
		return json({ success: true, todo });
	} catch (error) {
		console.log(error.message);
		return json({ success: false, error: 'Error Deleting' });
	}
}
