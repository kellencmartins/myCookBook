import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

const recipes = [];

router.post('/', (req, res) => {
    const recipe = req.body;

    recipes.push({ ...recipe, id: uuidv4() });

    res.send(`${recipe.titulo} has been added to the Database`);
})

router.get('/', (req, res) => {
    res.send(recipes);
})

export default router