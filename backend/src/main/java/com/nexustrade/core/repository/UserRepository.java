package com.nexustrade.core.repository;

import com.nexustrade.core.entity.User;
import com.nexustrade.core.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Boolean existsByUsername(String username);
    
    long countByRole(Role role);
    
    long countByIsActive(Boolean isActive);
}
