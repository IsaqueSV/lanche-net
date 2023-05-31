/*  Declarando a formatação dos inputs responsáveis por armazenar o preço do produto (reais
e centavos) [cadastrarProduto.html] */ 
$("input[id=prProdutoR]").mask("00000");
$("input[id=prProdutoC]").mask("00");

// Função responsável por validar se o código desejado esta, ou não, em uso [cadastrarProduto.html]
function validaCod(){
    i = 0;
    codValida = document.getElementById('cdProduto').value;
    /* Realizando um laço de repetição (for) para saber se já existe um produto com o código
    desejado nos registros do Banco de Dados */
    db.transaction(function(selecionar){ 
        selecionar.executeSql('SELECT * FROM Produtos WHERE CodID = ?', [codValida], function (selecionar, results) { 
            len = results.rows.length, i;  
            for (i = 0; i < len; i++) { 
                row = results.rows.item(i);
            }
            // Se existir um aviso é exibido
            if(i > 0){
                document.getElementById('validaCod').innerHTML = "<b style='color: red'>Em uso<b>";
            }else{
                document.getElementById('validaCod').innerHTML = "";
            }
        }, null); 
    });
}

// Função responsável por inserir um Produto (registro) na Tabela Produtos [cadastrarProduto.html]
function salvar(){
    /* Criando o objeto "tiposProduto" e definindo que seu valor é igual a todos os elementos
    que tenham o nome "tipoDoProduto" */
    tiposProduto = document.getElementsByName('tipoDoProduto');
    // Iniciando um Foreach (laço de repetição) com os elementos com o nome "tipoDoProduto"
    tiposProduto.forEach((tipoDoProduto) => {
        // Se uma opção do input (de tipo radio) for selecionada
        if (tipoDoProduto.checked){
            // O objeto "tipo" é criado e armazena a opção selecionada como valor 
            tipo = [tipoDoProduto.value];
        }
    });
    
    // Declarando o objeto "novoProduto" e definindo que seu valor é uma nova "class Produto"
    novoProduto = new Produto(document.getElementById('cdProduto').value, document.getElementById('nmProduto').value, valorProduto, tipo)
    // Inserindo os dados do Produto na Tabela Produtos
    db.transaction(function(inserir){
        inserir.executeSql('INSERT INTO Produtos(CodID, nomeProd, valorProd, tipoProd) VALUES (?,?,?,?)',[novoProduto.codigoProduto, novoProduto.nomeProduto, novoProduto.precoProduto, novoProduto.tipoProduto]);
        alert("Produto inserido com sucesso!");
    });
}

// Função para exibir os Lanches existentes [cadastrarPedido.html]
function exibirLanches(){
    i = 0;
    /* Declarando um Array e realizando um laço de repetição (for) para exibir os
    registros do Banco de Dados onde "tipoProd" seja igual a "Lanche" */
    dadosDoBanco = [];
    db.transaction(function(selecionar){ 
        selecionar.executeSql('SELECT * FROM Produtos WHERE tipoProd = ?', ['Lanche'], function (selecionar, results) { 
            len = results.rows.length, i;  
            for (i = 0; i < len; i++) { 
                row = results.rows.item(i);
                dadosDoBanco = [
                    row['CodID'],
                    row['nomeProd'],
                    row['valorProd'],
                    row['tipoProd']
                ];
                // Exibindo produto (lanche)
                document.getElementById('lista-lanches').innerHTML += dadosDoBanco[0] + " - " + dadosDoBanco[1] + " - " + dadosDoBanco[2] + "<br><button id='btn" + dadosDoBanco[0] + "' onclick='adicionar("+ dadosDoBanco[0] +")'>Adicionar</button><br><br>";
            }
        }, null); 
    });
}

