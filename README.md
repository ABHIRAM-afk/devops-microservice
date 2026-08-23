# Employee Management System – DevOps Microservice

A full-stack Employee Management System built using **Spring Boot, React, and PostgreSQL**, containerized with **Docker**, and deployed using **Kubernetes**.

This project demonstrates how a backend application and database can be containerized, configured, and deployed using modern DevOps practices.

## Project Overview

The application provides an interface to manage employees in an organization.

Users can:

- Add employees
- View all employees
- Search employees
- Filter employees by department
- Update employee information
- Delete employees
- View employee statistics
- Manage employee records through a web dashboard

The project also demonstrates containerization and Kubernetes-based deployment of the application and PostgreSQL database.

## Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │   Employee Portal   │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot API   │
                    │      :8080          │
                    └──────────┬──────────┘
                               │
                               │ JPA / Hibernate
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │       :5432         │
                    └─────────────────────┘

                         Kubernetes
                              │
              ┌───────────────┴───────────────┐
              │                               │
      ┌───────▼────────┐             ┌────────▼────────┐
      │  App Deployment │             │    PostgreSQL   │
      │  Spring Boot    │             │    Deployment   │
      └─────────────────┘             └─────────────────┘
Tech Stack
Frontend
React
Vite
HTML
CSS
JavaScript
Backend
Java 21
Spring Boot 3.5
Spring Web
Spring Data JPA
Hibernate
Spring Boot Actuator
Database
PostgreSQL 16
DevOps
Docker
Docker Desktop
Kubernetes
Kubernetes Deployments
Kubernetes Services
ConfigMaps
Secrets
PersistentVolumeClaims
Kubernetes health probes
Features
Employee Management

The application supports CRUD operations:

Create employee
Read employee information
Update employee information
Delete employee
Dashboard

The dashboard provides:

Total number of employees
Number of departments
Average salary
Employee list
Department filtering
Employee search
Backend API

The Spring Boot backend exposes REST APIs for employee management.

Get all employees
GET /employees
Get employee by ID
GET /employees/{id}
Add employee
POST /employees

Example request:

{
  "name": "Abhiram Teja",
  "department": "Engineering",
  "salary": 85000
}
Update employee
PUT /employees/{id}
Delete employee
DELETE /employees/{id}
Docker

The Spring Boot application is packaged as a Docker image.

Example:

docker build -t devops-app:latest .

The Docker image is then used by Kubernetes to run the application.

Kubernetes Deployment

The project contains Kubernetes configuration files in the k8s directory.

k8s/
├── app-configmap.yaml
├── app-deployment.yaml
├── app-service.yaml
├── postgres-deployment.yaml
├── postgres-pvc.yaml
├── postgres-secret.yaml
└── postgres-service.yaml
Kubernetes Components
Application Deployment

Runs the Spring Boot application inside a Kubernetes pod.

PostgreSQL Deployment

Runs the PostgreSQL database inside Kubernetes.

Service

Provides networking between the application and PostgreSQL.

ConfigMap

Stores non-sensitive application configuration.

Secret

Stores PostgreSQL credentials.

PersistentVolumeClaim

Provides persistent storage for PostgreSQL data.

Running the Project
1. Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd devops-microservice-devops
2. Start Docker Desktop

Make sure Docker Desktop is running with Kubernetes enabled.

Check the cluster:

kubectl get nodes

Expected:

NAME                    STATUS   ROLES
desktop-control-plane   Ready    control-plane
3. Deploy PostgreSQL
kubectl apply -f k8s/postgres-secret.yaml
kubectl apply -f k8s/postgres-pvc.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/postgres-service.yaml
4. Deploy the application
kubectl apply -f k8s/app-configmap.yaml
kubectl apply -f k8s/app-deployment.yaml
kubectl apply -f k8s/app-service.yaml
5. Check pods
kubectl get pods

Expected:

devops-app-deployment-xxxxx       1/1   Running
postgres-deployment-xxxxx        1/1   Running
6. Check services
kubectl get services

The application service uses:

8080:30080
7. Access the application

The frontend can be started using:

npm install
npm run dev

Then open:

http://localhost:5173
Kubernetes Commands Used

Check cluster:

kubectl get nodes

Check pods:

kubectl get pods

Check services:

kubectl get services

Check deployments:

kubectl get deployments

View pod details:

kubectl describe pod <pod-name>

View application logs:

kubectl logs <pod-name>

Apply Kubernetes configuration:

kubectl apply -f k8s/
DevOps Concepts Demonstrated

This project demonstrates several practical DevOps concepts:

Git and GitHub
Docker containerization
Docker image creation
Kubernetes cluster management
Kubernetes deployments
Kubernetes services
ConfigMaps
Secrets
Persistent storage
Container orchestration
Application health monitoring
REST API development
Database integration
Environment-based configuration
Project Structure
devops-microservice-devops/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── abhiram/
│       │           └── devops/
│       │
│       └── resources/
│
├── k8s/
│   ├── app-configmap.yaml
│   ├── app-deployment.yaml
│   ├── app-service.yaml
│   ├── postgres-deployment.yaml
│   ├── postgres-pvc.yaml
│   ├── postgres-secret.yaml
│   └── postgres-service.yaml
│
├── Dockerfile
├── pom.xml
└── README.md
Future Improvements

Possible future enhancements include:

CI/CD pipeline using GitHub Actions
Automated Docker image builds
Container image registry integration
Kubernetes Ingress
Horizontal Pod Autoscaling
Monitoring with Prometheus and Grafana
Centralized logging
Automated testing
Authentication and authorization
Deployment to a cloud Kubernetes platform
Author

Abhiram Teja

B.Tech Computer Science Engineering
