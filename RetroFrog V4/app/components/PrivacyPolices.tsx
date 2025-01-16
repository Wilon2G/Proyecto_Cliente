import { useState } from 'react';
import { ButtonAction } from './Buttons';
import { useLoaderData } from '@remix-run/react';
import { themeChanges } from '~/root';
import { changeThemeColor } from '~/utils/themeColors';

function PrivacyPolices() {
  const data = useLoaderData<themeChanges>();
  const theme = data?.theme;
  const colors = changeThemeColor(theme || 'dark');

  const { primaryBg, textColor } = colors;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="dropdown h-fit">
      <ButtonAction
        textBtn="Revisar nuestras políticas de privacidad"
        onClick={toggleDropdown}
        className="text-2xl font-semibold mt-1 mb-1 transition-colors "
        textColor={'#e6e6e6'}
        textColorHover={'#f3f4f6'}
      />

      <div
        style={{ background: primaryBg, color: textColor }}
        className={`dropdown-content p-6 rounded-lg shadow-lg 
                  duration-300 ease-in-out overflow-scroll overflow-x-hidden text-left
                    ${isOpen ? ' opacity-100 h-96' : 'scale-y-0 h-0'}`}
      >
        <p className="mb-4">
          En RetroFrog, nos tomamos muy en serio la privacidad de nuestros
          usuarios. Esta política de privacidad tiene como objetivo informarle
          sobre cómo recopilamos, usamos, protegemos y compartimos su
          información personal al utilizar nuestros servicios. Al acceder a
          nuestro sitio web o realizar compras en nuestra tienda, acepta los
          términos de esta política.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          1. Información que Recopilamos
        </h3>
        <p>
          Recopilamos información personal de nuestros usuarios de diversas
          maneras, incluyendo cuando visitan nuestro sitio web, realizan compras
          o interactúan con nuestros servicios. Los tipos de información que
          recopilamos incluyen:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Información Personal Identificable:</strong> nombre,
            dirección de correo electrónico, dirección de envío, número de
            teléfono, etc.
          </li>
          <li>
            <strong>Información de Pago:</strong> detalles de la tarjeta de
            crédito, PayPal u otros métodos de pago utilizados.
          </li>
          <li>
            <strong>Datos de Navegación:</strong> dirección IP, tipo de
            navegador, páginas visitadas, tiempo de permanencia en nuestro
            sitio, etc.
          </li>
          <li>
            <strong>Cookies y Tecnologías de Seguimiento:</strong> utilizamos
            cookies y tecnologías similares para mejorar la experiencia del
            usuario, personalizar el contenido y analizar el tráfico del sitio.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">2. Uso de la Información</h3>
        <p>Utilizamos la información recopilada para los siguientes fines:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Procesar y completar sus pedidos de videojuegos y otros productos.
          </li>
          <li>
            Enviar confirmaciones de pedido, notificaciones y actualizaciones
            sobre su cuenta o compras.
          </li>
          <li>
            Mejorar nuestro sitio web y personalizar la experiencia de compra.
          </li>
          <li>
            Responder a preguntas, comentarios o solicitudes de soporte al
            cliente.
          </li>
          <li>
            Envío de boletines informativos, promociones y novedades de
            RetroFrog (si usted lo ha permitido).
          </li>
          <li>
            Realizar análisis estadísticos sobre el uso del sitio y las
            preferencias del usuario para mejorar nuestros servicios.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          3. Compartir Información con Terceros
        </h3>
        <p>
          No compartimos su información personal con terceros, excepto en los
          siguientes casos:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Proveedores de Servicios:</strong> compartimos su
            información con proveedores de servicios de pago, servicios de envío
            y otros socios que nos ayudan a operar nuestro negocio, siempre que
            estos proveedores se comprometan a proteger su información.
          </li>
          <li>
            <strong>Cumplimiento Legal:</strong> podemos divulgar su información
            si es requerido por la ley o en respuesta a una solicitud válida de
            una autoridad gubernamental o judicial.
          </li>
          <li>
            <strong>Transferencias de Negocios:</strong> en caso de fusión,
            adquisición o venta de RetroFrog, su información personal puede ser
            transferida como parte de la transacción, pero siempre bajo las
            condiciones de privacidad acordadas.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          4. Seguridad de la Información
        </h3>
        <p>
          RetroFrog implementa medidas de seguridad físicas, electrónicas y
          administrativas para proteger su información personal contra accesos
          no autorizados, alteración, divulgación o destrucción. Sin embargo,
          ningún sistema de transmisión de datos por Internet o almacenamiento
          electrónico es 100% seguro, por lo que no podemos garantizar la
          seguridad absoluta.
        </p>

        <h3 className="text-xl font-semibold mb-2">5. Sus Derechos</h3>
        <p>
          Usted tiene derecho a acceder, corregir o eliminar la información
          personal que tenemos sobre usted. También puede solicitar que dejemos
          de enviarle comunicaciones de marketing en cualquier momento. Para
          ejercer estos derechos, por favor, contacte con nosotros a través de
          la información proporcionada al final de esta política.
        </p>

        <h3 className="text-xl font-semibold mb-2">6. Uso de Cookies</h3>
        <p>
          Las cookies son pequeños archivos que se almacenan en su dispositivo
          cuando visita nuestro sitio web. Usamos cookies para mejorar la
          experiencia del usuario, realizar análisis y personalizar el
          contenido. Puede configurar su navegador para rechazar las cookies,
          pero algunas funcionalidades del sitio pueden no estar disponibles si
          lo hace.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          7. Enlaces a Otros Sitios
        </h3>
        <p>
          Este sitio web puede contener enlaces a otros sitios de terceros. No
          somos responsables de las prácticas de privacidad ni del contenido de
          estos sitios. Le recomendamos que revise las políticas de privacidad
          de los sitios de terceros antes de proporcionarles cualquier
          información personal.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          8. Cambios en la Política de Privacidad
        </h3>
        <p>
          RetroFrog se reserva el derecho de actualizar esta política de
          privacidad en cualquier momento. Cualquier cambio será publicado en
          esta página con la fecha de la última actualización. Le recomendamos
          que revise esta política periódicamente para estar informado sobre
          cómo protegemos su información.
        </p>

        <h3 className="text-xl font-semibold mb-2">9. Contacto</h3>
        <p>
          Si tiene alguna pregunta sobre esta política de privacidad o sobre
          cómo manejamos su información personal, no dude en contactarnos:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Email:{' '}
            <a
              href="mailto:support@retrofrog.com"
              className="text-blue-400 hover:text-blue-600"
            >
              support@retrofrog.com
            </a>
          </li>
          <li>Teléfono: 123-456-789</li>
          <li>Dirección: Calle Retro 123, Ciudad, Madrid</li>
        </ul>

        <p>
          Fecha de la última actualización:{' '}
          <strong>8 de diciembre de 2024</strong>
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolices;