// Função para exibir as Bebidas existentes [cadastrarPedido.html]
function exibirBebidas(){
    i = 0;
    dadosDoBanco = []; // Array para armazenar os dados dos produtos
    /* Declarando um laço de repetição (for) para exibir os
    registros do Banco de Dados onde "tipoProd" seja igual a "Bebida" */
    db.transaction(function(selecionar){ 
        selecionar.executeSql('SELECT * FROM Produtos WHERE tipoProd = ?', ['Bebida'], function (selecionar, results) { 
            len = results.rows.length, i;  
            for (i = 0; i < len; i++) { 
                row = results.rows.item(i);
                dadosDoBanco = [
                    row['CodID'],
                    row['nomeProd'],
                    row['valorProd'],
                    row['tipoProd']
                ];
                // Exibindo produto (bebida)
                document.getElementById('lista-bebidas').innerHTML += dadosDoBanco[0] + " - " + dadosDoBanco[1] + " - " + dadosDoBanco[2] + "<br><button id='btn" + dadosDoBanco[0] + "' onclick='adicionar("+ dadosDoBanco[0] +")'>Adicionar</button><br><br>";
            }
        }, null); 
    });
}

/* Função para adicionar +1 no valor da quantidade desejada de um Produto específico
e exibir o resultado da multiplicação entre quantidade e valor do Produto [cadastrarPedido.html] */
function mais(codProdutoAdd, nrVlrProdutoMais){
    // Adicionar +1 na quantidade
    var qntdAtual = document.getElementById('qntd'+codProdutoAdd).innerHTML;
    var vlrQntdAtual = parseInt(qntdAtual);
    vlrQntdAtual = vlrQntdAtual+1;
    // Exibe a quantidade
    document.getElementById('qntd'+codProdutoAdd).innerHTML = vlrQntdAtual;

    // Exibir o total (valor*quantidade)
    qntdTexto = document.getElementById('qntd'+codProdutoAdd).innerHTML;
    qntdTexto = parseFloat(qntdTexto);
    nrVlrProdutoMais = (nrVlrProdutoMais).toFixed(2);
    document.getElementById('total'+codProdutoAdd).innerHTML = (nrVlrProdutoMais*vlrQntdAtual).toFixed(2);
}

/* Função para subtrair -1 no valor da quantidade desejada de um Produto específico
e exibir o resultado da multiplicação entre quantidade e valor do Produto [cadastrarPedido.html] */
function menos(codProdutoSub, nrVlrProdutoMenos){
    // Subtrair -1 na quantidade
    var qntdAtual = document.getElementById('qntd'+codProdutoSub).innerHTML;
    var vlrQntdAtual = parseInt(qntdAtual);
    vlrQntdAtual = vlrQntdAtual-1;
    if(vlrQntdAtual < 1){
        vlrQntdAtual = 1;
    }
    // Exibe a quantidade
    document.getElementById('qntd'+codProdutoSub).innerHTML = vlrQntdAtual;

    // Exibir o total (valor*quantidade)
    qntdTexto = document.getElementById('qntd'+codProdutoSub).innerHTML;
    qntdTexto = parseFloat(qntdTexto);
    nrVlrProdutoMenos = (nrVlrProdutoMenos).toFixed(2);
    document.getElementById('total'+codProdutoSub).innerHTML = (nrVlrProdutoMenos*vlrQntdAtual).toFixed(2);
}

// Função para remover um Produto do "carrinho" [cadastrarPedido.html]
function retirar(codRetirarProduto){
    // Retira o Produto desejado do Array 
    ArrCodsProds.splice(ArrCodsProds.indexOf(codRetirarProduto), 1);
    // Retira o Produto desejado do "carrinho"
    document.getElementById('p'+codRetirarProduto).outerHTML = "";
    // Devolve o atributo "adicionar" para o Produto que foi removido
    document.getElementById('btn'+codRetirarProduto).setAttribute('onclick','adicionar('+codRetirarProduto+')');
    if(document.getElementById('carrinho').innerHTML == ""){
        // Faz os elementos abaixo desaparecerem
        $("#calcular").css("display","none");
        $("#valor").css("display", "none");
    }
}

