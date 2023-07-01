package com.projetovirtus.app.rest.ViewObject;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.projetovirtus.app.rest.Data.CaseData;

public class PostViewObject implements Serializable {
    
    private Long id;
    private CaseData caseData;
    private String title;
    private String description;
    private Boolean profissionalNeeded;
    private UserViewObject user;
    private LocalDateTime createdAt;
    private Boolean solution = false;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
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
    public Boolean getProfissionalNeeded() {
        return profissionalNeeded;
    }
    public void setProfissionalNeeded(Boolean profissionalNeeded) {
        this.profissionalNeeded = profissionalNeeded;
    }
    public UserViewObject getUser() {
        return user;
    }
    public void setUser(UserViewObject user) {
        this.user = user;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public Boolean getSolution() {
        return solution;
    }
    public void setSolution(Boolean solution) {
        this.solution = solution;
    }
    public CaseData getCaseData() {
        return caseData;
    }
    public void setCaseData(CaseData caseData) {
        this.caseData = caseData;
    }
    
}
