import React from "react";
import { User, Truck, Upload, Map, ShoppingBag, DollarSign, Clock, Phone, PlusCircle } from "react-feather";
import { useNavigate } from "react-router-dom";

const SidebarTrapape = () => {
    let navigate = useNavigate();

    return (
        <>
            <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 sm:translate-x-0 bg-blue-500">
                <div className="h-full px-3 pb-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a onClick={() => navigate('/perfil')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group hover:shadow-md">
                                <span className="inline-block align-middle mr-1">
                                    <User width={18} />
                                </span>
                                <span className="ml-3">Perfil</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/cargas')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group hover:shadow-md">
                                <span className="inline-block align-middle mr-1">
                                    <Truck width={18} />
                                </span>
                                <span className="ml-3">Cargas</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/cargaNueva')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group hover:shadow-md">
                                <span className="inline-block align-middle mr-1">
                                    <PlusCircle width={18} />
                                </span>
                                <span className="ml-3">Nueva Carga</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/cargasMasivas')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group hover:shadow-md">
                                <span className="inline-block align-middle mr-1">
                                    <Upload width={18} />
                                </span>
                                <span className="ml-3">Cargas Masivas</span>
                            </a>
                        </li>
                        
                        {/* 
                        
                        <li>
                            <a onClick={() => navigate('/cargas')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group hover:shadow-md">
                                <span className="inline-block align-middle mr-1">
                                    <ShoppingBag width={18} />
                                </span>
                                <span className="ml-3">Ofertas</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/cargas')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group hover:shadow-md">
                                <span className="inline-block align-middle mr-1">
                                    <DollarSign width={18} />
                                </span>
                                <span className="ml-3">Historial</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/cargas')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group hover:shadow-md">
                                <span className="inline-block align-middle mr-1">
                                    <Clock width={18} />
                                </span>
                                <span className="ml-3">Preferencias</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/cargas')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group hover:shadow-md">
                                <span className="inline-block align-middle mr-1">
                                    <Phone width={18} />
                                </span>
                                <span className="ml-3">Contacto</span>
                            </a>
                        </li>
                        */}
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default SidebarTrapape;