// Função para calcular o total da soma de todos valores (R$) existentes no "carrinho" [cadastrarPedido.html]
function calcular(){
    // Faz o elemento abaixo aparecer
    $("#valor").css("display", "");

    total = 0;
    // Array que vai armazenar todos os valores (R$)
    resultadosTotal = [];
    function somar(item){
        /* O objeto v armazena o valor do elemento abaixo (correspondente ao custo
        total do produto (quantidade*preço por unidade)) */
        v = document.getElementById('total'+item).innerHTML;
        v = v.replace(',', '.');
        v = parseFloat(v).toFixed(2);
        // Insere esse valor (já formatado) no Array "resultadosTotal"
        resultadosTotal.push(v);
    }

    // Função para somar todos os valores do Array "resultadosTotal"
    ArrCodsProds.forEach(somar);
    for(var i = 0; i < resultadosTotal.length; i++){
        total += Number(resultadosTotal[i]);
    }
    // Exibindo o total de tudo
    document.getElementById('total-valor').innerHTML = "R$" + total.toFixed(2);
}

// Função para finalizar o pedido [cadastrarPedido.html]
function finalizar(){
    alert("Pedido confirmado com sucesso!");
    // Recarrega a página
    location.reload();
}

function cadastroUser(){
    nomeUser = document.getElementById("nmUser").value;
    emailUser = document.getElementById("emUser").value;
    senhaUser = document.getElementById("snUser").value;
    // Inserindo os dados do Produto na Tabela Produtos
    db.transaction(function(inserir){
        inserir.executeSql('INSERT INTO Usuarios(CodID, nomeUser, email, senha) VALUES (?,?,?,?)',[null, nomeUser, emailUser, senhaUser]);
        alert("Usuário cadastrado com sucesso!");
    });
} 

function login(){
    i = 0;
    event.preventDefault();
    emailUser=document.getElementById("emUser").value;
    senhaUser=document.getElementById("snUser").value;
    db.transaction(function(selecionar){ 
        selecionar.executeSql('SELECT * FROM Usuarios WHERE email = ? AND senha = ?', [emailUser, senhaUser], function (selecionar, results) { 
            len = results.rows.length, i;  
            for (i = 0; i < len; i++) { 
                row = results.rows.item(i);
            }
            // Se existir um aviso é exibido
            if(i > 0){
                alert("Usuário encontrado");
                window.location.href = "index.html";
            }else{
                alert("Usuário inexistente");
            }
        }, null); 
    });
}

// Função para exibir as Bebidas existentes [cadastrarPedido.html]
function exibirProdutos(){
    i = 0;
    dadosDoBanco = []; // Array para armazenar os dados dos produtos
    /* Declarando um laço de repetição (for) para exibir os
    registros do Banco de Dados onde "tipoProd" seja igual a "Bebida" */
    db.transaction(function(selecionar){ 
        selecionar.executeSql('SELECT * FROM Produtos', [], function(selecionar, results){ 
            len = results.rows.length, i;  
            for (i = 0; i < len; i++) { 
                row = results.rows.item(i);
                dadosDoBanco = [
                    row['CodID'],
                    row['nomeProd'],
                    row['valorProd'],
                    row['tipoProd']
                ];
                // Exibindo produto
                document.getElementById('lista-produtos').innerHTML += "<p id='editar("+ dadosDoBanco[0] +")' onclick='exibirProdutoParaEditar("+ dadosDoBanco[0] +")'>" + dadosDoBanco[0] + " - " + dadosDoBanco[1] + " - " + dadosDoBanco[2] + " - " + dadosDoBanco[3] + "</p>";
            }
        }, null); 
    });
}

