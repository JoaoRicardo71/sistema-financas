package assistente.de.financas.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import assistente.de.financas.model.Transacao;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    List<Transacao> findByUsuario(String usuario);
}
