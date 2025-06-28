package com.Arts_goods_app.arts_management.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class Manager extends AppUser {


    private String expertise;

    @OneToMany(mappedBy = "manager") // Corrected from "manger" to "manager"
    private Set<Item> items;

    public Manager(String expertise) {
        this.expertise = expertise;
    }

    public Manager() {
    }

    public Manager(Long managerId) {

    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }
}
