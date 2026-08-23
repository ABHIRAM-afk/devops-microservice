# Employee Management System — DevOps Microservice Application

A full-stack **Employee Management System** built with **React, Spring Boot, PostgreSQL, Docker, and Kubernetes**. The project demonstrates how a backend application can be containerized and deployed using Kubernetes while maintaining persistent database storage and externalized configuration.

## About

The application provides a web-based interface for managing employee information such as:

* Employee name
* Department
* Salary
* Employee ID

The frontend communicates with a Spring Boot REST API, while the backend stores employee data in PostgreSQL.

The application is also containerized using Docker and deployed to a local Kubernetes cluster using Docker Desktop with **kind**.

---

# Architecture

```text
                         EMPLOYEE MANAGEMENT SYSTEM
                                  │
                                  │
                    ┌─────────────▼─────────────┐
                    │      React + Vite         │
                    │        Frontend           │
                    │       Port: 5173          │
                    └─────────────┬─────────────┘
                                  │
                              REST API
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │      Spring Boot API      │
                    │          Java 21           │
                    │        Port: 8080          │
                    │                           │
                    │  ┌─────────────────────┐  │
                    │  │ Employee Controller │  │
                    │  └──────────┬──────────┘  │
                    │             ▼              │
                    │  ┌─────────────────────┐  │
                    │  │  Employee Service   │  │
                    │  └──────────┬──────────┘  │
                    │             ▼              │
                    │  ┌─────────────────────┐  │
                    │  │ Spring Data JPA /   │  │
                    │  │ Hibernate            │  │
                    │  └──────────┬──────────┘  │
                    └─────────────┼─────────────┘
                                  │
                                 JDBC
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │     PostgreSQL      │
                       │       Port 5432     │
                       └─────────────────────┘


                         DEVOPS ARCHITECTURE
                                  │
                                  ▼
                         ┌─────────────────┐
                         │      Docker     │
                         │  Containerization│
                         └────────┬────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │       Kubernetes         │
                    │     Docker Desktop       │
                    │          + kind           │
                    │                          │
                    │  ┌────────────────────┐  │
                    │  │ App Deployment     │  │
                    │  │ Spring Boot Pod    │  │
                    │  └────────────────────┘  │
                    │                          │
                    │  ┌────────────────────┐  │
                    │  │ PostgreSQL         │  │
                    │  │ Deployment + Pod   │  │
                    │  └────────────────────┘  │
                    │                          │
                    │  Services               │
                    │  ConfigMap              │
                    │  Secrets                │
                    │  PersistentVolumeClaim  │
                    └──────────────────────────┘
```

## Architecture Components

| Layer                | Technology            | Purpose                                              |
| -------------------- | --------------------- | ---------------------------------------------------- |
| Frontend             | React + Vite          | Provides the employee management UI                  |
| Backend              | Spring Boot           | Provides REST APIs                                   |
| Programming Language | Java 21               | Backend development                                  |
| ORM                  | Hibernate             | Object-relational mapping                            |
| Data Access          | Spring Data JPA       | Database operations                                  |
| Database             | PostgreSQL            | Stores employee information                          |
| Containerization     | Docker                | Packages applications into containers                |
| Orchestration        | Kubernetes            | Deploys and manages containers                       |
| Kubernetes Runtime   | Docker Desktop + kind | Local Kubernetes cluster                             |
| Configuration        | Kubernetes ConfigMap  | Externalizes application configuration               |
| Secrets              | Kubernetes Secret     | Stores database credentials                          |
| Storage              | PersistentVolumeClaim | Provides persistent PostgreSQL storage               |
| Networking           | Kubernetes Services   | Enables communication between application components |

---

# Features

* Add employees
* View employees
* Search employees
* Filter employees by department
* Update employee information
* Delete employees
* Display total number of employees
* Display number of departments
* Display average salary
* RESTful backend APIs
* PostgreSQL database persistence
* Docker containerization
* Kubernetes deployment
* Kubernetes health checks
* Externalized configuration
* Kubernetes secrets for database credentials
* Persistent database storage

