import React, { useState } from "react";
import { LogOut } from "react-feather";

const NavbarTrapape = () => {
   return (
      <>
         <nav className="fixed w-full top-0 z-50 bg-blue-800 shadow-lg">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
               <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                     <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                           <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                     <div className="flex flex-shrink-0 items-center">
                        <p className="text-white uppercase text-xl">Trapape</p>
                     </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                     <div className="relative ml-3">
                        <div>
                           <button type="button" className="flex items-center rounded-xl p-2 bg-white text-blue-800 text-sm" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                              <span className="mr-1">
                                    <LogOut width={14} />
                                </span>
                              Cerrar Sesi&oacute;n
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
};

export default NavbarTrapape;