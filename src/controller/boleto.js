const boletoController = (req, res) => {
    const { boleto } = req.params;

    if (boleto.length !== 44) {
        return res.status(400).json({
            error: 'Boleto inválido',
        });
    }

    boleto.split('').forEach((item, index) => {
        if (index % 2 === 0) {
            boleto[index] = item.toUpperCase();
        }
    });

    res.json({ data: boleto }).status(200);
};

export default boletoController;
