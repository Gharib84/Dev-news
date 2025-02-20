# Dev.to Article Explorer

Dev.to Article Explorer is a lightweight Angular application that allows users to browse and read programming-related articles and posts from the Dev.to platform in a clean and modern interface. It integrates seamlessly with Firebase for user authentication and data management.

## Features

- Fetch and display articles and posts from the Dev.to API
- User authentication via Firebase (e.g., email/password, Google sign-in)
- Responsive and visually appealing design

## Technologies Used

- Angular (version 13)
- Dev.to API
- Firebase (for authentication and database)
- Tailwind CSS (for styling)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Gharib84/Dev-news.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd project-Directory
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up Firebase**:
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable authentication (e.g., email/password, Google sign-in).
   - Add your Firebase configuration to `src/environments/environment.ts` and `environment.prod.ts`.

## Usage

- **Run the development server**:
   ```bash
   ng serve
   ```
- Open your browser and navigate to `http://localhost:4200`.
- **Build for production**:
   ```bash
   ng build --prod
   ```

## Configuration

The application uses environment variables for configuration. Update the following in `src/environments/environment.ts` and `environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  },
  devtoApiUrl: "https://dev.to/api/articles"
};
```

- Replace the placeholders in `firebaseConfig` with your actual Firebase project configuration.
- The `devtoApiUrl` is set to the public Dev.to API endpoint for fetching articles and posts. No API key is required for basic read operations.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, features, or improvements.

## License

This project is licensed under the MIT License.

## Acknowledgements

Thanks to the Dev.to team for providing the API, and to the Angular and Firebase communities for their excellent documentation and support.

- **Project Name**: Feel free to replace "Dev.to Article Explorer" with your preferred project name.
- **Username**: Replace `yourusername` in the clone command with your actual GitHub username or organization.
- **Angular Version**: This README assumes Angular 13. Update it to match your project's version if different.
- **Firebase Purpose**: Firebase is assumed to be used for authentication. Adjust this if it serves another purpose (e.g., Firestore for data storage).
- **Styling**: Tailwind CSS is included as an assumption. Replace it with your actual styling framework or library if different.

This README provides a clear overview of your project, including setup instructions and key details, making it easy for others to understand and use your application. Let me know if you'd like any adjustments!