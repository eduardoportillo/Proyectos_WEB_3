const Movie = require("../models/MovieModel")

module.exports = {
    async getAll(request, response){
        const movies = await Movie.findAll();
        response.status(200).json(movies)
    }
}