import Custom from '~/components/Custom';
import Developers from '~/components/Developers';
import PrivacyPolices from '~/components/PrivacyPolices';

export default function Settings() {
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <h1 className="text-h1 font-semibold mb-4 text-textDark">Settings</h1>
        <div className="custom">
          <Custom />
        </div>
        <div className="security">
          <h2 className="text-h2 font-semibold mb-4 text-gray-900">
            Seguridad y privacidad
          </h2>
          {/* fake */}
          <button className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md mb-6 transition-colors">
            Cerrar sesión en todos los dispositivos
          </button>
        </div>
        <div className="privacy">
          <PrivacyPolices />
        </div>

        <div className="aboutUs">
          <h2 className="text-h2 font-semibold mb-4 text-gray-900">
            Sobre nosotros
          </h2>
          <Developers />
        </div>
      </div>
    </>
  );
}
