package com.projetovirtus.app.rest.Repository;

import com.projetovirtus.app.rest.Models.UserModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    // Método para buscar um usuário pelo email
    UserModel findByEmail(String email);
}