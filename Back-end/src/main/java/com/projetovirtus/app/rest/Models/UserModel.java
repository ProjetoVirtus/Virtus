package com.projetovirtus.app.rest.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;


import java.util.Date;

// Referencia a classe como uma entidade para o banco de dados e cria uma tabela de usuarios
// A tabela é criada e definida com o nome de "users"
// Por fim, marca a classe como uma entidade do banco de dados para que seja mapeada em uma tabela
@Entity
@Table(name = "users")
public class UserModel {

    // Cria uma nova coluna que vai ser a identidade do usuário
    // Cada usuário vai ter uma identidade de forma crescente
    // A cada novo usuário criado, sua identidade vai ser aumentada por 1
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

    // Cria uma coluna que vai indicar o primeiro nome
    @Column
    @JsonProperty("firstName")
    private String firstName;

    // Cria uma coluna que vai indicar o sobrenome
    @Column
    @JsonProperty("lastName")
    private String lastName;

    // Cria uma coluna que vai indicar o email
    @Column
    @JsonProperty("email")
    private String email;

    // Cria uma coluna que vai indicar a senha
    // Não vamos salvar a senha literalmente e nem mostra-la nas requisições
    // Usaremos uma função do spring security para criptografar e compara-la mais tarde
    @Column
    @JsonProperty("password")
    private String password;

    // Cria uma coluna que vai indicar o gênero
    @Column
    @JsonProperty("gender")
    private Integer gender;

    // Cria uma coluna que vai indicar a data de nascimento
    @Column
    @JsonProperty("birth")
    private Date birth;

    // Cria uma coluna que vai indicar se o usuário é um profissional
    @Column
    @JsonProperty("isProfessional")
    private Boolean isProfessional;

    // Cria uma coluna que vai indicar a area de atuação desse usuário, caso ele for um profissional
    @Column
    @JsonProperty("actuationArea")
    private String actuationArea;

    // Cria uma nova coluna que vai indicar o código OAB, se ele também for um profissional
    @Column
    @JsonProperty("OABCode")
    private String OABCode;

    // Cria uma coluna que vai indicar o número de celular
    @Column
    @JsonProperty("phoneNumber")
    private String phoneNumber;

    // Métodos getters and setters
    // get -> pega
    // set -> define
    
    public long getId () {
        return id;
    }


    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Integer getGender() {
        return gender;
    }

    public Date getBirth() {
        return birth;
    }

    public Boolean getIsProfessional() {
        return isProfessional;
    }

    public String getActuationArea() {
        return actuationArea;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public String getOABCode() {
        return OABCode;
    }

    public void removePassword() {
        this.password = null;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setOABCode(String OABCode) {
        this.OABCode = OABCode;
    }
    public void setGender(Integer gender) {
        this.gender = gender;
    }
}
