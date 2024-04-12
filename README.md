
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

Crear la base de datos local mysqlite con las migraciones

```bash
rake db:create
rake db:migrate
```

Ejecutar manualmente la task para traer los datos de la api de terremotos y guardar localmente en mysqlite
```bash
  rails runner "FetchAndSaveDataJob.new.perform"
```

Iniciar el servidor local

```bash
  rails server
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
  GET api/v1/features/${1}/comments

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `earthquake_id`      | `int` | Numero de registro de terremoto a obtener comentarioa |


#### Insertar un comentario a un registro existente

```http
  POST api/v1/features/6/comments

```

Se debera enviar un json con el siguiente formato

 ```
{
  "earthquake_id": 2,
  "comment": {
    "body": "Este es un comentario para el feature 2"
  }
} 
 ```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `earthquake_id`      | `int` | Numero de registro de terremoto a insertar comentario |