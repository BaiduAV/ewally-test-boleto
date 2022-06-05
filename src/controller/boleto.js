import generalBills from '../services/cobrança';
import boletoConvenio from '../services/convenio';

const billsController = (req, res) => {
    const { boleto } = req.params;

    const boletoStripped = boleto.split('')

    if (boleto.length === 47) {
        const barCode = generalBills(boletoStripped)

        if (barCode === null) {
            return res.status(400).json({ error: 'Digito verificador inválido' })
        }

        return res.status(200).json(barCode)
    }

    if (boleto.length === 48) {
        boletoConvenio(boletoStripped)
    }

    return res.status(400).json({ error: 'Boleto inválido' });
};

export default billsController;
