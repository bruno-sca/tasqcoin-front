Feature: Tela Inicial TasqCoin

    Scenario: Busca de Usuário
        Given o site estar carregado na pagina de inicial
        When digitar no campo de busca um unuário valido
        Then devo visualizar a página do usuário pesquisado

    Scenario: Busca de Usuário inexistente
        Given o site estar carregado na pagina de inicial
        When digitar no campo de busca um unuário inexistente
        Then devo visualizar que nenhum usuário foi encontrado

    Scenario: Botão de criação de feedback
        Given o site estar carregado na pagina de inicial
        When clicar no botão de feedback
        Then abrir modal de feedback

    Scenario: Exibição dos Feedbacks do mês
        Given o site estar carregado na pagina de inicial
        Then exibir feedbacks do mês