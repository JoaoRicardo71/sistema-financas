package assistente.de.financas.model;
import jakarta.persistence.*;

@Entity // - Indica que esta classe é uma entidade JPA, ou seja, será mapeada para uma tabela no banco de dados.
public class Transacao {

    @Id // - Indica que o campo 'id' é a chave primária da entidade.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // - O banco de dados irá gerar automaticamente o valor do 'id' para cada nova transação.

    private String usuario;

    private Long id;

    private String descricao;

    private Double valor;

    @Enumerated(EnumType.STRING)
    private TipoTransacao tipo; // - essas variaveis viram colunas no banco de dados

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

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}