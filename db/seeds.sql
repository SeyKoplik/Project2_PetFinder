-- we can add seeds here once we know what info we'll be storing
USE pets_db;

INSERT INTO Pets (name, age, gender, size, url, img, notes, createdAt, updatedAt, userID) VALUES ("fluffy", "baby", "FEMALE", "small", "N/A", "N/A", "notes", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);

INSERT INTO Pets (name, age, gender, size, url, img, notes, createdAt, updatedAt, userID) VALUES ("spot", "baby", "male", "small", "N/A", "N/A", "notes", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1);