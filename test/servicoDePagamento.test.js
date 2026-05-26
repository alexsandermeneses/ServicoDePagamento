import { ServicoDePagamento } from "../src/ServicoDePagamento.js";
import assert from "node:assert";

describe('Testes da classe Pagamento', () => {
    
    let pagamentoService;

    //Arrange
    beforeEach(() => {
        pagamentoService = new ServicoDePagamento();
    });

    describe('Testes do método realizarPagamento()', () => {

        it('Deve validar que se o usuário não inserir o codigo de barras, irá lançar uma exceção', ()=>{
            assert.throws(() => {
                pagamentoService.realizarPagamento('', 'ISAE', 1000)
            }, {
                message: 'Código de barras obrigatório'
            });
        });

        it('Deve validar que se o usuário não inserir a empresa, irá lançar uma exceção', ()=>{
            assert.throws(() => {
                pagamentoService.realizarPagamento('123', '', 1000)
            }, {
                message: 'Empresa obrigatória'
            });
        });

        it('Deve validar que se o usuário não inserir o valor, irá lançar uma exceção', ()=>{
            assert.throws(() => {
                pagamentoService.realizarPagamento('123', 'BBSE', )
            }, {
                message: 'Valor obrigatório e tem que ser maior que 0'
            });
        });

        it('Deve validar que se o usuário inserir valor <= 0, irá lançar uma exceção', ()=>{
            assert.throws(() => {
                pagamentoService.realizarPagamento('345', 'ISAE', 0)
            }, {
                message: 'Valor obrigatório e tem que ser maior que 0'
            });
        });

        it('Deve validar que está a criar um objeto', () => {    
            //Act
            const pagamento = pagamentoService.realizarPagamento('12345-9876-567','Banco do Brasil', 100);

            //Assert
            assert.deepStrictEqual(pagamento, {
                codigoBarras: '12345-9876-567',
                empresa: 'Banco do Brasil',
                valor: 100,
                categoria: 'PADRAO'
            });
        });

        it('Deve validar que valor > 100 recebe categoria "CARA"', () => {
            //Act
            const pagamento = pagamentoService.realizarPagamento('12345-9876-567', 'Banco do Brasil', 101);

            //Assert
            assert.equal(pagamento.categoria,'CARA');
        });

        it('Deve validar que valor <= 100 recebe categoria "PADRAO"', () => {
            //Act
            const pagamento = pagamentoService.realizarPagamento('12345-9876-567', 'Banco do Brasil', 100);

            //Assert
            assert.equal(pagamento.categoria,'PADRAO');
        });
    })

    describe('Teste do método consultarUltimoPagamento()', () => {

        it('Deve validar o erro quando não existir pagamento', () => {
            assert.throws(() => {
                pagamentoService.consultarUltimoPagamento()
            }, {
                message: 'Nenhum pagamento encontrado'
            });
        });

        it('Deve validar o último objeto criado da lista', ()=>{
            //Act
            pagamentoService.realizarPagamento('12345-9876-567', 'Banco do Brasil', 100);
            pagamentoService.realizarPagamento('12345-9876-5124', 'Santader', 101);
            pagamentoService.realizarPagamento('12345-9123-1237', 'Taesa', 100);
            
            const ultimoPagamento = pagamentoService.consultarUltimoPagamento();

            //Assert
            assert.deepStrictEqual(ultimoPagamento, {
                codigoBarras: '12345-9123-1237',
                empresa: 'Taesa',
                valor: 100,
                categoria: 'PADRAO'
            });
        });
    });
});