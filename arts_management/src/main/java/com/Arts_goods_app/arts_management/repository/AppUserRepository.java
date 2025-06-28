package com.Arts_goods_app.arts_management.repository;

import com.Arts_goods_app.arts_management.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser,Long> {
    AppUser findByUsername(String username);
}
