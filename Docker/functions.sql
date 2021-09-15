-- functie pentru inserare utilizator in tabela USERS
CREATE OR REPLACE FUNCTION insertUser(u_role_id INTEGER, u_email VARCHAR, u_firstName VARCHAR, u_lastName VARCHAR, u_phone_number VARCHAR, u_password VARCHAR, u_token VARCHAR)
    RETURNS integer
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    user_added integer;
BEGIN
    INSERT INTO USERS(role_id, email, firstName, lastName, phone_number, password, token)
    VALUES (u_role_id, u_email, u_firstName, u_lastName, u_phone_number, u_password, u_token);
    user_added := 1;

    RETURN user_added;
EXCEPTION
    WHEN unique_violation THEN
        user_added := 0;

        RETURN user_added;
END;
$$;

-- functie pentru verificare token
CREATE OR REPLACE FUNCTION verifyToken(u_email VARCHAR, u_token VARCHAR)
    RETURNS VARCHAR
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    user_found integer := -1;
    message VARCHAR;
BEGIN
    SELECT user_id
    INTO user_found
    FROM USERS
    WHERE email = u_email and token = u_token;

    IF user_found <> -1 THEN
        UPDATE USERS
        SET is_verified = true
        WHERE user_id = user_found;

        message = 'User verified.';
    ELSE
        message = 'Token expired. Please register again.';
    END IF;

    RETURN message;
END;
$$;

-- functie pentru introducere articol in cos
CREATE OR REPLACE FUNCTION addToCart(u_user_id integer, u_product_id integer, u_size VARCHAR, u_pieces integer)
    RETURNS integer
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    result integer := 0;
    counter integer;
BEGIN
    SELECT COUNT(*)
    INTO counter
    FROM CART
    WHERE product_id = u_product_id AND user_id = u_user_id AND size = u_size;

    IF counter = 0 THEN
        INSERT INTO CART (user_id, product_id, size, pieces)
        VALUES (u_user_id, u_product_id, u_size, u_pieces);
    ELSE
        UPDATE CART
        SET pieces = pieces + u_pieces
        WHERE product_id = u_product_id AND user_id = u_user_id AND size = u_size;
    END IF;

    RETURN result;
END;
$$;

-- functie pentru plasare comanda
CREATE OR REPLACE FUNCTION placeOrder(u_user_id integer, u_total real)
    RETURNS integer
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    result integer := 0;
    new_order_id integer;
BEGIN
    INSERT INTO ORDERS(user_id, total)
    VALUES (u_user_id, u_total)
    RETURNING order_id INTO new_order_id;
    result := 0;

    UPDATE CART
    SET order_id = new_order_id
    WHERE user_id = u_user_id AND order_id IS NULL;

    RETURN result;
END;
$$;

-- functie pentru introducere articol in wishlist
CREATE OR REPLACE FUNCTION addToWish(u_user_id integer, u_product_id integer, u_size VARCHAR)
    RETURNS integer
    LANGUAGE PLPGSQL
AS
$$
DECLARE
    result integer := 0;
    exists integer;
BEGIN
    SELECT COUNT(*)
    INTO exists
    FROM WISH
    WHERE user_id = u_user_id AND product_id = u_product_id AND size = u_size;

    IF (exists = 0) THEN
        INSERT INTO WISH (user_id, product_id, size)
        VALUES (u_user_id, u_product_id, u_size);
    END IF;

    RETURN result;
END;
$$;
