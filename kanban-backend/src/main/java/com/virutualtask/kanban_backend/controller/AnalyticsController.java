package com.virutualtask.kanban_backend.controller;


import com.virutualtask.kanban_backend.repository.TaskRepository;
import com.virutualtask.kanban_backend.entity.Task;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    private final TaskRepository taskRepository;

    public AnalyticsController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public Map<String, Object> getAnalytics() {
        List<Task> tasks = taskRepository.findAll();
        long total = tasks.size();
        long done = tasks.stream().filter(t -> t.getStatus().equals("DONE")).count();
        long inProgress = tasks.stream().filter(t -> t.getStatus().equals("IN_PROGRESS")).count();
        long todo = tasks.stream().filter(t -> t.getStatus().equals("TODO")).count();

        return Map.of(
                "totalTasks", total,
                "completedTasks", done,
                "inProgressTasks", inProgress,
                "todoTasks", todo
        );
    }
}

