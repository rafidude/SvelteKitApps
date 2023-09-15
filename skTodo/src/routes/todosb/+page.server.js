import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

async function get_all() {
	let { data: todo, error } = await supabase.from('todo').select('id, text, completed');
	return { todos: todo ?? [] };
}

async function create(todo) {
	const { data, error } = await supabase.from('todo').insert([todo]).select();
	return { data, error };
}

async function update(todo) {
	const { data, error } = await supabase.from('todo').update(todo).eq('id', todo.id).select();
	return { data, error };
}

async function remove() {
	const { error } = await supabase.from('todo').delete().eq('some_column', 'someValue');
}

export async function load() {
	const { todos } = await get_all();
	return { todos };
}

export const actions = {
	create: async ({ request }) => {
		let todo = {};
		const data = await request.formData();
		todo.text = String(data.get('text'));
		todo.completed = Boolean(data.get('completed'));
		try {
			if (todo.text === '') {
				throw new Error('todo must have a text');
			}
			todo.id = await create(todo);
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
		todo.text = String(data.get('text'));
		todo.completed = Boolean(data.get('completed'));
		try {
			await update(todo);
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
		} catch (error) {
			return fail(422, {
				error: error.message
			});
		}
	}
};
