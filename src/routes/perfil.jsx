import React from 'react';

const perfil = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="text-center">
          <img src="https://via.placeholder.com/150" alt="Imagen de perfil" className="mx-auto rounded-full h-24 w-24 mb-4" />
          <h1 className="text-2xl font-semibold">Nombre del Usuario</h1>
          <p className="text-gray-500">@nombredeusuario</p>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Información Personal</h2>
            <p><strong>Nombre:</strong> Nombre del Usuario</p>
            <p><strong>Email:</strong> usuario@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default perfil;
