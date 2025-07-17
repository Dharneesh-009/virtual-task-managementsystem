package com.virutualtask.kanban_backend.controller;



import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @GetMapping
    public List<Map<String, String>> getNotifications() {
        return List.of(
                Map.of("message", "You were assigned a new task."),
                Map.of("message", "A task deadline is approaching!"),
                Map.of("message", "A teammate commented on your task.")
        );
    }
}
