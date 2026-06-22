const { Builder, By, until } = require('selenium-webdriver');

async function testCadastroProduto() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:5174/categoria');


        await driver.sleep(10000);

        await driver.findElement(By.id('nome-produto')).sendKeys('Teclado Mecânico RGB');
        await driver.findElement(By.id('descricao-produto')).sendKeys('Teclado mecânico com switches azuis e iluminação RGB.');
        await driver.findElement(By.id('preco-produto')).sendKeys('299.90');

        await driver.findElement(By.id('categoria-produto')).click();
        await driver.findElement(By.css('option[value="eletronicos"]')).click();

        await driver.findElement(By.id('save-product-button')).click();

        await driver.wait(until.elementLocated(By.id('product-list-table')), 5000);
        console.log('Teste de Cadastro de Produto: Passou! ✅');

    } catch (error) {
        console.error('Teste de Cadastro de Produto: Falhou! ❌', error);
    } finally {
        await driver.quit();
    }
}

testCadastroProduto();