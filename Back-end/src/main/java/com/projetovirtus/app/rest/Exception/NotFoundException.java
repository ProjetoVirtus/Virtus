package com.projetovirtus.app.rest.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {
    // Classe de exceção para quando um recurso não for encontrado
    public NotFoundException(String message) {
        super(message);
    }
}
