import { format as dateFormat } from 'date-fns';
import React from 'react';
import Pago from '../pagos/Pago';

export default function FacturaView ({obj, setObj}) {
  if (!obj.NUMERO_FACTURA) {
    return <div />;
  } else {
    return (
      <div className='factura-view__container'>
        <section className='factura-view__detalles'>
          <p className='tabla-view__detalle tabla-view__numero'>
            N° de Factura: {obj.NUMERO_FACTURA}
          </p>
          <p className='tabla-view__detalle tabla-view__fecha'>
            Fecha: {dateFormat(new Date(obj.FECHA_HORA), 'dd/MM/yyyy | HH:mm:ss')}
          </p>
          <p className='tabla-view__detalle tabla-view__cliente'>
            Cliente: {obj.CLIENTE.NOMBRE}
          </p>
          <p className='tabla-view__detalle tabla-view__vendedor'>
            Vendedor: {obj.VENDEDOR.NOMBRE}
          </p>
          <p className='tabla-view__detalle tabla-view__descuento'>
            Descuento: {obj.DESCUENTO}
          </p>
          <p className='tabla-view__detalle tabla-view__observaciones'>
            Observaciones: {obj.OBSERVACIONES}
          </p>
        </section>
        <section className='factura-view__items'>
          <table className='tabla-view__tabla'>
            <thead className='tabla-view__tabla-head'>
              <tr className='tabla-view__tabla-head-row'>
                <th className='tabla-view__tabla-head-cell'>CODIGO</th>
                <th className='tabla-view__tabla-head-cell'>DESCRIPCION</th>
                <th className='tabla-view__tabla-head-cell'>CANT</th>
                <th className='tabla-view__tabla-head-cell'>PRECIO</th>
                <th className='tabla-view__tabla-head-cell'>TOTAL</th>
                <th className='tabla-view__tabla-head-cell'>DESC</th>
              </tr>
            </thead>
            <tbody className='tabla-view__tabla-body'>
              {obj.ITEMS.map(item => (
                <tr key={item.CODIGO}>
                  <td className='tabla-view__tabla-body-cell'>{item.CODIGO}</td>
                  <td className='tabla-view__tabla-body-cell'>{item.DESCRIPCION}</td>
                  <td className='tabla-view__tabla-body-cell'>{item.CANTIDAD}</td>
                  <td className='tabla-view__tabla-body-cell'>{item.PRECIO_UNITARIO}</td>
                  <td className='tabla-view__tabla-body-cell'>{item.PRECIO_TOTAL}</td>
                  <td className='tabla-view__tabla-body-cell'>{item.DESCUENTO_ITEM}</td>
                </tr>)
              )}
            </tbody>
            <tfoot className='tabla-view__tabla-foot'>
              <tr className='tabla-view__tabla-foot-row'>
                <th className='tabla-view__tabla-foot-cell' colSpan='3' />
                <th className='tabla-view__tabla-foot-cell'>TOTAL: </th>
                <th className='tabla-view__tabla-foot-cell'>{obj.ITEMS.reduce((suma, item) => suma + item.PRECIO_TOTAL, 0)}</th>
              </tr>
            </tfoot>
          </table>
        </section>
        {obj.PAGOS.length > 0 &&
        <section className='factura-view__pagos'>
          {obj.PAGOS.map(pago => <Pago key={pago.id + '_' + pago.TIPO_PAGO.id + '_' + pago.ESTADO.id} pago={pago} />)}
        </section>
        }
      </div>
    );
  }
}
