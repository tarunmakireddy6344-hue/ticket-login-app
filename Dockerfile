# Use an official OpenJDK runtime as a parent image
FROM openjdk:8-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the Maven wrapper files to the container
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy the project source
COPY src src

# Make the mvnw script executable
RUN chmod +x ./mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose the port the app runs on
EXPOSE 8080

# Run the jar file
CMD ["java", "-jar", "target/ticket-login-backend-0.0.1-SNAPSHOT.jar"]
