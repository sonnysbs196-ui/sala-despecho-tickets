# Sala De Despecho - Sistema de Tickets & QR

Una plataforma moderna para vender tickets de eventos con bebidas incluidas. Sistema seguro con códigos QR únicos y verificación en tiempo real.

**Evento:** Sala De Despecho Vol. 11 "Ni Tan Santx… Ni Tan Tontx"  
**Fecha:** Viernes 17 de Abril de 2026, 6:00 PM  
**Lugar:** Simmons Bar, Holborn, London

---

## 🎯 Características Principales

✅ **Bundling de Tickets + Bebidas**
- Cada ticket incluye una bebida (cerveza, botella, o 2 bebidas)
- Elimina completamente el riesgo de gasto mínimo en el bar
- Aumenta el valor percibido sin parecer upsell

✅ **Sistema QR Seguro**
- Código QR único por ticket
- Válido solo una vez
- Verificación instantánea en la base de datos
- Sin fraude, sin bebidas duplicadas

✅ **Pago con Stripe**
- Comisión baja: 1.4% + 20p (vs. 10% en Fatsoma)
- Múltiples métodos: Tarjeta, Apple Pay, Google Pay
- Confirmación instantánea por email

✅ **Dashboard para Bartenders**
- Escaneo de códigos QR en teléfono
- Sin aplicación que descargar (web app)
- Validación instantánea: verde (sirve) o rojo (inválido)

✅ **Base de Datos Escalable**
- PostgreSQL para máxima confiabilidad
- GDPR compliant
- Historial de redención

---

## 🚀 Quick Start

### Demo en Vivo (sin instalación)

1. Descarga `demo.html`
2. Abre en cualquier navegador
3. Explora la interfaz completa

```bash
open demo.html
```

### Desarrollo Local (React/Next.js)

#### Requisitos
- Node.js 18+
- npm o yarn

#### Instalación

```bash
# Clone el repositorio
git clone <tu-repo>
cd sala-despecho

# Instala dependencias
npm install

# Instala Tailwind (si usas Next.js)
npm install -D tailwindcss postcss autoprefixer

# Inicia el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del Proyecto

```
sala-despecho/
├── index.jsx              # Componente React principal
├── demo.html              # Demo standalone (sin build)
├── pages/
│   ├── index.js           # Página de inicio
│   ├── checkout.js        # Página de checkout
│   └── api/
│       ├── tickets.js     # Crear tickets
│       ├── redeem.js      # Validar/redimir QR
│       └── webhooks.js    # Webhooks de Stripe
├── components/
│   ├── TicketSelector.jsx
│   ├── CheckoutForm.jsx
│   └── QRScanner.jsx
├── lib/
│   ├── stripe.js
│   ├── database.js
│   └── qrcode.js
├── public/
│   └── assets/
├── styles/
│   └── globals.css
├── .env.local            # Variables de entorno
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## ⚙️ Configuración

### 1. Variables de Entorno

Crea `.env.local`:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sala_despecho

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Setup de Base de Datos

```bash
# Crea la base de datos PostgreSQL
psql -U postgres -c "CREATE DATABASE sala_despecho;"

# Ejecuta migraciones (si usas Prisma)
npx prisma migrate dev --name init
```

### 3. Configuración de Stripe

