package com.projetovirtus.app.rest.Services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.projetovirtus.app.rest.Exception.NotFoundException;
import com.projetovirtus.app.rest.Exception.UnauthorizedException;
import com.projetovirtus.app.rest.Models.CommentModel;
import com.projetovirtus.app.rest.Models.PostModel;
import com.projetovirtus.app.rest.Models.UserModel;
import com.projetovirtus.app.rest.Repository.PostRepository;
import com.projetovirtus.app.rest.Repository.UserRepository;
import com.projetovirtus.app.rest.ViewObject.CommentViewObject;
import com.projetovirtus.app.rest.ViewObject.PostViewObject;
import com.projetovirtus.app.rest.ViewObject.SpceificPostViewObject;
import com.projetovirtus.app.rest.ViewObject.UserViewObject;

@Service
public class PostService {

    // Injeção de serviços na classe
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CaseService caseService;

    // Modelo para converter o modelo do post para um View Object
    public PostViewObject postModelToViewObject(PostModel postModel) {
        // Configuração do dono do post
        UserViewObject userModel = userService.getUserById(postModel.getPostOwner());

        // Criação de um novo View Object do post
        PostViewObject postViewObject = new PostViewObject();

        // Atribuição de propriedades
        postViewObject.setCaseData(caseService.getCaseById(postModel.getCaseId()));
        postViewObject.setDescription(postModel.getDescription());
        postViewObject.setId(postModel.getId());
        postViewObject.setProfissionalNeeded(postModel.getProfessionalNeeded());
        postViewObject.setTitle(postModel.getTitle());
        postViewObject.setUser(userModel);
        postViewObject.setCreatedAt(postModel.getCreatedAt());
        if (postModel.getSolution() != null) {
            postViewObject.setSolution(true);
        }

        // Retorna o objeto convertido do post
        return postViewObject;
    }

    // Função para converter o modelo do post para um View Object especificado
    public SpceificPostViewObject postModelToSpecificViewObject(PostModel postModel) {
        // Cria um novo post específico View Model
        SpceificPostViewObject spceificPostViewObject = new SpceificPostViewObject();

        // Verificar se o usuário dono do post existe

        UserViewObject existingUser = null;
        try {
            existingUser = userService.getUserById(postModel.getPostOwner());
        } catch (Error error) {
            existingUser = new UserViewObject();
        }

        // Pegamos a lista de comentários e criamos outra lista para o View Object de
        // comentários
        List<CommentModel> commentModels = postModel.getComments();
        List<CommentViewObject> commentViewObjects = new ArrayList<>();

        // Convertemos todos os modelo de comentários para View Model
        for (CommentModel commentModel : commentModels) {
            CommentViewObject commentViewObject = commentModelToViewObject(commentModel);
            commentViewObjects.add(commentViewObject);
        }

        // Colocamos as variáveis do modelo para o View Object
        spceificPostViewObject.setComments(commentViewObjects);
        spceificPostViewObject.setDescription(postModel.getDescription());
        spceificPostViewObject.setId(postModel.getId());
        spceificPostViewObject.setProfissionalNeeded(postModel.getProfessionalNeeded());
        spceificPostViewObject.setTitle(postModel.getTitle());
        spceificPostViewObject.setCreatedAt(LocalDateTime.now());
        spceificPostViewObject.setPostOwner(existingUser);

        Integer postIdLongToInteger = Math.toIntExact(postModel.getCaseId());
        spceificPostViewObject.setCaseData(caseService.getCaseById(postIdLongToInteger));

        // Colocamos a solução se existir
        if (postModel.getSolution() != null) {
            spceificPostViewObject.setSolution(commentModelToViewObject(postModel.getSolution()));
        }

        // Retorna o objeto convertido do post específico
        return spceificPostViewObject;
    }

    // Função para converter o modelo de comentário para um View Object
    public CommentViewObject commentModelToViewObject(CommentModel commentModel) {
        // Cria um novo objeto de View Object
        CommentViewObject commentViewObject = new CommentViewObject();

        // Iniciamos a variável de View Object do usuário
        UserViewObject userViewObject;

        // Verifica se o usuário existe
        // Caso não existe, ele torna um objeto vazio
        if (commentModel.getUser() != null) {
            userViewObject = userService.userModelToViewObject(commentModel.getUser());
        } else {
            userViewObject = new UserViewObject();
        }

        // Colocamos as propriedades do modelo para o View Object
        commentViewObject.setContent(commentModel.getContent());
        commentViewObject.setCreatedAt(commentModel.getCreatedAt());
        commentViewObject.setEdited(commentModel.getEdited());
        commentViewObject.setId(commentModel.getId());
        commentViewObject.setUser(userViewObject);

        // Retorna o objeto convertido do comentário
        return commentViewObject;
    }

    // Função para a criação de publicações
    public PostModel newPost(PostModel postInput) {
        // Pega o id do usuário e checa se existe
        long userId = postInput.getPostOwner();
        Optional<UserModel> existingUser = Optional
                .of(userRepository.findById(userId).orElseThrow(() -> new NotFoundException("Usuário não encontrado"))); // userRepository.findById(userId);

        // Cria um novo objeto relacionado ao post
        PostModel newPost = new PostModel();
        newPost.setPostOwner(existingUser.get().getId());
        newPost.setCaseId(postInput.getCaseId());
        newPost.setDescription(postInput.getDescription());
        newPost.setProfessionalNeeded(postInput.getProfessionalNeeded());
        newPost.setTitle(postInput.getTitle());
        newPost.setCreatedAt(LocalDateTime.now());

        // Salva o post criado
        postRepository.save(newPost);

        // Retorna o post criado
        return newPost;
    }

