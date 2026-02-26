//funções temporárias
function emptyState() {
    if (window.location.pathname === '/cookbook/src/index.html' || window.location.pathname === '/cookbook/src/') {
       let emptyState = document.querySelector('.state-empty');
        emptyState.classList.add('hidden');
    }
}

function addRecipe() {
    window.location.href = 'add-recipe.html';
}

function btnReturn() {
    window.location.href = 'index.html';
}

function btnCancel() {
    window.location.href = 'index.html';
}

function recipe(){
    window.location.href = 'recipe.html';
}
emptyState()

// init js
let dados = {
    titulo: '',
    descricao: '',
    instruction: [],
    ingredient: []
}

function dadosIngredient() {
    const qttIngredientRecipe = document.querySelector('.input-field-qtt').value;
    const medidaRecipe = document.querySelector('.select-medida-recipe').value;
    const igredientRecipe = document.querySelector('.input-field-ingredient').value;

    if (!qttIngredientRecipe || !igredientRecipe) {
        alert("Preencha a quantidade e o nome do ingrediente.");
        return;
    }

    const ingredient = {
        qtt: qttIngredientRecipe,
        medida: medidaRecipe,
        ingredient: igredientRecipe
    }

    dados.ingredient.push(ingredient);
}

function dadosIngredientIterados() {
    dadosIngredient()
    
    const ingAdd = document.querySelector('.ingAdd');
    ingAdd.innerHTML = '';

    document.querySelector('.input-field-qtt').value = '';
    document.querySelector('.input-field-ingredient').value = '';

    dados.ingredient.forEach((dado) => {
        const div = document.createElement('div');
        div.classList.add('ingredient-item');

        div.innerHTML = `
            <p>${dado.qtt} ${dado.medida} ${dado.ingredient}</p>
            <button type="button" onclick="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="addTrash" width="30" height="30" fill="#93796c" stroke-width="2">
                    <path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z"/>
                </svg> 
            </button>
        `;

        ingAdd.appendChild(div);
    });
} 

function dadosInstruction() {
    const instructionRecipe = document.querySelector('.input-field-instruction').value;

    if (!instructionRecipe) {
        alert("Preencha o passo a passo.");
        return;
    }

    const instructions = {
        instruction: instructionRecipe
    }

    dados.instruction.push(instructions)
}

function dadosInstructionsIterados() {
    dadosInstruction()

    const instAdd = document.querySelector('.instAdd');
    instAdd.innerHTML = '';

    document.querySelector('.input-field-instruction').value = '';

    dados.instruction.forEach((dado) => {
        const div = document.createElement('div');
        div.classList.add('ingredient-item');

        div.innerHTML = `
            <p>${dado.instruction}</p>
            <button type="button" onclick="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="addTrash" width="30" height="30" fill="#93796c" stroke-width="2">
                    <path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z"/>
                </svg> 
            </button>
        `;

        instAdd.appendChild(div);
    });
}

function dadosRecipe() {
    const recipeTitle = document.querySelector('.input-name-recipe').value;
    const recipeDescription = document.querySelector('.input-description-recipe').value;

    dados.titulo = recipeTitle;
    dados.descricao = recipeDescription;
}

function dadosRecipeJSON() {
    dadosRecipe()
    
    if (!dados.titulo || !dados.descricao) {
        alert("Preencha o título e a descrição.");
        return;
    }

    if (dados.ingredient.length === 0) {
        alert("Adicione pelo menos um ingrediente.");
        return;
    }

    if (dados.instruction.length === 0) {
        alert("Adicione pelo menos um passo.");
        return;
    }

    salvarReceita('/recipe');
}

async function salvarReceita(endPoint) {
    try {
        const res = await fetch('http://localhost:5500' + endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const result = await res.json();
        console.log("Success:", result);
        return result;
    } catch (error) {
        console.log("Error:", error);
    }
}