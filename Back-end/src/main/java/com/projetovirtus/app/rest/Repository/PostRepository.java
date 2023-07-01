package com.projetovirtus.app.rest.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projetovirtus.app.rest.Models.PostModel;

public interface PostRepository extends JpaRepository<PostModel, Long> {
    
    // Procura que contém o argumento "title" semelhante no título
    @Query("SELECT post FROM PostModel post WHERE post.title LIKE %:title%")
    List<PostModel> searchByTitle(@Param("title") String title);
}
