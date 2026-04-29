const API = "http://localhost:8080/transacoes";

// gera usuário automático (multiusuário simples)
let usuario = localStorage.getItem("usuario");

if (!usuario) {
    usuario = Math.random().toString(36).substring(2);
    localStorage.setItem("usuario", usuario);
}

console.log("Usuário:", usuario);

document.addEventListener("DOMContentLoaded", () => {
    console.log("SCRIPT OK");

    const botao = document.getElementById("btnAdicionar");
    console.log("BOTÃO:", botao);

    if (botao) {
        botao.addEventListener("click", () => {
            console.log("CLIQUE FUNCIONOU");
            adicionar();
        });
    } else {
        console.error("BOTÃO NÃO ENCONTRADO");
    }

    carregar();
});

// ==========================
// CARREGAR LISTA
// ==========================
async function carregar() {
    try {
        const resposta = await fetch(`${API}?usuario=${usuario}`);
        const dados = await resposta.json();

        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        dados.forEach(t => {
            const item = document.createElement("li");

            const classe = t.tipo === "RECEITA" ? "receita" : "despesa";

            item.innerHTML = `
                <span>${t.descricao}</span>
                <span class="${classe}">R$ ${t.valor}</span>
            `;

            lista.appendChild(item);
        });

        atualizarSaldo();
        carregarGrafico();

    } catch (erro) {
        console.error("Erro ao carregar:", erro);
    }
}

// ==========================
// ADICIONAR
// ==========================
async function adicionar() {
    try {
        const descricao = document.getElementById("descricao").value;
        const valor = document.getElementById("valor").value;
        const tipo = document.getElementById("tipo").value;

        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                descricao,
                valor,
                tipo,
                usuario
            })
        });

        carregar();

    } catch (erro) {
        console.error("Erro ao adicionar:", erro);
    }
}

// ==========================
// SALDO
// ==========================
async function atualizarSaldo() {
    try {
        const resposta = await fetch(`${API}/saldo?usuario=${usuario}`);
        const saldo = await resposta.json();

        document.getElementById("saldo").innerText = saldo.toFixed(2);

    } catch (erro) {
        console.error("Erro ao saldo:", erro);
    }
}

// ==========================
// GRÁFICO
// ==========================
let grafico;

async function carregarGrafico() {
    try {
        const res = await fetch(`${API}/resumo?usuario=${usuario}`);
        const dados = await res.json();

        const ctx = document.getElementById("grafico");

        if (grafico) {
            grafico.destroy();
        }

        const receitas = dados.receitas;
        const despesas = dados.despesas;
        const saldo = Math.max(receitas - despesas, 0);

        grafico = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Saldo", "Despesas"],
                datasets: [{
                    data: [saldo, despesas],
                    backgroundColor: ["#22c55e", "#ef4444"],
                    borderWidth: 0,
                    cutout: "75%"
                }]
            }
        });

    } catch (erro) {
        console.error("Erro no gráfico:", erro);
    }
}