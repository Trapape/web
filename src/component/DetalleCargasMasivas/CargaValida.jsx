import { Package, ChevronsRight } from "react-feather";

const CargaValida = () => {
    return (
        <ul className="divide-y divide-gray-200">
            <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <Package width={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate uppercase">
                            tylt
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            Cordoba, Ver.
                            <span className="inline-flex align-middle text-gray-500 px-1">
                                <ChevronsRight width={16} />
                            </span>
                            Xalapa, Ver.
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        <span className="mr-1 text-gray-500 font-normal text-sm">Precio: </span>$100
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <Package width={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate uppercase">
                            interland
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            Cordoba, Ver.
                            <span className="inline-flex align-middle text-gray-500 px-1">
                                <ChevronsRight width={16} />
                            </span>
                            Xalapa, Ver.
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        <span className="mr-1 text-gray-500 font-normal text-sm">Precio: </span>$200
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <Package width={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate uppercase">
                            valtis
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            Cordoba, Ver.
                            <span className="inline-flex align-middle text-gray-500 px-1">
                                <ChevronsRight width={16} />
                            </span>
                            Xalapa, Ver.
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        <span className="mr-1 text-gray-500 font-normal text-sm">Precio: </span>$300
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <Package width={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate uppercase">
                            tubos y barras
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            Cordoba, Ver.
                            <span className="inline-flex align-middle text-gray-500 px-1">
                                <ChevronsRight width={16} />
                            </span>
                            Xalapa, Ver.
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        <span className="mr-1 text-gray-500 font-normal text-sm">Precio: </span>$400
                    </div>
                </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <Package width={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate uppercase">
                            merkabat
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            Cordoba, Ver.
                            <span className="inline-flex align-middle text-gray-500 px-1">
                                <ChevronsRight width={16} />
                            </span>
                            Xalapa, Ver.
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        <span className="mr-1 text-gray-500 font-normal text-sm">Precio: </span>$500
                    </div>
                </div>
            </li>
        </ul>
    );

};

export default CargaValida;