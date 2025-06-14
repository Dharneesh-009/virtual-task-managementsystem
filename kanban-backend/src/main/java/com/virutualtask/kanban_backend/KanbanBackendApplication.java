package com.virutualtask.kanban_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration; // ✅ optional if you’re customizing everything

@SpringBootApplication
public class KanbanBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(KanbanBackendApplication.class, args);
	}
}
