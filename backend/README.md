# Backend Proiect PWeb

## USERS endpoints
### /users

### POST /register
- Req body


    {
        "email": string,
        "password": string,
        "firstName": string,
        "lastName": string,
        "phoneNumber": string
    }

- 201 CREATED
        

    {
        "response": "User created."
    }
- 500 INTERNAL SERVER ERROR
    

    {
        "response": "Email already registered."
    }

### GET /verify/:email/:verificationCode
- 200 OK


    {
        response: "User verified."
    }
- 404 NOT FOUND


    "Registration code expired. Please register again."


### POST /login
- Req body


    {
        "email": string,
        "password": string
    }

- 404 NOT FOUND - reg code expired or never registered
- 401 UNAUTHORIZED - account not verified
- 200 OK


    "response": {
        "user_id": int,
        "role": string,
        "fullName": string,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2MjIwMzM1MzIsImF1ZCI6InB3IGNsaWVudCIsImlzcyI6InB3IGJhY2tlbmQiLCJzdWIiOiJ3ZWIifQ.4XuVURR844eTV2avtrQwYXd18gOS_u61dAPi1kglhnA"
    }

### GET / - ADMIN


### PUT /:userId/role/:roleId - ADMIN

## CATEGORIES endpoints
### /category

### GET /
- get categories
- 200 OK


    "response": [
        {
            "category_id": int,
            "ro": string,
            "en": string
        }
    ]

### GET /:id
- get products for category id
- 200 OK


    "response": [
        {
            "product_id": int,
            "name": string,
            "brand": string,
            "image": string - http source,
            "price": float,
            "stock": int
        }
    ]

## PRODUCTS endpoints
### /products

### GET / - SUPPORT
- get all products
- 200 OK
    
    
    "response": [
        {
            "product_id": int,
            "name": string,
            "brand": string,
            "description": string,
            "image": string - http src,
            "price": float,
            "XS": int,
            "S": int,
            "M": int,
            "L": int,
            "XL": int,
            "category_id": int 
        }
    ]

### GET /:id
- get product by id
- 200 OK


    "response": {
        "product_id": int,
        "name": string,
        "brand": string,
        "description": string,
        "image": string - http src,
        "price": float,
        "XS": int,
        "S": int,
        "M": int,
        "L": int,
        "XL": int
    }
- 404 NOT FOUND - if no product with id found

### PUT /:id - SUPPORT
- update price of product with id
- Req body
    

    {
        "price": float
    }
- 200 OK


    "response": {
        "product_id": int,
        "price": float
    }
- 404 NOT FOUND - if no product with id exists

### PUT /:id/stock - SUPPORT
- update the stock of product with id
- Req body


    {
        "XS": int,
        "S": int,
        "M": int,
        "L": int,
        "XL": int
    }
- 200 OK


    "response": {
        "product_id": int,
        "XS": int,
        "S": int,
        "M": int,
        "L": int,
        "XL": int
    }

## CART endpoints
### /cart

### POST / - USER
- add item in cart
- Req body


    {
        "user_id": int,
        "product_id": int,
        "size": string,
        "pieces": int
    }
- 200 OK


    "response": "Added to cart."

### GET /:id - USER
- get items in cart
- 200 OK


    "response": {
        "products": [
            {
                "product_id": int,
                "name": string,
                "brand": string,
                "image": string - http source,
                "price": float,
                "cart_id": int,
                "size": string,
                "pieces": int
            }
        ],
        "subtotal": float,
        "total": float
    }

## DELETE /:id - USER
- delete item in cart with id
- 200 OK


    "response": {
        "cart_id": int,
        "user_id": int,
        "product_id": int,
        "size": string,
        "pieces": int
    }
- 404 NOT FOUND - if no item with id exists

## POST /order - USER
- place order
- Req body:


    {
        "user_id": int,
        "total": float
    }
- 200 OK


    "response": "Order placed."

## WISH endpoints
### /wish

### POST / - USER
- add item in wish list
- Req body


    {
        "user_id": int,
        "product_id": int,
        "size": string
    }
- 200 OK


    "response": "Added to wishlist."

### GET /:id - USER
- get items in wishlist
- 200 OK


    "response": [
        {
            "wish_id": int,
            "name": string,
            "brand": string,
            "image": string - http source,
            "price": float,
            "size": string,
            "stock": int
        }
    ]

## DELETE /:id - USER
- delete item in wishlist with id
- 200 OK


    "response": {
        "wish_id": int,
        "user_id": int,
        "product_id": int,
        "size": string
    }
- 404 NOT FOUND - if no item with id exists
