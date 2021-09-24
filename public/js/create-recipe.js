async function createRecipeHandler(event) {
    event.preventDefault();



    const recipe_name = document.getElementById("name").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const cooking_instructions = document.getElementById("cooking-instructions").value.trim();


    if (recipe_name && ingredients && cooking_instructions) {
        const response = await fetch('/api/recipe', {
            method: 'post',
            body: JSON.stringify({
                recipe_name,
                ingredients,
                cooking_instructions
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById("button2").addEventListener("click", createRecipeHandler);