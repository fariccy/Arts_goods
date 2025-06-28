package com.Arts_goods_app.arts_management.controller;

import com.Arts_goods_app.arts_management.models.Item;
import com.Arts_goods_app.arts_management.models.Manager;
import com.Arts_goods_app.arts_management.repository.ItemRepository;
import com.Arts_goods_app.arts_management.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ManagerRepository managerRepository; // Ensure this is properly injected

    @PostMapping("/add")
    public ResponseEntity<Item> createItem(
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("managerId") Long managerId,
            @RequestParam("image") MultipartFile image) {
        try {
            if (image.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            // Fetch the manager from the repository
            Manager manager = managerRepository.findById(managerId)
                    .orElseThrow(() -> new RuntimeException("Manager not found"));

            Item item = new Item();
            item.setDescription(description);
            item.setPrice(price);
            item.setManager(manager);
            item.setImage(image.getBytes());
            Item savedItem = itemRepository.save(item);
            return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @GetMapping("/all")
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setPrice(itemDetails.getPrice());
                    item.setDescription(itemDetails.getDescription());
                    return ResponseEntity.ok(itemRepository.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        return itemRepository.findById(id)
                .map(item -> {
                    itemRepository.delete(item);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
