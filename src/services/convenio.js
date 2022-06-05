const barCodeOrdered = (bill) => {
    const section1 = bill.slice(0, 11)
    const section2 = bill.slice(12, 23)
    const section3 = bill.slice(24, 35)
    const section4 = bill.slice(36, 47)

    return `${section1}${section2}${section3}${section4}`
}

const verifyDigit = (barLine) => {
    let sum = 0
    let iterationResult = 0
    const verifiedDigits = []

    for (let index = 0; index < barLine.length; index++) {
        if (index % 2 === 0 && (index !== 11 && index !== 23 && index !== 35 && index !== 47)) {
            iterationResult = Number(barLine[index]) * 2
            if (iterationResult > 9) {
                const digit = iterationResult.toString()
                iterationResult = Number(digit[0]) + Number(digit[1])
            }
            sum += iterationResult
        }
        if (index % 2 !== 0 && (index !== 11 && index !== 23 && index !== 35 && index !== 47)) {
            iterationResult = Number(barLine[index])
            sum += iterationResult
        }

        if (index === 11 || index === 23 || index === 35 || index === 47) {
            if (sum % 10 === 0) {
                verifiedDigits.push(0)
            }
            else {
                const remainDigit = 10 - sum % 10
                verifiedDigits.push(remainDigit)
            }

            sum = 0
        }
    }
    return verifiedDigits
}

const verifyGlobalDigit = (barCode) => {
    const newBarCode = barCode.split('')
    newBarCode.splice(3, 1)
    let globalDigit
    let sum = 0
    let iterationResult = 0
    
    for (let index = newBarCode.length - 1; index >= 0; index--) {
        if (index % 2 === 0) {
            iterationResult = Number(newBarCode[index]) * 2
            if (iterationResult > 9) {
                const digit = iterationResult.toString()
                iterationResult = Number(digit[0]) + Number(digit[1])
            }
            sum += iterationResult
        }
        if (index % 2 !== 0) {
            iterationResult = Number(newBarCode[index])
            sum += iterationResult
        }
    }

    if (sum % 10 === 0) {
        globalDigit = 0
    }
    else {
        globalDigit = 10 - sum % 10
    }

    return globalDigit
}

const calculateAmount = (amountSection) => {
    let startSlice = 0
    const cents = amountSection.slice(-2)

    for (let index = 0; index < amountSection.length; index++) {
        if (amountSection[index] !== '0') {
            startSlice = index
            break
        }
    }

    const amount = amountSection.slice(startSlice, 9)
    return `${amount}.${cents}`
}

const boletoConvenio = (bill) => {
    const barCode = barCodeOrdered(bill.join(''))
    const amount = calculateAmount(barCode.slice(4, 15))

    verifyDigit(bill)
    verifyGlobalDigit(barCode)

    return { barCode, amount }
}

export default boletoConvenio
