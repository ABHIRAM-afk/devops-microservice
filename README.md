# Employee Management Microservice — DevOps Project

A full-stack **Employee Management System** built with **Spring Boot, PostgreSQL, React, Docker, and Kubernetes**. The project demonstrates how a backend microservice can be containerized, orchestrated, configured, and exposed through a modern web interface.

## Project Overview

The application provides an HR-style employee management portal with complete CRUD functionality.

Users can:

* View employees
* Add employees
* Edit employee details
* Delete employees
* Search employees
* Filter employees by department
* View employee statistics
* Calculate average salary dynamically

The backend is deployed as a Docker container and managed by Kubernetes, while PostgreSQL runs as a separate Kubernetes workload with persistent storage.

## Architecture

```text
                         GitHub
                            │
                            ▼
                     GitHub Actions
                            │
                     Build & Test
                            │
                            ▼
                       Docker Image
                            │
                            ▼
                  ┌─────────────────────┐
                  │ Kubernetes Cluster  │
                  │   Docker Desktop    │
                  │                     │
                  │  ┌───────────────┐  │
                  │  │ React Frontend│  │
                  │  └───────┬───────┘  │
                  │          │           │
                  │          ▼           │
                  │  ┌───────────────┐  │
                  │  │ Spring Boot   │  │
                  │  │ REST API      │  │
                  │  └───────┬───────┘  │
                  │          │           │
                  │          ▼           │
                  │  ┌───────────────┐  │
                  │  │ PostgreSQL    │  │
                  │  │ Pod           │  │
                  │  └───────┬───────┘  │
                  │          │           │
                  │          ▼           │
                  │  Persistent Volume   │
                  └─────────────────────┘
```

## Technology Stack

### Backend

* Java 21
* Spring Boot
* Spring Data JPA
* Hibernate
* PostgreSQL
* Maven
* Spring Boot Actuator

### Frontend

* React
* Vite
* JavaScript
* CSS

### DevOps

* Git & GitHub
* GitHub Actions
* Docker
* Kubernetes
* Docker Desktop Kubernetes
* Kubernetes ConfigMap
* Kubernetes Secrets
* Kubernetes Services
* PersistentVolumeClaim
* Kubernetes health probes

## Backend API

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| GET    | `/employees`       | Get all employees  |
| GET    | `/employees/{id}`  | Get employee by ID |
| POST   | `/employees`       | Create employee    |
| PUT    | `/employees/{id}`  | Update employee    |
| DELETE | `/employees/{id}`  | Delete employee    |
| GET    | `/actuator/health` | Application health |

### Employee Model

```json
{
  "id": 1,
  "name": "Alice",
  "department": "Engineering",
  "salary": 75000
}
```

## Kubernetes Architecture

The application uses separate Kubernetes workloads for the application and database.

### Spring Boot

* Deployment: `devops-app-deployment`
* Service: `devops-app-service`
* Service type: `NodePort`
* Port: `30080`
* Container port: `8080`

### PostgreSQL

* Deployment: `postgres-deployment`
* Service: `postgres-service`
* Service type: `ClusterIP`
* Port: `5432`

### Configuration

A Kubernetes **ConfigMap** provides non-sensitive database configuration:

```text
DB_HOST
DB_PORT
DB_NAME
```

A Kubernetes **Secret** provides database credentials.

The actual secret file is intentionally excluded from Git. A safe example is provided as:

```text
k8s/postgres-secret.example.yaml
```

### Persistent Storage

PostgreSQL uses a:

```text
postgres-pvc
```

with a 1 GiB PersistentVolumeClaim so database data can survive PostgreSQL pod restarts.

### Health Checks

Spring Boot Actuator exposes:

```text
/actuator/health
```

Kubernetes uses this endpoint for application readiness and liveness probes.

## Running the Project Locally

### Backend

Build the application:

```bash
mvn clean package -DskipTests
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### Frontend

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend is available at:

```text
http://localhost:5173
```

## Running with Kubernetes

Make sure Docker Desktop Kubernetes is enabled.

Verify the cluster:

```bash
kubectl get nodes
```

Deploy the Kubernetes resources:

```bash
kubectl apply -f k8s/
```

Check the workloads:

```bash
kubectl get pods
kubectl get deployments
kubectl get svc
kubectl get pvc
```

Expected result:

```text
Spring Boot Pod       1/1 Running
PostgreSQL Pod        1/1 Running
PVC                   Bound
```

### Access the Backend

For local demonstration:

```bash
kubectl port-forward svc/devops-app-service 8080:8080
```

The API can then be accessed at:

```text
http://localhost:8080/employees
```

Health check:

```text
http://localhost:8080/actuator/health
```

## CRUD Operations

### Create

```http
POST /employees
```

```json
{
  "name": "Alice",
  "department": "Engineering",
  "salary": 75000
}
```

### Read

```http
GET /employees
```

### Update

```http
PUT /employees/1
```

```json
{
  "name": "Alice Smith",
  "department": "Engineering",
  "salary": 80000
}
```

### Delete

```http
DELETE /employees/1
```

## DevOps Concepts Demonstrated

This project demonstrates:

1. **Version Control** — Git and GitHub
2. **Continuous Integration** — GitHub Actions
3. **Containerization** — Docker
4. **Container Orchestration** — Kubernetes
5. **Service Discovery** — Kubernetes Services
6. **Configuration Management** — ConfigMap
7. **Secret Management** — Kubernetes Secret
8. **Persistent Storage** — PersistentVolumeClaim
9. **Application Health Monitoring** — Actuator and Kubernetes probes
10. **Microservice Architecture** — Spring Boot REST service with independent database workload

## Project Structure

```text
devops-microservice-devops/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── k8s/
│   ├── app-configmap.yaml
│   ├── app-deployment.yaml
│   ├── app-service.yaml
│   ├── postgres-deployment.yaml
│   ├── postgres-pvc.yaml
│   ├── postgres-service.yaml
│   └── postgres-secret.example.yaml
│
├── src/
│   └── main/
│       ├── java/
│       └── resources/
│
├── Dockerfile
├── docker-compose.yml
├── pom.xml
└── README.md
```

## Security Note

Database credentials are **not committed to the repository**.

The actual Kubernetes secret file:

```text
k8s/postgres-secret.yaml
```

is excluded using `.gitignore`.

Only the safe template:

```text
k8s/postgres-secret.example.yaml
```

is included in the repository.

## Future Improvements

Possible future enhancements include:

* Helm charts
* Cloud deployment using AWS EKS
* Terraform infrastructure
* Prometheus and Grafana monitoring
* Centralized logging
* GitOps with Argo CD
* Horizontal Pod Autoscaling
* Production-grade ingress and TLS

## Project Status

**Current implementation:**

* React frontend: Complete
* Employee CRUD: Complete
* Spring Boot REST API: Complete
* PostgreSQL: Complete
* Docker containerization: Complete
* Kubernetes deployment: Complete
* Kubernetes configuration/secrets: Complete
* Persistent storage: Complete
* Health probes: Complete
* CI workflow: Complete

---

**Note:** The current Kubernetes deployment uses a local Docker Desktop Kubernetes cluster for development and demonstration. The architecture can subsequently be migrated to a managed cloud Kubernetes service such as AWS EKS, Azure AKS, or Google GKE.
