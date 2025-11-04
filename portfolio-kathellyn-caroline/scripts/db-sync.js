const { sequelize } = require('../models');

async function syncDatabase() {
    try {
        console.log('Iniciando sincronização do banco de dados...\n');

        // Testar conexão
        await sequelize.authenticate();
        console.log('✓ Conexão com MySQL estabelecida com sucesso!');

        // Sincronizar todos os models (criar tabelas)
        await sequelize.sync({ force: false });
        console.log('✓ Todas as tabelas foram criadas/sincronizadas!');

        console.log('\n========================================');
        console.log('Tabelas criadas:');
        console.log('  - estudantes');
        console.log('  - disciplinas');
        console.log('  - tecnologias');
        console.log('  - projetos');
        console.log('  - projeto_tecnologias (tabela de junção)');
        console.log('  - contatos');
        console.log('========================================\n');

        console.log('✅ Sincronização concluída com sucesso!\n');
        console.log('📝 Próximo passo: Popular o banco de dados com dados iniciais');
        console.log('   Execute: npm run db:seed\n');

    } catch (error) {
        console.error('❌ Erro ao sincronizar banco de dados:', error);
        console.error('\n⚠️  Verifique se:');
        console.error('   1. O MySQL está rodando');
        console.error('   2. As credenciais no arquivo .env estão corretas');
        console.error('   3. O banco de dados especificado existe\n');

        if (error.original && error.original.code === 'ER_BAD_DB_ERROR') {
            console.error('💡 O banco de dados não existe. Crie-o com:');
            console.error(`   mysql -u root -p -e "CREATE DATABASE ${process.env.DB_NAME || 'portfolio_db'}"\n`);
        }
    } finally {
        await sequelize.close();
        console.log('Conexão com banco de dados fechada.');
    }
}

// Executar sincronização
syncDatabase();
