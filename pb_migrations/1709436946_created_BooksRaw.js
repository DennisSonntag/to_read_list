/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "aw9u3i53mqkgea1",
    "created": "2024-03-03 03:35:46.712Z",
    "updated": "2024-03-03 03:35:46.712Z",
    "name": "BooksRaw",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2dtnmfsf",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "rgoi7tzj",
        "name": "authors",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("aw9u3i53mqkgea1");

  return dao.deleteCollection(collection);
})
