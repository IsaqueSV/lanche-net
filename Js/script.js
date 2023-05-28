/*  Declarando a formatação dos inputs responsáveis por armazenar o preço do produto (reais
e centavos) */
$("input[id=prProdutoR]").mask("00000");
$("input[id=prProdutoC]").mask("00");

// Função responsável por inserir um Produto (registro) na Tabela Produtos
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
    });
}