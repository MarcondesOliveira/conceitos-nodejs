const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validadeRepositoryId(request, response, next) {
  const { id } = request.params;

  if (!IsUuid(id)) {
    return response.status(400).json({ error: "Invalid repository ID." });
  }

  return next();
}

app.use("/respositories/:id", validadeRepositoryId);

app.get("/repositories", (request, response) => {
  // TODO
  const result = repositories;

  return response.json(result);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const { title: oldTitle, url: oldUrl, techs: oldTechs, likes } = repositories[
    repositoryIndex
  ];

  const repository = {
    id,
    title: title ? title : oldTitle,
    url: url ? url : oldUrl,
    techs: techs ? techs : oldTechs,
    likes,
  };

  repositories[repositoryIndex] = repository;

  return response.status(200).json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  repositories[repositoryIndex].likes++;

  return response.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;
