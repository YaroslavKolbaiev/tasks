CREATE TABLE IF NOT EXISTS Task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('todo', 'in_progress', 'done') DEFAULT 'todo',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    parentTaskId INT,
    FOREIGN KEY (parentTaskId) REFERENCES Task(id) ON DELETE CASCADE
);
