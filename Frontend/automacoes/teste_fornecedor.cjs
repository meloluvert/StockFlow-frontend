const { By, until } = require('selenium-webdriver'); // <-- ADICIONE ESTA LINHA AQUI
const gerarDadosAleatorios = require('./gerador.cjs');

async function cadastroFornecedores(driver){
    
    const usuario = gerarDadosAleatorios();

    const xpathInputName = "//*[@id=\"root\"]/div/div[2]/div[1]/div/div[2]/form/input[1]";
    const addNameInput = await driver.wait(until.elementLocated(By.xpath(xpathInputName)), 5000);
    await addNameInput.clear();
    await addNameInput.sendKeys(usuario.email);

    const xpathInputDescr = "//*[@id=\"root\"]/div/div[2]/div[1]/div/div[2]/form/input[2]";
    const addDescrInput = await driver.wait(until.elementLocated(By.xpath(xpathInputDescr)), 5000);
    await addDescrInput.clear();
    await addDescrInput.sendKeys(usuario.descricao);

    const xpathInputCnpj = "//*[@id=\"root\"]/div/div[2]/div[1]/div/div[2]/form/input[3]";
    const addCNPJInput = await driver.wait(until.elementLocated(By.xpath(xpathInputCnpj)), 5000);
    await addCNPJInput.clear();
    await addCNPJInput.sendKeys(usuario.cnpj);

    await driver.sleep(8000);

    const xpathInputCancelar= "//*[@id=\"root\"]/div/div[2]/div[1]/div/div[2]/form/button[2]";
    const CancelarInput = await driver.wait(until.elementLocated(By.xpath(xpathInputCancelar)), 5000);
    await CancelarInput.click();

    await driver.sleep(8000);
}

module.exports = cadastroFornecedores;