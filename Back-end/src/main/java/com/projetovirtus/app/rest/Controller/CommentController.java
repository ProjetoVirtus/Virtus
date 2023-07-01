package com.projetovirtus.app.rest.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetovirtus.app.rest.Models.CommentModel;
import com.projetovirtus.app.rest.Services.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController {

    // Injeção do serviço na classe
    @Autowired
    private CommentService commentService;

    // Método de postar um comentário para um post
    @PostMapping("/{postId}/{userId}")
    public ResponseEntity<?> addComentary(@PathVariable Long postId, @PathVariable Long userId, @RequestBody CommentModel comment) {
        commentService.addCommentaryToPost(postId, userId, comment);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Método para editar um comentário de um post
    @PutMapping("/{postId}/{userId}/{commentaryId}")
    public ResponseEntity<?> editCommentary(@PathVariable Long postId, @PathVariable Long userId, @PathVariable Long commentaryId, @RequestBody CommentModel comment) {
        commentService.editCommentary(postId, userId, commentaryId, comment);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // Método de deletar um comentário de um post
    @DeleteMapping("/{postId}/{userId}/{commentaryId}")
    public ResponseEntity<?> removeCommentary(@PathVariable Long postId, @PathVariable Long userId, @PathVariable Long commentaryId) {
        commentService.removeCommentary(postId, userId, commentaryId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
