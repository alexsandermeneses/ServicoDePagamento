export class ServicoDePagamento {

    constructor(){
        this.pagamentos =[];
    }

    realizarPagamento(codigoBarras, empresa, valor){
        
        if(!codigoBarras){
            throw new Error('Código de barras obrigatório');
        }

        if(!empresa){
            throw new Error('Empresa obrigatória');
        }

        if(valor == null || valor <= 0){
            throw new Error('Valor obrigatório e tem que ser maior que 0');
        }

            const pagamento= {
                codigoBarras,
                empresa,
                valor,
                categoria: valor > 100 ? 'CARA' : 'PADRAO'
            }
        this.pagamentos.push(pagamento);

        return pagamento;
    };

    consultarUltimoPagamento(){
        if(this.pagamentos.length === 0){
            throw new Error('Nenhum pagamento encontrado');
        }
        return this.pagamentos.at(-1);
    };
};