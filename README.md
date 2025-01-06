```markdown
multiservice-nodejs-application-using-docker-and-ec2 instance
# Multi-Service Blog Platform

A **Multi-Service Blog Platform** built with **Node.js**, **Express**, **Docker**, and **AWS**. This platform is composed of three distinct services:

- **User Service:** Handles user authentication and profile management.
- **Blog Service:** Manages blog posts with support for pagination.
- **Comment Service:** Manages comments on blog posts.

Each service is containerized using Docker and orchestrated with Docker Compose, ensuring a scalable and maintainable architecture. The platform is designed for easy deployment on AWS, leveraging Amazon EC2 and Amazon RDS for robust performance and reliability.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment on AWS](#deployment-on-aws)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Registration and Authentication:** Secure user registration and login using JWT and bcrypt for password hashing.
- **Blog Management:** Create, read, update, and delete blog posts with pagination support.
- **Comment Management:** Add and retrieve comments for blog posts.
- **Containerization:** Each service is containerized using Docker for consistency across environments.
- **Orchestration:** Docker Compose manages multiple containers seamlessly.
- **Scalability:** Designed to handle increasing loads with ease.
- **Secure Deployment:** Deployable on AWS with HTTPS support for secure communication.
- **API Documentation:** Comprehensive API documentation available via Swagger.

## Technologies Used

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose
- **Cloud Deployment:** AWS EC2, Amazon RDS
- **Authentication:** JWT, bcrypt
- **Documentation:** Swagger

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Git:** To clone the repository. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- **Docker:** To build and run containers. [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose:** To orchestrate multi-container Docker applications. [Install Docker Compose](https://docs.docker.com/compose/install/)
- **AWS Account:** For deploying the application to AWS. [Sign Up for AWS](https://aws.amazon.com/)
- **Domain Name:** (Optional) For accessing your application via a custom domain.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository:**

   ```bash
   git clone (https://github.com/HarshitGoyal12/multiservice-nodejs-application-using-docker-and-ec2-.git)
   cd multi-service-blog-platform
Set Up Database Initialization:

The init.sql script initializes the database schemas and tables. Ensure it's executed when the PostgreSQL container starts. This is handled automatically by Docker Compose.

Create .env Files:

Each service requires environment variables. Create .env files based on the provided .env.example templates.

--User Service:
cd user-service
cp .env.example .env
nano .env
Update .env:
PORT=3000
DATABASE_URL=postgresql://user:password@db:5432/blogdb?currentSchema=users
JWT_SECRET=your_jwt_secret

--Blog Service:
cd ../blog-service
cp .env.example .env
nano .env
Update .env:
PORT=3001
DATABASE_URL=postgresql://user:password@db:5432/blogdb?currentSchema=blogs
JWT_SECRET=your_jwt_secret


--Comment Service:
cd ../comment-service
cp .env.example .env
nano .env
PORT=3002
DATABASE_URL=postgresql://user:password@db:5432/blogdb?currentSchema=comments
JWT_SECRET=your_jwt_secret



```
