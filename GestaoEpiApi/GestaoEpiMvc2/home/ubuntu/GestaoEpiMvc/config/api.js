// Configuração da API
const API_CONFIG = {
    baseURL: 'http://localhost:5000/api', // Altere para a URL da sua API
    endpoints: {
        empresas: '/Empresas',
        epis: '/Epis',
        funcionarios: '/Funcionarios',
        movimentacoes: '/Movimentacoes',
        usuarios: '/Usuarios'
    }
};

// Função auxiliar para fazer requisições HTTP
async function apiRequest(endpoint, method = 'GET', data = null) {
    const url = `${API_CONFIG.baseURL}${endpoint}`;
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Para DELETE, pode não haver conteúdo na resposta
        if (method === 'DELETE') {
            return { success: true };
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

