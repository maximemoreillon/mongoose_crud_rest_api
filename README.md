# Mongoose REST API
A simple REST API for MongoDB using the Mongoose ORM

## API

| Route | Method | Query / Body | Description |
| --- | --- | --- | --- |
| /items | GET | - | Get all items |
| /items | POST | title, descritpion | Create an item |
| /items/{ITEM ID} | GET | - | Get an item using its ID |
| /items/{ITEM ID} | DELETE | - | Delete an item |
| /items/{ITEM ID} | PUT | title or descritpion | Update an item |

## Environment variables

| Variable | Description |
| --- | --- |
| MONGODB_URL | The URL of the MongoDB database to be used by the service |
| MONGODB_DB | DB to be used by the service |
| APP_PORT | OPTIONAL The port used by Express to listen to |

## Model

```javascript
{
  title: String,
  description: String,
}
```
