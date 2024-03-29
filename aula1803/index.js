const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const { error } = require('console')

console.log("--||Iniciando o Accounts ||--")

operation()

function operation(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
        }
    ]).then(
        (answer) => {
            const action = answer['action']

            if(action === 'Criar Conta') {
                console.log('Criando a Conta')
                //createAccount()
            }else if(action === 'Depositar') {
                console.log('Depositando na sua conta!')
                // deposit()
            }else if(action === 'Consultar Saldo'){
                console.log('Consultando saldo!')
                //getAccountBalance()
            }else if(action === 'Sacar'){
                console.log('Sacando da conta')
                //withdraw()
            }else if(action === 'Sair'){
                console.log(chalk.bgBlue.black('Obrigado por usar o Account App!'))
                process.exit()
            }
        })
    .catch(err => console.log(err))
}