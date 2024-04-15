
# Frogmi Earthquake Software Development

Este software se desarrollo como una prueba tecnica de para un puesto de Software Development Engineer, para la empresa FROGMI

Tecnologías usadas: 

Framework de desarrollo:![RoR](https://img.shields.io/badge/Ruby_on_Rails-CC0000?style=for-the-badge&logo=ruby-on-rails&logoColor=white)

Lenguajes de programación utilizados: ![Ruby](https://img.shields.io/badge/Ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white)

![SQLITE](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/AztFireSpell/FrogmiEarhquake.git
```

Entrar a la carpeta del proyecto

```bash
  cd my-project
```

Instalar las gemas requeridas

```bash
  bundle install
```

Crear la base de datos local mysqlite con las migraciones

```bash
rails db:migrate
rake db:create
rake db:prepare
```

Ejecutar manualmente la task para traer los datos de la api de terremotos y guardar localmente en mysqlite
```bash
  rails runner "FetchAndSaveDataJob.new.perform"
```

Para poder visualizar la vista en react

```
cd client
npm install
npm run dev
```

Iniciar el servidor local

```bash
  rails server
```

## Ejecutar con docker

Clonar el proyecto

```bash
  git clone https://github.com/AztFireSpell/FrogmiEarhquake.git
```

Ejecutar para iniciar las imagenes con docker

```bash
docker-compose up
```


## Documentación para API

#### Obtener todos los registros de terremotos

```http
  GET /api/v1/features/
```



#### Obtener solo un registro de terremoto

```http
  GET /api/v1/features/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Requerido**. Id del terremoto a obtener, este id es interno a la base de datos |


#### Obtener registros con filtro de datos

```http
  GET /api/v1/features?page=${num_page}&per_page=${num_rows_per_page}&mag_type=${mag_type}

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `num_page`      | `int` | Numero de pagina a mostrar del total de los registros |
| `num_rows_per_page`      | `int` | Numero de registros a obtener por cada peticion |
| `mag_type`      | `int` | Valores de filtro del tipo de magnitud, valores posibles: md, ml, ms, mw, me, mi, mb, mlg |


#### Obtener los registros de comentarios hechos a los registros de terremotos

```http
  GET api/v1/features/${earthquake_id}/comments

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `earthquake_id`      | `int` | Numero de registro de terremoto a obtener comentarioa |


#### Insertar un comentario a un registro existente

```http
  POST api/v1/features/${earthquake_id}/comments

```


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `earthquake_id`      | `int` | Numero de registro de terremoto a insertar comentario |
| `body`      | `int` | ** Requerido ** Comentario a insertar el comentario |


Se debera enviar un json con payload con algunos de los siguientes formatos:

Si se utiliza este json, se utilizara el earthquake_id del payload para buscar e ingresar el terremoto

```
{
  "earthquake_id" : 1,
  "comment": {
    "body": "Este es un 1 comentario para el feature 2"
  }
}
 ```

Si no se incluye el earthquake_id se utilizara el id incluido en la URL 

 ```
{
  "comment": {
    "body": "Este es un 1 comentario para el feature 2"
  }
}
 ```
