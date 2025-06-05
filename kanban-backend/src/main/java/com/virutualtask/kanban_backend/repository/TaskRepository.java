package com.virutualtask.kanban_backend.repository;



import com.virutualtask.kanban_backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
