async function createRecipeHandler(event) {
    event.preventDefault();

    debugger;

    const name = document.getElementById("#name").value.trim();
    const ingredients = document.getElementById("#ingredients").value.trim();
    const cookingInstructions = document.getElementById("#cooking-instructions").value.trim();


    if (name && ingredients && cookingInstructions) {
        const response = await fetch('/api/recipe', {
            method: 'post',
            body: JSON.stringify({
                name,
                ingredients,
                cookingInstructions
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}