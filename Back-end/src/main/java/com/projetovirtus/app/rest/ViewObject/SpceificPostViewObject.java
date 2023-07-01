package com.projetovirtus.app.rest.ViewObject;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import com.projetovirtus.app.rest.Data.CaseData;

public class SpceificPostViewObject implements Serializable {
    
    private Long id;
    private CaseData caseData;
    private String title;
    private String description;
    private Boolean profissionalNeeded;
    private List<CommentViewObject> comments;
    private CommentViewObject solution;
    private LocalDateTime createdAt;
    private UserViewObject postOwner;


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
    public List<CommentViewObject> getComments() {
        return comments;
    }
    public void setComments(List<CommentViewObject> comments) {
        this.comments = comments;
    }
    public CommentViewObject getSolution() {
        return solution;
    }
    public void setSolution(CommentViewObject solution) {
        this.solution = solution;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public UserViewObject getPostOwner() {
        return postOwner;
    }
    public void setPostOwner(UserViewObject postOwner) {
        this.postOwner = postOwner;
    }
    public CaseData getCaseData() {
        return caseData;
    }
    public void setCaseData(CaseData caseData) {
        this.caseData = caseData;
    }

}
