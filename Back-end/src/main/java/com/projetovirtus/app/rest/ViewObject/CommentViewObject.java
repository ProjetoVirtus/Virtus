package com.projetovirtus.app.rest.ViewObject;

import java.io.Serializable;
import java.time.LocalDateTime;

public class CommentViewObject implements Serializable {
    
    private Long id;
    private LocalDateTime createdAt;
    private String content;
    private Boolean edited;
    private UserViewObject user;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Boolean getEdited() {
        return edited;
    }
    public void setEdited(Boolean edited) {
        this.edited = edited;
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
}
