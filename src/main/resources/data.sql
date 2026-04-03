-- Use this script to insert default data into our H2 standard SQL database tables.

-- Insert a test user if not already present
MERGE INTO users (id, username, password, email) 
VALUES (1, 'admin', 'password123', 'admin@ticketapp.com');

MERGE INTO users (id, username, password, email) 
VALUES (2, 'john.doe', 'ticketpass', 'john@example.com');

MERGE INTO users (id, username, password, email) 
VALUES (3, 'Tarun', 'tarun123', 'john@example.com');