package com.nexustrade.core.controller;

import com.nexustrade.core.entity.Asset;
import com.nexustrade.core.entity.User;
import com.nexustrade.core.exception.ResourceNotFoundException;
import com.nexustrade.core.repository.AssetRepository;
import com.nexustrade.core.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/assets")
@Tag(name = "Assets", description = "Asset CRUD operations for authenticated users")
public class AssetController {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @GetMapping
    public List<Asset> getUserAssets() {
        User user = getCurrentUser();
        return assetRepository.findByUserId(user.getId());
    }

    @PostMapping
    public ResponseEntity<Asset> createAsset(@Valid @RequestBody Asset asset) {
        User user = getCurrentUser();
        asset.setUser(user);
        Asset savedAsset = assetRepository.save(asset);
        return ResponseEntity.ok(savedAsset);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Asset> getAsset(@PathVariable Long id) {
        User user = getCurrentUser();
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));
        
        if (!asset.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        return ResponseEntity.ok(asset);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Asset> updateAsset(@PathVariable Long id, @Valid @RequestBody Asset assetDetails) {
        User user = getCurrentUser();
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));
        
        if (!asset.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        asset.setSymbol(assetDetails.getSymbol());
        asset.setTargetPrice(assetDetails.getTargetPrice());
        
        Asset updatedAsset = assetRepository.save(asset);
        return ResponseEntity.ok(updatedAsset);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteAsset(@PathVariable Long id) {
        User user = getCurrentUser();
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));
        
        if (!asset.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        assetRepository.delete(asset);
        return ResponseEntity.ok().build();
    }
}
