package assistente.de.financas.repository;

import assistente.de.financas.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    @Query("SELECT SUM(t.valor) FROM Transacao t WHERE t.tipo = 'RECEITA'")
    Double totalReceitas();

    @Query("SELECT SUM(t.valor) FROM Transacao t WHERE t.tipo = 'DESPESA'")
    Double totalDespesas();
}