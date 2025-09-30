# 🚀 FreelanceHub - Complete Freelancer.com Clone

A comprehensive freelancing platform built with React, Node.js, and MongoDB, featuring all the advanced functionality of Freelancer.com.

## ✨ Features

### 🎯 **Core Features**
- **User Authentication & Authorization** - Secure login/signup with JWT
- **Project Management** - Post, browse, and manage projects
- **Freelancer Discovery** - Advanced search and filtering
- **Real-time Messaging** - Built-in chat system
- **Payment & Escrow** - Secure payment processing with escrow protection
- **Reviews & Ratings** - Comprehensive review system
- **User Verification** - Multi-level verification system
- **Analytics Dashboard** - Detailed insights and reporting

### 🔧 **Advanced Features**

#### **Enhanced Project Posting**
- Project type selection (Fixed Price vs Hourly Rate)
- Experience level requirements (Entry, Intermediate, Expert)
- Project duration options
- Skills requirement system with auto-suggestions
- Project visibility settings (Public/Private)
- Milestone-based payments
- Auto-accept proposals
- Timezone support
- File attachments

#### **Smart Search & Filtering**
- Advanced search with multiple criteria
- Filter by budget, skills, location, experience level
- Sort by relevance, budget, deadline, newest
- Saved searches and alerts
- AI-powered matching algorithm

#### **Payment & Escrow System**
- Secure escrow protection
- Multiple payment methods (Credit Card, PayPal, Bank Transfer)
- Milestone-based payments
- Dispute resolution system
- Automatic payment release
- Fee calculation and transparency

#### **Real-time Communication**
- Instant messaging between clients and freelancers
- File sharing capabilities
- Message reactions and replies
- Online status indicators
- Message search and history
- Push notifications

#### **User Verification**
- Identity verification with government ID
- Phone number verification
- Email verification
- Payment method verification
- Portfolio verification
- Skills assessment and certification

#### **Analytics & Reporting**
- Project analytics and insights
- Earnings tracking and projections
- Performance metrics
- Client feedback analysis
- Revenue trends and forecasting

### 📱 **Mobile Responsive**
- Touch-friendly interface
- Mobile-optimized navigation
- Swipe gestures for freelancer profiles
- Responsive design for all screen sizes
- Mobile push notifications

## 🛠️ **Technology Stack**

### **Frontend**
- **React 18** - Modern UI library
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing

### **Additional Tools**
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling
- **Nodemailer** - Email services
- **Socket.io** - Real-time communication (ready for implementation)

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Loveable-main
   ```

2. **Install backend dependencies**
   ```bash
   cd my-backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../src
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file in my-backend directory
   touch my-backend/.env
   ```
   
   Add the following to `my-backend/.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/freelancehub
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   CLIENT_URL=http://localhost:5173
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   ```

5. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd my-backend
   npm start
   ```

7. **Start the frontend development server**
   ```bash
   cd src
   npm run dev
   ```

8. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 **Project Structure**

```
Loveable-main/
├── my-backend/                 # Backend API
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── server.js             # Main server file
│   └── package.json
├── src/                      # Frontend React app
│   ├── Components/           # Reusable components
│   ├── Pages/               # Page components
│   ├── api.js              # API service functions
│   ├── data/               # Static data files
│   └── App.jsx             # Main app component
└── README.md
```

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token

### **Projects**
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### **Freelancers**
- `GET /api/freelancers/top` - Get top freelancers
- `GET /api/freelancers/category/:category` - Get freelancers by category
- `GET /api/freelancers/:id` - Get freelancer profile

### **Skills**
- `GET /api/skills` - Get all skills
- `GET /api/skills/popular` - Get popular skills
- `GET /api/skills/category/:category` - Get skills by category
- `POST /api/skills` - Create new skill (admin)

### **Proposals**
- `GET /api/proposals/project/:projectId` - Get project proposals
- `POST /api/proposals` - Submit proposal
- `PUT /api/proposals/:id/status` - Update proposal status
- `GET /api/proposals/freelancer/:freelancerId` - Get freelancer proposals

### **Messages**
- `GET /api/messages/conversations` - Get user conversations
- `GET /api/messages/conversation/:userId` - Get conversation messages
- `POST /api/messages` - Send message
- `PUT /api/messages/read` - Mark messages as read

### **Payments**
- `POST /api/payments/create` - Create payment
- `POST /api/payments/:id/process` - Process payment
- `POST /api/payments/:id/release` - Release payment
- `GET /api/payments` - Get user payments

### **Verification**
- `POST /api/verification/submit` - Submit verification
- `GET /api/verification` - Get user verifications
- `PUT /api/verification/:id` - Update verification
- `GET /api/verification/stats/summary` - Get verification stats

### **Dashboard**
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/projects/recent` - Get recent projects
- `GET /api/dashboard/messages/recent` - Get recent messages
- `GET /api/dashboard/analytics/earnings` - Get earnings analytics

## 🎨 **UI Components**

### **Core Components**
- `Navigation` - Main navigation bar with mobile support
- `Dashboard` - Analytics and overview dashboard
- `ProjectCard` - Project display component
- `AdvancedSearch` - Advanced search and filtering
- `Messaging` - Real-time chat interface
- `PaymentModal` - Payment creation and management
- `VerificationCenter` - User verification interface

### **Pages**
- `HireFreelancer` - Project posting and freelancer selection
- `ProjectListings` - Browse and search projects
- `FreelancerProfile` - Individual freelancer profiles
- `ExploreCategories` - Category-based browsing
- `Reviews` - Review and rating system

## 🔒 **Security Features**

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt password encryption
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Server-side data validation
- **Rate Limiting** - API request rate limiting (ready for implementation)
- **File Upload Security** - Secure file handling
- **SQL Injection Protection** - MongoDB query sanitization

## 📊 **Database Models**

### **User Model**
- Personal information
- Skills and expertise
- Verification status
- Rating and reviews
- Portfolio items

### **Project Model**
- Project details and requirements
- Budget and timeline
- Skills required
- Client information
- Status tracking

### **Payment Model**
- Escrow management
- Milestone tracking
- Fee calculation
- Dispute handling
- Transaction history

### **Message Model**
- Real-time messaging
- File attachments
- Message status
- Conversation threading

### **Verification Model**
- Identity verification
- Document management
- Review process
- Status tracking

## 🚀 **Deployment**

### **Backend Deployment**
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to Heroku, AWS, or similar platform
4. Set up SSL certificate

### **Frontend Deployment**
1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or similar platform
3. Configure environment variables
4. Set up custom domain

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 **License**

This project is licensed under the MIT License.

## 🆘 **Support**

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 **Future Enhancements**

- **Video Calling** - Integrated video communication
- **AI Matching** - Machine learning-based project matching
- **Mobile App** - React Native mobile application
- **Advanced Analytics** - More detailed reporting
- **Multi-language Support** - Internationalization
- **Blockchain Integration** - Cryptocurrency payments
- **Advanced Security** - Two-factor authentication
- **Performance Optimization** - Caching and CDN

---

**Built with ❤️ by the FreelanceHub Team**