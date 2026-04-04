CREATE DATABASE kronatask;
USE kronatask;

CREATE TABLE tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  prioridade ENUM('baixa', 'media', 'alta') DEFAULT 'baixa',
  concluida BOOLEAN DEFAULT FALSE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);