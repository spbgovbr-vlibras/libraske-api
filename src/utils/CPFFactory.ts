import CPF from 'cpf';

const formattedCpfFactory = () => {
    return CPF.generate();
}
const unformattedCpfFactory = () => {
    return formattedCpfFactory().replace(/[.]/g, '').replace('-', '');
}

export {
    formattedCpfFactory,
    unformattedCpfFactory
}
