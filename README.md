# Travel Booking System

The Travel Booking System is a web application that allows users to browse, book, and manage travel packages seamlessly. This project includes a user-friendly interface for travelers to explore packages and make bookings while providing administrators with the ability to manage package details.

---

## Features

### User Features

- **Browse Packages**: View a list of travel packages with details such as title, price, available dates, and images.
- **Book Packages**: Fill out a form with personal details and confirm booking.
- **Generate Invoice**: After booking, generate an invoice as a downloadable PDF.

### Administrative Features

- **Manage Packages**: Add, update, or delete travel packages from the backend.
- **Track Bookings**: View and manage user bookings.

---

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **Tailwind CSS**: For responsive and modern styling.
- **React Router**: For managing navigation between pages.

### Backend

- **Node.js**: For server-side logic.
- **Express.js**: To handle API routes.
- **MongoDB**: For storing package and booking details.
- **Axios**: For making HTTP requests.

### Additional Tools

- **jsPDF**: To generate and download invoices as PDF.
- **Lucide Icons**: For adding modern and consistent icons.

---

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- MongoDB instance running locally or remotely

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/nimeshmali/travel-booking-system.git
   cd travel-booking-system
   ```

2. **Navigate to Backend and Frontend Folders**:

   ```bash
   cd backend
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `backend` folder and add the following:

   ```env
   MONGO_URL=<your-mongodb-uri>
   ```

4. **Install Dependencies**:
   Perform `npm install` in both `frontend` and `backend` folders:

   ```bash
   # In backend folder
   npm install

   # In frontend folder
   cd ../frontend
   npm install
   ```

5. **Run the Backend**:

   ```bash
   cd ../backend
   nodemon index.js
   ```

6. **Run the Frontend**:

   ```bash
   cd ../frontend
   npm run dev
   ```

7. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

---

## How to Use

1. **Explore Travel Packages**: View available travel packages on the homepage.
2. **Book a Package**:
   - Click on a package to view details.
   - Fill out the booking form with required details.
   - Confirm booking to generate an invoice.
3. **Download Invoice**: After booking, the invoice is displayed and available for download as a PDF.
4. **Authentication**: Authentication is hardcoded; you can log in using any random email and password to access the app.

---

## Contact

For any queries or suggestions, please reach out to malinimesh03@gmail.com.
