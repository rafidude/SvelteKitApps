<script>
    let a = 0;
    let b = 0;
    let result = 0;

    async function add() {
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
<input type="number" bind:value={a}>
<input type="number" bind:value={b}>

Result: {result}

<button on:click={add}>Add</button>

