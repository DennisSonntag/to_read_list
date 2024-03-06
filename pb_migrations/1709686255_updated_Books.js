/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("21x8hel8haa1s7b")

  // remove
  collection.schema.removeField("yuchgg02")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6kpaixhu",
    "name": "isbn",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("21x8hel8haa1s7b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yuchgg02",
    "name": "isbn",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("6kpaixhu")

  return dao.saveCollection(collection)
})
