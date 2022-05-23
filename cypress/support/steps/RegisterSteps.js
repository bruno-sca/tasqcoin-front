/* global Given, Then, When */

import { register } from 'tsconfig-paths';
import LoginPage from '../pageobjects/LoginPage';
import RegisterPage from '../pageobjects/RegisterPage';

const loginPage = new LoginPage();
const registerPage = new RegisterPage();

Given('o site estar carregado na pagina de cadastro', () => {
  registerPage.acessarCadastro();
});

When('digitar campos corretamente', () => {
  registerPage.typeValidName();
  registerPage.typeValidEmail();
  registerPage.typeValidPassword();
  registerPage.typeValidPasswordConfirm();
  registerPage.clickRegisterButton();
});

When('digitar campos menos o nome e cadastrar', () => {
  registerPage.typeValidEmail();
  registerPage.typeValidPassword();
  registerPage.typeValidPasswordConfirm();
  registerPage.clickRegisterButton();
});

When('digitar campos menos o email e cadastrar', () => {
  registerPage.typeValidName();
  registerPage.typeValidPassword();
  registerPage.typeValidPasswordConfirm();
  registerPage.clickRegisterButton();
});

When('digitar campos menos a senha e cadastrar', () => {
  registerPage.typeValidName();
  registerPage.typeValidEmail();
  registerPage.clickRegisterButton();
});

When('digitar campos menos a confirmação de senha e cadastrar', () => {
  registerPage.typeValidName();
  registerPage.typeValidEmail();
  registerPage.typeValidPassword();
  registerPage.clickRegisterButton();
});

When('digitar campos e errar a confirmação de senha e cadastrar', () => {
  registerPage.typeValidName();
  registerPage.typeValidEmail();
  registerPage.typeValidPassword();
  registerPage.typeInvalidPasswordConfirm();
  registerPage.clickRegisterButton();
});

When('digitar campos com dados de usuário já cadastrado', () => {
  registerPage.typeValidName();
  registerPage.typeInvalidEmail();
  registerPage.typeValidPassword();
  registerPage.typeValidPasswordConfirm();
  registerPage.clickRegisterButton();
});

Then('devo visualizar a página de cadastro', () => {
  registerPage.viewRegisterPage();
});

Then('devo visualizar a página de login', () => {
  loginPage.viewLoginPage();
});
