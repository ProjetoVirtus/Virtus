package com.projetovirtus.app.rest.Services;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;

import com.projetovirtus.app.rest.Security.ApiKeyAuthentication;

import jakarta.servlet.http.HttpServletRequest;

public class AuthenticationService {

    // Nome do cabeçalho que contém a chave de API
    private static final String AUTH_TOKEN_HEADER_NAME = "X-API-KEY"; 
    // Valor esperado da chave API
    private static final String AUTH_TOKEN = "Baeldung"; 

    public static Authentication getAuthentication(HttpServletRequest request) {
        // Obtém a chave de API do cabeçalho da solicitação "X-API-KEY" que definimos
        String apiKey = request.getHeader(AUTH_TOKEN_HEADER_NAME); 

        // Verifica se a chave de API é válida
        if (apiKey == null || !apiKey.equals(AUTH_TOKEN)) { 
            throw new BadCredentialsException("Invalid API Key"); 
        }

        // Cria e retorna um novo objeto ApiKeyAuthentication com a chave de API e sem autoridades concedidas
        return new ApiKeyAuthentication(apiKey, AuthorityUtils.NO_AUTHORITIES);
    }

}

