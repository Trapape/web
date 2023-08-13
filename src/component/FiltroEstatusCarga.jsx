import React, { useState } from "react";
import { Filter } from "react-feather";

function panelFiltros({ isActive }) {
    return (
        <>
            {isActive
                ? (
                    <div className="mx-auto mt-2 w-full border-[1px] rounded-lg p-3">
                        <div className="mb-6">
                            <label className="block mb-2 text-center text-sm font-medium text-gray-900">Fecha de recoleccci&oacute;n</label>
                            <input type="date" className="block w-full text-sm p-1.5 text-center text-gray-900 border border-gray-300 rounded-lg bg-white" />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-center text-sm font-medium text-gray-900">Fecha de entrega</label>
                            <input type="date" className="block w-full text-sm p-1.5 text-center text-gray-900 border border-gray-300 rounded-lg bg-white" />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-center text-sm font-medium text-gray-900">Tipo de carga</label>
                            <select className="bg-white border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-center text-sm font-medium text-gray-900">Tipo de unidad</label>
                            <select className="bg-white border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-center text-sm font-medium text-gray-900">Precio</label>
                            <input type="text" className="bg-white text-sm block w-full text-gray-900 border text-center border-gray-300 rounded-lg p-1.5" />
                        </div>
                        <div>
                            <button type="button" className="w-full font-medium text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                Buscar
                            </button>
                        </div>
                    </div>
                )
                : (
                    <div></div>
                )
            }

        </>
    );
};

export default function FiltroEstatusCarga() {
    const [isActive, setActive] = useState(true);
    return (
        <>
            <button onClick={() => setActive(!isActive)} className=" text-white w-auto h-auto bg-blue-700 hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm mx-3 px-2">
                <span>
                    <Filter width={12} />
                </span>
            </button>
            <panelFiltros isActive={isActive} />
        </>
    );
};