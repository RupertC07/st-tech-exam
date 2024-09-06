
# MINI HRS

## Overview
The mini HR system is a streamlined application designed to facilitate HR tasks. It allows HR personnel to perform CRUD operations on employee data, monitor key summaries for analytics, and manage login functionality for secure access. This system enhances HR efficiency by providing a centralized platform for data management and insights.

## Main Functionalities
- **Sign In:** HR personnel can securely sign in to the system.
- **Create Employee:** Allows HR to add new employee entries.
- **Update Employee:** HR can edit and update employee details.
- **Remove Employee:** HR can soft delete employee records while preserving the data.
- **View Employee:** HR can view individual employee profiles.
- **Search Employee:** HR can search for employees based on various criteria.
- **Dashboard Summary:** Provides a dashboard for monitoring and analyzing key employee data.


## Tech Stack & Tools
- **Backend:** Laravel
- **Database:** MySQL
- **Frontend:** Vite, React.js
- **Styling:** Tailwind CSS, Daisy UI

## Installation and Setup

### Requirements
Before setting up the application, ensure that you have the following requirements installed on your system:
- **PHP 8.1:** Ensure that PHP 8.1 or later is installed on your system.
- - **NODE 20:** Ensure that PHP NODE 20.15 or later is installed on your system.
- **XAMPP/Laragon:** Set up XAMPP or Laragon to serve as your local development environment for the database.
- **Composer:** Make sure Composer is installed on your system to manage PHP dependencies.
- - **Node:** Make sure Node is installed on your system to manage frontend  dependencies.

### Installation Steps
Follow these steps to install and set up the application:

1. **Clone the Repository:**

    ```shell
    git clone https://github.com/RupertC07/st-tech-exam
    

2. **Navigate to Project Directory:**
   
    ```shell
    cd st-tech-exam
    

3. **Install Dependencies:**
   
    ```shell
    composer install
    npm install 

4.  **After Installation Configure Environment Variables:**
    On project directory you will find .env.example copy it and remove '.example'
    On the database part, please ensure that it will be reflected based on your credentials and ip.
    
       ```shell
           
            DB_CONNECTION=mysql
            DB_HOST=127.0.0.1
            DB_PORT=3306
            DB_DATABASE=your databasename
            DB_USERNAME=your database username
            DB_PASSWORD=your database/server password
           API_BASE_URL=http://127.0.0.1:8000/api
           APP_URL=http://127.0.0.1:8000
       
6. **Set Up Your Database Server:**
    Start your Laragon or Xampp
    
7. **Migrate All the Tables from Project Directory:**

   Though laravel has the capability to create database, it's safe to ensure that you already creayed a database for this project.
    run this to your cmd/bash. Note: Ensure that You already created the database to avoid error

    ```shell
        php artisan migrate

8. **Seed the Database with Admin Credentials:**

   After migrating the tables, you can seed the database with initial admin credentials by running the following command. Note: Ensure that you've already created the database to avoid errors.

   ```shell
       php artisan db:seed
9. **(Optional) Seed the Database with Sample Employee Data:**

   If you want the database to be pre-populated with sample employee data, run the following command:

   ```shell
       php artisan db:seed --class=EmployeeSeeder

10. **Start the server:**

    run this 

    ```shell
    php artisan serve
    npm run dev //on the separate terminal

### Aight! Our project setup is done!


## HR System Access

1. Go to the application URL specified in your `.env` file (`APP_URL`).
2. Log in using the default admin credentials:

   - **Email:** admin@example.com
   - **Password:** password
     
---
Enjoy the app! I am open to collaboration and discussion to further improve this project. Feel free to reach out!

    
