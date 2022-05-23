Feature: Login TasqCoin

    Scenario: Realizar login com sucesso
        Given o site estar carregado
        When digitar email, senha e clicar no botão login
        Then devo visualizar a página inicial
    
    Scenario: Usuário já logado
        Given o usuário já estar logado
        When acessar o site inicial novamente
        Then devo visualizar a página inicial

    Scenario: Dados de Login inválidos (email)
        Given o site estar carregado
        When digitar email invalido, senha valida e clicar no botão login
        Then devo visualizar a página de login

    Scenario: Dados de Login inválidos (senha)
        Given o site estar carregado
        When digitar email valido, senha invalida e clicar no botão login
        Then devo visualizar a página de login

    Scenario: Campo vazio (email)
        Given o site estar carregado
        When digitar senha valida e clicar no botão login
        Then devo visualizar a página de login

    Scenario: Campo vazio (senha)
        Given o site estar carregado
        When digitar email valido e clicar no botão login
        Then devo visualizar a página de login

    Scenario: Botão para tela de cadastro
        Given o site estar carregado
        When clicar no botão para cadastro
        Then devo visualizar a página de cadastro