import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import cpf from 'cpf';


export default (): string => {
  let generatedCpf;

  do {
    generatedCpf = cpf.generate(false, true);
  } while (cpfValidator.isValid(generatedCpf))

  return generatedCpf;
}