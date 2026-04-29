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

    //  Salvar
    public Transacao salvar(Transacao transacao) {
        return repository.save(transacao);
    }

    //  Listar por usuário
    public List<Transacao> listarPorUsuario(String usuario) {
        return repository.findByUsuario(usuario);
    }

    public Double calcularSaldo(String usuario) {
        return repository.findByUsuario(usuario)
                .stream()
                .mapToDouble(t -> {
                    if (t.getTipo() == TipoTransacao.RECEITA) {
                        return t.getValor();
                    } else {
                        return -t.getValor();
                    }
                })
                .sum();
    }

    public void deletar(Long id) {
    }
}

