import express from 'express';
import bodyParser from "body-parser";
import recipeRoutes from './routes/recipes.js'

const app = express();
const PORT = 5500

app.use(bodyParser.json());
app.use('/recipes', recipeRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));