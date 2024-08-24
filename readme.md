
# School manegement 

The goal of this  assignment is to find all nearset School
and The system should allow users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

# Add school API 

### End point = https://school-management-3fd1.onrender.com/addschool
In these api user can add new school  and we want from user the name of school , address , latitude and longitude

    {
        "name" : "<Name-of-school>", // max
        "address" : "<Addres-of-school>", //max
        "latitude" : <latitude>,  //12344.345345      
        "longitude" : <longitude>, // round
    }

All fileds are required if any filed is null or empty you get some error

### On success

you get this type of response 


    {
    "message": "School added successfully.",
    "data": {
        "id": 27,
        "name": "ABC School",
        "address": "123 Main St",
        "latitude": 40.7128,
        "longitude": -74.006
        }
    }

### On fail

you get this type of error

    {
    "message": "All fields are required."
    } 

#  Get List of Schools API 

### End point = https://school-management-3fd1.onrender.com/listSchools?latitude=40.7128&longitude=-74.0060

In these api user and can  retrieve a list of schools sorted by proximity to a user-specified location.

In these api we required four query Parameters latitude, logitude, page and limit. But letitude or longitude  must required and page Parameters  and  limit  are optional 
Parameters 

### On success 
you get this type of response

    [
        {
        "id": 10,
        "name": "ABC School",
        "address": "123 Main St",
        "latitude": 40.7128,
        "longitude": -74.006,
        "distance": 0
        },
        {
        "id": 11,
        "name": "ABC School",
        "address": "123 Main St",
        "latitude": 40.7128,
        "longitude": -74.006,
        "distance": 0
        },
        {
        "id": 12,
        "name": "ABC School",
        "address": "123 Main St",
        "latitude": 40.7128,
        "longitude": -74.006,
        "distance": 0
        }
        .....
    }

### On fail 

you get this types of errors

    1
        {
        "message": "Latitude and Longitude are required."
        } 
    2

        {
        "message": "No schools found."
        } 
    3  
        {
         "message": "'Database error.'"
        }



# Database

    table: schools
        Columns:
            id int PK 
            name varchar(255) 
            address varchar(255) 
            latitude float 
            longitude float