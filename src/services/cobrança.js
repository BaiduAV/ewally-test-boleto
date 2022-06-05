const formatBarCode = (boleto) => {
    const campoLivre = []
    const info = []

    for (let index = 0; index < boleto.length; index++) {
        if (index < 4) {
            info.push(boleto[index])
        }
        if (index === 32) {
            info.push(boleto[index])
        }
        if (index > 32 && index < 48) {
            info.push(boleto[index])
        }
        if (index > 3 && index < 9) {
            campoLivre.push(boleto[index])
        }
        if (index > 9 && index < 20) {
            campoLivre.push(boleto[index])
        }
        if (index > 20 && index < 31) {
            campoLivre.push(boleto[index])
        }
    }

    const barCode = [info.join(''), campoLivre.join('')]

    return barCode.join('')
}

const verifyDigit = (section) => {
    let module = 0
    let sum = 0
    let iterationResult = 0
    let tenth = 0
    const verifiedDigits = []

    for (let index = 0; index < section.length; index++) {
        if (index % 2 === module && (index !== 9 && index !== 20)) {
            iterationResult = Number(section[index]) * 2
            if (iterationResult > 9) {
                const digit = iterationResult.toString()
                iterationResult = Number(digit[0]) + Number(digit[1])
            }
            sum += iterationResult
        }
        if (index % 2 !== module && (index !== 9 && index !== 20 && index !== 31)) {
            iterationResult = Number(section[index])
            sum += iterationResult
        }

        if (index === 9 || index === 20 || index === 31) {

            tenth = (Number(sum.toString()[0]) + 1) * 10

            if (index === 20) {
                module = 0
            }

            if (index === 9) {
                module = 1
            }

            if ((tenth - sum) === 10) {
                verifiedDigits.push(0)
            }
            else {
                verifiedDigits.push(tenth - sum)
            }
            sum = 0
        }
    }
    return verifiedDigits
}

const verifyGlobalDigit = (barCode) => {
    const newBarCode = barCode.split('')
    newBarCode.splice(4, 1)
    let sum = 0
    let multiplyResult = 0
    let counter = 2

    for (let index = newBarCode.length; index > 0; index--) {
        if (counter > 9) {
            counter = 2
        }
        multiplyResult = Number(newBarCode[index - 1]) * counter
        sum += multiplyResult
        counter++
    }

    if (11 - sum % 11 === 10 || 11 - sum % 11 === 11 || 11 - sum % 11 === 0) {
        sum = 1
    }
    else {
        sum = 11 - sum % 11
    }

    return sum
}

const calculateAmount = (valor) => {
    let startSlice = 0
    const cents = valor.slice(-2).join('')

    for (let index = 0; index < valor.length; index++) {
        if (valor[index] !== '0') {
            startSlice = index
            break
        }
    }

    const amount = valor.slice(startSlice, 8).join('')
    const fullAmount = `${amount}.${cents}`

    return fullAmount
}

const calculateExpirationDate = (days) => {
    const transformDays = Number(days.join('')) - 1000
    const date = new Date('2000-07-03')
    const newDate = new Date(date.setDate(date.getDate() + transformDays))
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    const year = newDate.getFullYear()

    return `${day}-${month}-${year}`
}

const generalBills = (bill) => {
    const barCode = formatBarCode(bill)
    const amount = calculateAmount(bill.slice(37, 47))
    const expirationDate = calculateExpirationDate(bill.slice(33, 37))
    const section = bill.slice(0, 32)

    if (verifyDigit(section)[0] !== Number(bill[9]) ||
        verifyDigit(section)[1] !== Number(bill[20]) ||
        verifyDigit(section)[2] !== Number(bill[31])) {
        return null
    }

    if (verifyGlobalDigit(barCode) !== Number(barCode[4])) {
        return null
    }

    return { barCode, amount, expirationDate }
}

export default generalBills
