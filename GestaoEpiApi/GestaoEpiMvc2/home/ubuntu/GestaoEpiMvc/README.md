# Sistema de Gestão de EPIs - Front-end MVC

Sistema web para gerenciamento de Equipamentos de Proteção Individual (EPIs) desenvolvido com arquitetura MVC em JavaScript puro.

## 📋 Descrição

Este front-end MVC foi desenvolvido para consumir a API REST de Gestão de EPIs, permitindo o gerenciamento completo de:

- **Empresas**: Cadastro e gerenciamento de empresas
- **EPIs**: Controle de equipamentos de proteção individual
- **Funcionários**: Gerenciamento de colaboradores
- **Movimentações**: Registro de entregas e devoluções de EPIs
- **Usuários**: Controle de acesso ao sistema

## 🏗️ Arquitetura MVC

O projeto segue o padrão **Model-View-Controller**:

### Models (`/models`)
Responsáveis pela lógica de negócio e comunicação com a API:
- `Empresa.js` - Gerenciamento de empresas
- `Epi.js` - Gerenciamento de EPIs
- `Funcionario.js` - Gerenciamento de funcionários
- `Movimentacao.js` - Gerenciamento de movimentações
- `Usuario.js` - Gerenciamento de usuários

### Views (`/views`)
Renderizadas dinamicamente pelo controller através de templates HTML.

### Controllers (`/controllers`)
Gerenciam a interação entre Models e Views:
- `AppController.js` - Controller principal e gerenciamento de navegação
- `EpiController.js` - Lógica específica para EPIs
- `FuncionarioMovimentacaoController.js` - Lógica para funcionários e movimentações
- `UsuarioController.js` - Lógica para usuários

## 🚀 Configuração

### 1. Configurar a URL da API

Edite o arquivo `config/api.js` e configure a URL base da sua API:

```javascript
const API_CONFIG = {
    baseURL: 'http://localhost:5000/api', // Altere para a URL da sua API
    // ...
};
```

### 2. Executar a Aplicação

#### Opção 1: Servidor HTTP simples com Python

```bash
cd GestaoEpiMvc
python3 -m http.server 8080
```

Acesse: `http://localhost:8080`

#### Opção 2: Servidor HTTP com Node.js

```bash
cd GestaoEpiMvc
npx http-server -p 8080
```

Acesse: `http://localhost:8080`

#### Opção 3: Live Server (VS Code)

Se estiver usando VS Code, instale a extensão "Live Server" e clique com o botão direito em `index.html` > "Open with Live Server".

## 📁 Estrutura do Projeto

```
GestaoEpiMvc/
├── index.html                  # Página principal
├── README.md                   # Documentação
├── config/
│   └── api.js                  # Configuração da API
├── models/
│   ├── Empresa.js              # Model de Empresa
│   ├── Epi.js                  # Model de EPI
│   ├── Funcionario.js          # Model de Funcionário
│   ├── Movimentacao.js         # Model de Movimentação
│   └── Usuario.js              # Model de Usuário
├── controllers/
│   ├── AppController.js        # Controller principal
│   ├── EpiController.js        # Controller de EPIs
│   ├── FuncionarioMovimentacaoController.js
│   └── UsuarioController.js    # Controller de Usuários
├── public/
│   ├── css/
│   │   └── styles.css          # Estilos da aplicação
│   └── js/
└── views/                      # Views renderizadas dinamicamente
```

## 🔧 Funcionalidades

### Dashboard
- Visão geral do sistema
- Estatísticas de empresas, EPIs, funcionários e movimentações
- Alertas de EPIs com CA vencido ou estoque baixo

### Gestão de Empresas
- Listagem de empresas cadastradas
- Cadastro de novas empresas
- Edição de empresas existentes
- Exclusão de empresas
- Validação de CNPJ e e-mail

### Gestão de EPIs
- Listagem de EPIs com status
- Cadastro de novos EPIs
- Controle de estoque (atual e mínimo)
- Validação de CA (Certificado de Aprovação)
- Alertas de vencimento e estoque baixo

### Gestão de Funcionários
- Listagem de funcionários por empresa
- Cadastro vinculado a empresas
- Controle de status (ativo/inativo)
- Informações de função e setor

### Gestão de Movimentações
- Registro de entregas de EPIs
- Controle de devoluções
- Cálculo automático de data de vencimento
- Alertas de vencimento próximo
- Motivos de troca e observações

