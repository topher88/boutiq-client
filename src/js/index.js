import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {getAllArticulos} from './database/getData';
import Crud from './crud/crud';
import Venta from './venta/venta';
import ConsultaArticulo from './crud/consultaArticulo';
import ConsultaFactura from './facturas/ConsultaFactura';
import CrudArticulo from './articulo/crudArticulo';
import {ConfigContextProvider} from './context/ConfigContext';
import '../styles/main.scss';

function App () {
  const [mainElement, setMainElement] = useState(<div />);
  const [articuloData, setArticuloData] = useState([]);

  useEffect(() => {
    getAllArticulos().then(res => {
      setArticuloData(res);
    });
  }, []);

  return (
    <ConfigContextProvider>
      <header className='header'>
        <nav className='header__menu'>
          <ul className='navigation'>
            <li className='navigation__item'>
              <button className='navigation__btn navigation__btn-crud'>CRUD</button>
              <div className='navigation__crud-tables'>
                <button className='navigation__btn' onClick={() => setMainElement(<Crud table='marca' />)}>
                  marca
                </button>
                <button className='navigation__btn' onClick={() => setMainElement(<Crud table='rubro' />)}>
                  rubro
                </button>
                <button className='navigation__btn' onClick={() => setMainElement(<Crud table='proveedor' />)}>
                  proveedor
                </button>
                <button className='navigation__btn' onClick={() => setMainElement(<Crud table='tipo_pago' />)}>
                  tipo_pago
                </button>
                <button className='navigation__btn' onClick={() => setMainElement(<Crud table='vendedor' />)}>
                  vendedor
                </button>
                <button className='navigation__btn' onClick={() => setMainElement(<Crud table='cliente' />)}>
                  cliente
                </button>
              </div>
            </li>
            <li className='navigation__item'>
              <button className='navigation__btn' onClick={() => setMainElement(<Venta articuloData={articuloData} />)} >VENTA</button>
            </li>
            <li className='navigation__item'>
              <button className='navigation__btn' onClick={() => setMainElement(<ConsultaArticulo articuloData={articuloData} handleSelection={(articulo) => console.log(articulo) /* TODO: ARTICULO CRUD */} />)}>ARTICULO</button>
            </li>
            <li className='navigation__item'>
              <button className='navigation__btn' onClick={() => setMainElement(<ConsultaFactura />)}>FACTURA</button>
            </li>
            <li className='navigation__item'>
              <button className='navigation__btn' onClick={() => setMainElement(<CrudArticulo />)}>CRUDARTICULO</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {mainElement}
      </main>
    </ConfigContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
