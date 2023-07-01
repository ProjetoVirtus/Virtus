package com.projetovirtus.app.rest.Models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

// Referencia a classe como uma entidade para o banco de dados e cria uma tabela de comentários
// A tabela é criada e definida com o nome de "commentaries"
// Por fim, marca a classe como uma entidade do banco de dados para que seja mapeada em uma tabela
@Entity
@Table(name = "commentaries")
public class CommentModel {
    
    // Cria uma nova coluna para a identidade do comentário
    // Cada comentário vai ter um id em forma decrescente
    @Id
    @Column(name = "commentary_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Cria uma nova coluna para o conteúdo do comentário
    @Column(columnDefinition = "LONGTEXT")
    @Lob
    @JsonProperty(value = "content")
    private String content;

    // Cria uma nova coluna para data que o comentário foi publicado
    @Column
    @JsonProperty(value = "createdAt")
    private LocalDateTime createdAt;

    // Cria uma nova coluna com valor padrão de falso que inidica se o comentário foi editado
    @Column(name = "edited", columnDefinition = "boolean default false")
    @JsonProperty(value = "edited")
    private Boolean edited;

    // Cria uma relação um por um -> um comentário pode ter apenas uma pessoa quem publicou
    // JoinColumn para pegarmos a variavel user_id no UserModel
    // Por fim, retornamos o modelo do usuário
    @OneToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    // Métodos getters and setters
    // get -> pega
    // set -> define
    
    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public Boolean getEdited() {
        return edited;
    }

    public void setEdited(Boolean edited) {
        this.edited = edited;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