1. Ve a [stripe.com/dashboard](https://dashboard.stripe.com)
2. Obtén tus claves de prueba (Test Mode)
3. Configura webhooks para `payment_intent.succeeded`

---

## 💰 Opciones de Tickets

Ajusta estos precios según el costo real de las bebidas en tu bar:

| Nombre | Ticket Base | Bebida | Total | Ahorro |
|--------|-------------|--------|-------|--------|
| Grito Sagrado | £16.50 | Cerveza (£5.50) | **£22** | £2 |
| Redención Final | £16.50 | Botella (£8) | **£28** | £3.50 |
| Alma Libre | £16.50 | 2 Bebidas (£11) | **£32** | £4.50 |

*Los precios son ejemplos. Ajusta según los costos reales del bar.*

---

## 📊 Flujo de Pago

```
Cliente                Stripe              Tu App                Base de Datos
   |                    |                     |                      |
   |--checkout-------->|                     |                      |
   |                    |--crear pago------->|                      |
   |                    |                     |--generar QR-------->|
   |                    |                     |<--QR creado---------|
   |                    |<--éxito------------|                      |
   |<--confirmación-----|                     |                      |
   |                    |                     |--enviar email------>|
   |                    |                     |                      |
```

---

## 🔐 Sistema QR de Verificación

### En el Cliente
1. Compra ticket (pago con Stripe)
2. Recibe email con QR único
3. Llega al evento y muestra QR

### En la Barra
1. Bartender abre app de escaneo
2. Escanea código QR
3. App valida:
   - ¿Código válido en DB?
   - ¿Ya fue usado?
4. Respuesta: **✓ VERDE (sirve bebida)** o **✗ ROJO (inválido)**

### Base de Datos
```sql
-- Tabla tickets
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    stripe_payment_id VARCHAR UNIQUE,
    qr_code_hash VARCHAR UNIQUE NOT NULL,
    ticket_type VARCHAR NOT NULL, -- 'beer', 'bottle', 'double'
    price INT NOT NULL,
    customer_email VARCHAR NOT NULL,
    redeemed BOOLEAN DEFAULT FALSE,
    redeemed_at TIMESTAMP,
    redeemed_by VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎨 Customización

### Cambiar Colores
Edita `tailwind.config.js` o variables CSS:

```js
theme: {
    colors: {
        primary: '#your-color',
        accent: '#your-accent',
    }
}
```

### Cambiar Información del Evento
Actualiza en `index.jsx` o variables de entorno:

```jsx
const eventDate = '2026-04-17';
const eventName = 'Sala De Despecho Vol. 11';
const venue = 'Simmons Bar, Holborn';
```

---

## 📱 Responsive Design

✅ Mobile-first  
✅ Tablet optimizado  
✅ Desktop full experience  

Testeado en:
- iOS Safari
- Android Chrome
- Desktop (Chrome, Firefox, Safari)

---

## 🚢 Deployment

### Vercel (Recomendado para Next.js)

```bash
# Instala Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Alternativas

- **Railway**: PostgreSQL + Node.js en un lugar
- **Supabase**: PostgreSQL + API auto-generada + Hosting
- **Render**: Simple, gratuito hasta cierto punto

---

## 📈 Análisis & Métricas

### Dashboard Admin (futuro)
```
- Tickets vendidos (total y por tipo)
- Ingresos en tiempo real
- QRs redimidos vs pendientes
- Tasa de no-show
- Ingresos del bar (beverage tracking)
```

---

## 🐛 Troubleshooting

### "Error: QB code inválido"
→ Código ya fue usado o no existe en DB  
→ Revisa `redeemed = TRUE` en tabla tickets

### "Stripe webhook no funciona"
→ Revisa que `STRIPE_WEBHOOK_SECRET` sea correcto  
→ Verifica que el endpoint esté publicado correctamente

### "QR no genera"
→ Revisa que `qrcode` npm package esté instalado  
→ Confirma que `qr_code_hash` sea único

---

## 📞 Soporte

Para preguntas o issues:
1. Abre un GitHub Issue
2. Incluye detalles del error
3. Adjunta logs si es posible

---

## 📄 Licencia

MIT - Siéntete libre de usar, modificar y compartir.

---

## 🎉 Siguiente Pasos

1. **Fork o clone** este repositorio
2. **Configura variables de entorno** (.env.local)
3. **Instala dependencias** (npm install)
4. **Inicia servidor** (npm run dev)
5. **Customiza** según tus necesidades
6. **Deploy** cuando esté listo

---

**Creado para Sala De Despecho UK**  
Vístete de inocencia… aunque estés lista para dedicarle una de Paquita. 🕊️
