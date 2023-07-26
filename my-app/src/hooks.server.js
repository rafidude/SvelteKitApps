import { SvelteKitAuth } from '@auth/sveltekit'
import GithubProvider from '@auth/core/providers/github'
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private'

export const handle = SvelteKitAuth({
    providers: [
        GithubProvider({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
        }),
    ],
})
