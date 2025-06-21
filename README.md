      
# Product Management App

A simple Next.js application demonstrating product submission and display functionalities. It features a clean, tabbed interface built with Shadcn UI, robust form handling with React Hook Form and Zod for validation, and user feedback via Sonner toasts.

## Screenshots

![Product Add Form Screenshot](./public/Screenshot1.png)  

![Products Gallery Screenshot](./public/Screenshot2.png)  

![Database Exemplar Screenshot](./public/Screenshot3.png)  

## Features

*   **Product Submission:**
    *   Dedicated form to add new products.
    *   Fields: Name, Price, Description, Image URL (optional).
    *   Client-side validation using Zod for robust error handling.
    *   Loading state indication during submission.
*   **Product Gallery:**
    *   Displays submitted products.
    *   (Functionality like editing would be future enhancements).
*   **Tabbed Interface:**
    *   Easily switch between the "Product Submission" form and the "My Products" gallery.
    *   Active tab indication, designed to work well in both light and dark modes.
*   **Notifications:**
    *   User-friendly toast notifications (via Sonner) for successful submissions or errors.
*   **Styling:**
    *   Modern UI built with [Shadcn UI](https://ui.shadcn.com/) components.
    *   Responsive design.
    *   Utilizes Tailwind CSS for utility-first styling.
*   **Contextual Search:**
    *   Using mistral api to understand and interpret user queries in a conversational manne.
    *   Suggest the most relevant items according to user needs
    *   Has the ability to fall back to word search if api fails.

## Tech Stack

*   **Frontend:**
    *   [Next.js](https://nextjs.org/) (App Router)
    *   [React](https://reactjs.org/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Shadcn UI](https://ui.shadcn.com/) (for UI components like Tabs, Button, Input, Form, Textarea)
    *   [React Hook Form](https://react-hook-form.com/) (for form management)
    *   [Zod](https://zod.dev/) (for schema validation)
    *   [Lucide React](https://lucide.dev/) (for icons)
    *   [Sonner](https://sonner.emilkowal.ski/) (for toast notifications)
    *   [Axios](https://axios-http.com/) (for HTTP requests)
    *   [Tailwind CSS](https://tailwindcss.com/)
*   **Backend:**
    *   The application expects an API endpoint at `/api/products` to handle `POST` requests for new product submissions. This could be a Next.js API Route or a separate backend service.

## Prerequisites

*   Next.js (v15.x or later)
*   Node.js (v18.x or later recommended)
*   npm, yarn, or pnpm

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/SecondMikasa/geer-intern-assignment.git
    cd ./geer-intern-assignment
    ```

2.  **Install dependencies:**

    Install require packages in both frontend and backend via navigating to that folder
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Ensure Backend API is Running:**

    This project relies on an API endpoint at `/api/products` and `/api/product` to handle product submissions and product display.

5. **Initialise Prisma**
    
    ```
    npx prisma init
    ```

6. **Set up PostreSql**   

    Go to pgAdmin4, create a new database under the name you like

7. **Define the DATABASE URL**

    We need to specify the database connection string for the project in environment variable file
    ```
    DATABASE_URL = "postgresql://(nameOfUser):(yourPassword)@localhost:5432/(nameOfDatabase)?schema=public"
    ```

8. **Connect ORM To Database**

    Type the following to set up prisma connection to your database

    ```
    npx prisma migrate dev --name init
    ```

9. **Starting the website**

    For running the website locally, type the following 
    ```
    pnpm run dev
    ```

## Key Components Overview

*   **`ProductTabs.tsx`:**
    *   Manages the active tab state ("submission" or "products").
    *   Handles the `products` array state and passes it down to `ProductGallery`.
    *   Passes `onProductSubmit` callback to `ProductSubmitForm` to update the products list.
*   **`(sections)/products-submit-form.tsx`:**
    *   Uses `react-hook-form` and `zodResolver` for form state management and validation.
    *   Defines the form schema (`formSchema`) using Zod.
    *   Handles form submission, makes an API call to `/api/products` using Axios.
    *   Shows loading states and toast notifications.
*   **`(sections)/products-gallery.tsx`:**
    *   Renders the list of `products`.
    *   Handles displaying product information like name, price, image.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

