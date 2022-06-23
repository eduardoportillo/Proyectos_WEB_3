const Movie = require('../models/MovieModel');
const uuid = require('uuid');
const path = require('path');

module.exports = {
	async index(req, res) {
		const movies = await Movie.findAll();
		return res.status(200).json(movies);
	},

	async show(req, res){
		if(!req.params.movieId){
			res.status(400).send({
				message: "El id de la pelicula es requerido"
			});
			return;
		}
		const movie = await Movie.findByPk(req.params.movieId);
		if (movie == null) {
			res.status(404).send({ message: "Pelicula no encontrada" });
			return;
		}
		res.send(movie);
	},

	async store(req, res){
		if(!req.body.name){
			res.status(400).send({
				message: "El nombre es requerido"
			});
			return;
		}
		if(!req.body.description){
			res.status(400).send({
				message: "El descripción es requerido"
			});
			return;
		}
		if (req.file !== undefined) {
			let path_multer = req.file.path;
			let name_img = path_multer.substring(11, path_multer.length);
			url_server = "http://127.0.0.1:3000/"
			url_fotografia = `${url_server}images/${name_img}` //TODO ver de solucionar el insert de las rutas
		  } else {
			url_fotografia = "\img-no-insertada";
		  }

		  if(!req.body.genders){
			res.status(400).send({
				message: "se espera un array de generos"
			});
			return;
		}

		const movie = await Movie.create({
			name: req.body.name,
			code: uuid.v4(),
			description: req.body.description,
			image: url_fotografia + ""
		});
	
		res.send(movie);
	},
	async update(req, res){
		if(!req.params.movieId){
			res.status(400).send({
				message: "El id de la movie es requerido"
			});
			return;
		}
		const movie = await Movie.findByPk(req.params.movieId);
		if (movie == null) {
			res.status(404).send({ message: "Pelicula no encontrada" });
			return;
		}
	
		if(!req.body.name){
			res.status(400).send({
				message: "El nombre es requerido"
			});
			return;
		}
		if(!req.body.description){
			res.status(400).send({
				message: "El descripción es requerido"
			});
			return;
		}

		movie.name = req.body.name;
		movie.description = req.body.description;
		await movie.save();
	
		res.send(movie);
	},
	async delete(req,res){
		if(!req.params.movieId){
			res.status(400).send({
				message: "El id de la persona es requerido"
			});
			return;
		}
		const movie = await Movie.findByPk(req.params.movieId);
		if (movie == null) {
			res.status(404).send({ message: "Persona no encontrada" });
			return;
		}
		await movie.destroy();
		res.send({msg: `movie: id:${movie.id} name:${movie.name} fue eliminado`});
	}

};

