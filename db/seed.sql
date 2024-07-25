\c movies_db;

INSERT INTO "user" (name, email, password)
VALUES ('Jane Doe', 'email@email.com', 'password'),
       ('Ashley', 'ashleysemail@company.org', '12345678'),
       ('Sidney Prescott', 'sydrules@hotmail.org', '123a123b123c'),
       ('Billy', 'billy@icloud.gov', 'billyissocool');

INSERT INTO movie (name, user_id)
VALUES ('Titanic', 1),
       ('Twilight', 2),
       ('Scream', 3),
       ('The notebook', 4);

INSERT INTO movie_watched (user_id, movie_id)
VALUES (1, 1),
       (2, 2),
       (3, 2),
       (4, 4);

INSERT INTO review (review, rating, movie_id, user_id)
VALUES ('I love the titanic!', 4, 1, 1),
       ('Team Edward!', 5, 2, 2),
       ('I do not watch scary movies because the women are played by bad actors', 1, 3, 3),
       ('My girlfriend made me watch this, it was okay', 3, 4, 4);