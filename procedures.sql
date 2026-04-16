DELIMITER $$

-- Creates a procedure that creates a user using email (verifies it's a school email)
-- It also requires a password to be hashed and stores the time the user was created at.
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
END $$

-- This is how a profile is created for a user.
CREATE PROCEDURE create_profile (
    IN p_user_id INT,
    IN p_name VARCHAR(100),
    IN p_birthdate DATE,
    IN p_gender VARCHAR(50),
    IN p_looking_for VARCHAR(100),
    IN p_major VARCHAR(100),
    IN p_bio TEXT
)
BEGIN
    INSERT INTO profiles (user_id, name, birthdate, gender, looking_for, major, bio)
    VALUES (p_user_id, p_name, p_birthdate, p_gender, p_looking_for, p_major, p_bio);
END $$

-- This is going to tell us what happened upon a swipe being done.
CREATE PROCEDURE record_swipe (
    IN p_user_id INT,
    IN p_target_id INT,
    IN p_decision VARCHAR(50)
)
BEGIN
    INSERT INTO swipes (user_id, target_id, decision)
    VALUES (p_user_id, p_target_id, p_decision);
END $$

-- This is going to create a match between two users.
CREATE PROCEDURE create_match (
    IN p_user1_id INT,
    IN p_user2_id INT
)
BEGIN
    INSERT INTO matches (user1_id, user2_id, status, matched_at)
    VALUES (p_user1_id, p_user2_id, 'active', NOW());
END $$

-- This puts our match into a conversation.
CREATE PROCEDURE create_conversation (
    IN p_match_id INT
)
BEGIN
    INSERT INTO conversations (match_id, last_message_at)
    VALUES (p_match_id, NOW());
END $$

-- This is our procedure for sending a message.
CREATE PROCEDURE send_message (
    IN p_conversation_id INT,
    IN p_user_id INT,
    IN p_body TEXT
)
BEGIN
    INSERT INTO messages (conversation_id, user_id, body, sent_at)
    VALUES (p_conversation_id, p_user_id, p_body, NOW());

    UPDATE conversations
    SET last_message_at = NOW()
    WHERE conversation_id = p_conversation_id;
END $$

-- This is the procedure for creating a report when a user reports another user.
CREATE PROCEDURE create_report (
    IN p_user_id INT,
    IN p_conversation_id INT,
    IN p_reason VARCHAR(255),
    IN p_details TEXT
)
BEGIN
    INSERT INTO reports (user_id, conversation_id, reason, details, stat)
    VALUES (p_user_id, p_conversation_id, p_reason, p_details, 'pending');
END $$

-- This is the procedure for creating a reveal request.
CREATE PROCEDURE create_reveal_request (
    IN p_match_id INT,
    IN p_user_id INT
)
BEGIN
    INSERT INTO reveal_requests (match_id, user_id, requested_at)
    VALUES (p_match_id, p_user_id, NOW());
END $$

CREATE PROCEDURE add_profile_hobby (
    IN p_profile_id INT,
    IN p_hobby_id INT
)
BEGIN
    INSERT INTO profile_hobbies (profile_id, hobby_id)
    VALUES (p_profile_id, p_hobby_id);
END $$

DELIMITER ;