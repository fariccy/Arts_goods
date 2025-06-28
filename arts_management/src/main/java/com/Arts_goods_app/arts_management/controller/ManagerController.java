package com.Arts_goods_app.arts_management.controller;


import com.Arts_goods_app.arts_management.models.Manager;
import com.Arts_goods_app.arts_management.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/managers")
public class ManagerController {

    @Autowired
    private ManagerRepository managerRepository;

    @PostMapping("/add")
    public Manager createManager(@RequestBody Manager manager) {
        return managerRepository.save(manager);
    }

    @GetMapping("/all")
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable Long id) {
        return managerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manager> updateManager(@PathVariable Long id, @RequestBody Manager managerDetails) {
        return managerRepository.findById(id)
                .map(manager -> {
                    manager.setExpertise(managerDetails.getExpertise());
                    return ResponseEntity.ok(managerRepository.save(manager));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteManager(@PathVariable Long id) {
        return managerRepository.findById(id)
                .map(manager -> {
                    managerRepository.delete(manager);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
