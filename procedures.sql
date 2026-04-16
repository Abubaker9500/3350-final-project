CREATE PROCEDURE create_user (
    IN p_email VARCHAR(255),
    IN p_password_hashed VARCHAR(255)
)
BEGIN
    IF p_email NOT LIKE '%@csub.edu' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email must have a @csub.edu address';
    END IF;

    INSERT INTO users (email, password_hashed, created_at)
    VALUES (p_email, p_password_hashed, NOW());
END;