### Gestão de Usuários
- Controle de acesso ao sistema
- Roles: Técnico de Segurança e Administrador
- Gerenciamento de senhas
- Status ativo/inativo

## 🎨 Interface

A interface foi desenvolvida com:
- Design moderno e responsivo
- Paleta de cores profissional
- Feedback visual para ações do usuário
- Modais para formulários
- Tabelas interativas
- Sistema de badges para status
- Alertas contextuais

## 🔒 Segurança

**Importante**: Este é um front-end de demonstração. Em produção:

1. Implemente autenticação JWT
2. Use HTTPS para todas as comunicações
3. Faça hash de senhas no backend
4. Implemente CORS adequadamente
5. Valide dados no backend
6. Implemente rate limiting
7. Use variáveis de ambiente para configurações sensíveis

## 📡 API Endpoints Consumidos

### Empresas
- `GET /api/Empresas` - Lista todas as empresas
- `GET /api/Empresas/{id}` - Busca empresa por ID
- `POST /api/Empresas` - Cria nova empresa
- `PUT /api/Empresas/{id}` - Atualiza empresa
- `DELETE /api/Empresas/{id}` - Remove empresa

### EPIs
- `GET /api/Epis` - Lista todos os EPIs
- `GET /api/Epis/{id}` - Busca EPI por ID
- `POST /api/Epis` - Cria novo EPI
- `PUT /api/Epis/{id}` - Atualiza EPI
- `DELETE /api/Epis/{id}` - Remove EPI

### Funcionários
- `GET /api/Funcionarios` - Lista todos os funcionários
- `GET /api/Funcionarios/{id}` - Busca funcionário por ID
- `POST /api/Funcionarios` - Cria novo funcionário
- `PUT /api/Funcionarios/{id}` - Atualiza funcionário
- `DELETE /api/Funcionarios/{id}` - Remove funcionário

### Movimentações
- `GET /api/Movimentacoes` - Lista todas as movimentações
- `GET /api/Movimentacoes/{id}` - Busca movimentação por ID
- `POST /api/Movimentacoes` - Cria nova movimentação
- `PUT /api/Movimentacoes/{id}` - Atualiza movimentação
- `DELETE /api/Movimentacoes/{id}` - Remove movimentação

### Usuários
- `GET /api/Usuarios` - Lista todos os usuários
- `GET /api/Usuarios/{id}` - Busca usuário por ID
- `POST /api/Usuarios` - Cria novo usuário
- `PUT /api/Usuarios/{id}` - Atualiza usuário
- `DELETE /api/Usuarios/{id}` - Remove usuário

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização e layout responsivo
- **JavaScript (ES6+)** - Lógica da aplicação
- **Fetch API** - Comunicação com a API REST
- **Arquitetura MVC** - Organização do código

## 📝 Validações Implementadas

### Empresas
- Razão Social obrigatória
- CNPJ obrigatório e formatado
- E-mail válido (quando informado)

### EPIs
- Nome obrigatório
- CA obrigatório
- Validade do CA obrigatória
- Tempo de uso em dias obrigatório e maior que zero
- Validação de CA vencido
- Controle de estoque mínimo

### Funcionários
- Empresa obrigatória
- Matrícula obrigatória
- Nome completo obrigatório

### Movimentações
- Funcionário obrigatório
- EPI obrigatório
- Data de entrega obrigatória
- Cálculo automático de data de vencimento
- Validação de vencimento

### Usuários
- Username obrigatório
- E-mail válido obrigatório
- Senha obrigatória (criação)
- Role obrigatória

## 🔄 Fluxo de Dados

1. **Usuário interage com a View** (clica em botão, preenche formulário)
2. **Controller captura o evento** e processa a ação
3. **Model comunica com a API** (GET, POST, PUT, DELETE)
4. **API processa e retorna dados**
5. **Model retorna dados ao Controller**
6. **Controller atualiza a View** com os novos dados

## 🎯 Melhorias Futuras

- [ ] Implementar autenticação e autorização
- [ ] Adicionar paginação nas listagens
- [ ] Implementar filtros e busca
- [ ] Adicionar gráficos e relatórios
- [ ] Exportar dados para Excel/PDF
- [ ] Notificações em tempo real
- [ ] Histórico de alterações
- [ ] Modo escuro
- [ ] Internacionalização (i18n)
- [ ] Testes automatizados

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

## 👨‍💻 Autor

Sistema desenvolvido para consumir a API de Gestão de EPIs.

---

**Nota**: Certifique-se de que a API está rodando antes de iniciar o front-end.

