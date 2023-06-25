create database ecommerceAPI;


CREATE TABLE emnployee(
first_name varchar,
surname varchar(50),
department varchar(50),
Employee_id serial primary key

);

CREATE TABLE genres(
Genre_ID serial primary key,
genre_description
);

create table catalog(
Movie_id serial primary key,
movie_name varchar (100),
release_date date not null,
rating bit,
expiry_date date,
price money
);



create table orders(
Order_id serial primary key,
order_date date,
cost money,
shipping_cost money,
total_cost money,
customer_id integer,
CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
	  REFERENCES customers(Customer_id)
);








create table customers(
Customer_ID serial primary key,
Customer_firstname varchar(30),
Customer_surname varchar(50),
Customer_phonenumber varchar(20),
Customer_email text not null unique,
Customer_address1 varchar,
Customer_address2 varchar,
Customer_town varchar,
Customer_city varchar,
Customer_zipcode varchar,
Customer_age int,
Customer_RegistrationDate date



);



