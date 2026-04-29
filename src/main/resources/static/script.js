const API = "http://localhost:8080/transacoes";

// ==========================
// USUÁRIO (multiusuário simples)
// ==========================
let usuario = localStorage.getItem("usuario");

if (!usuario) {
    window.location.href = "login.html";
}

if (!usuario) {
    usuario = Math.random().toString(36).substring(2);
    localStorage.setItem("usuario", usuario);
}

console.log("Usuário:", usuario);

// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("btnAdicionar");

    if (botao) {
        botao.addEventListener("click", adicionar);
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

        renderLista(dados);
        atualizarSaldo();
        carregarGrafico();

    } catch (erro) {
        console.error("Erro ao carregar:", erro);
    }
}

// ==========================
// RENDER LISTA
// ==========================
function renderLista(dados) {
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

// ==========================
// LOGIN
// ==========================

document.getElementById("btnLogin").addEventListener("click", login);

async function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const res = await fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        if (!res.ok) throw new Error("Login falhou");

        const user = await res.json();

        // 🔥 salva usuário logado
        localStorage.setItem("usuario", user.email);

        alert("Login realizado!");

        window.location.href = "index.html";

    } catch (e) {
        alert("Erro no login");
    }
    console.log("EMAIL:", email);
    console.log("SENHA:", senha);
}