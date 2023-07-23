import React from "react";
import {
  Info, Package, Truck, Tool,
  DollarSign, Watch, Navigation, AlertCircle,
  Feather, Maximize2, ShoppingBag, Box,
  CheckCircle, XCircle
} from "react-feather";
import Maps from '../component/Maps';
import { green, red } from "@mui/material/colors";

const formatCurrency = (number) => {
  return number.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN'
  })
};

const infoCarga = ({ carga }) => {
  return (
    <>
      <div className="basis-1/2 p-3 md:basis-1/2 sm:basis-full xs:basis-full ys:basis-full">
        <div className="divide-y divide-blue-500 shadow-md h-full rounded-xl bg-white">
          <div className="p-5">
            <h3 className="text-xl">
              Informaci&oacute;n General
            </h3>
          </div>
          <ul role="list" className="list-inside divide-y divide-gray-100">
            <li>
              <div className="flex flex-col p-5">
                <div>
                  <p className="text-sm">
                    {carga.IdLoad}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    <span className="inline-block align-middle mr-1">
                      <Info width={12} />
                    </span>
                    Id
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col p-5">
                <div>
                  <p className="text-sm">
                    {carga.tipoCarga}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    <span className="inline-block align-middle mr-1">
                      <Package width={12} />
                    </span>
                    Tipo de Carga
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col p-5">
                <div>
                  <p className="text-sm">
                    {carga.numRemolques}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    <span className="inline-block align-middle mr-1">
                      <Tool width={12} />
                    </span>
                    Configuraci&oacute;n
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col p-5">
                <div>
                  <p className="text-sm">
                    {carga.tipoUnidad}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    <span className="inline-block align-middle mr-1">
                      <Truck width={12} />
                    </span>
                    Tipo Unidad
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col p-5">
                <div>
                  <p className="text-sm">
                    {formatCurrency(carga.precioViaje)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    <span className="inline-block align-middle mr-1">
                      <DollarSign width={12} />
                    </span>
                    Precio
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col p-5">
                <div>
                  <p className="text-sm">
                    {carga.distanciaKM} Kms.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    <span className="inline-block align-middle mr-1">
                      <Navigation width={12} />
                    </span>
                    Distancia
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex flex-col p-5">
                <div>
                  <p className="text-sm">
                    {carga.tiempoRuta} Hrs.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    <span className="inline-block align-middle mr-1">
                      <Watch width={12} />
                    </span>
                    Tiempo Estimado
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="basis-1/2 p-3 md:basis-1/2 sm:basis-full xs:basis-full ys:basis-full">
        <div className="divide-y divide-blue-500 shadow-md h-full rounded-xl bg-white">
          <div className="p-5">
            <h3 className="text-xl">
              Ubicaci&oacute;n
            </h3>
          </div>
          <div className="p-5">
            <Maps apiKey={"AIzaSyBs-iRGy4GQdnqmLrDqMSV8sIcraM9kXl4"} />
          </div>
        </div>
      </div>
      <div className="p-3 w-full">
        <div className="divide-y divide-blue-500 shadow-md h-full rounded-xl bg-white">
          <div className="p-5">
            <h3 className="text-xl">
              Datos Adicionales
            </h3>
          </div>
          <div className="flex flex-row divide-x divide-gray-100 md:flex-row sm:flex-col xs:flex-col ys:flex-col">
            <div className="basis-1/3 p-5 ">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Fotograf&iacute;as
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {
                      carga.fotos
                        ?
                        <CheckCircle width={24} color="#22A699" />
                        :
                        <XCircle width={24} color="#B31312" />
                    }
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Refrigerado
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {
                      carga.cargaRefrigerada
                        ?
                        <CheckCircle width={24} color="#22A699" />
                        :
                        <XCircle width={24} color="#B31312" />
                    }
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Maneja con Cuidado
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {
                      carga.recomenManejoCuidado
                        ?
                        <CheckCircle width={24} color="#22A699" />
                        :
                        <XCircle width={24} color="#B31312" />
                    }
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Mantener Seco
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {
                      carga.recomenMantenerSeco
                        ?
                        <CheckCircle width={24} color="#22A699" />
                        :
                        <XCircle width={24} color="#B31312" />
                    }
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Carga Fr&aacute;gil
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {
                      carga.recomenFragil
                        ?
                        <CheckCircle width={24} color="#22A699" />
                        :
                        <XCircle width={24} color="#B31312" />
                    }
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    No Estibar
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {
                      carga.recomenEstibar
                        ?
                        <CheckCircle width={24} color="#22A699" />
                        :
                        <XCircle width={24} color="#B31312" />
                    }
                  </dd>
                </div>
              </dl>
            </div>
            <div className="basis-1/3 p-5 ">
              <h6>Remolque 1</h6>
              {
                !carga.remolque.uno
                  ? <p className="mt-5 text-gray-400">
                    <span className="inline-block align-middle mr-1">
                      <AlertCircle width={14} />
                    </span>
                    No existe informaci&oacute;n para este remolque
                  </p>
                  : <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <span className="inline-block align-middle mr-1">
                          <Feather width={14} />
                        </span>
                        Peso
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {carga.remolque.uno.peso}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <span className="inline-block align-middle mr-1">
                          <Maximize2 width={14} />
                        </span>
                        Dimensiones
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Alto: {carga.remolque.uno.alto}
                        <br />
                        Ancho: {carga.remolque.uno.ancho}
                        <br />
                        Largo: {carga.remolque.uno.largo}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <span className="inline-block align-middle mr-1">
                          <ShoppingBag width={14} />
                        </span>
                        N&uacute;mero
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {carga.remolque.uno.piezas}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <span className="inline-block align-middle mr-1">
                          <Box width={14} />
                        </span>
                        Embalaje
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {carga.remolque.uno.embalaje}
                      </dd>
                    </div>
                  </dl>
              }
            </div>
            <div className="basis-1/3 p-5 ">
              <h6>Remolque 2</h6>
              {
                !carga.remolque.dos
                  ? <p className="mt-5 text-gray-400">
                    <span className="inline-block align-middle mr-1">
                      <AlertCircle width={14} />
                    </span>
                    No existe informaci&oacute;n para este remolque
                  </p>
                  : <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <span className="inline-block align-middle mr-1">
                          <Feather width={14} />
                        </span>
                        Peso
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {carga.remolque.uno.peso}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <span className="inline-block align-middle mr-1">
                          <Maximize2 width={14} />
                        </span>
                        Dimensiones
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Alto: {carga.remolque.uno.alto}
                        <br />
                        Ancho: {carga.remolque.uno.ancho}
                        <br />
                        Largo: {carga.remolque.uno.largo}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <span className="inline-block align-middle mr-1">
                          <ShoppingBag width={14} />
                        </span>
                        N&uacute;mero
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {carga.remolque.uno.piezas}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        <span className="inline-block align-middle mr-1">
                          <Box width={14} />
                        </span>
                        Embalaje
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {carga.remolque.uno.embalaje}
                      </dd>
                    </div>
                  </dl>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default infoCarga;