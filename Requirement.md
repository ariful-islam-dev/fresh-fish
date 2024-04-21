# Fresh Fish

<p>Hi! this Mr. Alex. I have a fish selling business. I am selling many kind of fish like Ocean fish, river fish and local fish. I want to increases my business world wide. Now I need to website for selling my fishes.</p>

# SRS Software Requirement Spacification

#### Project Name: Fresh Fish

### Introduction:

<p>
    The Fresh Fish Rest API is collection of eCommerce api endpoints. every users can buy fish they want to need, manage and interact with an every single user to our application. The backend application provides authentication functionality, allows user review and view all product, buy to any quantity KG of fish, and upload fish image after get on their product for review. This article outline the functional and non-functional requirements for the development of the fresh fish REST API Application.
</p>

### Project Overview

<p>
    The REST API application aims to provide a seamless user experience while ensuring the security and integrity of user data.  It allows users to browse any kind of product without authentication but authentication is require for buying and provide review. Admin must be control any product and inventory form a role base admin dashboard

</p>

### Functional Requirement:

##### Authentication

- [x] Users should be able to register for an account by providing their email address, name and a secure password.
- [x] Users Should be able to log in securely using their email address and password.
- [x] Administrators should be able to login securely using their credentials.

##### User Management

- [x] Admin can create new users
- [x] Admin can see a list of all user
- [x] Admin can update or delete users
- [x] Admin can change password any user
- [x] Authenticated user can buy and add to cart any product, cancel order in a certain time.
- [x] Authenticated user can see their present condition of there order.
- [x] Authenticated user can update their profile.
- [x] Admin create a new product manage inventory
- [ ] Admin can cancel any product order

##### Guest User Management

- [x] Unauthenticated User can added any product in cart
- [ ] See all product
- [ ] See all review and ratting

##### User Photo Management:

- [x] Authenticated user should be upload their user image.
- [x] Only one photo upload user for avatar image.

##### Product Management

- [x] Permitted Admin can create a product
- [x] Admin can Edit Product Info
- [x] Admin can provide Product discount

##### Inventory Management

- [x] Admin can add new product inventory
- [x] Admin can Remove or delete any product quantity in inventory
- [x] Inventory can manage stock

##### Email service or message

- [x] User can complete any order system can automatically send email or message.
- [x] User can complete any product order. admin get a message how many product quantity is exist in this moment.

### Non-Functional Requirement

##### Security

User password must be securely stored using appropriate hashing and salting techniques.
ApI endpoints handling sensitive information should be protected using secure protocol (HTTPS).
Authentication tokens should be securely generated and validated to prevent unauthorized access.

##### Performance

The API should be able to handle a high volume of concurrent request efficiently.
Response time should be optimized to ensure a responsive user experience.

##### Scalability.

The application should be designed a to accommodate future growth and increasing user demands.
The architecture should allow for horizontal scalability , such as load balancing and distributed process.

##### Reliability

The API should be highly available, minimizing downtime and ensuring data integrity.
Error handling and logging should be implemented to facilitate troubleshooting and maintenance.

### Constraints

This REST API Application should be implemented using a specific programming language or framework.
The API may depend on external service of libraries for certain functionalities

### User Interface

Fresh-fish Rest API Application does not include a user interface. It solely provides a back-end API for integration with front-end application or clients.

### Entities/Schema/Model

##### Auth/User

- Id
- Name
- Email
- Password
- Status
- Role[user, admin]
- Verified
- LoginHistories
- verificationCode

##### Profile

- id
- authUserId
- email
- name
- avatar
- address
- phone
- createdAt
- updatedAt

##### LoginHistory

- Id
- UserId
- user
- IpAddress
- UserAgent
- Attempt[Success, Failed]
- LoginAt

##### VerificationCode

- Id
- UserId
- user
- Code
- Status[pending, used, expired]
- Type
- issue At
- ExpiresAt
- VerifiedAt

##### Product/Fish

- Id
- sku
- name
- image
- description
- price
- inventoryId
- status
- createdAt
- updatedAt

##### Inventory

- Id
- sku
- productId
- quantity
- histories[]

##### InventoryHistory

- id
- actionType[IN, OUT]
- quantityChanged
- lastQuantity
- newQuantity
- inventory
- inventoryId

##### Order

- id
- userId
- userName
- UserEmail
- subtotal
- tax
- grandTotal
- status
- orderItems[]

##### OrderItem

- id
- orderId
- order
- productId
- productName
- sku
- quantity
- price
- total

##### Email

- id
- sender
- recipient
- subject
- body
- source
- sentAt

#### Auth

