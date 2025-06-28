package com.Arts_goods_app.arts_management.repository;

import com.Arts_goods_app.arts_management.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
