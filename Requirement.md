# Fresh Fish

<p>Hi! this Mr. Alex. I have a fish selling business. I am selling many kind of fish like Ocean fish, river fish and local fish. I want to increases my business world wide. Now I need to website for selling my fishes.</p>

# SRS Software Requirement Spacification

#### Project Name: Fresh Fish

### Intorduction:

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

- [x] User can complete any order system can autometicaly send email or message.
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

##### Auth

- Id
- Name
- Email
- Password
- Status
- Role[user, admin]
- Avatar
- Verified
- LoginHistories
- verificationCode

##### Profile

- id
- authUserId
- email
- name
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
    - avatar(optional)
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
