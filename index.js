const express = require("express");

const app = express();

const routes = require("./routes");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.get("/shopping", routes.getItems);

app.post("/item", routes.getSingleItem);

app.post("/add-item", routes.addItem);

app.put("/edit-item", routes.updateItem);

app.delete("/delete-item", routes.deleteItem);

app.get("/categories", routes.getCategories);

app.post("/register", routes.addUser);

app.listen(5000);
