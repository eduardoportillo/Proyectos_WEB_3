const Movie = require('../models/MovieModel');
const uuid = require('uuid');

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

		uuidGenerator = uuid.v4();
		console.log(uuidGenerator);
		const movie = await Movie.create({
			name: req.body.name,
			code: uuidGenerator,
			description: req.body.description,
			image: "Aqui va la Ruta"
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

