import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ItemPg from './pages/ItemPg';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ItemCategoriaPg from './pages/ItemCategoriaPg';
import TabelaPrecoPg from './pages/TabelaPrecoPg';
import TabelaPrecoItemPg from './pages/TabelaPrecoItemPg';

class Rota extends Component {
    render() {
        return window.location.pathname === this.props.path && this.props.component
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
    <Rota path="/" component={<ItemPg />} />
    <Rota path="/categoria" component={<ItemCategoriaPg />} />
    <Rota path="/tabela_preco" component={<TabelaPrecoPg />} />
    <Rota path="/tabela_preco_item" component={<TabelaPrecoItemPg />} />
</>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
