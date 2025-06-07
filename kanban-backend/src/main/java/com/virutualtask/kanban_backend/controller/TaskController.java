package com.virutualtask.kanban_backend.controller;

import com.virutualtask.kanban_backend.entity.Task;
import com.virutualtask.kanban_backend.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Adjust for production
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        logger.info("Fetching all tasks");
        return taskRepository.findAll();
    }

    // Get a task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        logger.info("Fetching task with ID {}", id);
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new task
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        logger.info("Creating new task: {}", task.getTitle());
        Task savedTask = taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    // Update an existing task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        logger.info("Updating task ID {}", id);
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setDescription(updatedTask.getDescription());
                    task.setStatus(updatedTask.getStatus());
                    return ResponseEntity.ok(taskRepository.save(task));
                })
                .orElseGet(() -> {
                    logger.warn("Task ID {} not found", id);
                    return ResponseEntity.notFound().build();
                });
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (taskRepository.existsById(id)) {
            logger.info("Deleting task ID {}", id);
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            logger.warn("Task ID {} not found", id);
            return ResponseEntity.notFound().build();
        }
    }

    // Handle invalid enum values
    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<String> handleInvalidEnum(Exception ex) {
        logger.error("Invalid input: {}", ex.getMessage());
        return ResponseEntity.badRequest().body("Invalid status value.");
    }
}
