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
            if (sum.toString()[0] === '1' ||
                sum.toString()[0] === '2' ||
                sum.toString()[0] === '3' ||
                sum.toString()[0] === '4' ||
                sum.toString()[0] === '5' ||
                sum.toString()[0] === '6' ||
                sum.toString()[0] === '7' ||
                sum.toString()[0] === '8' ||
                sum.toString()[0] === '9') {
                tenth = (Number(sum.toString()[0]) + 1) * 10
            }

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

const verifyGlobalDigit = (barCode) => barCode.slice(10, 20)


const boletoCobranca = (boleto) => {
    const barCode = formatBarCode(boleto)
    const amount = 0
    const expirationDate = "20-11-2000"

    const section = boleto.slice(0, 32)

    if (verifyDigit(section)[0] !== Number(boleto[9]) ||
        verifyDigit(section)[1] !== Number(boleto[20]) ||
        verifyDigit(section)[2] !== Number(boleto[31])) {
        return null
    }

    if (!(verifyGlobalDigit(barCode) !== boleto.slice(10, 20))) {
        return null
    }

    return { barCode, amount, expirationDate }
}

export default boletoCobranca
