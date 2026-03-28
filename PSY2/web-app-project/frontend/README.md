# Frontend Documentation

## Overview
This project is a web application that features a rotating 3D model of a body on the homepage. It is built using React for the frontend and Java with Spring Boot for the backend.

## Technologies Used
- **Frontend:**
  - React
  - JavaScript
  - HTML
  - CSS
  - Three.js (for 3D rendering)

- **Backend:**
  - Java
  - Spring Boot

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Java (version 11 or higher)
- Maven

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd web-app-project
   ```

2. Navigate to the frontend directory:
   ```
   cd frontend
   ```

3. Install the frontend dependencies:
   ```
   npm install
   ```

4. Navigate to the backend directory:
   ```
   cd ../backend
   ```

5. Install the backend dependencies:
   ```
   mvn install
   ```

### Running the Application

1. Start the backend server:
   ```
   mvn spring-boot:run
   ```

2. In a new terminal, navigate back to the frontend directory and start the React application:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and go to `http://localhost:3000` to view the application.

## Features
- A rotating 3D model of a body on the homepage.
- Responsive design for various screen sizes.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.