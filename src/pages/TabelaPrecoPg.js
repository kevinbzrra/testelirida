import { Component } from "react";
import Constante from "../utils/Constante";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import TabelaPreco from 'lirida-back-service/Servicos/TabelaPreco/TabelaPreco';
import TabelaPrecoService from 'lirida-back-service/Servicos/TabelaPreco/TabelaPrecoService';
import Pesquisa from 'lirida-back-service/Servicos/Pesquisa/Pesquisa';

export default class TabelaPrecoPg extends Component {
    constante = new Constante();
    tabelaPrecoService = new TabelaPrecoService(this.constante.token, this.constante.urlBase);

    state = {
        tabelaPreco: new TabelaPreco(),
        listaTabelaPreco: [],
    }

    componentDidMount() {
        this.iniciar();
    }

    async iniciar() {
        this.listar();
    }

    async listar() {
        let listaTabelaPreco = this.state.listaTabelaPreco;

        let retorno = await this.tabelaPrecoService.listar(this.constante.seqUsuario);
        listaTabelaPreco = retorno.objeto;

        this.setState({ listaTabelaPreco: listaTabelaPreco });
    }

    async salvar() {
        let tabelaPreco = this.state.tabelaPreco;

        tabelaPreco.seqUsuario = this.constante.seqUsuario;

        let retorno = await this.tabelaPrecoService.salvar(tabelaPreco);
        console.log(retorno.objeto);

        this.listar();
    }

    render() {
        return <div style={{ padding: 10 }}>
            <h1>Tabela de preço</h1>

            <form
                onSubmit={pEvento => { pEvento.preventDefault(); this.salvar(); }}>

                <div>
                    <label>Nome</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            tabelaPreco: {
                                ...this.state.tabelaPreco,
                                nome: pEvento.target.value
                            }
                        })}
                        value={this.state.tabelaPreco.nome || ''} />
                </div>
                <div>
                    <Button
                        label="Salvar"
                        type="submit" />
                </div>
            </form>

            <DataTable
                showGridlines
                value={this.state.listaTabelaPreco || ''}>
                <Column field="nome" header="Nome"></Column>
            </DataTable>
        </div>
    }
}