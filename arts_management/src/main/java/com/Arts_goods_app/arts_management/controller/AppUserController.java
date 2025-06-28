package com.Arts_goods_app.arts_management.controller;

import com.Arts_goods_app.arts_management.models.AppUser;
import com.Arts_goods_app.arts_management.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class AppUserController {

    @Autowired
    private AppUserRepository appUserRepository;


    @PostMapping("/add")
    public AppUser createUser(@RequestBody AppUser user) {
        return appUserRepository.save(user);
    }


    @GetMapping("/all")
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }



    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable Long id) {
        return appUserRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<AppUser > getUserByUsername(@PathVariable String username) {
        AppUser  user = appUserRepository.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // PUT - Update user
    @PutMapping("/{id}")
    public ResponseEntity<AppUser> updateUser(@PathVariable Long id, @RequestBody AppUser userDetails) {
        return appUserRepository.findById(id)
                .map(user -> {
                    user.setUsername(userDetails.getUsername());
                    user.setPassword(userDetails.getPassword());
                    user.setRole(userDetails.getRole());
                    return ResponseEntity.ok(appUserRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return appUserRepository.findById(id)
            .map(user -> {
                appUserRepository.delete(user);
                return ResponseEntity.ok().build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}