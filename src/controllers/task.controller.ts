import { Request, Response } from "express";
import { Task } from "../types/task";

const tasks: Task[] = [
  {
    id: 1,
    title: "Belajar Backend",
    description: "Express.js, dan framework lainnya",
    status: "pending",
  },
  {
    id: 2,
    title: "Belajar Frontend",
    description: "Next.js, shadcn/ui, React, dan tools lainnya",
    status: "completed",
  },
  {
    id: 3,
    title: "Belajar Mobile",
    description: "Flutter dan Dart",
    status: "pending",
  },
];

export class TaskController {
  getTasks = async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Get all tasks data success",
      data: {
        tasks: tasks,
      },
    });
  };

  getTaskById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => task.id === id);

    if (!Number.isInteger(id) || !task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get task data success",
      data: {
        task: task,
      },
    });
  };

  createTask = async (req: Request, res: Response) => {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({
        success: false,
        message: "Please input the title, description, and status of the task",
      });
    }

    if (status !== "pending" && status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Task' status must be pending or completed",
      });
    }

    const id =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

    const task: Task = {
      id: id,
      title: title,
      description: description,
      status: status,
    };

    tasks.push(task);

    return res.status(201).json({
      success: true,
      message: "Task creation success",
      data: {
        task: task,
      },
    });
  };

  updateTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, description, status } = req.body;

    const task = tasks.find((task) => task.id === id);

    if (!Number.isInteger(id) || !task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (!title || !description || !status) {
      return res.status(400).json({
        success: false,
        message: "Please input the title, description, and status of the task",
      });
    }

    if (status !== "pending" && status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Task' status must be pending or completed",
      });
    }

    task.title = title;
    task.description = description;
    task.status = status;

    return res.status(200).json({
      success: true,
      message: "Task update success",
      data: {
        task: task,
      },
    });
  };

  deleteTask = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex((task) => task.id === id);

    if (!Number.isInteger(id) || index === -1) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const deletedTask = tasks.splice(index, 1)[0];

    return res.status(200).json({
      success: true,
      message: "Task deletion success",
      data: {
        post: deletedTask,
      },
    });
  };
}

export default new TaskController();
