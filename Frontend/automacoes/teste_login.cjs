const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const cadastroFornecedores = require('./teste_fornecedor.cjs');

(async function example() {
  // 1. Configurando opções para evitar o crash no Linux
  let options = new chrome.Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();


  try {
    await driver.get('http://localhost:5173');

    // 2. Espera inteligente: aguarda até 5 segundos para o elemento existir na tela
    // Isso substitui o setTimeout e é muito mais seguro
    const xpathInput = "//*[@id=\"root\"]/div/div/div/form/div[1]/input";
    const emailInput = await driver.wait(until.elementLocated(By.xpath(xpathInput)), 5000);
    const xpathInputPass = "//*[@id=\"root\"]/div/div/div/form/div[2]/input";
    const passInput = await driver.wait(until.elementLocated(By.xpath(xpathInputPass)), 5000);

    // 3. Pausa opcional usando o sleep nativo do Selenium (caso queira ver o que está acontecendo)
    await driver.sleep(1000);

    await emailInput.clear();
    await emailInput.sendKeys("admin@stockflow.com");
    await passInput.clear();
    await passInput.sendKeys("senhadosistema");
    
    const xpathButton = "//*[@id=\"root\"]/div/div/div/form/button";
    const enviarButton = await driver.wait(until.elementLocated(By.xpath(xpathButton)), 5000);

    await enviarButton.click();



    console.log(await driver.getTitle());

    const xpathInputFornecedor = "//*[@id=\"root\"]/div/div[2]/button[3]";
    const fornecedorInput = await driver.wait(until.elementLocated(By.xpath(xpathInputFornecedor)), 5000);

   await fornecedorInput.click();


    const xpathInputAddFornecedor = "//*[@id=\"root\"]/div/div[2]/div[1]/button";
    const addFornecedorInput = await driver.wait(until.elementLocated(By.xpath(xpathInputAddFornecedor)), 5000);

    await addFornecedorInput.click();

    await cadastroFornecedores(driver);

  } catch (erro) {
    console.error("Erro durante a execução do teste:", erro);
  } finally {
    // 4. Pausa extra apenas para você conseguir ver o resultado antes de fechar a janela
    await driver.sleep(100000);
    await driver.quit();
  }
})();