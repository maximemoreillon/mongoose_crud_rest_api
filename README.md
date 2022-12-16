# Mongoose CRUD REST API

CRUD operatons using Mongoose, via a REST API built with Express.

## Schema

### Movie

```
{
  title: String,
  director: { type: Types.ObjectId, ref: 'Person' },
}
```

### Person

```
{
  name: String,
  age: Number,
}
```

