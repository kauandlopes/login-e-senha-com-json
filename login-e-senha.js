const readline = require('readline');
const fs = require('fs');
const usuarios = require('./usuarios.json');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

function menu(){
    rl.question("\nSeja Bem Vindo, deseja fazer login ou cadastro?\nPressione (s) para login\nPressione (n) para Cadastro\nPressione (f) para fechar\n" , confirma => { 
       
        if (confirma === 's'){
        loginESenha();

        }else if (confirma === 'n') {
            cadastro();

        }else if (confirma === 'f') {
            console.log("\nVocê esta saindo...\nAté Breve!")
            rl.close();

        }else {
            console.log("Input Inválido, tente novamente!");
            menu();
        }

    });
} 

function salvarDados() {
    fs.writeFileSync('usuarios.json', JSON.stringify(usuarios, null, 2), 'utf8');
  }

  function loginESenha(){
    rl.question('\nLogin: \nDigite seu nome de usuário: ', (nome) => {
        rl.question('Digite sua senha: ', (senha) => {
            const encontrado = usuarios.find(u => u.login === nome && u.pin === senha);

            if (encontrado){
                console.log("\nLogin Confirmado!\nSeja Bem Vindo!");
                rl.close();
            } else {
                console.log("\nLogin Negado!");
                loginESenha(); // tenta de novo
            }
        });
    });
}

function cadastro(){
    rl.question('\nCadastro:\nDigite seu login de usuário: ', (nome) => {
        const usuarioExistente = usuarios.find(u => u.login === nome);
            if (usuarioExistente) {
                console.log('Nome de usuário já existe!');
                cadastro();
                return;
            }
        cadastroSenha(nome);
    });
    
}

function cadastroSenha(nome){
    rl.question('Digite sua senha: ', (senha) => {
        if (senha.length > 6){
            usuarios.push({login: nome, pin: senha});
            console.log('\nCadastro Realizado com Sucesso!!');
            salvarDados();
            loginESenha();
        }
        else{ 
            console.log("\nSenha Inválida, digite a senha novamente!\n")
            cadastroSenha(nome);
            return;
        }
    });
}

menu();
