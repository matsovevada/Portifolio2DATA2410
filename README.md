# Portfolio2: movie web-shop
Submission for: 
Zakaria Karlsen Tawfiq s344072, Mats Ove Vada s340363, Peter Stjern Sund s344093

## Description
We have built a web shop that sells movies. The user can login and add different movies to their cart and proceed to checkout. The user can filter the movies by genre and sort all movies by price or title. The webshops search bar lets the user search for movies by title. All orders are stored in the database and can be viewed by the user. The website allows for an admin to login and edit existing products and even add more movies. See “usage” for more detailed information.

The website is built using a MERN-stack. Our database is managed with MongoDB and the REST API is built with Node Express. We have used React when developing the front-end. Bootstrap and plain CSS are used in the design of the page. The app is deployed with Docker and contains support for monitoring with Prometheus.
 
The application uses HTTPS with self-signed certificates, see below for instructions on how to add certificates to the trusted list. Authentication when logging in is handled with Google Sign-in (Oauth2). We use cookies to store the google sign-in token. A wide range of the functions on the website utilizes API-calls to communicate with the back end. For example when adding movies to the shopping cart or editing user information. 
 
The database is seeded with movie objects (products) and two users. See below for instructions on how to deploy and use the website.

## Installation

### Requirements
To run the program you need to unzip the the program, install and setup docker and add TLS certificates to trusted list. Everything you need to know to do this is described in this report.

### Docker
Requires Docker Desktop / Docker Engine and Docker Compose to be installed on your computer. The installation of the program also requires mongoDB service to be disabled on your computer.

Disable mongo:
On Linux (Ubuntu):
sudo killall mongod

On Mac: 
If mongo was installed with homebrew: type in command line:
brew services stop mongodb
or
brew services stop mongodb-community

On Windows: 
Press CTRL, Shift + ESC to open task manager
Go to services
Find MongoDB in the list, right click it and press stop


In a terminal, navigate to the root of the folder. Use the following commands:

	docker-compose build
	docker-compose up

### Adding certificate to your trusted list
You have to add two self-signed TLS certificates to be able to run the website. This must be done for both https://localhost:3000 (frontend) and https://localhost:8080 (backend). The guides below are for Google Chrome, the process may be different for other browsers. 

Alternative to adding certificate to trusted list:

If you don’t to go through the process of adding the certificated to the trusted list you can still use the app with an insecure connection by going to this address in your Chrome browser: chrome://flags/#allow-insecure-localhost 
And enabling allow-insecure-localhost.


#### Windows
1. Go to https://localhost:3000
2. Click advanced and click proceed to https://localhost:3000
3. Inspect the page and go to the security tab
4. Click “View certificate” (this will be red if it you haven't done it already)
5. Go to details and click “copy to file”
6. Then
    a. Press next
    b. Choose Base-64 and press next
    c. Make a name for the file and save it to a convenient place(ex. Desktop or downloads)
7. Find the file you just saved and double click it

8. Click install certificate:
    a.Choose current user and press next
    b. Then choose “Place all certificates in the same store”
    c. Click browse and choose “Trusted Root Certificate Authorities” and press “OK”
9. Then press next and finish
10. You will now get a prompt that says that the installation was successful.
11. Then repeat steps 1 - 10 for https://localhost:8080, because the REST-API needs a secure connection as well.


#### Mac
1. Go to https://localhost:3000
2. Press to red triangle in the url-bar 
3. Click “Sertifikat”
4. Drag and drop the “certificate image” to the desktop
5. Click the icon to open it in “Keychain”
6. Locate the certificate and click to open up the “Godkjenning” tab
7. Set the option to “Godkjenn alltid”
8. Close the window, you may be be asked to enter your OS-password
9. Try to access the webpage again and you should be greeted with a pad-lock
10. Repeat the process for https://localhost:8080


#### Linux
We have not gotten this to work on a Linux system, so we recommend just going to chrome://flags/#allow-insecure-localhost in your Chrome browser and enable allow-insecure-localhost.

## Usage

In a browser go to: https://localhost:3000

Make sure to use https and not http.


### Logging in
The web-page can be accessed without logging in as a user, but to be able to perform actions such as adding movies to your cart you have to log in. Click on “Log in” in the upper right corner and then click on Google log in-button. A Google sign-in window will now appear. Either enter the email and password of your own Google account or use on of the accounts provided below. If you’re not going to use your own account, make sure to log out of your google account in the browser or open the browser in guest mode. Accounts that are logged in for the first time will be asked to register their firstname, lastname, address, city and zipcode. Emails and passwords are handled by Google Sign In (oAuth) and are not stored in our database.

Account with admin rights:
Email:
superuser.nideovova@gmail.com
Password:
L^t85bmTF8^j%D#a

Account without admin rights:
Email:
user.nideovova@gmail.com
Password:
64%CMuY#Q2xV&avj


### Functions
The webshop has different functionality depending on if the user is a regular user or an admin. 

## User

Main page:

Pressing “add to cart” adds the selected movie to the cart. The cart can be viewed by clicking on “Cart” in the nav-bar. If “show more” is pressed the user will be presented with a pop-up with more information about the movie: 
The user can filter movies by genre with the “genre”-dropdown.
The user can sort movies by price or title using the “sort by”-dropdown.
The user can search for movies by title with the search bar, press enter or the search button to search. 

Cart:
The user will be directed to their shoppingcart when pressing “cart” in the nav-bar. The cart page will display the contents of the cart.
If the cart is empty the user will be met with a message saying: “Your cart is empty”. 
The user can change the number of movies they want to buy by pressing “+” or “-”. The movie will be removed from the cart if “-” is pressed when the quantity is 1. 
The user can press checkout to proceed with the order. 
When confirming the checkout the order will be added to the users order history. The user will then be directed to an empty cart page. 

Orders:
The user can navigate to their order history by pressing “Orders” in the navbar. This page displays all previous orders for the logged in user.

Edit user:
The user can navigate to their userpage by clicking on their email displayed on the navbar. This page allows the user to edit their information. The user can also delete their account by pressing “delete”. This will prompt a pop-up that needs to be confirmed to delete the user account. 

## Admin
Admin users are not able to add items to the cart, they are only able to manage the website. Admin users can add movies to the database using the “Add a movie” button in the header. :
If no image is chosen when adding a movie, a default picture will be put in instead:
They are also able to edit the information and images to all the different movies in the database:
And they are able to delete movies using the delete button in the movie-cards.

## Monitoring with Prometheus
Prometheus is running in a Docker container and is set up to monitor the API routes of the web-application. You can view information about how many times each route has been hit and how much time it takes to perform each API call. To view the information go to the following link in a browser: https://localhost:8080/webshop/metrics

You can view how many times an API route has been hit by reading the operations_total-tags. Example: get_movies_operations_total show how many times the get_movies-call has been performed.

You can view how many seconds it took to perform an API call by reading the seconds_sum-tags. Example: sort_movies_price_ascending_seconds_sum shows how many seconds it took to perform the API call for sorting movies by ascending price.