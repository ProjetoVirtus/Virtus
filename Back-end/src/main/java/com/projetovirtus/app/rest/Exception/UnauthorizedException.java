package com.projetovirtus.app.rest.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends RuntimeException {
    // Classe de execução para prevenir o acesso não autorizado
    public UnauthorizedException(String message) {
        super(message);
    }
}
