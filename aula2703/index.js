const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const { error } = require('console')

console.log("--||Iniciando o Accounts ||--")

operation()

function operation() {
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

            if (action === 'Criar Conta') {
                createAccount()
            } else if (action === 'Depositar') {
                deposit()
            } else if (action === 'Consultar Saldo') {
                console.log('Consultando saldo!')
                //getAccountBalance()
            } else if (action === 'Sacar') {
                withdraw()
            } else if (action === 'Sair') {
                console.log(chalk.bgBlue.black('Obrigado por usar o Account App!'))
                process.exit()
            }
        })
        .catch(err => console.log(err))
}

function createAccount() {
    console.log(chalk.bgGreen.white('Obrigado por utilizar o Account Banks!'))
    console.log(chalk.green('Vamos conferir as opções da sua conta'))

    buildAccount()


}

function buildAccount() {
    inquirer.prompt([

        {
            name: 'accountName',
            message: 'forneça o nome para sua conta no Banco Accounts'

        }

    ]).then((answer) => {
        const accountName = answer['accountName']

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.info(chalk.bgRed.black(`A conta:${accountName}Já existe`))
            console.info(chalk.bgRed.black(`Escolha outro nome:`))
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            `{"balance":0}`,
            function (err) {
                console.error(err)
            }

        )

        console.info(chalk.bgGreen.white(`Bem vindos ao accounts Bank:${accountName}Já existe`))
        console.info(chalk.green(`obrigado pela preferência!`))
        operation()




    })


}

function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual conta deseja depositar?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                massage: 'Quanto deseja depositar: '
            }
        ]).then((answer) => {
            const amount = answer['amount']

            addAmount(accountName, amount)
            operation()
        })
    })
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.error(chalk.bgRed.black(`A conta: ${accountName} não existe! Tente outro nome`))
        return false
    }
    return true
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.error(chalk.bgRed.black('Não há valor a ser depositado!'))
        deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.error(err)
        }
    )

    console.info(chalk.bgGreen.white(`O valor: ${amount}, foi depositado.`))
}
function getAccount(accountName) {
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJson)
}
function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'De qual conta deseja realizar o saque?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        if (!checkAccount(accountName)) {
            console.error(chalk.bgRed.white('Esta conta não existe'))
            return withdraw()
        }
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual valor deseja sacar da conta?'
            }
        ]).then((answer) => {
            const amount = answer['amount']
            removeAmount(accountName, amount)
            operation()
        })
    })
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.white('ocorreu um erro, tente mais tarde.'))
        return withdraw()
    }

    if (accountData.balance < amount) {
        console.error(chalk.bgRed.white('Valor não está disponível'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.error(err)
        }
    )

    console.info(chalk.bgBlue.blue(`o valor: ${amount} foi retirado da conta: ${accountName}`))


}
