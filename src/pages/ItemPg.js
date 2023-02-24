import { Component } from "react";
import Constante from "../utils/Constante";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import Item from 'lirida-back-service/Servicos/Item/Item';
import ItemService from 'lirida-back-service/Servicos/Item/ItemService';
import ItemCategoria from "lirida-back-service/Servicos/ItemCategoria/ItemCategoria";
import ItemCategoriaService from 'lirida-back-service/Servicos/ItemCategoria/ItemCategoriaService';

export default class ItemPg extends Component {
    constante = new Constante();
    itemService = new ItemService(this.constante.token, this.constante.urlBase);
    itemCategoriaService = new ItemCategoriaService(this.constante.token, this.constante.urlBase);

    state = {
        item: new Item(),
        itemCategoria: new ItemCategoria(),
        listaItem: [],
        listaItemCategoria: [],
    }

    componentDidMount() {
        this.iniciar();
    }

    async iniciar() {
        this.listar();
        this.listarCategoria();
    }

    async listar() {
        let listaItem = this.state.listaItem;

        let retorno = await this.itemService.listar(this.constante.seqUsuario, '');
        listaItem = retorno.objeto;

        this.setState({ listaItem: listaItem });
    }

    async salvar() {
        let item = this.state.item;

        item.seqUsuario = this.constante.seqUsuario;
        item.seqItemCategoria = this.state.itemCategoria._seqItemCategoria;
        item.situacao = 'ATIVO';
        console.log(item);

        await this.itemService.salvar(item);

        this.listar();
    }

    async listarCategoria() {
        let listaItemCategoria = this.state.listaItemCategoria;

        let retorno = await this.itemCategoriaService.listar(this.constante.seqUsuario);
        listaItemCategoria = retorno.objeto;

        this.setState({ listaItemCategoria: listaItemCategoria });
    }

    render() {
        return <div style={{ padding: 10 }}>
            <h1>Item</h1>

            <form
                onSubmit={pEvento => { pEvento.preventDefault(); this.salvar(); }}>

                <div>
                    <label>Nome</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            item: {
                                ...this.state.item,
                                nome: pEvento.target.value
                            }
                        })}
                        value={this.state.item.nome || ''} />
                </div>
                <div>
                    <label>Nome vitrine</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            item: {
                                ...this.state.item,
                                nomeVitrine: pEvento.target.value
                            }
                        })}
                        value={this.state.item.nomeVitrine || ''} />
                </div>
                <div>
                    <label>Descrição</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            item: {
                                ...this.state.item,
                                descricao: pEvento.target.value
                            }
                        })}
                        value={this.state.item.descricao || ''} />
                </div>
                <div>
                    <label>Descrição vitrine</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            item: {
                                ...this.state.item,
                                descricaoVitrine: pEvento.target.value
                            }
                        })}
                        value={this.state.item.descricaoVitrine || ''} />
                </div>
                <div>
                    <label>Código</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            item: {
                                ...this.state.item,
                                codigo: pEvento.target.value
                            }
                        })}
                        value={this.state.item.codigo || ''} />
                </div>
                <div>
                    <label>Código vitrine</label><br />
                    <InputText
                        onChange={pEvento => this.setState({
                            item: {
                                ...this.state.item,
                                codigoVitrine: pEvento.target.value
                            }
                        })}
                        value={this.state.item.codigoVitrine || ''} />
                </div>
                <div>
                    <label>Categoria</label><br />
                    <Dropdown
                        optionLabel="nomeVitrine"
                        options={this.state.listaItemCategoria}
                        onChange={pEvento => this.setState({ itemCategoria: pEvento.value })}
                        value={this.state.itemCategoria}
                    />
                </div>
                <div>
                    <Button
                        label="Salvar"
                        type="submit" />
                </div>
            </form>

            <DataTable
                showGridlines
                value={this.state.listaItem || ''}>
                <Column field="nome" header="Nome"></Column>
            </DataTable>
        </div>
    }
}