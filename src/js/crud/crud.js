import React, { useEffect, useState } from 'react';
import '../../styles/main.scss';
import { InputFactory, InputSearch } from '../components/inputs';
import * as databaseRead from '../database/getData';
import * as databaseWrite from '../database/writeData';
import dialogs from '../utilities/dialogs';
import filterFunctions from '../utilities/filterFunctions';
dialogs.options.toasts.max = 3;

const textFilter = filterFunctions.wordFiltering(true);
const cols = {
  marca: ['id', 'NOMBRE'],
  rubro: ['id', 'NOMBRE'],
  proveedor: ['id', 'NOMBRE'],
  tipo_pago: ['id', 'NOMBRE'],
  vendedor: ['id', 'NOMBRE'],
  cliente: ['id', 'NOMBRE', 'DOMICILIO', 'TELEFONO', 'CREDITO']
};
const coltypes = ['id', 'text', 'text', 'text', 'text', 'text', 'text'];

export default function Crud (props) {
  const [search, setSearch] = useState('');
  const [objList, setObjList] = useState([]);
  const [obj, setObj] = useState({});
  const crudTable = props.table;

  const filterCol = 'NOMBRE';

  useEffect(() => { // LOAD TABLE
    databaseRead.getTable(crudTable)
      .then(res => {
        setObjList(res);
        setObj(res[0]);
      })
      .catch(err => window.alert(err));
  }, [crudTable]);

  const submitUpdateHandler = async event => {
    let lastId = await databaseWrite.postCrudObjectToAPI(obj, crudTable);
    if (obj.id === 'NUEVO') {
      const nuevo = {...obj, id: lastId};
      setObj(nuevo);
      setObjList([...objList, nuevo]);
      setTimeout(() => document.querySelector('#crud-id-' + lastId).classList.add('crud-list-item-highlight'), 0);
      setTimeout(() => document.querySelector('#crud-id-' + lastId).classList.remove('crud-list-item-highlight'), 1000);
      dialogs.success('AGREGADO', {});
    } else {
      const index = objList.findIndex(e => e.id === obj.id);
      setObjList([...objList.slice(0, index), obj, ...objList.slice(index + 1)]);
      setTimeout(() => document.querySelector('#crud-id-' + obj.id).classList.add('crud-list-item-highlight'), 0);
      setTimeout(() => document.querySelector('#crud-id-' + obj.id).classList.remove('crud-list-item-highlight'), 1000);
      dialogs.success('ACTUALIZADO');
    }
  };

  const createHandler = event => {
    setObj({id: 'NUEVO'});
  };

  const liClickHandler = event => {
    const id = parseInt(event.target.dataset.id);
    if (id) {
      setObj(objList.find(element => element.id === id));
    }
  };

  const list = () => objList
    .filter(element => textFilter(element[filterCol], search))
    .map(element => (
      <li className='crud-list-item'
        id={'crud-id-' + element.id}
        data-id={element.id}
        key={element.id}>{element[filterCol]}
      </li>
    ));

  const inputs = () => cols[crudTable]
    .map((col, i) => InputFactory(col, coltypes[i], crudTable, obj[col], event => setObj({...obj, [col]: event.target.value})));

  return (
    <div className='crud-container'>
      <div className='crud-sidebar'>
        <InputSearch value={search} onChange={event => setSearch(event.target.value)} />
        <ul className='crud-list' onClick={liClickHandler} >
          {list()}
        </ul>
      </div>
      <div className='crud-main'>
        {inputs()}
        <button onClick={submitUpdateHandler}>ACTUALIZAR</button>
        <button onClick={createHandler}>CREAR NUEVA</button>
      </div>
    </div>
  );
}