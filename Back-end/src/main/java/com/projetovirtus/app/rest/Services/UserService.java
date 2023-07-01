package com.projetovirtus.app.rest.Services;

import java.util.Optional;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.projetovirtus.app.rest.Exception.NotFoundException;
import com.projetovirtus.app.rest.Exception.UnauthorizedException;
import com.projetovirtus.app.rest.Models.UserModel;
import com.projetovirtus.app.rest.Repository.UserRepository;
import com.projetovirtus.app.rest.ViewObject.UserViewObject;

@Service
public class UserService {

    // Injeção de serviços na classe
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GenderService genderService;

    // Verifica se existe uma conta com o email especificado
    public void checkIfAccountExists(UserModel userModel) {
        UserModel existUserModel = userRepository.findByEmail(userModel.getEmail());

        if (existUserModel != null) {
            throw new UnauthorizedException("Já existe uma conta com as credenciais que você colocou");
        }
    }

    // Criptografa a senha do usuário
    public void encodePassword(UserModel userModel) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encryptedPassword = passwordEncoder.encode(userModel.getPassword());
        userModel.setPassword(encryptedPassword);
    }

    // Verifica a senha do usuário
    public void verifyUserPassword(UserModel inputUser, UserModel originalUser) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean rightPassword = passwordEncoder.matches(inputUser.getPassword(), originalUser.getPassword());

        if (!rightPassword) {
            throw new UnauthorizedException("Email ou senhas estão incorretos");
        }
    }

    // Procura o usuário pelo email
    public UserModel getUserByEmail(String email) {
        UserModel existingUser = userRepository.findByEmail(email);

        if (existingUser == null) {
            throw new UnauthorizedException("Email ou senhas estão incorretos");
        }

        return existingUser;
    }

    // Converte o modelo do usuário para o objeto de visualização
    public UserViewObject userModelToViewObject(UserModel userModel) {
        // Cria um novo objeto de vizualução
        UserViewObject userViewObject = new UserViewObject();

        // Atribui os valores do modelo para o objeto de visualização
        // (talvez seria uma boa ideia ver uma forma de loop pra evitar esse código
        // longo, não?)
        userViewObject.setId(userModel.getId());
        userViewObject.setFirstName(userModel.getFirstName());
        userViewObject.setLastName(userModel.getLastName());
        userViewObject.setEmail(userModel.getEmail());
        userViewObject.setBirth(userModel.getBirth());
        userViewObject.setIsProfessional(userModel.getIsProfessional());
        userViewObject.setActuationArea(userModel.getActuationArea());
        userViewObject.setOABCode(userModel.getOABCode());
        userViewObject.setPhoneNumber(userModel.getPhoneNumber());
        userViewObject.setGenderData(genderService.getGenderById(userModel.getGender()));


        return userViewObject;
    }

    // Função que converte o View Object do usuário para o Modelo
    public UserModel userViewObjectToModel(UserViewObject userViewObject) {
        Optional<UserModel> userObject = Optional.of(userRepository.findById(userViewObject.getId())
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado")));
        UserModel existngUser = userObject.get();
        return existngUser;
    }

    // Função para a busca de um usuário pelo id
    public UserViewObject getUserById(Long id) {
        Optional<UserModel> optionalUser = Optional
                .of(userRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuário não encontrado")));
        UserModel userModel = optionalUser.get();
        UserViewObject userViewObject = userModelToViewObject(userModel);
        return userViewObject;
    }

    // Função para a listagem de todos os usuários
    public List<UserViewObject> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::userModelToViewObject)
                .toList();
    }

    // Função para a edição do perfil do usuário
    public UserViewObject editUserProfile(Long id, UserModel user) {
        // Procura o usuário pelo id
        Optional<UserModel> optionalUser = Optional
                .of(userRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuário não encontrado")));

        // Atribui o usuário encontrado para uma variável
        UserModel userModel = optionalUser.get();

        // Muda o nome e o sobrenome do usuário
        userModel.setFirstName(user.getFirstName());
        userModel.setLastName(user.getLastName());

        // Salva o usuário no banco de dados
        userRepository.save(userModel);

        // Retornamos o usuário com seu respective View Object
        UserViewObject userViewObject = userModelToViewObject(userModel);
        return userViewObject;
    }

    // Função para a autenticação do usuário
    public UserViewObject authenticateUser(UserModel user) {
        UserModel userModel = getUserByEmail(user.getEmail());
        verifyUserPassword(user, userModel);
        userRepository.save(userModel);

        return userModelToViewObject(userModel);
    }

    // Função para a criação do usuário
    public void createUser(UserModel user) {
        checkIfAccountExists(user);
        encodePassword(user);
        userRepository.save(user);
    }
}
