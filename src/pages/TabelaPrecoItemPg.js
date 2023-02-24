import { Component } from "react";
import Constante from "../utils/Constante";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import TabelaPrecoItem from 'lirida-back-service/Servicos/TabelaPrecoItem/TabelaPrecoItem';
import TabelaPrecoService from "lirida-back-service/Servicos/TabelaPreco/TabelaPrecoService";

export default class TabelaPrecoItemPg extends Component {
    constante = new Constante();
    tabelaPrecoService = new TabelaPrecoService(this.constante.token, this.constante.urlBase);

    state = {
        tabelaPrecoItem: new TabelaPrecoItem(),
        listaTabelaPrecoItem: [],
    }

    componentDidMount() {
        this.iniciar();
    }

    async iniciar() {
        this.listar();
    }

    async listar() {
        let listaTabelaPrecoItem = this.state.listaTabelaPrecoItem;

        let retorno = await this.tabelaPrecoService.listarItem(this.constante.seqTabelaPrecoKevin, '', '', '');
        listaTabelaPrecoItem = retorno.objeto;

        this.setState({ listaTabelaPrecoItem: listaTabelaPrecoItem });
    }

    async salvar() {
        let listaTabelaPrecoItem = this.state.listaTabelaPrecoItem;

        for (let i = 0; i < listaTabelaPrecoItem.length; i++) {
            await this.tabelaPrecoService.salvarItem(listaTabelaPrecoItem[i]);
        }

        console.log('oi')

        this.listar();
    }

    render() {
        return <div style={{ padding: 10 }}>
            <h1>Tabela de preço item</h1>

            <Button label="salvar" onClick={() => this.salvar()} />

            <DataTable
                showGridlines
                value={this.state.listaTabelaPrecoItem || ''}>
                <Column field="_itemNome" header="Nome"></Column>
                <Column field="precoMinimo" header="Preço mínimo" body={pTabelaPrecoItem => 
                    <InputText onChange={pEvento => pTabelaPrecoItem.precoMinimo = pEvento.target.value}
                    defaultValue={pTabelaPrecoItem.precoMinimo} />
                }></Column>
                <Column field="preco" header="Preço" body={pTabelaPrecoItem => 
                    <InputText onChange={pEvento => pTabelaPrecoItem.preco = pEvento.target.value}
                    defaultValue={pTabelaPrecoItem.preco} />
                }></Column>
                <Column field="precoMaximo" header="Preço máximo" body={pTabelaPrecoItem => 
                    <InputText onChange={pEvento => pTabelaPrecoItem.precoMaximo = pEvento.target.value}
                    defaultValue={pTabelaPrecoItem.precoMaximo} />
                }></Column>
            </DataTable>
        </div>
    }
}