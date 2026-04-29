package assistente.de.financas.controller;

import assistente.de.financas.model.Transacao;
import assistente.de.financas.service.TransacaoService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/transacoes")
public class TransacaoController {

    private final TransacaoService service;

    public TransacaoController(TransacaoService service) {
        this.service = service;
    }

    @PostMapping
    public Transacao salvar(@RequestBody Transacao transacao) {
        return service.salvar(transacao);
    }

    @GetMapping
    public List<Transacao> listar(@RequestParam String usuario) {
        return service.listarPorUsuario(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

    @GetMapping("/saldo")
    public Double saldo(@RequestParam String usuario) {
        return service.calcularSaldo(usuario);
    }

    @GetMapping("/resumo")
    public Map<String, Double> getResumo(@RequestParam String usuario) {

        Double receitas = service.listarPorUsuario(usuario)
                .stream()
                .filter(t -> t.getTipo().name().equals("RECEITA"))
                .mapToDouble(t -> t.getValor())
                .sum();

        Double despesas = service.listarPorUsuario(usuario)
                .stream()
                .filter(t -> t.getTipo().name().equals("DESPESA"))
                .mapToDouble(t -> t.getValor())
                .sum();

        return Map.of(
                "receitas", receitas,
                "despesas", despesas
        );
    }
}