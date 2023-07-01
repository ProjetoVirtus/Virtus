package com.projetovirtus.app.rest.Security;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.projetovirtus.app.rest.Services.AuthenticationService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthenticationFilter extends GenericFilterBean {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            // Tentativa de autenticar a request
            Authentication authentication = AuthenticationService.getAuthentication((HttpServletRequest) request);
            // Definir as informações de autenticação no SecurityContextHolder
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception exception) {
            // Caso ocorra uma exceção durante a autenticação, envie uma mensagem de erro para o usuário
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            httpResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
            PrintWriter writer = httpResponse.getWriter();
            writer.print(exception.getMessage());
            writer.flush();
            writer.close();
        }

        // Processa a requisição
        chain.doFilter(request, response);
    }
}
