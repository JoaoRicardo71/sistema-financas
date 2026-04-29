package assistente.de.financas.service;

import assistente.de.financas.model.Usuario;
import assistente.de.financas.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario registrar(Usuario usuario) {
        return repository.save(usuario);
    }

    public Usuario login(String email, String senha) {
        Optional<Usuario> user = repository.findByEmail(email);

        if (user.isPresent() && user.get().getSenha().equals(senha)) {
            return user.get();
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos");
    }
}