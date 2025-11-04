const { sequelize } = require('../models');

async function resetDatabase() {
    try {
        console.log('⚠️  ATENÇÃO: Este script irá APAGAR TODOS os dados do banco!\n');

        // Testar conexão
        await sequelize.authenticate();
        console.log('✓ Conexão com MySQL estabelecida com sucesso!');

        // Apagar e recriar todas as tabelas (CUIDADO!)
        await sequelize.sync({ force: true });
        console.log('✓ Todas as tabelas foram recriadas (dados anteriores apagados)!');

        console.log('\n========================================');
        console.log('Banco de dados resetado com sucesso!');
        console.log('Todas as tabelas foram recriadas vazias.');
        console.log('========================================\n');

        console.log('📝 Próximo passo: Popular o banco com dados iniciais');
        console.log('   Execute: npm run db:seed\n');

    } catch (error) {
        console.error('❌ Erro ao resetar banco de dados:', error);
        console.error('Detalhes:', error.message);
    } finally {
        await sequelize.close();
        console.log('Conexão com banco de dados fechada.');
    }
}

// Executar reset
resetDatabase();
