# Sara Events and Marketing Website

This project is a web application built for a Sara Events and Marketing . It leverages **Next.js**, **Tailwind CSS**, **Strapi CMS**, **GraphQL**, **PostgreSQL**, and **Docker** to deliver a scalable, responsive, and modern web experience.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
<!-- 7. [Deployment](#deployment) -->

---

### Project Overview

This project is designed to provide telecom customers with a seamless online experience. The site is built using **Next.js** for the frontend, **Strapi CMS** for content management, and a **PostgreSQL** database. The application integrates **GraphQL** to query and fetch data efficiently, and it is containerized using **Docker** for ease of deployment and scalability.

### Features

- **Responsive design** using Tailwind CSS
- **Content management** via Strapi CMS
- **GraphQL integration** for efficient data querying
- **PostgreSQL** as the database system
- **Docker** for containerized environments
- **Next.js** for server-side rendering and routing

### Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Strapi CMS, GraphQL, PostgreSQL
- **Database:** PostgreSQL
- **Containerization:** Docker

### Installation

1. Clone the repository:

   ```bash
   git clone https://gitlab.com/digital_addis/ethio_tele_frontend.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run Docker to start the environment:

   ```bash
   docker-compose up
   ```

4. Navigate to `http://localhost:3000` to access the frontend, and `http://localhost:1337` for Strapi CMS.

### Configuration

- **Database:**
  Set up the PostgreSQL database and update the connection settings in the Strapi CMS and Next.js configuration files.

  In `.env` files, make sure to provide correct values for:

  ```bash
  DATABASE_URL=
  GRAPHQL_ENDPOINT=
  ```

- **Strapi CMS:**
  Configure Strapi CMS by setting up content types and permissions according to the Sara Events and Marketing requirements.

### Usage

- To run the development environment:

  ```bash
  npm run dev
  ```

- For production:

  ```bash
  npm run build
  npm start
  ```

<!-- ### Deployment

This project can be deployed using Docker for consistency across different environments. The `docker-compose.yml` file is already set up to spin up all required services. -->

<!-- To deploy, make sure Docker is installed, and run:

```bash
docker-compose up --build
``` -->
