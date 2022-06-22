const Movie = require("../models/movieModel")

module.exports = {
    async getAll(request, response){
        const movies = await Movie.findAll();
        response.status(200).json(movies)
    }
}