function exibirProdutoParaEditar(codDoProduto){
    i = 0;
    dadosDoBanco = []; // Array para armazenar os dados dos produtos
    /* Declarando um laço de repetição (for) para exibir o produto
    que deseja editar */
    db.transaction(function(selecionar){ 
        selecionar.executeSql('SELECT * FROM Produtos WHERE CodID = ?', [codDoProduto], function(selecionar, results){ 
            len = results.rows.length, i;  
            for (i = 0; i < len; i++) { 
                row = results.rows.item(i);
                dadosDoBanco = [
                    row['CodID'],
                    row['nomeProd'],
                    row['valorProd'],
                    row['tipoProd']
                ];

                dinheiroFormatado = dadosDoBanco[2];
                dividirFormatacao = dinheiroFormatado.split(",");

                // Exibindo produto
                document.getElementById('dados-produto').innerHTML = "<input type='number' min='1' id='cdProduto' placeholder='Digite aqui' onblur='validaCodLogin("+ dadosDoBanco[0] +")' disabled value='"+ dadosDoBanco[0] +"'><span id='validaCodLogin'></span><br><br><input type='text' id='nmProduto' placeholder='Digite aqui' required value='"+ dadosDoBanco[1] +"'><br><br>R$ <input type='text' title='Reais' style='text-align: center; width: 40px;' maxlength='5' id='prProdutoR' placeholder='00000' value='"+ dividirFormatacao[0] +"' required> , <input type='text' title='Centavos' style='text-align: center; width: 15px;' maxlength='2' id='prProdutoC' value='"+ dividirFormatacao[1] +"' placeholder='00'><br><br>";
                if(dadosDoBanco[3] == "Lanche"){
                    document.getElementById('dados-produto').innerHTML += "<span>Tipo do Produto: </span><br><input type='radio' id='lanche' name='tipoDoProduto' value='Lanche' required checked><label for='lanche'>Lanche</label><br><input type='radio' id='bebida' name='tipoDoProduto' value='Bebida'><label for='bebida'>Bebida</label><br><br><button onclick='atualizarProduto("+ codDoProduto +")'>Confirmar</button><button onclick='excluirProduto("+ codDoProduto +")'>Excluir</button>";
                }else{
                    document.getElementById('dados-produto').innerHTML += "<span>Tipo do Produto: </span><br><input type='radio' id='lanche' name='tipoDoProduto' value='Lanche' required><label for='lanche'>Lanche</label><br><input type='radio' id='bebida' name='tipoDoProduto' value='Bebida' checked><label for='bebida'>Bebida</label><br><br><button onclick='atualizarProduto("+ codDoProduto +")'>Confirmar</button><button onclick='excluirProduto("+ codDoProduto +")'>Excluir</button>";
                }
            }
        }, null); 
    });
}

function atualizarProduto(codDoProduto){
    nvNmProdutoEditar = document.getElementById('nmProduto').value;
    nvVlReaisProdutoEditar = document.getElementById('prProdutoR').value;
    nvVlCentavosProdutoEditar = document.getElementById('prProdutoC').value;
    nvVlProdutoEditar = nvVlReaisProdutoEditar + "," + nvVlCentavosProdutoEditar;

    tiposProduto = document.getElementsByName('tipoDoProduto');
    tiposProduto.forEach((tipoDoProduto) => {
        if (tipoDoProduto.checked){
            nvTipoProdutoEditar = [tipoDoProduto.value];
        }
    });

    db.transaction(function(atualize){
        atualize.executeSql('UPDATE Produtos SET nomeProd = ?, valorProd = ?, tipoProd = ? WHERE CodID = ?', [nvNmProdutoEditar, nvVlProdutoEditar, nvTipoProdutoEditar, codDoProduto]);
        alert("Atualização realizada com sucesso!")
        location.reload();
    });
}

function excluirProduto(codDoProduto){
    db.transaction(function(excluir){
        excluir.executeSql('DELETE FROM Produtos WHERE CodID = ?', [codDoProduto]);
        alert("Exclusão realizada com sucesso!")
        location.reload();
    });
}

function validaCodLogin(codParaValidar){
    i = 0;
    codValida = document.getElementById('cdProduto').value;
    /* Realizando um laço de repetição (for) para saber se já existe um produto com o código
    desejado nos registros do Banco de Dados */
    db.transaction(function(selecionar){ 
        selecionar.executeSql('SELECT * FROM Produtos WHERE CodID = ?', [codValida], function (selecionar, results) { 
            len = results.rows.length, i;  
            for (i = 0; i < len; i++) { 
                row = results.rows.item(i);
            }
            // Se existir um aviso é exibido
            if(i > 0){
                if(codValida == codParaValidar){
                    document.getElementById('validaCodLogin').innerHTML = "";
                }else{
                    document.getElementById('validaCodLogin').innerHTML = "<b style='color: red'>Em uso<b>";
                }
            }else{
                document.getElementById('validaCodLogin').innerHTML = "";
            }
        }, null); 
    });
}
