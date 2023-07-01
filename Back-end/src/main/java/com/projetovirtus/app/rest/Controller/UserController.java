package com.projetovirtus.app.rest.Controller;

import com.projetovirtus.app.rest.Models.UserModel;
import com.projetovirtus.app.rest.Services.UserService;
import com.projetovirtus.app.rest.ViewObject.UserViewObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    // Injeção do serviço na classe
    @Autowired
    private UserService userService;

    // Retorna uma lista com todos os usuários
    @GetMapping
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    // Retorna o usuário com o id especificado
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        UserViewObject userViewObject = userService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(userViewObject);
    }

    // Atualiza o perfil do usuário com o id especificado
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserModel user) {
        UserViewObject userViewObject = userService.editUserProfile(id, user);
        return ResponseEntity.status(HttpStatus.OK).body(userViewObject);
    }
}
