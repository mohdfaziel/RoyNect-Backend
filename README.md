# Beekeeper Backend API

A Node.js backend service providing e-commerce functionality including email notifications, shipping cost calculations, location services, and payment processing through Razorpay.

## Features

- **Email Service**: Send emails using Nodemailer with Gmail integration
- **Location Services**: City and state lookup by pincode using Delhivery API
- **Shipping Calculator**: Calculate shipping costs based on destination and weight
- **Payment Gateway**: Razorpay integration for order creation and payment validation
- **CORS Enabled**: Cross-origin resource sharing for frontend integration
- **Vercel Ready**: Configured for easy deployment on Vercel

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Email Service**: Nodemailer
- **Payment Gateway**: Razorpay
- **Shipping API**: Delhivery
- **Environment Management**: dotenv
- **CORS**: cors middleware

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mohdfaziel/Dawood-Beekeeper-Backend.git
cd Beekeeper-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```env
PORT=5000
DELHIVERY_API=your_delhivery_api_key
DELHIVERY_SHIPPING_URL=https://track.delhivery.com/api/kinko/v1/invoice/charges/.json
NODEMAILER_EMAIL=your_gmail_address
NODEMAILER_PASS=your_gmail_app_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. Start the development server:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your environment variables).

## API Endpoints

### Health Check
- **GET** `/`
  - Returns server status message

### Email Service
- **POST** `/sendEmail`
  - Send emails via Gmail
  - **Body Parameters**:
    - `to`: Recipient email address
    - `subject`: Email subject
    - `html`: Email content in HTML format

### Location Services
- **GET** `/api/city-state`
  - Get city and state information by pincode
  - **Query Parameters**:
    - `pincode`: 6-digit postal code

### Shipping Services
- **GET** `/api/shipping-cost`
  - Calculate shipping cost based on destination and weight
  - **Query Parameters**:
    - `dest_pincode`: Destination pincode
    - `weight`: Package weight in kg

### Payment Services
- **POST** `/api/order`
  - Create a new Razorpay order
  - **Body Parameters**: Razorpay order options object

- **POST** `/api/order/validate`
  - Validate Razorpay payment signature
  - **Body Parameters**:
    - `razorpay_order_id`: Order ID from Razorpay
    - `razorpay_payment_id`: Payment ID from Razorpay
    - `razorpay_signature`: Payment signature for verification

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (defaults to 5000) |
| `DELHIVERY_API` | Delhivery API key for shipping services | Yes |
| `DELHIVERY_SHIPPING_URL` | Delhivery shipping API endpoint | Yes |
| `NODEMAILER_EMAIL` | Gmail address for sending emails | Yes |
| `NODEMAILER_PASS` | Gmail app password | Yes |
| `RAZORPAY_KEY_ID` | Razorpay key ID | Yes |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret | Yes |

## Deployment

### Vercel Deployment

This project is configured for Vercel deployment with the included `vercel.json` file.

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Set environment variables in your Vercel dashboard or using Vercel CLI:
```bash
vercel env add DELHIVERY_API
vercel env add NODEMAILER_EMAIL
# ... add other environment variables
```

## Dependencies

- **express**: Web framework for Node.js
- **nodemailer**: Email sending library
- **razorpay**: Payment gateway SDK
- **cors**: CORS middleware
- **dotenv**: Environment variable management
- **crypto**: Built-in Node.js crypto module for signature validation
- **nodemon**: Development dependency for auto-restart

## Security Features

- Environment variables for sensitive data
- Razorpay signature validation for payment security
- CORS configuration for controlled cross-origin requests
- Secure email authentication with app passwords

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email your contact information or create an issue in the GitHub repository.

---

**Note**: Make sure to keep your environment variables secure and never commit them to version control. Use environment-specific configuration for different deployment environments.
