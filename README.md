# Interface Monitoring Application

A real-time interface monitoring system that tracks and manages integration logs with a modern React frontend and Node.js backend.

🌐 **Live Demo**: [https://interface-monitoring-application.onrender.com/](https://interface-monitoring-application.onrender.com/)


📂 **GitHub Repository**: [https://github.com/Jitugandhare/Interface-monitoring-application](https://github.com/Jitugandhare/Interface-monitoring-application)

## 🚀 Features

- **Real-time Dashboard**: Monitor interface integrations with live status updates
- **Comprehensive Logging**: Track success, failure, and warning states
- **Advanced Filtering**: Filter logs by status, interface name, and integration key
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Email Notifications**: Automatic failure alerts via email
- **Pagination**: Efficient log browsing with paginated results
- **Status Charts**: Visual representation of interface health

## 🏗️ Architecture

### Frontend (React + Vite)
- **Dashboard View**: Summary cards, status charts, and recent activity
- **Logs View**: Detailed logs with filtering and pagination
- **Responsive Layout**: Mobile-first design with sidebar navigation
- **Real-time Updates**: Automatic data refresh and status monitoring

### Backend (Node.js + Express)
- **RESTful API**: Clean endpoints for logs and summary data
- **MongoDB Integration**: Scalable data storage with Mongoose ODM
- **Email Service**: Automated failure notifications using Nodemailer
- **CORS Enabled**: Cross-origin resource sharing for frontend integration

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful and consistent icon library
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email sending functionality
- **Morgan** - HTTP request logger middleware

## 📁 Project Structure

```
interface-monitoring-app/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── common/       # Reusable UI components
│   │   │   ├── dashboard/    # Dashboard components
│   │   │   ├── layout/       # Layout components
│   │   │   └── logs/         # Logs components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   └── App.jsx           # Main application
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
├── backend/                  # Node.js backend application
│   ├── controllers/          # Route controllers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   └── index.js              # Server entry point
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Email service credentials (for notifications)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Backend Port
The backend runs on port 5000 by default. You can change this in the `.env` file.

### Frontend Proxy
The frontend is configured to proxy API requests to the backend. Update `vite.config.js` if you change the backend port:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000', 
    changeOrigin: true,
    secure: false,
  },
}
```

### Database
The application uses MongoDB. Make sure to:
- Set up a MongoDB database (local or cloud)
- Update the `MONGO_URI` in your `.env` file
- Ensure the database is accessible from your application

## 📊 API Endpoints

### Logs
- `GET /api/logs` - Get logs with filtering and pagination
- `POST /api/logs` - Create a new log entry
- `GET /api/logs/summary` - Get summary statistics

### Query Parameters
- `status` - Filter by status (Success, Failure, Warning)
- `interfaceName` - Filter by interface name
- `integrationKey` - Filter by integration key
- `page` - Page number for pagination
- `limit` - Number of results per page

## 🎨 UI Components

### Dashboard Components
- **Summary Cards**: Display total counts for each status
- **Status Chart**: Donut chart showing status distribution
- **Recent Logs**: Latest activity with status indicators

### Common Components
- **Button**: Reusable button with multiple variants
- **Badge**: Status indicators with color coding
- **Loading Spinner**: Loading states with accessibility
- **Pagination**: Navigation between log pages

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: Collapsible sidebar with touch-friendly controls
- **Tablet**: Optimized layout for medium screens
- **Desktop**: Full sidebar with enhanced navigation

## 🔒 Security Features

- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Server-side validation of all inputs
- **Error Handling**: Graceful error responses without data leakage

## 📧 Email Notifications

The system automatically sends email notifications when:
- Interface integrations fail
- Critical errors occur
- System status changes

Configure email settings in your `.env` file to enable notifications.



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your environment configuration
3. Ensure all dependencies are installed
4. Check MongoDB connection status

## 🔮 Future Enhancements

- Real-time WebSocket updates
- Advanced analytics and reporting
- User authentication and roles
- API rate limiting
- Performance monitoring
- Export functionality for logs

---

**Built with ❤️ using React, Node.js, and MongoDB**


