package assistente.de.financas.model;
import jakarta.persistence.*;

@Entity
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 👈 ID CORRETO

    private String descricao;

    private Double valor;

    @Enumerated(EnumType.STRING)
    private TipoTransacao tipo;

    private String usuario; // 👈 usuário separado

    // 👇 CONSTRUTOR (IMPORTANTE)
    public Transacao() {}

    // getters e setters
    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Double getValor() {
        return valor;
    }

    public TipoTransacao getTipo() {
        return tipo;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public void setTipo(TipoTransacao tipo) {
        this.tipo = tipo;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}