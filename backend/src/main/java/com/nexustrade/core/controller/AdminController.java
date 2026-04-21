package com.nexustrade.core.controller;

import com.nexustrade.core.entity.User;
import com.nexustrade.core.repository.UserRepository;
import com.nexustrade.core.enums.Role;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin", description = "Admin-only user management and system statistics")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Remove passwords from response
        users.forEach(user -> user.setPassword(null));
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User userData = user.get();
            userData.setPassword(null); // Remove password from response
            return ResponseEntity.ok(userData);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestParam Role role) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setRole(role);
            userRepository.save(user);
            return ResponseEntity.ok("User role updated successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getAdminStats() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByIsActive(true);
        long adminUsers = userRepository.countByRole(Role.ADMIN);
        long regularUsers = userRepository.countByRole(Role.USER);

        return ResponseEntity.ok(new AdminStats(totalUsers, activeUsers, adminUsers, regularUsers));
    }

    // DTO for stats response
    public static class AdminStats {
        private long totalUsers;
        private long activeUsers;
        private long adminUsers;
        private long regularUsers;

        public AdminStats(long totalUsers, long activeUsers, long adminUsers, long regularUsers) {
            this.totalUsers = totalUsers;
            this.activeUsers = activeUsers;
            this.adminUsers = adminUsers;
            this.regularUsers = regularUsers;
        }

        // Getters
        public long getTotalUsers() { return totalUsers; }
        public long getActiveUsers() { return activeUsers; }
        public long getAdminUsers() { return adminUsers; }
        public long getRegularUsers() { return regularUsers; }
    }
}
