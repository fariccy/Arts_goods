package com.Arts_goods_app.arts_management.controller;


import com.Arts_goods_app.arts_management.models.OrderEntity;
import com.Arts_goods_app.arts_management.repository.ItemRepository;
import com.Arts_goods_app.arts_management.repository.ManagerRepository;
import com.Arts_goods_app.arts_management.repository.OrderEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/orders")
public class OrderEntityController {


    @Autowired
    private OrderEntityRepository orderEntityRepository;

    @RestController
    @RequestMapping("/api/orders")
    public class OrderController {
        @Autowired
        private OrderEntityRepository orderEntityRepository;

        @Autowired
        private ItemRepository itemRepository;

        @Autowired
        private ManagerRepository managerRepository;

        @PostMapping("/add")
        public ResponseEntity<OrderEntity> createOrder(
                @RequestParam("itemId") Long itemId,
                @RequestParam("managerId") Long managerId,
                @RequestParam("date") LocalDate date) {
            OrderEntity order = new OrderEntity();
            order.setDate(date);
            // Assuming you have methods to fetch Item and Manager by ID
            order.setItem(itemRepository.findById(itemId).orElse(null));
            order.setManager(managerRepository.findById(managerId).orElse(null));
            OrderEntity savedOrder = orderEntityRepository.save(order);
            return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
        }
    }

    @GetMapping("/all")
    public List<OrderEntity> getAllOrders() {
        return orderEntityRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable Long id) {
        return orderEntityRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderEntity> updateOrder(@PathVariable Long id, @RequestBody OrderEntity orderDetails) {
        return orderEntityRepository.findById(id)
                .map(order -> {
                    order.setDate(orderDetails.getDate());
                    return ResponseEntity.ok(orderEntityRepository.save(order));
                })
                .orElse(ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        return orderEntityRepository.findById(id)
                .map(order -> {
                    orderEntityRepository.delete(order);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
