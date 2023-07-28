import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(307, 'auth/signin');
	}
	return {
		session
	};
}
