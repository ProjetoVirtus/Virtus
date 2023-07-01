package com.projetovirtus.app.rest.Controller;

import org.springframework.data.domain.Sort;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projetovirtus.app.rest.Models.PostModel;
import com.projetovirtus.app.rest.Services.PostService;
import com.projetovirtus.app.rest.ViewObject.PostViewObject;
import com.projetovirtus.app.rest.ViewObject.SpceificPostViewObject;

@RestController
@RequestMapping("/post")
public class PostController {

    // Injeção do serviço na classe
    @Autowired
    private PostService postService;

    // Método para pegar post com paginação
    @GetMapping
    public ResponseEntity<?> getAllPostsPagination(@RequestParam(name = "search", required = false) String search,
            @Value("#{T(Integer).MAX_VALUE}") Integer size,
            @RequestParam(name = "cases", required = false) List<Integer> caseId,
            @PageableDefault(page = 0, size = 8, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

                System.out.println(caseId);
        Page<PostViewObject> allPosts = postService.getAllPostPaginated(pageable, search, caseId);
        return ResponseEntity.status(HttpStatus.OK).body(allPosts);
    }

    // Método para pegar um post específico por id
    @GetMapping("/{postId}")
    public ResponseEntity<?> getSpecificPostById(@PathVariable Long postId) {
        SpceificPostViewObject spceificPostViewObject = postService.getSpecificPostById(postId);
        return ResponseEntity.status(HttpStatus.OK).body(spceificPostViewObject);
    }

    // Método para editar post
    @PutMapping("/{userId}/{postId}")
    public ResponseEntity<?> editPostById(@PathVariable Long userId, @PathVariable Long postId,
            @RequestBody PostModel postInput) {
        PostModel postModel = postService.getPostById(postId);
        postService.editPost(userId, postModel, postInput);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // Método para deletar post
    @DeleteMapping("/{userId}/{postId}")
    public ResponseEntity<?> deletePostById(@PathVariable Long userId, @PathVariable Long postId) {
        PostModel postModel = postService.getPostById(postId);
        postService.deletePost(userId, postId, postModel);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // Método para publicar post
    @PostMapping
    public ResponseEntity<?> publishPost(@RequestBody PostModel postInput) {
        PostModel publishedPost = postService.newPost(postInput);
        return ResponseEntity.status(HttpStatus.CREATED).body(publishedPost);
    }

}
