# DevOps Microservice

A Spring Boot microservice developed as part of the **DevOps & Cloud Automation Internship**. The project demonstrates modern DevOps practices including containerization, Continuous Integration (CI), and Infrastructure as Code (IaC).

## Project Overview

This project implements a RESTful Employee Management microservice using Spring Boot. The application is containerized using Docker and integrated with GitHub Actions for automated CI workflows.

## Features

- Employee REST API
- Spring Boot application
- PostgreSQL database
- Docker containerization
- Docker Compose for multi-container deployment
- GitHub Actions CI workflow
- Maven build automation

## Technologies Used

- Java 21
- Spring Boot
- Maven
- PostgreSQL
- Docker
- Docker Compose
- GitHub Actions
- Git
- IntelliJ IDEA

## Project Structure

```
devops-microservice
│── src/
│── .github/workflows/
│── Dockerfile
│── docker-compose.yml
│── pom.xml
│── application.properties
│── README.md
```

## REST API

### Get All Employees

```
GET /employees
```

Sample Response

```json
[
  {
    "id": 1,
    "name": "Abhiram",
    "department": "CSE",
    "salary": 50000
  }
]
```

## Running the Project

Clone the repository:

```bash
git clone https://github.com/ABHIRAM-afk/devops-microservice.git
```

Navigate to the project:

```bash
cd devops-microservice
```

Run using Docker Compose:

```bash
docker-compose up --build
```

Access the API:

```
http://localhost:8080/employees
```

## GitHub Actions

The project uses GitHub Actions to automate the Maven build process whenever code is pushed to the repository.

## Author

**G. Abhiram Teja**

DevOps & Cloud Automation Internship
