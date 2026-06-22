const { Builder, By, until } = require('selenium-webdriver');

async function executarTestes() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        
        console.log('Acessando o sistema...');
        await driver.get('http://localhost:5173');

        
        console.log('Testando Login...');
        await driver.findElement(By.id('email')).sendKeys('admin@estoque.com');
        await driver.findElement(By.id('password')).sendKeys('123456');
        await driver.findElement(By.id('login-button')).click();

        // Espera a tela de dashboard aparecer (o elemento deixar de ter a classe 'hidden')
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('dashboard-section'))), 5000);
        console.log('Login efetuado com sucesso! ✅');

        
        console.log('Testando Cadastro de Produto...');
        await driver.findElement(By.id('nome-produto')).sendKeys('Monitor UltraWide');
        await driver.findElement(By.id('descricao-produto')).sendKeys('Monitor 29 polegadas LG');
        await driver.findElement(By.id('preco-produto')).sendKeys('1200');

        await driver.findElement(By.id('categoria-produto')).click();
        await driver.findElement(By.css('option[value="eletronicos"]')).click();

        await driver.findElement(By.id('save-product-button')).click();

        
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('product-list-table'))), 5000);
        console.log('Produto cadastrado com sucesso! ✅');

    } catch (error) {
        console.error('Um dos testes falhou! ❌', error);
    } finally {
        await driver.quit();
    }
}

executarTestes();