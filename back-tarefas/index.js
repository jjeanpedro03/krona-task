const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/teste-banco", async (req, res) => {
    try {
        const [resultado] = await db.query("SELECT 1 + 1 AS soma");
        res.send(`O banco respondeu! 1 + 1 é igual a: ${resultado[0].soma}`);
    } catch (err) {
        res.status(500).send("Erro ao conectar no banco: " + err.message);
    }
});

app.get("/tarefas", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM tarefas ORDER BY data_criacao DESC",
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({
            erro: "Falha ao carregar banco de dados: " + err.message,
        });
    }
});

app.post("/tarefas", async (req, res) => {
    const { titulo, prioridade } = req.body;
    try {
        const query = "INSERT INTO tarefas (titulo, prioridade) VALUES (?, ?)";
        await db.query(query, [titulo, prioridade]);
        res.status(201).send("Tarefa guardada no baú com sucesso!");
    } catch (err) {
        res.status(500).send("Erro ao guardar tarefa: " + err.message);
    }
});

app.put("/tarefas/:id", async (req, res) => {
    const { id } = req.params;
    const { concluida } = req.body;
    try {
        const statusFinal = concluida ? 1 : 0;
        await db.query("UPDATE tarefas SET concluida = ? WHERE id = ?", [
            statusFinal,
            id,
        ]);
        res.send("Status atualizado!");
    } catch (err) {
        res.status(500).send("Erro ao atualizar: " + err.message);
    }
});

app.delete("/tarefas/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM tarefas WHERE id = ?", [id]);
        res.send("Tarefa removida do baú!");
    } catch (err) {
        res.status(500).send("Erro ao apagar: " + err.message);
    }
});

app.listen(3001, () => {
    console.log("Servidor e Banco prontos na porta 3001!");
});
