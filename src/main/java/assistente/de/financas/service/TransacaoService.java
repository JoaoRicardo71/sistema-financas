package assistente.de.financas.service;

import assistente.de.financas.model.TipoTransacao;
import assistente.de.financas.model.Transacao;
import assistente.de.financas.repository.TransacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransacaoService {

    private final TransacaoRepository repository;

    public TransacaoService(TransacaoRepository repository) {
        this.repository = repository;
    }

    public Transacao salvar(Transacao transacao) {
        return repository.save(transacao);
    }

    public List<Transacao> listar() {
        return repository.findAll();
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Double calcularSaldo() {
        return repository.findAll()
                .stream()
                .mapToDouble(transacao -> {
                    if (transacao.getTipo() == TipoTransacao.RECEITA) {
                        return transacao.getValor();
                    } else {
                        return -transacao.getValor();
                    }
                })
                .sum();
    }

    public Double totalReceitas() {
        return repository.totalReceitas();
    }

    public Double totalDespesas() {
        return repository.totalDespesas();
    }
}

