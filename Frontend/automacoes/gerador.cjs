// Arquivo: gerador.js

// Função auxiliar para gerar números aleatórios com a quantidade de dígitos que você quiser
function gerarNumerosAleatorios(quantidade) {
    let resultado = '';
    for (let i = 0; i < quantity; i++) {
        resultado += Math.floor(Math.random() * 10).toString();
    }
    return resultado;
}

function gerarDadosAleatorios() {
    // 1. GERAR EMAIL
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let usuario = '';
    for (let i = 0; i < 8; i++) {
        usuario += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    const nome = usuario;
    const email = `${usuario}${Date.now().toString().slice(-3)}@teste.com`;

    // 2. GERAR DESCRIÇÃO
    const adjetivos = ['Excelente', 'Nova versão do', 'Lote premium de', 'Produto testado para', 'Item de alta qualidade para'];
    const substantivos = ['estoque de produtos', 'insumos do almoxarifado', 'material de escritório', 'equipamento de TI'];
    const adjAleatorio = adjetivos[Math.floor(Math.random() * adjetivos.length)];
    const subAleatorio = substantivos[Math.floor(Math.random() * substantivos.length)];
    const descricao = `${adjAleatorio} ${subAleatorio} gerado automaticamente via automação de testes em 2026.`;

    // 3. GERAR CNPJ (Válido para passar em máscaras/validações)
    const n = () => Math.floor(Math.random() * 9);
    const n1 = n(), n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n();
    const n9 = 0, n10 = 0, n11 = 0, n12 = 1; // Final 0001 padrão de matriz

    // Cálculo do primeiro dígito verificador
    let d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
    d1 = 11 - (d1 % 11);
    if (d1 >= 10) d1 = 0;

    // Cálculo do segundo dígito verificador
    let d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
    d2 = 11 - (d2 % 11);
    if (d2 >= 10) d2 = 0;

    // Retorna o CNPJ formatado: XX.XXX.XXX/0001-XX
    const cnpj = `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`;

    // RETORNA TODOS OS DADOS JUNTOS
    return {
        email: email,
        descricao: descricao,
        cnpj: cnpj,
        nome: nome
    };
}

module.exports = gerarDadosAleatorios;