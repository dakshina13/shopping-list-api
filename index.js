const express = require("express");

const app = express();

const routes = require("./mongoose");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/shopping", routes.getItems);

app.get("/item", routes.getSingleItem);

app.post("/add-item", routes.additem);

app.put("/edit-item", routes.updateItem);

app.delete("/delete-item", routes.deleteItem);
app.listen(5000);
