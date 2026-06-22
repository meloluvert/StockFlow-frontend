# Guia: Backend do StockFlow com Supabase (Auth + Tabelas)

> Objetivo: criar e manter o backend usando **Supabase** (Auth + Database). Este guia cobre configuração do cliente (supabase-js), criação/gestão de **Funcionários** (via `auth.signUp`), **Localizações**, **Fornecedores** e **Categorias de Produtos** (CRUD em tabelas).

## Sumário

- [Visão geral](#visão-geral)
- [Pré-requisitos no Supabase](#pré-requisitos-no-supabase)
- [Configuração do projeto (supabase-js)](#configuração-do-projeto-supabase-js)
- [Autenticação e Funcionários](#autenticação-e-funcionários)
  - [Campos esperados para signup](#campos-esperados-para-signup)
  - [Criar o primeiro funcionário (gerente)](#criar-o-primeiro-funcionário-gerente)
  - [Próximos funcionários (criados pelo gerente)](#próximos-funcionários-criados-pelo-gerente)
- [Produtos (CRUD)](#produtos-crud)
- [Movimentações (Registro e Histórico)](#movimentações-registro-e-histórico)
- [Localizações (CRUD)](#localizações-crud)
  - [Campos e formatos do payload](#campos-e-formatos-do-payload-localizações)
  - [Inserir](#inserir-localizações)
  - [Listar](#listar-localizações)
  - [Buscar por ID](#buscar-por-id-localizações)
  - [Atualizar](#atualizar-localizações)
  - [Deletar](#deletar-localizações)
- [Fornecedores (CRUD)](#fornecedores-crud)
  - [Campos e formatos do payload](#campos-e-formatos-do-payload-fornecedores)
  - [Inserir](#inserir-fornecedores)
  - [Listar](#listar-fornecedores)
  - [Buscar por ID](#buscar-por-id-fornecedores)
  - [Atualizar](#atualizar-fornecedores)
  - [Deletar](#deletar-fornecedores)
- [Categorias de Produtos (CRUD)](#categorias-de-produtos-crud)
  - [Campos e formatos do payload](#campos-e-formatos-do-payload-categorias)
  - [Inserir](#inserir-categorias)
  - [Listar](#listar-categorias)
  - [Buscar por ID](#buscar-por-id-categorias)
  - [Atualizar (inclui status)](#atualizar-categorias)
  - [Deletar](#deletar-categorias)
- [Boas práticas (RLS, Policies e segurança)](#boas-práticas-rls-policies-e-segurança)
- [Relatórios (Edge Function)](#relatórios)
- [Outras consultas](#outras-consultas)
- [Referências](#referências)

---

## Visão geral

- **Supabase Auth**: responsável por usuários (email/senha) e por anexar dados adicionais (ex.: `nome`, `cpf`, `cargo`) durante o cadastro.
- **Supabase Database**: tabelas (ex.: `localizacoes`, `fornecedores`, `categorias_produtos`) recebem CRUD via `supabase.from('...')`.

Este projeto assume que:
- O **primeiro funcionário** cadastrado é automaticamente tratado como **gerente** (por regra/trigger no banco).
- Os **próximos funcionários** são cadastrados pelo primeiro (gerente), e a trigger já consegue diferenciar o perfil.

> Nota: a parte “primeiro usuário vira gerente” depende da configuração no Supabase (trigger/policy). O cliente apenas envia os dados necessários.

---

## Pré-requisitos no Supabase

No Supabase, confirme (ou crie) os itens abaixo:

1. **Projeto Supabase** (Database + Auth).
2. Tabelas:
   - `localizacoes`
   - `fornecedores`
   - `categorias_produtos`
3. Tipos/constraints compatíveis com os valores que o frontend envia:
   - `tipo` (ex.: `localizacoes.tipo`) como **ENUM** (ou constraint)
   - `status` (ex.: `localizacoes.status` e `categorias_produtos.status`) como **ENUM** (ou constraint)
4. (Recomendado) **RLS (Row Level Security)** e **Policies** para controlar quem pode inserir/editar.

---

## Configuração do projeto (supabase-js)

Instale a biblioteca:

```bash
npm i @supabase/supabase-js
```

Crie/edite o arquivo `.env` (na raiz do projeto). Em projetos Vite use a convenção `VITE_`:

```bash
VITE_SUPABASE_URL=https://SEU_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publishable
```

> Segurança: para apps client-side, use a **publishable key**. A **service role key** não deve ser exposta no frontend.

Crie um arquivo de configuração para exportar o cliente (exemplo: `src/config/supabase.js`):

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

> Ajuste as variáveis de ambiente para o padrão do seu bundler (Vite/CRA/Next). O importante é garantir que você está usando as chaves corretas do `.env`.

---

## Autenticação e Funcionários

### Campos esperados para signup

Você fará o cadastro do usuário via `supabase.auth.signUp()`.

Estrutura esperada:

- `email`: string (email válido)
- `password`: string (conforme regras do Auth do Supabase)
- `options.data`: objeto com metadados do usuário (campos adicionais)

#### `options.data` (metadados)

- `nome`: string
- `cpf`: **string com 11 dígitos**, sem formatação (ex.: `'99999999999'`)
- `cargo`: string com enum esperado:
  - `'gerente'`
  - `'funcionario'`

> Mesmo que você envie `cargo`, a trigger/regra do banco pode sobrescrever no caso do primeiro usuário.

---

### Criar o primeiro funcionário (gerente)

Exemplo (signup):

```ts
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      nome,
      cpf, // '99999999999' (11 dígitos, sem máscara)
      cargo // 'gerente' | 'funcionario'
    }
  }
});
```

Como interpretar:
- `data`: retorna dados do signup (e sessão dependendo da configuração de email confirmations)
- `error`: descreve falha de validação/auth

---

### Próximos funcionários (criados pelo gerente)

Fluxo esperado:
- O gerente já deve estar autenticado.
- As **Policies/RLS** do backend devem permitir o cadastro/atualização conforme o modelo do sistema.


```ts


const payload = {
  email,       // vindo do seu state
  password,    // vindo do seu state
  nome,        // vindo do seu state
  cpf,         // vindo do seu state
  cargo        // 'funcionario' ou 'gerente'
};

console.log('Payload enviado para a Edge Function:', payload);

// Invoca a função 'criar-usuario'
const { data, error } = await supabase.functions.invoke('criar-usuario', {
  body: payload
});
```

> Se o seu modelo exigir “criar funcionário em tabela” (perfil) separadamente, ajuste para inserir/atualizar uma tabela de perfil em vez de depender somente de `options.data`.


# Listar usuários

Retorna todos os usuários cadastrados.

## Exemplo

```ts
const { data, error } = await supabase
  .from('usuarios')
  .select('*');

return { data, error };
```


---


# Buscar usuário por ID

Retorna um único usuário.

## Exemplo

```ts
const { data, error } = await supabase
  .from('usuarios')
  .select('*')
  .eq('id', id)
  .single();

return { data, error };
```

## Parâmetros

| Campo | Tipo |
| ----- | ---- |
| id    | uuid |

---

# Editar usuário

Permite atualizar:

* CPF
* Cargo
* Status
* Nome

## Exemplo

```ts
const { data, error } = await supabase
  .from('usuarios')
  .update({ nome, cpf, cargo, status })
  .eq('id', id)
  .select()
  .single();

return { data, error };
```

## Campos editáveis

| Campo  | Tipo   | Valores               |
| ------ | ------ | --------------------- |
| nome   | string | Nome completo         |
| cpf    | string | CPF válido            |
| cargo  | string | gerente / funcionario |
| status | string | ativo / inativo       |

---

# Exclusão lógica (Soft Delete)

O sistema não remove usuários do banco.

Ao “deletar” um funcionário:

```ts
status = 'inativo'
```

Ao reativar:

```ts
status = 'ativo'
```

---



## Localizações (CRUD)

Este guia assume uma tabela chamada **`localizacoes`**.

### Campos e formatos do payload

Campos sugeridos (ajuste ao seu schema):

- `nome`: string
- `descricao`: string (opcional)
- `tipo`: string compatível com ENUM (exemplos abaixo)
- `status`: string compatível com ENUM (ex.: `'ativo' | 'inativo'`)

Exemplos sugeridos para `tipo`:

- `'sala'`
- `'galpao'`
- `'camara_fria'`
- `'deposito'`
- `'recebimento'`
- `'externo'`
- `'estoque_seco'`
- `'patio'`
- `'container'`

> Importante: os valores precisam bater exatamente com os do ENUM/constraint do Postgres.

---

### Inserir

```ts
const { data, error } = await supabase
  .from('localizacoes')
  .insert([
    {
      nome: 'Galpão Central A',
      descricao: 'Armazenamento principal de insumos secos',
      tipo: 'galpao',
      status: 'ativo'
    }
  ])
  .select();
```

### Listar

```ts
const { data, error } = await supabase
  .from('localizacoes')
  .select('*');
```

### Buscar por ID

```ts
const { data, error } = await supabase
  .from('localizacoes')
  .select('*')
  .eq('id', id)
  .single();
```

### Atualizar

```ts
const { data, error } = await supabase
  .from('localizacoes')
  .update({
    nome: 'Freezer Industrial 02',
    tipo: 'freezer'
  })
  .eq('id', id);
```

> Regra de ouro: sempre aplique filtro (`.eq('id', ...)`) para não atualizar a tabela inteira.

### Deletar

```ts
const { data, error } = await supabase
  .from('localizacoes')
  .delete()
  .eq('id', id);
```

---

## Usuários / Funcionários (Listagem e Edição)

> Se você mantém perfil/estado do funcionário em uma tabela (ex.: **`usuarios`**), use o padrão abaixo.

### Listar

```ts
const { data, error } = await supabase
  .from('usuarios')
  .select('*');

return { data, error };
```

### Buscar por ID

```ts
const { data, error } = await supabase
  .from('usuarios')
  .select('*')
  .eq('id', id)
  .single();

return { data, error };
```

### Editar (atualizar campos do usuário)

Campos variam conforme seu schema. Exemplo usando `nome`, `cpf`, `cargo` e `status`:

```ts
const { data, error } = await supabase
  .from('usuarios')
  .update({ nome, cpf, cargo, status })
  .eq('id', id)
  .select()
  .single();

return { data, error };
```

### Deletar (preferencial: por `status`)

Em vez de `delete()`, o padrão recomendado é marcar como **inativo** alterando o campo `status`.

```ts
// Ex.: status: 'inativo'
const { error } = await supabase
  .from('usuarios')
  .update({ status: 'inativo' })
  .eq('id', id);

return { error };
```

> Por que isso? Mantém histórico e evita perder dados (recomendado em sistemas de domínio).

---

## Fornecedores (CRUD)

Este guia assume uma tabela chamada **`fornecedores`**.

### Campos e formatos do payload

Campos sugeridos (ajuste ao seu schema):

- `nome`: string
- `cnpj`: string de 14 dígitos (apenas dígitos, sem máscara/traços)
- `descricao`: string (opcional)
- `status`: string (se existir no seu schema; ex.: `'ativo' | 'inativo'`)

---

### Inserir

```ts
const { data, error } = await supabase
  .from('fornecedores')
  .insert([{ nome, cnpj, descricao }])
  .select()
  .single();
```

### Listar

```ts
const { data, error } = await supabase
  .from('fornecedores')
  .select('*');
```

### Buscar por ID

```ts
const { data, error } = await supabase
  .from('fornecedores')
  .select('*')
  .eq('id', id)
  .single();
```

### Atualizar

```ts
const { data, error } = await supabase
  .from('fornecedores')
  .update(camposParaAtualizar) // ex.: { nome, cnpj, descricao, status }
  .eq('id', id)
  .select()
  .single();
```

### Deletar

```ts
const { error } = await supabase
  .from('fornecedores')
  .delete()
  .eq('id', id);
```

---

## Categorias de Produtos (CRUD)

Este guia assume uma tabela chamada **`categorias_produtos`**.

### Campos e formatos do payload

Campos sugeridos (ajuste ao seu schema):

- `nome`: string
- `descricao`: string (opcional)
- `status`: string compatível com ENUM/constraint (tipicamente `'ativo' | 'inativo'`)

> Aqui, `status` é usado para ativar/desativar sem deletar (quando seu backend permite).

---

### Inserir

```ts
const { data, error } = await supabase
  .from('categorias_produtos')
  .insert([{ nome, descricao }])
  .select()
  .single();
```

### Listar

```ts
const { data, error } = await supabase
  .from('categorias_produtos')
  .select('*');
```

### Buscar por ID

```ts
const { data, error } = await supabase
  .from('categorias_produtos')
  .select('*')
  .eq('id', id)
  .single();
```

### Atualizar (inclui status)

```ts
const { data, error } = await supabase
  .from('categorias_produtos')
  .update(camposParaAtualizar) // ex.: { nome, descricao, status: 'ativo'|'inativo' }
  .eq('id', id)
  .select()
  .single();
```

### Deletar

```ts
const { error } = await supabase
  .from('categorias_produtos')
  .delete()
  .eq('id', id);
```

---

## Produtos (CRUD)

Este projeto usa uma tabela `produtos` onde a quantidade é calculada a partir das movimentações. Exemplos de queries usadas pelo frontend abaixo.

### Inserir

```js
// criaProduto(nome, descricao, codigo_de_barras, categoria_id, preco, status)
const { data, error } = await supabase
  .from('produtos')
  .insert([{
    nome,
    descricao,
    codigo_de_barras,
    categoria_id,
    preco,
    status,
    quantidade: 0
  }])
  .select()
  .single();
```

### Listar todos

```js
const { data, error } = await supabase
  .from('produtos')
  .select('*');
```

### Buscar por código de barras

```js
const { data, error } = await supabase
  .from('produtos')
  .select('*')
  .eq('codigo_de_barras', codigo)
  .maybeSingle();
```

### Atualizar

```js
const { data, error } = await supabase
  .from('produtos')
  .update(camposParaAtualizar)
  .eq('id', id)
  .select()
  .single();
```

### Deletar

```js
const { error } = await supabase
  .from('produtos')
  .delete()
  .eq('id', id);
```

---

## Movimentações (Registro e Histórico)

As movimentações devem ser registradas em `movimentacoes` e vinculadas ao usuário na tabela `usuarios_movimentacoes`.

### Registrar movimentação com vínculo do usuário

```js
const payload = {
  produto_id,
  quantidade,
  tipo, // 'entrada' | 'saida' | 'transferencia'
  fornecedor_id: fornecedorId || null,
  localizacao_entrada: localEntrada || null,
  localizacao_saida: localSaida || null
};

// No frontend chamamos uma função que faz inserção e cria o vínculo de auditoria
const { data, error } = await supabase
  .from('movimentacoes')
  .insert([payload])
  .select()
  .single();

// Em seguida inserir na tabela de vínculo
await supabase.from('usuarios_movimentacoes').insert([{ movimentacao_id: data.id, usuario_id }]);
```

### Listar histórico com dados de produto

```js
const { data, error } = await supabase
  .from('movimentacoes')
  .select(`
    id,
    quantidade,
    tipo,
    data,
    localizacao_entrada,
    localizacao_saida,
    produtos ( id, nome, codigo_de_barras )
  `)
  .order('data', { ascending: false });
```

### Deletar movimentação (e vínculo)

```js
// remover vínculo primeiro (se existir)
await supabase.from('usuarios_movimentacoes').delete().eq('movimentacao_id', id);

// então remover movimentação
await supabase.from('movimentacoes').delete().eq('id', id);
```


---

## Relatórios

O projeto expõe uma Edge Function chamada `gerar-relatorio` que gera relatórios em PDF no backend (ex.: listagens de produtos ou histórico de movimentações). A função responde com o PDF como conteúdo binário, por isso o frontend deve solicitar o conteúdo com o cabeçalho `Accept: application/pdf` e tratar a resposta como um Blob.

Endpoint (invocado via SDK `supabase-js`):

Exemplo de uso no frontend:

```js
const { data, error } = await supabase.functions.invoke('gerar-relatorio', {
  body: { tipoRelatorio: 'produtos' }, // 'produtos' | 'movimentacoes'
  headers: { 'Accept': 'application/pdf' }
});

if (error) {
  console.error('Falha ao gerar relatório', error);
  return;
}

// data vem como array buffer/binário — crie um Blob para abrir/baixar
const blob = new Blob([data], { type: 'application/pdf' });
const url = URL.createObjectURL(blob);
window.open(url, '_blank');
setTimeout(() => URL.revokeObjectURL(url), 10000);
```

Observações:
- `tipoRelatorio` deve ser uma string: `'produtos'` ou `'movimentacoes'`.
- A Edge Function é responsável por montar o PDF (por ex.: via biblioteca no servidor) e retornar os bytes.
- Certifique-se de que a função respeite autenticação/RLS quando necessário — o frontend envia o token automaticamente quando usa o cliente `supabase` configurado.
 
## Outras consultas

Consultas úteis usadas no dashboard do frontend para métricas rápidas e filtros.

- Produtos com estoque baixo (quantidade menor que 10):

```js
const { data, error } = await supabase
  .from('produtos')
  .select('*')
  .lt('quantidade', 10)
  .order('quantidade', { ascending: true });
```

- Total de produtos diferentes cadastrados (apenas count):

```js
const { count, error } = await supabase
  .from('produtos')
  .select('*', { count: 'exact', head: true });
// head: true faz a query não trazer os dados, apenas o número (economiza banda)
```

- Entradas registradas hoje:

```js
const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const { data, error } = await supabase
  .from('movimentacoes')
  .select('*, produtos(nome, codigo_de_barras)')
  .eq('tipo', 'entrada')
  .eq('data', hoje);
```

- Saídas registradas hoje:

```js
const hoje = new Date().toISOString().split('T')[0];

const { data, error } = await supabase
  .from('movimentacoes')
  .select('*, produtos(nome, codigo_de_barras)')
  .eq('tipo', 'saida')
  .eq('data', hoje);
```

- Quantidade total de todos os produtos somados em estoque (view):

```js
const { data, error } = await supabase
  .from('vw_quantidade_total_estoque')
  .select('total_geral')
  .single(); // retorna { total_geral: X }
```

- Produtos mais movimentados (Top 5) — view agregada:

```js
const { data, error } = await supabase
  .from('vw_produtos_mais_movimentados')
  .select('*')
  .order('total_movimentado', { ascending: false })
  .limit(5);
```

---

## Boas práticas (RLS, Policies e segurança)


1. **RLS (Row Level Security) está ativado** nas tabelas sensíveis (ex.: `localizacoes`, `fornecedores`, `categorias_produtos`).
2.**Policies** coerentes com o modelo do seu sistema:
   - Quem pode `select`
   - Quem pode `insert`
   - Quem pode `update`
   - Quem pode `delete`
3. `cargo` (gerente/funcionario) influencia o que cada usuário pode fazer.
4. Não confie em validações apenas no frontend:
   - permissões devem estar no backend (RLS/Policies/Functions).
5. Se existirem campos como `status`, prefira update (ex.: `ativo`/`inativo`) em vez de delete quando fizer sentido no domínio.
---


## Referências

- Supabase JavaScript (supabase-js):
  - https://supabase.com/docs/reference/javascript
- Auth (signUp):
  - https://supabase.com/docs/reference/javascript/auth-signup
- Tables (CRUD / select/insert/update/delete):
  - https://supabase.com/docs/guides/database/getting-started
- RLS e Policies:
  - https://supabase.com/docs/guides/database/postgres/row-level-security
- ENUMs e tipos no Postgres (visão geral):
  - https://www.postgresql.org/docs/current/datatype-enum.html
