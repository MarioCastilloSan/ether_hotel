
# Hotel Booking DApp

Este proyecto es una aplicación descentralizada (DApp) de reserva de habitaciones de hotel utilizando contratos inteligentes en Ethereum. 

## Requisitos

- Node.js (v12.x o superior)
- Ganache
- Truffle
- Metamask

## Configuración del Proyecto

### 1. Clonar el Repositorio

```bash
git clone https://github.com/usuario/mi-repo.git
cd mi-repo
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Ganache

1. Descarga e instala [Ganache](https://www.trufflesuite.com/ganache).
2. Inicia Ganache y crea una nueva red de blockchain personal.
3. Anota la dirección RPC, normalmente `http://127.0.0.1:7545`.

### 4. Configurar Truffle

Crea un archivo `truffle-config.js` en el directorio raíz del proyecto y agrega la siguiente configuración:

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Ganache port (default: none)
      network_id: "*",       // Any network (default: none)
    },
  },

  compilers: {
    solc: {
      version: "0.8.13",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
```

### 5. Desplegar el Contrato

```bash
npx truffle migrate --network development
```

### 6. Configurar Metamask

1. Instala la extensión Metamask en tu navegador.
2. Conéctate a la red Ganache:
   - Red: `http://127.0.0.1:7545`
   - Chain ID: `1337` (u otro según la configuración de Ganache)

### 7. Iniciar la Aplicación

```bash
npm start
```

## Uso de la DApp

### Funcionalidades

1. **Reserva de Habitaciones**:
   - Selecciona una habitación de la lista.
   - Elige las fechas de inicio y fin de la reserva.
   - Si tienes un código de descuento válido, ingrésalo para obtener un 50% de descuento.
   - Confirma la reserva y realiza el pago con ETH.

2. **Cancelación de Reservas**:
   - Si has realizado una reserva, puedes cancelarla desde la misma interfaz.

### Descuento

- **Código de Descuento**: `DISCOUNT50`
  - Aplica un descuento del 50% al precio total de la reserva.

## Estructura del Proyecto

- `contracts/HotelBooking.sol`: Contrato inteligente de reserva de hotel.
- `migrations/`: Scripts de migración para desplegar contratos.
- `src/`: Código fuente de la aplicación React.
  - `pages/ProjectDisplay.js`: Página principal para la visualización y reserva de habitaciones.
  - `blockchain/web3.js`: Configuración de Web3 para interactuar con el contrato inteligente.

## Contribuir

1. Fork el repositorio.
2. Crea una nueva rama (`git checkout -b feature/mi-feature`).
3. Realiza tus cambios (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature/mi-feature`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la MIT License.