---

# Technology Stack

## Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

## Backend

* Java 21
* Spring Boot 3.5.4
* Spring Web
* Spring Data JPA
* Hibernate
* Spring Boot Actuator
* Maven

## Database

* PostgreSQL 16

## DevOps

* Docker
* Docker Desktop
* Kubernetes
* kind
* Kubernetes Deployments
* Kubernetes Services
* ConfigMaps
* Secrets
* PersistentVolumeClaim

---

# Project Structure

```text
devops-microservice-devops/
│
├── .github/
│   └── workflows/
│
├── .idea/
│
├── .mvn/
│
├── BOOT-INF/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── k8s/
│   ├── app-configmap.yaml
│   ├── app-deployment.yaml
│   ├── app-service.yaml
│   ├── debug-env-pod.yaml
│   ├── postgres-deployment.yaml
│   ├── postgres-pvc.yaml
│   ├── postgres-secret.yaml
│   ├── postgres-secret.example.yaml
│   └── postgres-service.yaml
│
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── abhiram/
│                   └── devops/
│                       ├── controller/
│                       ├── entity/
│                       ├── repository/
│                       └── service/
│
├── Dockerfile
├── pom.xml
└── README.md
```

---

# Backend Architecture

The backend follows a layered architecture.

```text
Client
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
PostgreSQL
```

### Controller

The controller handles HTTP requests from the frontend.

Example endpoints include:

```text
GET     /employees
GET     /employees/{id}
POST    /employees
PUT     /employees/{id}
DELETE  /employees/{id}
```

### Service

The service layer contains the application's business logic and communicates with the repository layer.

### Repository

Spring Data JPA repositories provide database access without requiring manual SQL for common CRUD operations.

### Entity

The `Employee` entity represents employee records stored in PostgreSQL.

---

# Kubernetes Architecture

The application is deployed to a local Kubernetes cluster.

```text
                    Kubernetes Cluster
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
     devops-app-deployment       postgres-deployment
             │                           │
             ▼                           ▼
      Spring Boot Pod             PostgreSQL Pod
             │                           │
             │                           │
             └─────── Service ──────────┘
                         │
                         ▼
                  PostgreSQL :5432
```

The Kubernetes configuration contains:

### Application Deployment

`app-deployment.yaml`

Responsible for running the Spring Boot application container.

### Application Service

`app-service.yaml`

Exposes the backend through a Kubernetes Service.

The configured NodePort is:

```text
30080
```

### PostgreSQL Deployment

`postgres-deployment.yaml`

Runs PostgreSQL inside Kubernetes.

### PostgreSQL Service

`postgres-service.yaml`

Provides internal network access to PostgreSQL.

```text
postgres-service:5432
```

### Persistent Storage

`postgres-pvc.yaml`

Provides persistent storage for PostgreSQL data.

### ConfigMap

`app-configmap.yaml`

Stores non-sensitive application configuration.

### Secret

`postgres-secret.yaml`

Stores PostgreSQL username and password.

---

# Docker

The Spring Boot application is packaged into a Docker image:

```text
devops-app:latest
```

The Docker image contains the application and its runtime dependencies.

The image is then used by the Kubernetes deployment.

---

# Kubernetes Health Checks

The application uses Spring Boot Actuator for health monitoring.

The Kubernetes deployment checks:

```text
/actuator/health
```

### Readiness Probe

Determines whether the application is ready to receive traffic.

```text
/actuator/health
```

### Liveness Probe

Determines whether the application is still running correctly.

If the liveness probe repeatedly fails, Kubernetes automatically restarts the container.

This provides basic self-healing behavior.

---

# Database Configuration

PostgreSQL runs as a separate Kubernetes workload.

The backend connects to PostgreSQL through the Kubernetes service:

