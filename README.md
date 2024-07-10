## CC Fusion Dashboard

## Overview
 CC Fusion Dashboard is a comprehensive application designed to manage billing, services, and client activities. 
 It provides a user-friendly interface to track invoices, payments, and customer activities. The project is divided into two main parts: the frontend and the backend.

## Frontend: Built with React and styled using Tailwind CSS.
## Backend: Developed with Node.js and Prisma, and data is fetched using GraphQL.

## Features
  - Dashboard: Provides an overview of invoices, payments, and activities.
  - Clients Management: Allows the management of client information.
  - Services Management: Facilitates the management of services offered.
  - Billing: Tracks and manages billing information.
  - Activity Feed: Displays recent activities such as sent invoices and received payments.

## Tech Stack
    Frontend:
    `React`
    `Tailwind CSS`
    `GraphQL`

    Backend:
    `Node.js`
    `Prisma`
    `GraphQL`

## Installation
    Prerequisites
    Node.js (v14 or above)
    npm or yarn
    PostgreSQL (or any database supported by Prisma)

## Backend Setup
    Clone the repository:
     `bash`
     `Copy code`
     `git clone https://github.com/your-username/cc-fusion-dashboard.git`
     `cd backend`

## Install dependencies:
     `bash`
    `Copy code`
    `npm install`
    
## Configure the database:

    Set up your PostgreSQL database and update the .env file.
    `env`
    `Copy code`
    `DATABASE_URL=""`
    `JWT_SECRET=""`
    `PORT=""`

## Run Prisma migrations:
    `bash`
    `Copy code`
    `npx prisma migrate dev`

## Start the backend server:
    `bash`
    `Copy code`
    `npm start

 ## Frontend Setup
    Navigate to the frontend folder:
    `bash`
    `Copy code`
    `cd ../frontend`

 ## Install dependencies:
    `bash`
    `Copy code`
    `npm install`

 ## Start the frontend development server:
      `bash`
      `Copy code`
      `npm start`

## Usage
    Once both the frontend and backend servers are running, open your browser and navigate to http://localhost:3000 to access the dashboard.

    Project Structure
    frontend: Contains the React application.
    src/components: Reusable React components.
    src/pages: Main pages of the application.
    src/styles: Tailwind CSS configuration.
    src/graphql: GraphQL queries and mutations.
    backend: Contains the Node.js and Prisma setup.
    src/schema: GraphQL schema and resolvers.
    prisma: Prisma schema and migrations.

 ## Contact
    For any questions or inquiries, please contact Alegbe Mojisola at alegbeyemi@gmail.com.

