CREATE TABLE notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    note TEXT,
    date DATE
);

INSERT INTO notes (title, note, date) VALUES ('Note 1', 'This is the first note', '2019-01-01');