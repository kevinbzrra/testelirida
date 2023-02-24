import { Component } from "react";
import Constante from "../utils/Constante";
import ItemCategoria from 'lirida-back-service/Servicos/ItemCategoria/ItemCategoria';
import ItemCategoriaService from 'lirida-back-service/Servicos/ItemCategoria/ItemCategoriaService';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default class ItemCategoriaPg extends Component {
    constante = new Constante();
    itemCategoriaService = new ItemCategoriaService(this.constante.token, this.constante.urlBase);

    state = {
        itemCategoria: new ItemCategoria(),
        listaItemCategoria: [],
    }

    componentDidMount() {
        this.iniciar();
    }

    async iniciar() {
        this.listar();
    }

    async listar() {
        let listaItemCategoria = this.state.listaItemCategoria;

        let retorno = await this.itemCategoriaService.listar(this.constante.seqUsuario);
        listaItemCategoria = retorno.objeto;

        this.setState({listaItemCategoria: listaItemCategoria});
    }

    async salvar() {
        let itemCategoria = this.state.itemCategoria;
        
        itemCategoria.seqUsuario = this.constante.seqUsuario;

        await this.itemCategoriaService.salvar(itemCategoria);
        
        this.listar();
    }

    render() {
        return <div style={{ padding: 10 }}>
            <h1>Item Categoria</h1>

            <form
                onSubmit={pEvento => { pEvento.preventDefault(); this.salvar(); }}>

                <div>
                    <label>Nome</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            itemCategoria: {
                                ...this.state.itemCategoria,
                                nome: pEvento.target.value
                            }
                        })}
                        value={this.state.itemCategoria.nome || ''} />
                </div>
                <div>
                    <label>Nome vitrine</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            itemCategoria: {
                                ...this.state.itemCategoria,
                                nomeVitrine: pEvento.target.value
                            }
                        })}
                        value={this.state.itemCategoria.nomeVitrine || ''} />
                </div>
                <div>
                    <label>Descrição</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            itemCategoria: {
                                ...this.state.itemCategoria,
                                descricao: pEvento.target.value
                            }
                        })}
                        value={this.state.itemCategoria.descricao || ''} />
                </div>
                <div>
                    <label>Descrição vitrine</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            itemCategoria: {
                                ...this.state.itemCategoria,
                                descricaoVitrine: pEvento.target.value
                            }
                        })}
                        value={this.state.itemCategoria.descricaoVitrine || ''} />
                </div>
                <div>
                    <label>Código</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            itemCategoria: {
                                ...this.state.itemCategoria,
                                codigo: pEvento.target.value
                            }
                        })}
                        value={this.state.itemCategoria.codigo || ''} />
                </div>
                <div>
                    <label>Código vitrine</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            itemCategoria: {
                                ...this.state.itemCategoria,
                                codigoVitrine: pEvento.target.value
                            }
                        })}
                        value={this.state.itemCategoria.codigoVitrine || ''} />
                </div>
                <div>
                    <Button
                        label="Salvar"
                        type="submit" />
                </div>
            </form>

            <DataTable
                showGridlines
                value={this.state.listaItemCategoria || ''}>
                <Column field="nome" header="Nome"></Column>
            </DataTable>
        </div>
    }
}