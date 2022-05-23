Feature: Feedback TasqCoin

    Scenario: Envio de Feedback Bem Sucedido
        Given o site estar com o modal de feedbacks aberto
        When preencher os campos e criar um feedback
        Then devo visualizar a página inicial

    Scenario: Envio de Feedback sem Comentário
        Given o site estar com o modal de feedbacks aberto
        When preencher os campos sem comentário e criar um feedback
        Then devo visualizar o feedback criado sem comentário

    Scenario: Envio de Feedback sem destinatário
        Given o site estar com o modal de feedbacks aberto
        When preencher os campos sem destinatário no modal
        Then devo visualizar o modal de feedback

    Scenario: Envio de Feedback sem pontuação
        Given o site estar com o modal de feedbacks aberto
        When preencher os campos sem pontuação no modal
        Then aviso de valor minimo de pontos no modal

    Scenario: Sair do Modal
        Given o site estar com o modal de feedbacks aberto
        When clicar no botão de fechar modal
        Then visualizar pagina inicial sem modal

    Scenario: Destinatário inexistente
        Given o site estar com o modal de feedbacks aberto
        When preencher os campos sem destinatário válido no modal
        Then devo visualizar o modal de feedback