- ##### Login User
  - Method POST
  - Access: Users
  - Path: /auth/login
  - Role: User+Admin
  - Request Body
    - email
    - password
  - Response
    - 200
      - Code: 200
      - Message
      - Data
        1. access_Token
      - Link
        - self
    - 400
      - code
      - message
      - data(Array of error)
        1. Field
        2. Message
    - 500
      - code
      - message
- ##### Sign Up USER
  - Method: POST
  - Access: Public
  - Role: USER
  - Path: /auth/register
  - Request Body
    - Name
    - email
    - password
    - status
    - Role
    - CreatedAt
    - UpdatedAt
  - Response:
    - 201
      - code: 201
      - Message:
      - User Data:
        - Access_Token
      - Link:
        - Self
        - auth/login
    - 400
      - code
      - message
      - data(Array of error)
        - Field
        - Message
    - 500
      - Code
      - Message
- ##### Verify-token
  - Method: POST
  - Access: PUBLIC
  - Role: User
  - Path: /auth/verify-token
  - Request Body
    - accessToken
  - Response
    - 200
      - code: 200
      - message
    - 400
      - code
      - message
      - data(Array of error)
        - Field
        - Message
    - 500
      - Code
      - Message

#### User

- ##### Get USERS
  - Method: GET
  - Access: Private
  - Role: Admin
  - Path: /profiles?query=params
  - Query:
    - page(default-1)- current page Number
    - limit(default-20) - the number of the object should be returned
    - sortType(default desc) - the type of sort, it could be either ase or desc
    - Name - name of the user
    - Email - email of the user
  - Response
    - 200
      - code
      - message
      - data
        - id
        - name
        - email
        - avatar
        - Role
        - Status
        - createdAt
        - updatedAt
      - pagination
        - page
        - limit
        - nextPage
        - prevPage
        - totalPage
        - totalUser
      - Links:
        - Self
        - NextPage
        - PrevPage
- ##### Get a single user
  - Method: GET
  - Access: Private
  - Role: Admin + User
  - Path: /profiles/:id
  - Response
    - 200
      - code
      - message
      - data
        - id
        - name
        - email
        - avatar
        - role
        - status
        - createdAt
        - updatedAt
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Create a new user
  - Method: POST
  - Access: Private
  - Role: Admin
  - Path: /profiles
  - Request Body
    - Name
    - Email
    - Password
    - status
  - Response
    - 201
      - code
      - Message
      - data
        - id
        - name
        - email
        - role
        - status ["ACTIVE", "INACTIVE","SUSPEND","PENDING"]
        - createdAt
        - updatedAt
      - Links:
        - self
        - edit
        - delete
        - view
    - - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Update a user
  - Method: PATCH
  - Access: Private
  - Role Admin + User(only own account)
  - Path: /profiles/:id
  - Request body
    - name(optional)
    - status(optional)
    - role(optional)
    - avatar(option)
  - Response
    - 200
      - code
      - message
      - data
        - id
        - name
        - email
        - status
        - avatar
        - role
        - createdAt
        - updatedAt
      - Links
        - self
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Delete a user
  - Method: DELETE
  - Access: Private
  - Role: Admin+User(only own acc)
  - Path: /profiles/:id
  - Response
    - 204
      - code
      - message
    - 400
      - code
      - message
    - 401
      - code
      - message
    - 500
      - Code
      - Message
- ##### Change Password
  - Method: PATCH
  - Access: Private
  - Role: Admin + user(only own acc)
  - Path: /profile/:id/password
  - Request Body
    - email
    - password
  - Response
    - 200
      - code
      - message
    - 400
      - code
      - message
    - 401
      - code
      - message
    - 500
      - Code
      - Message

#### Fish

- ##### Get All Product/fish
  - Method: GET
  - Access: Public
  - Path:/fishes?query=params
  - Query:
    - Page(default-1) current page number
    - Limit(default 10) the number of object be return
    - sortType(default dsc) it could be either asc or dsc
    - sortBy(default updated) it could be updatedAt or title
    - Search: the search term of filter question base on the title
  - Response
    - 200
      - code
      - message
      - data
        - id
        - title
        - image
        - price
        - discount
        - link
      - Pagination
        - Page
        - limit
        - nextPage
        - prevPage
        - totalPage
        - totalFish
      - links
        - Self
        - nextPage
        - PrevPage
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Get Product Details
  - Method: GET
  - Access: Public
  - Path: /fishes/:id
  - Query:
    - Expanded(default none) - Possible value product Id
  - Response
    - 200
      - code
      - message
      - data
        - id
        - sku
        - name
        - image
        - price
        - description
        - inventoryId
        - status
        - createdAt
        - UpdatedAt