```text
postgres-service
```

Database credentials are supplied using Kubernetes Secrets rather than hardcoding them directly into the application.

Example environment variables:

```text
DB_USER
DB_PASSWORD
```

This separates application configuration from sensitive credentials.

---

# Running the Project Locally

## 1. Start Docker Desktop

Make sure Docker Desktop is running.

Verify Docker:

```powershell
docker version
```

Verify Kubernetes:

```powershell
kubectl version
```

---

# 2. Check Kubernetes Cluster

Check the current context:

```powershell
kubectl config current-context
```

Expected:

```text
docker-desktop
```

Check nodes:

```powershell
kubectl get nodes
```

The node should show:

```text
Ready
```

---

# 3. Deploy PostgreSQL

Apply the PostgreSQL Secret:

```powershell
kubectl apply -f .\k8s\postgres-secret.yaml
```

Apply persistent storage:

```powershell
kubectl apply -f .\k8s\postgres-pvc.yaml
```

Deploy PostgreSQL:

```powershell
kubectl apply -f .\k8s\postgres-deployment.yaml
```

Create the PostgreSQL service:

```powershell
kubectl apply -f .\k8s\postgres-service.yaml
```

Verify:

```powershell
kubectl get pods
```

PostgreSQL should eventually show:

```text
1/1    Running
```

---

# 4. Deploy the Application

Apply the ConfigMap:

```powershell
kubectl apply -f .\k8s\app-configmap.yaml
```

Deploy the application:

```powershell
kubectl apply -f .\k8s\app-deployment.yaml
```

Create the application service:

```powershell
kubectl apply -f .\k8s\app-service.yaml
```

Check:

```powershell
kubectl get pods
```

Expected:

```text
devops-app-deployment-xxxxx     1/1    Running
postgres-deployment-xxxxx      1/1    Running
```

---

# 5. Check Services

```powershell
kubectl get services
```

Expected application service:

```text
devops-app-service    NodePort    8080:30080/TCP
```

PostgreSQL:

```text
postgres-service      ClusterIP   5432/TCP
```

---

# 6. Access the Application

The backend is exposed using Kubernetes NodePort.

```text
Application
     │
     ▼
NodePort 30080
     │
     ▼
Spring Boot :8080
```

For local Docker Desktop Kubernetes, the application can be accessed through the configured NodePort or by using port forwarding.

Example:

```powershell
kubectl port-forward svc/devops-app-service 8080:8080
```

Then access:

```text
http://localhost:8080
```

---

# Frontend

The frontend is developed using React and Vite.

Start the frontend:

```powershell
cd frontend
npm install
npm run dev
```

Vite normally starts the frontend at:

```text
http://localhost:5173
```

The frontend communicates with the Spring Boot backend through REST APIs.

---

# Useful Kubernetes Commands

### View Pods

```powershell
kubectl get pods
```

### View Services

```powershell
kubectl get services
```

### View Deployments

```powershell
kubectl get deployments
```

### View Nodes

```powershell
kubectl get nodes
```

### Describe a Pod

```powershell
kubectl describe pod <pod-name>
```

### View Application Logs

```powershell
kubectl logs deployment/devops-app-deployment
```

### View Previous Container Logs

```powershell
kubectl logs deployment/devops-app-deployment --previous
```

### Restart Application Deployment

```powershell
kubectl rollout restart deployment/devops-app-deployment
```

### Check Deployment Status

```powershell
kubectl rollout status deployment/devops-app-deployment
```

### Port Forward

```powershell
kubectl port-forward svc/devops-app-service 8080:8080
```

---

# Troubleshooting

## Pod is not Ready

Check:

```powershell
kubectl get pods
```

Then:

```powershell
kubectl describe pod <pod-name>
```

Check application logs:

```powershell
kubectl logs <pod-name>
```

---

## Health Check Failure

The application uses:

```text
/actuator/health
```

If Kubernetes reports:

