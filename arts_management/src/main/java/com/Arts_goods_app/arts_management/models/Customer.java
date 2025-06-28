package com.Arts_goods_app.arts_management.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class Customer extends AppUser {


    @Column(nullable = false)
    private String address;

    @ManyToMany
    @JoinTable(
            name = "customer_order",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "orders_id")
    )
    private Set<OrderEntity> orders;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
