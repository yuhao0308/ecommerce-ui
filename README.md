# E-Commerce UI

Frontend React application for the E-Commerce platform.

## Overview

This is the customer-facing frontend for the E-Commerce platform. It provides a responsive UI for browsing products, managing shopping carts, and placing orders.

**Live Demo**: [https://web-production-52db.up.railway.app/](https://web-production-52db.up.railway.app/)

**Backend Repository**: [E-Commerce API](https://github.com/yuhao0308/ecommerce-api)

## Tech Stack

- React
- React Router for navigation
- Context API for state management
- CSS for styling

## Features

- Browse products by category
- Product search functionality
- Product detail view
- Shopping cart management
- User authentication (signup/login)
- Checkout process
- Order history

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- API backend running (see ecommerce-api README)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ecommerce-ui
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variable:
```
REACT_APP_API_URL=http://localhost:4000
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── Components/        # Reusable UI components
├── Context/           # React Context providers
├── Pages/             # Application pages
├── utils/             # Utility functions
├── App.js             # Main component
├── config.js          # Configuration settings
└── index.js           # Application entry point
```

## Pages

- **Home**: Featured products and categories
- **Shop**: All products with filtering options
- **ProductDetail**: Individual product information
- **Cart**: Shopping cart management
- **Checkout**: Order placement process
- **Login/Signup**: User authentication
- **UserProfile**: User information and order history

## State Management

The application uses React Context API for global state management:

- **AuthContext**: Manages user authentication state
- **CartContext**: Manages shopping cart items and operations
- **ThemeContext**: Manages UI theme preferences

## Building for Production

```bash
npm run build
```

This will create a `build` directory with production-optimized build files.

## Deployment

The UI is deployed on Railway. For deployment:

1. Create a Railway account
2. Create a new project
3. Connect your GitHub repository
4. Set up environment variables
5. Configure build command: `npm run build`
6. Configure start command: `npm start`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

## License

MIT License
