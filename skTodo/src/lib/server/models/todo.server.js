import { db } from '$lib/server/models/db.server.js';

export async function get_all() {
	const selectQuery = `
            SELECT id, todo as title, completed FROM todos;`;
	const todos = await db.any(selectQuery);
	// throw new Error('Error loading todos TEMP');
	return todos;
}

export async function create(todo) {
	const createQuery = `
            INSERT INTO todos (todo, completed) 
            VALUES ($1, $2) RETURNING *;`;
	const row = await db.one(createQuery, [todo.title, todo.completed]);
	return row.id;
}

export async function update(todo) {
	const updateQuery = `
            UPDATE todos SET todo = $2, completed = $3 WHERE id = $1;`;
	await db.none(updateQuery, [todo.id, todo.title, todo.completed]);
}

export async function remove(id) {
	const deleteQuery = `
            DELETE FROM todos WHERE id = $1;`;
	try {
		await db.none(deleteQuery, [id]);
		return { id: id, success: true };
	} catch (error) {
		console.error('Error deleting todo:', error);
		return { error: error, success: false };
	}
}
