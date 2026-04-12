package assistente.de.financas.controller;

import assistente.de.financas.model.Transacao;
import assistente.de.financas.service.TransacaoService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

import java.util.List;

@RestController // - Indica que esta classe é um controlador REST, ou seja, ela irá lidar com requisições HTTP e retornar respostas em formato JSON.
@RequestMapping("/transacoes") // - Define a URL base para todas as rotas deste controlador. Neste caso, todas as rotas começarão com "/transacoes".
public class TransacaoController {

    private final TransacaoService service;

    public TransacaoController(TransacaoService service) {
        this.service = service;
    }

    @PostMapping // - Recebe JSON e salva no banco
    public Transacao salvar(@RequestBody Transacao transacao) {
        return service.salvar(transacao);
    }

    @GetMapping // - Retorna uma lista de transações
    public List<Transacao> listar() {
        return service.listar();
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    @GetMapping("/saldo")
    public Double saldo() {
        return service.calcularSaldo();
    }

    @GetMapping("/resumo")
    public Map<String, Double> getResumo() {
        Double receitas = service.totalReceitas();
        Double despesas = service.totalDespesas();

        Map<String, Double> dados = new HashMap<>();
        dados.put("receitas", receitas != null ? receitas : 0);
        dados.put("despesas", despesas != null ? despesas : 0);

        return dados;
    }
}