    // Função para a edição de post
    public void editPost(Long userId, PostModel postModel, PostModel postInput) {

        // Verifica se o usuário é dono do post
        if (userId != postModel.getPostOwner()) {
            throw new UnauthorizedException("Operação não autorizada");
        }

        // Altera o post original
        postModel.setTitle(postInput.getTitle());
        postModel.setDescription(postInput.getDescription());

        // Salva o post editado
        postRepository.save(postModel);
    }

    // Função para deletar post
    public void deletePost(Long userId, Long postId, PostModel postModel) {

        // Verifica se o usuário é dono do post
        if (userId != postModel.getPostOwner()) {
            throw new UnauthorizedException("Operação não autorizada");
        }

        // Deleta o post
        postRepository.delete(postModel);
    }

    public void setCommentaryAsSolution(Long userId, Long commentaryId, PostModel postModel) {

        // Verifica se o usuário é dono do post
        if (userId != postModel.getPostOwner()) {
            throw new UnauthorizedException("Operação não autorizada");
        }

        // Usaremos um booleano para indicar se a operação foi bem sucedida
        Boolean beenFound = false;

        // Pegamos a lista de todos os comentários do post e verificamos o id de cada um
        // Caso achamos o id, esse comentário vai ser marcado como uma solução
        List<CommentModel> commentModelList = postModel.getComments();
        for (CommentModel commentModel : commentModelList) {
            if (commentModel.getId() == commentaryId) {
                // Encontramos o comentário
                // Vamos definir o modelo do comentário na propriedade de solução do post
                postModel.setSolution(commentModel);
                beenFound = true;
                break;
            }
        }

        // Apesar de ter procurado por todos os comentários
        // Não conseguimos encontrar o comentário
        // Retornaremos um erro para indicar ao usuário que a operação não foi bem
        // sucedida
        if (beenFound != true) {
            throw new NotFoundException("Comentário não encontrado");
        }

        // O comentário que foi definido como solução vai ser salvo no post
        postRepository.save(postModel);
    }

    // Função para remover uma solução do post
    public void removeSolutionFromPost(Long userId, PostModel postModel) {

        // Verifica se é o dono do post que está realizando a ação
        if (userId != postModel.getPostOwner()) {
            throw new UnauthorizedException("Operação não autorizada");
        }

        // Remove a solução do post e salva
        postModel.setSolution(null);
        postRepository.save(postModel);
    }

    // Função para pegar todas as publicações
    public List<PostViewObject> getAllPosts() {
        // Retorna uma lista com todos os posts
        return postRepository.findAll().stream().map(this::postModelToViewObject).toList();
    }

    // Retorna uma paginação de todos os posts e também verifica se contém o segundo
    // parametro(search)
    public Page<PostViewObject> getAllPostPaginated(Pageable pageable, String search, List<Integer> caseId) {
        // Pega todos as publicações que contem a string search(se a string for vazia, então a função retornara todos or padrão)
        // Após a todas encontrar todas as publicações, cada Objeto(publicação) será convertido a um ViewObject
        Supplier<Stream<PostViewObject>> streamSupplier = () -> postRepository.searchByTitle(search)
                .stream()
                .map(this::postModelToViewObject);
            
        // Pega a quantidade total, filtrada pela lista de caseId
        long total = streamSupplier.get()
                .filter(post -> caseId == null || caseId.isEmpty()
                        || caseId.stream().anyMatch(id -> id.equals(post.getCaseData().getCaseId())))
                .count();
        
        // Por fim, refazemos a filtragem de acordo com a lista de caseId
        // Organizamos com o .sorted e .reversed para pegar as publicações mais recentes
        // Utilizamos o skip para pular as publicações que estão na página passada
        // Utilizamos o limit para não mostrar as publicações que estão na proxima página
        // Usamos o .collect para coletar a lista de publicações disponiveis e retornamos uma paginação
        return streamSupplier.get()
                .filter(post -> caseId == null || caseId.isEmpty()
                        || caseId.stream().anyMatch(id -> id.equals(post.getCaseData().getCaseId())))
                .sorted(Comparator.comparing(PostViewObject::getCreatedAt).reversed())
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize())
                .collect(Collectors.collectingAndThen(Collectors.toList(),
                        list -> new PageImpl<>(list, pageable, total)));
    }

    // Função para pegar todas as publicações que contem o título semelhante ao
    // parametro de busca do usuário
    public List<PostViewObject> searchPostByTitle(String title) {
        return postRepository.searchByTitle(title).stream().map(this::postModelToViewObject).toList();
    }

    // Função para pegar um post por id
    public PostModel getPostById(Long id) {
        // Verifica se a publicação existe e se existir, retorna ela mesma
        Optional<PostModel> existingPost = Optional
                .of(postRepository.findById(id).orElseThrow(() -> new NotFoundException("Post não encontrado")));
        PostModel postModel = existingPost.get();

        // Retorna a publicação
        return postModel;
    }

    // Tem a mesma funcionalidade que a função acima, porém ela retorna o View
    // Object do que o modelo
    public SpceificPostViewObject getSpecificPostById(Long id) {
        // Procura um post existente
        Optional<PostModel> existingPost = Optional
                .of(postRepository.findById(id).orElseThrow(() -> new NotFoundException("Post não encontrado")));
        PostModel postModel = existingPost.get();

        // Converte o post para um view object
        SpceificPostViewObject spceificPostViewObject = postModelToSpecificViewObject(postModel);

        // Retorna o view object do post
        return spceificPostViewObject;
    }
}
