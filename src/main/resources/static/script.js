let usuario = localStorage.getItem("usuario");

if (!usuario) {
    usuario = Math.random().toString(36).substring(2);
    localStorage.setItem("usuario", usuario);
}

console.log("Usuário:", usuario);

console.log("NOVO SCRIPT AQUI");

const API = "/transacoes";

document.addEventListener("DOMContentLoaded", () => {
    console.log("SCRIPT OK");

    carregar();
});

// ==========================
// CARREGAR LISTA
// ==========================
async function carregar() {
    const resposta = await fetch(API);
    const dados = await resposta.json();

    console.log("DADOS:", dados);

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    dados.forEach(t => {
        const item = document.createElement("li");

        const adicionar = t.tipo === "RECEITA" ? "receita" : "despesa";

        item.innerHTML = `
            <span>${t.descricao}</span>
            <span class="${adicionar}">R$ ${t.valor}</span>
        `;

        lista.appendChild(item);
    });
    atualizarSaldo();
    carregarGrafico();
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
            body: JSON.stringify({ descricao, valor, tipo, usuario })
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
        const resposta = await fetch(`${API}/saldo`);
        const saldo = await resposta.json();

        document.getElementById("saldo").innerText = saldo.toFixed(2);

    } catch (erro) {
        console.error("Erro ao saldo:", erro);
    }
}

let grafico;

async function carregarGrafico() {
    const res = await fetch(`${API}/resumo`);
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
            labels: ["Saldo", "Despesas"], // 👈 opcional mudar nome
            datasets: [{
                data: [saldo, despesas],
                backgroundColor: ["#22c55e", "#ef4444"],
                borderWidth: 0,
                cutout: "75%"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "white",
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}