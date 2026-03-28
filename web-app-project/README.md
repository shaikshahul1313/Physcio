# Web App Project

This project is a web application that consists of a Java backend and a React frontend. The backend is built using Spring Boot, while the frontend utilizes React along with HTML, CSS, and JavaScript to create an interactive user interface.

## Project Structure

```
web-app-project
├── backend
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── example
│   │   │   │           └── App.java
│   │   │   └── resources
│   │   └── test
│   │       └── java
│   ├── pom.xml
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── components
│   │   │   └── BodyModel.js
│   │   └── styles
│   │       └── App.css
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Java 11 or higher
- Node.js and npm

### Backend Setup

1. Navigate to the `backend` directory.
2. Build the project using Maven:
   ```
   mvn clean install
   ```
3. Run the application:
   ```
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

### Features

- A rotating 3D model of a body on the homepage, implemented using React and Three.js.
- A RESTful API provided by the Java backend.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License.