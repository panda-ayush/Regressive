package com.ayushPanda.regressivebackend.repository;

import com.ayushPanda.regressivebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userRepository extends JpaRepository<User, Long> {

}
