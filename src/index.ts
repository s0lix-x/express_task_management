import express from "express";
import TaskRouter from "./routes/task.route";

const app = express();
const port = 5001;

app.use(express.json());
app.use("/api/v1/tasks", TaskRouter);

app.get("/", (req, res) => {
  res.send("Task management App");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
