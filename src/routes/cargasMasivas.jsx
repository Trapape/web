import React, { useState } from "react";
import SideNavTrapape from "../component/SideNavTrapape";
import { Check, XCircle, AlertCircle } from "react-feather";
import CargaValida from "../component/DetalleCargasMasivas/CargaValida";
import SubirCargasMasivas from "../component/SubirCargasMasivas";
import DescargarMachote from "../component/DescargarMachote";
import CargaErronea from "../component/DetalleCargasMasivas/CargaErronea";


const CargasMasivas = () => {
    const [cargaValidaData, setCargaValidaData] = useState([]);
    const [cargaInValidaData, setCargaInValidaData] = useState([]);

    // Función para actualizar los datos cuando llegan
    const actualizarCargaValidaData = (nuevosDatos) => {
        setCargaValidaData(nuevosDatos);
        setCargaInValidaData(nuevosDatos);
    };

    return (
        <>
            <SideNavTrapape />
            <div className="p-4 sm:ml-64">
                <div className="mt-14 m-4">
                    <div className="w-full p-4">
                        <h1 className="text-left text-blue-800 uppercase text-xl">Cargas Masivas</h1>
                    </div>
                    <div className="w-full p-3">
                        <div className="grid grid-cols-3 gap-4 rounded-lg">
                            <div className="p-4 divide-y shadow-lg rounded-lg">
                                <SubirCargasMasivas actualizarCargaValidaData={actualizarCargaValidaData} />
                                <DescargarMachote />
                            </div>
                            <div className="col-span-2 flex flex-col">
                                <div className="h-96 shadow-lg rounded-lg p-4">
                                    <h3 className="flex w-full">
                                        <span className="mr-1">
                                            <Check width={20} color="#22A699" />
                                        </span>
                                        Cargas Validas
                                    </h3>
                                    <div className="h-72 overflow-y-scroll mt-3 p-2">
                                        <CargaValida data={cargaValidaData} />
                                    </div>
                                    <p className="mt-3 text-sm text-gray-400">Total: 5</p>
                                </div>
                                <div className="w-full h-96 shadow-lg rounded-lg mt-3 p-4">
                                    <h3 className="flex w-full">
                                        <span className="mr-1">
                                            <XCircle width={20} color="#B31312" />
                                        </span>
                                        Cargas Err&oacute;neas
                                    </h3>
                                    <div className="h-72 overflow-y-scroll mt-3 p-4">
                                        <CargaErronea data={cargaInValidaData} />
                                    </div>
                                    <p className="mt-3 text-sm text-gray-400">Total: 0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CargasMasivas;