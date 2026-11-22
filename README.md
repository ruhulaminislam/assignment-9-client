# SalonBook — Salon Appointment Booking Platform

A full-stack salon appointment booking platform where users can explore salon services, book appointments, manage their bookings, and make online payments. Administrators can manage services, appointments, users, and transactions through a dedicated dashboard.

## 🌐 Project Links

- **Live Website:** https://assignment-nine-client-omega.vercel.app
- **Client Repository:** https://github.com/ruhulaminislam/assignment-9-client
- **Server Repository:** https://github.com/ruhulaminislam/assignment-9-server
- **Backend API:** https://assignment-nine-server-beta.vercel.app/

## ✨ Key Features

### 👤 User Features
- User registration and login.
- Google authentication.
- Browse available salon services.
- View detailed service information.
- Book appointments by selecting a date and time slot.
- View personal appointments.
- Cancel eligible pending appointments.
- Manage personal profile information.
- Complete appointment payments through Stripe.

### 🛠️ Admin Features
- Admin dashboard for managing the platform.
- Add, update, and delete salon services.
- Activate or deactivate services.
- Manage user accounts.
- Block and unblock users.
- Manage appointment statuses.
- View transaction information.
- Update admin profile information.

### 💳 Payment Features
- Stripe Checkout integration.
- Secure payment verification through the backend.
- Stripe webhook integration.
- Transaction records stored in MongoDB.
- Appointment payment status updated after successful payment.

### 🔐 Authentication & Access Control
- Better Auth authentication.
- Email and password authentication.
- Google OAuth authentication.
- Role-based access for users and administrators.
- Blocked-user access restrictions.
- Protected dashboard and API operations.

## 🧰 Technology Stack

| Category | Technologies |
|---|---|
| Framework | Next.js 16 |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Authentication | Better Auth |
| Database | MongoDB |
| Payment | Stripe |
| Icons | Lucide React |
| Charts | Recharts |
| Hosting | Vercel |

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- npm
- Git
- MongoDB connection
- Stripe account
- Google OAuth credentials

### 1. Clone the repository

```bash
git clone https://github.com/ruhulaminislam/assignment-9-client.git

cd assignment-9-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root.

```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_SERVER_URL=http://localhost:5000

MONGODB_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

STRIPE_SECRET_KEY=your_stripe_secret_key
```

**Important:** Keep `MONGODB_URI`, `STRIPE_SECRET_KEY`, `BETTER_AUTH_SECRET`, and `GOOGLE_CLIENT_SECRET` server-side only. Never expose secret values through client-side code or a `NEXT_PUBLIC_` variable.

### 4. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Build for production

```bash
npm run build
```

## 🔗 Backend Connection

The frontend communicates with the backend API through:

```env
NEXT_PUBLIC_SERVER_URL=https://assignment-nine-server-beta.vercel.app
```

Make sure the backend server is deployed and accessible before testing the application.

## 🚀 Deployment

The frontend is designed to be deployed on Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Set `NEXT_PUBLIC_SERVER_URL` to the deployed backend URL.
5. Deploy the application.

## 👨‍💻 Author

**Md. Ruhul Amin**

- GitHub: https://github.com/ruhulaminislam
