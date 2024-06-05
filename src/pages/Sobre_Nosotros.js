import React from 'react'
import '../styles/Sobre_Nosotros.css';

function Bienvenida() {

  return (
    <div className='home'>
        <div className='about'>
        <h2>Bienvenidos a Hotel Tranquilidad</h2>
          <div className='prompt '> <p>
          En el corazón de la vibrante ciudad, el Hotel Tranquilidad ofrece una experiencia única donde el confort se encuentra con la elegancia clásica. 
          Desde 1998, nos hemos dedicado a proporcionar una estancia excepcional a cada uno de nuestros huéspedes, 
          combinando el lujo moderno con un servicio personalizado que hace que cada visita sea inolvidable.
          </p>
                      
                        <p className='curriculum'>
                        Nuestro hotel no es solo un lugar para dormir, sino un destino en sí mismo. 
                        Ofrecemos una variedad de instalaciones que incluyen un spa de servicio completo, una piscina climatizada, 
                        un gimnasio moderno y múltiples opciones gastronómicas donde puedes disfrutar desde cocina gourmet hasta platos locales auténticos.
                         Cada uno de nuestros espacios está diseñado pensando en su comodidad y placer.
                        </p>
                      
                        </div>
        </div>
        <div className='skills'>
          <h1>Nuestro Compromiso</h1>
          <ol className='list'>
            <li className='item'>
              <h2>Ubicación Central: Situado en el corazón de la ciudad, cercano a principales atracciones turísticas, zonas comerciales y centros de negocios.</h2>
              <h2>Confort y Lujo: Habitaciones y suites elegantes y espaciosas, con todas las comodidades modernas y vistas panorámicas de la ciudad.</h2>
              <h2>Experiencia Gastronómica: Restaurantes y bares exclusivos que ofrecen una amplia selección de platos locales e internacionales.</h2>
              <h2>Spa y Bienestar: Un oasis de relajación y rejuvenecimiento, con tratamientos de belleza y masajes personalizados.</h2>
            </li>
          </ol>
        </div>
    </div>
 
  )
}

export default Bienvenida