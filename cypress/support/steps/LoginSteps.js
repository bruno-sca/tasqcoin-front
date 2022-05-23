/* global Given, Then, When */

import LoginPage from '../pageobjects/LoginPage';
import InitialPage from '../pageobjects/InitialPage';
import RegisterPage from '../pageobjects/RegisterPage';

const loginPage = new LoginPage();
const initialPage = new InitialPage();
const registerPage = new RegisterPage();

Given('o site estar carregado', () => {
  loginPage.acessarSite();
});

When('digitar email, senha e clicar no botão login', () => {
  loginPage.typeValidEmail();
  loginPage.typeValidPassword();
  loginPage.clickLoginButton();
});

When('digitar email invalido, senha valida e clicar no botão login', () => {
  loginPage.typeInvalidEmail();
  loginPage.typeValidPassword();
  loginPage.clickLoginButton();
});

When('digitar email valido, senha invalida e clicar no botão login', () => {
  loginPage.typeValidEmail();
  loginPage.typeInvalidPassword();
  loginPage.clickLoginButton();
});

When('digitar senha valida e clicar no botão login', () => {
  loginPage.typeValidPassword();
  loginPage.clickLoginButton();
});

When('digitar email valido e clicar no botão login', () => {
  loginPage.typeValidEmail();
  loginPage.clickLoginButton();
});

Then('devo visualizar a página inicial', () => {
  initialPage.viewInitialPage();
});

Given('o usuário já estar logado', () => {
  loginPage.acessarSite();
  loginPage.typeValidEmail();
  loginPage.typeValidPassword();
  loginPage.clickLoginButton();
  initialPage.viewInitialPage();
  loginPage.acessarSite();
});

When('acessar o site inicial novamente', () => {
  loginPage.acessarSite();
});

When('clicar no botão para cadastro', () => {
  loginPage.clickRegisterButton();
});

Then('devo visualizar a página de cadastro', () => {
  registerPage.viewRegisterPage();
});

Then('devo visualizar a página de login', () => {
  loginPage.viewLoginPage();
});
