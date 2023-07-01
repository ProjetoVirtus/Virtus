package com.projetovirtus.app.rest.Models;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

// Referencia a classe como uma entidade para o banco de dados e cria uma tabela de publicações
// A tabela é criada e definida com o nome de "post"
// Por fim, marca a classe como uma entidade do banco de dados para que seja mapeada em uma tabela
@Entity
@Table(name = "post")
public class PostModel {

    // Cria uma nova coluna para a identidade da publicação
    // Cada publicação vai ter uma identidade de forma crescente
    // Ex: usuário cria post, esse id será 1. Outro usuário cria post, o id será 2..
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private long Id;

    // Cria uma nova coluna para o id do dono da publicação
    @Column
    @JsonProperty(value = "user_id")
    private Long postOwner;

    // Cria uma nova coluna para o id do caso
    @Column
    @JsonProperty("caseId")
    private Integer caseId;

    // Cria uma nova coluna para o titulo da publicação
    @Column
    @JsonProperty("title")
    private String title;

    // Cria uma nova coluna para a descrição da publicação
    @Column(columnDefinition = "LONGTEXT")
    @Lob
    @JsonProperty("description")
    private String description;

    // Cria uma nova coluna que vai indicar se a publicação o usuário está com
    // apenas uma duvida ou se ele quer um advogado para a situação dele
    @Column
    @JsonProperty("professionalNeeded")
    private Boolean professionalNeeded;

    // Cria uma nova coluna que define quando a publicação foi criada
    @Column
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    // Cria uma nova coluna que vai ser uma lista de comentários
    // Usamos a relação Um para muitos(OneToMany). Uma publicação pode ter varios
    // comentários
    @OneToMany(cascade = CascadeType.ALL)
    private List<CommentModel> comments;

    // Cria uma nova coluna que vai ser o comentário que o dono do post indicou como
    // uma solução
    // Usamos a relação Um para um(OneToOne). Uma publicação pode ter apenas uma
    // solução
    @OneToOne
    @JoinColumn(name = "commentary_id")
    private CommentModel solution;

    // Métodos getters and setters
    // get -> pega
    // set -> define

    public long getId() {
        return Id;
    }

    public long getPostOwner() {
        return postOwner;
    }

    public void setPostOwner(long postOwner) {
        this.postOwner = postOwner;
    }

    public Integer getCaseId() {
        return caseId;
    }

    public void setCaseId(Integer caseId) {
        this.caseId = caseId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getProfessionalNeeded() {
        return professionalNeeded;
    }

    public void setProfessionalNeeded(Boolean professionalNeeded) {
        this.professionalNeeded = professionalNeeded;
    }

    public List<CommentModel> getComments() {
        return comments;
    }

    public void setComments(List<CommentModel> comments) {
        this.comments = comments;
    }

    public CommentModel getSolution() {
        return solution;
    }

    public void setSolution(CommentModel solution) {
        this.solution = solution;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
