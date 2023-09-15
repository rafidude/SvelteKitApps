import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { redirect, json } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

async function authorization({ event, resolve }) {
	console.log(-14, 'handle', event.url.pathname);
	if (event.url.pathname.startsWith('/api')) {
		const session = await event.locals.getSession();
		if (!session) {
			return json({ success: false, error: 'Data not available' });
		}
	}
	if (event.url.pathname.startsWith('/todo')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/auth/signin');
		}
	}
	return resolve(event);
}

export const handle = sequence(
	SvelteKitAuth({
		providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
	}),
	authorization
);
