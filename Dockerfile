# Stage 1: Build the Angular frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Java backend
FROM eclipse-temurin:21-jdk AS backend-build
WORKDIR /app

# Copy the Maven wrapper files to the container
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy backend source
COPY src src

# Copy compiled frontend into the Spring Boot static directory
RUN mkdir -p src/main/resources/static
COPY --from=frontend-build /app/frontend/dist/frontend/browser/ src/main/resources/static/

# Make the mvnw script executable and build
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Stage 3: Run the minimal application
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=backend-build /app/target/ticket-login-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the standard port
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
