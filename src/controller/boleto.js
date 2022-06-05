import generalBills from '../services/cobrança';
import boletoConvenio from '../services/convenio';

const billsController = (req, res) => {
    const { boleto } = req.params;
    const boletoStripped = boleto.split('')
    const ensureNumber = Number(boleto)

    if (Number.isNaN(ensureNumber)) {
        return res.status(400).json({ error: 'Boleto inválido' });
    }

    if (boleto.length === 47) {
        const boletoInfo = generalBills(boletoStripped)

        if (boletoInfo === null) {
            return res.status(400).json({ error: 'Digito verificador inválido' })
        }

        return res.status(200).json(boletoInfo)
    }

    if (boleto.length === 48) {
        const boletoInfo = boletoConvenio(boletoStripped)

        if (boletoInfo === null) {
            return res.status(400).json({ error: 'Digito verificador inválido' })
        }

        return res.status(200).json(boletoInfo)
    }

    return res.status(400).json({ error: 'Boleto inválido' });
};

export default billsController;