```text
connection refused
```

check whether Spring Boot is actually listening on:

```text
8080
```

You can verify the application logs:

```powershell
kubectl logs <pod-name>
```

Look for:

```text
Tomcat started on port 8080
```

---

## Application Container Restarting

Check:

```powershell
kubectl get pods
```

Then:

```powershell
kubectl describe pod <pod-name>
```

Look at the **Events** section.

Also check:

```powershell
kubectl logs <pod-name> --previous
```

---

## Kubernetes Cluster After Laptop Shutdown

The Kubernetes cluster is running locally through Docker Desktop.

Therefore, shutting down the laptop stops Docker Desktop and its Kubernetes workloads.

After restarting the laptop:

1. Start Docker Desktop.
2. Wait for Kubernetes to become ready.
3. Check:

```powershell
kubectl get nodes
```

4. Check:

```powershell
kubectl get pods
```

Kubernetes resources remain defined, but containers may need to be recreated/restarted depending on the Docker Desktop/Kubernetes state.

---

# Project Workflow

```text
Developer
    │
    ▼
Source Code
    │
    ▼
Maven Build
    │
    ▼
Spring Boot Application
    │
    ▼
Docker Image
    │
    ▼
Kubernetes Deployment
    │
    ├───────────────┐
    ▼               ▼
Application Pod   PostgreSQL Pod
    │               │
    ▼               ▼
App Service      DB Service
    │               │
    └───────┬───────┘
            ▼
       Employee Data
```

---

# DevOps Concepts Demonstrated

This project demonstrates practical implementation of:

* Git and GitHub
* Maven
* Spring Boot
* REST APIs
* Docker
* Containerization
* Kubernetes
* Kubernetes Deployments
* Kubernetes Pods
* Kubernetes Services
* NodePort
* ConfigMaps
* Secrets
* PersistentVolumeClaims
* PostgreSQL
* Health checks
* Liveness probes
* Readiness probes
* Container restart/self-healing
* Application and database separation

---

# Case Study

## Title

**DevOps-Based Employee Management System Using Spring Boot, Docker, PostgreSQL and Kubernetes**

## Objective

The objective of this project is to develop an employee management application and deploy it using modern DevOps technologies.

The project demonstrates how a traditional full-stack application can be packaged into containers and managed using Kubernetes.

## Problem Statement

Organizations need an efficient system for maintaining employee information. A centralized employee management application can simplify employee data management while providing a scalable and maintainable deployment architecture.

## Proposed Solution

The proposed system provides a web-based interface for managing employee records. A React frontend communicates with a Spring Boot REST API, which performs business operations and stores the data in PostgreSQL.

Docker is used for application containerization, while Kubernetes manages application and database workloads.

---

# Future Enhancements

* Authentication and authorization
* Role-based access control
* Multiple replicas for the backend
* Horizontal Pod Autoscaling
* CI/CD pipeline
* Monitoring with Prometheus
* Visualization with Grafana
* Centralized logging
* HTTPS/TLS
* Cloud deployment using AWS
* Ingress controller
* Production-grade PostgreSQL deployment

---

# Author

**Abhiram Teja**

B.Tech — Computer Science / Engineering

Project: **DevOps Microservice Application**

---

## Project Summary

```text
Frontend       → React + Vite
Backend        → Spring Boot + Java 21
Database       → PostgreSQL
ORM            → Spring Data JPA + Hibernate
Container      → Docker
Orchestration  → Kubernetes
Configuration  → ConfigMap
Secrets        → Kubernetes Secret
Storage        → PersistentVolumeClaim
Health         → Spring Boot Actuator
```

**Core architecture:**

```text
React
  ↓
Spring Boot REST API
  ↓
Service Layer
  ↓
JPA / Hibernate
  ↓
PostgreSQL

Docker
  ↓
Kubernetes
  ↓
Pods + Deployments + Services
  ↓
Application + Database
```
