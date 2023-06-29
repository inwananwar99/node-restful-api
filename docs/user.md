#User API Spec

##Register User API

Endpoint : POST /user

Request Body :

...json
{
    "username": "Inwan",
    "password": "123456",
    "name": "Inwan123"
}
...

Response Body Success :

...json
{
    "data":{
        "username": "Inwan",
        "password": "123456"
    }
}
...


Response Body Error :

...json
{
    "errors":{
        "Username already registered"
    }
}
...


##Login User API

##Update User API

##Get User API

##Logout User API
