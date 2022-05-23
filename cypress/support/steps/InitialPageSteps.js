/* global Given, Then, When */

import { register } from 'tsconfig-paths';

import InitialPage from '../pageobjects/InitialPage';
import LoginPage from '../pageobjects/LoginPage';

const loginPage = new LoginPage();
const initialPage = new InitialPage();

Given('o site estar carregado na pagina de inicial', () => {
  loginPage.acessarSite();
  loginPage.typeValidEmail();
  loginPage.typeValidPassword();
  loginPage.clickLoginButton();
  initialPage.viewInitialPage();
});

When('digitar no campo de busca um unuário valido', () => {
  initialPage.searchValidUser();
});

When('digitar no campo de busca um unuário inexistente', () => {
  initialPage.searchInvalidUser();
});

Then('devo visualizar que nenhum usuário foi encontrado', () => {
  initialPage.noUsersFound();
});

When('clicar no botão de feedback', () => {
  initialPage.clickCreateFeedbackButton();
});

Then('abrir modal de feedback', () => {
  initialPage.viewFeedbackModal();
});

Then('devo visualizar a página inicial', () => {
  initialPage.viewInitialPage();
});

Then('exibir feedbacks do mês', () => {
  initialPage.viewMonthFeedback();
});

Then('devo visualizar a página do usuário pesquisado', () => {
  initialPage.viewSearchUserPage();
});
