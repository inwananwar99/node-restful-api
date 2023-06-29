#Address API Spec

##Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :
- Authorization : token

Request Body :

```json
{
    "street": "Jalan",
    "city": "Kota Tua",
    "province": "Jabar",
    "country": "Indonesia",
    "postal_code": "41152"
}
```

Response Body Success :

```json
{
    "data":{
        "street": "Jalan",
        "city": "Kota Tua",
        "province": "Jabar",
        "country": "Indonesia",
        "postal_code": "41152"
    }
}
```


Response Body Error :

```json
{
    "errors":{
        "Country is required"
    }
}
```


##Update Address API
Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Request Body :

```json
{
    "street": "Jalan",
    "city": "Kota Tua",
    "province": "Jabar",
    "country": "Indonesia",
    "postal_code": "41152"
}
```

Response Body Success :

```json
{
    "data":{
        "id":1,
        "street": "Jalan",
        "city": "Kota Tua",
        "province": "Jabar",
        "country": "Indonesia",
        "postal_code": "41152"
    }
}
```


Response Body Error :

```json
{
    "errors":{
        "Country is required"
    }
}
```

##Search Address API
Endpoint : GET /api/Addresss

Headers :
- Authorization : token

Query params :
- name : search by first_name / last_name, using like, optional
- email : search by email using like, optional
- phone : search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10


Response Body Success :

```json
{
    "data":[
        {
            "id":1,
            "first_name": "Inwan",
            "last_name": "Solihudin",
            "email": "inwan.solihudin@iconpln.co.id",
            "name": "085723260587"
        },
        {
            "id":2,
            "first_name": "Anwar",
            "last_name": "Solihudin",
            "email": "inwan.solihudin@iconpln.co.id",
            "name": "085723260587"
        }
    ],
    "paging":{
        "page":1,
        "total_page":3,
        "total_item":30
    }
}
```


Response Body Error :

```json
{
    "errors":{
        "Username already registered"
    }
}
```

##Get Address API
Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data":{
        "id":1,
        "street": "Jalan",
        "city": "Kota Tua",
        "province": "Jabar",
        "country": "Indonesia",
        "postal_code": "41152"
    }
}
```


Response Body Error :

```json
{
    "errors":{
        "contact is not found"
    }
}
```



##List Address API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :
- Authorization : token


Response Body Success :

```json
{
    "data":[
        {
            "id":1,
            "street": "Jalan",
            "city": "Kota Tua",
            "province": "Jabar",
            "country": "Indonesia",
            "postal_code": "41152"
        },
        {
            "id":2,
            "street": "Jalan",
            "city": "Kota Tua",
            "province": "Jabar",
            "country": "Indonesia",
            "postal_code": "41152"
        },

    ]
}
```


Response Body Error :

```json
{
    "errors":{
        "Contact is not found"
    }
}
```

##Remove Address API
Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token


Response Body Success :

```json
{
    "data":"OK"
}
```


Response Body Error :

```json
{
    "errors":{
        "Contact is not found"
    }
}
```
