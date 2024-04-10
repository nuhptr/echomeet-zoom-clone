Echomeet is a web app which clone zoom for better experience. It is built using Next.js, Tailwind CSS, Clerk, and stream.io

## Getting Started

-   Delete the env.example become .env only

## Using the shadcn-ui

-   npx shadcn-ui@latest init (for initializing the shadcn-ui)
-   npx shadcn-ui@latest add [component-name] (for adding the shadcn-ui component)
    ```text
    -  npx shadcn-ui@latest add button
    -  npx shadcn-ui@latest add sheet
    -  npx shadcn-ui@latest add dialog
    -  npx shadcn-ui@latest add toast
    -  npx shadcn-ui@latest add dropdown-menu
    -  npx shadcn-ui@latest add textarea
    ```

## Global Dependencies

-   [react-datepicker](https://reactdatepicker.com/) - bun install react-datepicker
-   [@types/react-datepicker] - bun install @types/react-datepicker

## Setup Stream Video SDK

-   Open the [stream](https://getstream.io/) website and create an account. Then open the video audio product
-   bun/npm add @stream-io/video-react-sdk
-   Create provider folder and setup client & calls
-   create actions folder, server file and install package `@stream-io/node-sdk`
-   wrap (root) layout with <StreamVideoProvider></StreamVideoProvider>

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