- ##### Create a New Product
  - Method: POST
  - Access: Private
  - Role: Admin
  - Path: /fishes
  - Request Body
    - name
    - sku
    - price
    - description
    - image
    - status
  - Response
    - 201
      - code
      - message
      - data
        - id
        - name
        - sku
        - price
        - description
        - image
        - status
        - inventoryId
        - createdAt
        - UpdatedAt
      - link
        - self
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Update Product Info
  - Method: PATCH
  - Access: Private
  - Role: Admin
  - Path: /fishes/:id
  - Request Body
    - name(optional)
    - price(optional)
    - description(optional)
    - image(optional)
    - status(optional)
  - Response
    - 200
      - code
      - message
      - data
        - id
        - name
        - sku
        - description
        - inventoryId
        - status
        - price
        - image
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Delete A Product
  - Method: DELETE
  - Access: Private
  - Role: Admin
  - Path: /fishes/:id
  - Response
    - 204
    - 401
      - code
      - message
    - 404
      - code
      - message

#### Inventory

- ##### Get Inventory Details By Id
  - Method: GET
  - Access: Private
  - Role: Admin
  - Path: /inventories/:id/details
  - Response
    - 200
      - code
      - message
      - data
        - id
        - sku
        - productId
        - quantity
        - histories
          - id
          - actionType
          - quantityChanged
          - lastQuantity
          - newQuantity
          - inventory
          - inventoryId
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Get Inventory By Id
  - Method: DELETE
  - Access: Private
  - Role: Admin
  - Path: /inventories/:id
  - - Response
    - 200
      - code
      - message
      - data
        - id
        - sku
        - productId
        - quantity
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Update a inventory
  - Method: PUT
  - Access: Private
  - Role: Admin
  - Path: /inventories/:id
  - Request Body
    - actionType
    - quantity
  - Response
    - 200
      - code
      - message
      - data
        - id
        - quantity
        - productId
        - inventoryId
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Create a new Inventory
  - Method: POST
  - Access: Private
  - Role: Admin
  - Path: /inventories/
  - Request body:
    - productId
    - sku
  - Response
    - 201
      - code
      - message
      - data
        - id
        - quantity
    - 400
      - code
      - message
    - 500
      - Code
      - Message

##### Cart

- ##### Add To Cart
  - Method: POST
  - Access: Public
  - Role: User
  - Path: /cart/add-to-cart
  - Request Body
    - productId
    - inventoryId
    - quantity
  - Response
    - 200
      - code
      - message
      - data
        - cartSessionId
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### My Cart
  - Method: GET
  - Access: Public
  - Role: User
  - Path: /cart/me
  - Request Headers
    - x-cart-Session-id
  - Response
    - 200
      - code
      - message
      - data
        - productId
        - quantity
        - inventoryId
    - - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Clear My Cart
  - Method: GET
  - Access: Public
  - Role: User
  - Path: /cart/clear
  - Request Headers
    - x-cart-session-id
  - Response
    - 200
      - code
      - message

#### Order

- ##### Create a order
  - Method: POST
  - Access: Private
  - Role: Admin+User
  - Path: /order/checkout
  - Request Body
    - userId
    - userName
    - userEmail
    - cartSessionId
  - Response
    - 200
      - code
      - message
      - data
        - id
        - userId
        - userName
        - userEmail
        - subtotal
        - tax
        - grandTotal
        - status
        - createdAt
        - updatedAt
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### GET Order By Id
  - Method: POST
  - Access: Private
  - Role: Admin+User
  - Path: /orders/:id
  - Response
    - 200
      - code
      - message
      - data
        - id
        - userId
        - userName
        - userEmail
        - subtotal
        - tax
        - grandTotal
        - status
        - createdAt
        - updatedAt
        - orderItems
          - id
          - orderId
          - productId
          - productName
          - sku
          - quantity
          - price
          - total
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### Get All Order order
  - Method: POST
  - Access: Private
  - Role: Admin
  - Path: /orders/
  - Response
    - 200
      - code
      - message
      - data
        - id
        - userId
        - userName
        - userEmail
        - subtotal
        - tax
        - grandTotal
        - status
        - createdAt
        - updatedAt
        - orderItems
          - id
          - orderId
          - productId
          - productName
          - sku
          - quantity
          - price
          - total
    - 400
      - code
      - message
    - 500
      - Code
      - Message

#### Email

- ##### Send Email / Message
  - Method: POST
  - Access: Private
  - Role: Admin+User
  - Path: /emails/send
  - Request Body
    - Sender
    - Recipient
    - subject
    - body
    - source
  - Response
    - 200
      - code
      - message
    - 400
      - code
      - message
    - 500
      - Code
      - Message
- ##### GET All Email
  - Method: GET
  - Access: Private
  - Role: Admin
  - Path: /emails
  - Response
    - 200
    - message
    - data
      - id
      - Sender
      - Recipient
      - subject
      - body
      - source
      - sentAt
    - 400
      - code
      - message
    - 500
      - Code
      - Message
