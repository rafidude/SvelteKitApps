<script>
	import { error } from "@sveltejs/kit";

    let a = 0;
    let b = 0;
    let result = 0;
    let error_msg = '';

    const isValid = (a, b) => {
        if (a === '' || b === '') {
            error_msg = 'Please enter a valid number'
            return false;
        }
        return true;
    }

    async function add() {
        isValid(a,b)
        const response = await fetch('/api/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ a, b })
        });
        const data = await response.json();
        result = data.result;
    }
</script>

<h1>Add</h1>
<input type="text" bind:value={a}>
<input type="text" bind:value={b}>

Result: {result}
{#if error_msg !== ''}
    <p>{error_msg}</p>
{/if}

<button on:click={add}>Add</button>

