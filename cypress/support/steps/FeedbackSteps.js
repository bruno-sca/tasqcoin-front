/* global Given, Then, When */

import { register } from 'tsconfig-paths';

import InitialPage from '../pageobjects/InitialPage';
import LoginPage from '../pageobjects/LoginPage';
import FeedbackModal from '../pageobjects/FeedbackModal';

const loginPage = new LoginPage();
const initialPage = new InitialPage();
const feedbackModal = new FeedbackModal();

Given('o site estar com o modal de feedbacks aberto', () => {
  loginPage.acessarSite();
  loginPage.typeValidEmail();
  loginPage.typeValidPassword();
  loginPage.clickLoginButton();
  initialPage.viewInitialPage();

  initialPage.clickCreateFeedbackButton();

  initialPage.viewFeedbackModal();
});

When('preencher os campos e criar um feedback', () => {
  feedbackModal.searchValidUserModal();
  feedbackModal.givePoints();
  feedbackModal.typeFeedbackDescription();
  feedbackModal.clickSendFeedbackButton();
});

Then('devo visualizar a página inicial', () => {
  feedbackModal.viewInitialPageWithFeedbackCreated();
});

When('preencher os campos sem comentário e criar um feedback', () => {
  feedbackModal.searchValidUserModal();
  feedbackModal.givePoints();
  feedbackModal.clickSendFeedbackButton();
});

Then('devo visualizar o feedback criado sem comentário', () => {
  feedbackModal.viewInitialPageWithFeedbackCreatedWithoutHover();
});

When('preencher os campos sem destinatário no modal', () => {
  feedbackModal.givePoints();
  feedbackModal.typeFeedbackDescription();
  feedbackModal.clickSendFeedbackButton();
});

When('preencher os campos sem pontuação no modal', () => {
  feedbackModal.searchValidUserModal();
  feedbackModal.typeFeedbackDescription();
  feedbackModal.clickSendFeedbackButton();
});

When('clicar no botão de fechar modal', () => {
  feedbackModal.closeModalButton();
});

Then('devo visualizar o modal de feedback', () => {
  initialPage.viewFeedbackModal();
  feedbackModal.viewRequiredField();
});

Then('aviso de valor minimo de pontos no modal', () => {
  initialPage.viewFeedbackModal();
  feedbackModal.viewRequiredPointsWarning();
});

Then('visualizar pagina inicial sem modal', () => {
  initialPage.viewInitialPage();
});

When('preencher os campos sem destinatário válido no modal', () => {
  feedbackModal.searchInvalidUserModal();
  feedbackModal.givePoints();
  feedbackModal.typeFeedbackDescription();
  feedbackModal.clickSendFeedbackButton();
});
