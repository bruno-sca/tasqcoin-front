Feature: Cadastro TasqCoin

    Scenario: Realizar Cadastro
        Given o site estar carregado na pagina de cadastro
        When digitar campos corretamente
        Then devo visualizar a página de login

    Scenario: Campo vazio (nome)
        Given o site estar carregado na pagina de cadastro
        When digitar campos menos o nome e cadastrar
        Then devo visualizar a página de cadastro

    Scenario: Campo vazio (email)
        Given o site estar carregado na pagina de cadastro
        When digitar campos menos o email e cadastrar
        Then devo visualizar a página de cadastro

    Scenario: Campo vazio (senha)
        Given o site estar carregado na pagina de cadastro
        When digitar campos menos a senha e cadastrar
        Then devo visualizar a página de cadastro

    Scenario: Campo vazio (confirmação de senha)
        Given o site estar carregado na pagina de cadastro
        When digitar campos menos a confirmação de senha e cadastrar
        Then devo visualizar a página de cadastro

    Scenario: Confirmação de senha incorreta
        Given o site estar carregado na pagina de cadastro
        When digitar campos e errar a confirmação de senha e cadastrar
        Then devo visualizar a página de cadastro

    Scenario: Usuário já cadastrado
        Given o site estar carregado na pagina de cadastro
        When digitar campos com dados de usuário já cadastrado
        Then devo visualizar a página de cadastro