package com.projetovirtus.app.rest.Services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projetovirtus.app.rest.Exception.NotFoundException;
import com.projetovirtus.app.rest.Exception.UnauthorizedException;
import com.projetovirtus.app.rest.Models.CommentModel;
import com.projetovirtus.app.rest.Models.PostModel;
import com.projetovirtus.app.rest.Models.UserModel;
import com.projetovirtus.app.rest.Repository.PostRepository;
import com.projetovirtus.app.rest.ViewObject.UserViewObject;

@Service
public class CommentService {
    
    // Injeção de serviços na classe
    @Autowired
    PostService postService;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserService userService;

    // Função para pegar o id do comentário
    public CommentModel getCommentaryById(PostModel postModel, Long commentaryId) {
        // Iniciamos a variavel do comentário
        CommentModel existingComment = null;

        // Procuramos pela lista de comentários do post se existe um comentário com o id específicado
        for (CommentModel commentModel : postModel.getComments()) {
            if (commentModel.getId() == commentaryId) {
                // Achamos o comentário, com isso podemos parar o loop
                existingComment = commentModel;
                break;
            }
        }

        // Comentário não existe
        if (existingComment == null) {
            throw new NotFoundException("Comentário não existe");
        }

        // Retorna o comentário
        return existingComment;
    }

    // Função para adicionar comentário a um post
    public void addCommentaryToPost(Long postId, Long userId, CommentModel comment) {
        // Pega o post, usuário e converte ele para o modelo de banco de dados
        PostModel presumedPost = postService.getPostById(postId);
        UserViewObject existingUser = userService.getUserById(userId);
        UserModel userObject = userService.userViewObjectToModel(existingUser);

        // Criamos um novo objeto para o comentário e cria as informações contidas
        CommentModel newCommentary = new CommentModel();
        newCommentary.setCreatedAt(LocalDateTime.now());
        newCommentary.setContent(comment.getContent());
        newCommentary.setUser(userObject);

        // Adiciona o comentário no post
        presumedPost.getComments().add(newCommentary);

        // Salva o post
        postRepository.save(presumedPost);
    }

    // Função para editar comentário de um post
    public void editCommentary(Long postId, Long userId, Long commentaryId, CommentModel comment) {
        // Pega o post e o comentário
        PostModel presumedPost = postService.getPostById(postId);
        CommentModel existingCommentary = getCommentaryById(presumedPost, commentaryId);

        // Se o usuário não for "dono" de seu proprio comentáro
        if (userId != existingCommentary.getUser().getId()) {
            throw new UnauthorizedException("Operação não autorizada");
        }

        // Edita a mensagem e muda a propriedade de "edited" para verdadeiro
        existingCommentary.setContent(comment.getContent());
        existingCommentary.setEdited(true);

        // Salva o post
        postRepository.save(presumedPost);
    }

    // Função para remover um comentário de um post
    public void removeCommentary(Long postId, Long userId, Long commentaryId) {
        // Pega o post e o comentário
        PostModel presumedPost = postService.getPostById(postId);
        CommentModel existingCommentary = getCommentaryById(presumedPost, commentaryId);

        // Se o usuário que está editando não for o "dono" do próprio comentário
        if (userId != existingCommentary.getUser().getId()) {
            throw new UnauthorizedException("Operação não autorizada");
        }

        // Remove o comentáro e salva o post
        presumedPost.getComments().remove(existingCommentary);
        postRepository.save(presumedPost);
    }
}
