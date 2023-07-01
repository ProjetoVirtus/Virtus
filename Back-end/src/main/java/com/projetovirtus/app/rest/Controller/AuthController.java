package com.projetovirtus.app.rest.Controller;

import com.projetovirtus.app.rest.Models.UserModel;
import com.projetovirtus.app.rest.Services.UserService;
import com.projetovirtus.app.rest.ViewObject.UserViewObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    // Injeção do serviço na classe
    @Autowired
    private UserService userService;

    // Método de registro de usuários
    @PostMapping("/signup")
    public ResponseEntity<?> saveUser(@RequestBody UserModel user) {
        userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Método de autenticação de usuários
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody UserModel user) {
        UserViewObject userViewObject = userService.authenticateUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(userViewObject);
    }
}
