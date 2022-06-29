const db = require("../models");

exports.index = async (req, res) => {
    const listaPersonas = await db.personas.findAll();
    res.send(listaPersonas);
}
exports.store = async (req, res) => {
    if(!req.body.nombres){
        res.status(400).send({
            message: "El nombre es requerido"
        });
        return;
    }
    if(!req.body.apellidos){
        res.status(400).send({
            message: "El apellido es requerido"
        });
        return;
    }
    if(!req.body.edad){
        res.status(400).send({
            message: "La edad es requerido"
        });
        return;
    }
    if(!req.body.fechaNacimiento){
        res.status(400).send({
            message: "La fecha de nacimiento es requerido"
        });
        return;
    }
    if(!req.body.ciudad){
        res.status(400).send({
            message: "La ciudad es requerido"
        });
        return;
    }
    const persona = await db.personas.create({
        ...req.body
    });

    res.send(persona);
}
exports.update = async (req, res) => {
    if(!req.params.personaid){
        res.status(400).send({
            message: "El id de la persona es requerido"
        });
        return;
    }
    const persona = await db.personas.findByPk(req.params.personaid);
    if (persona == null) {
        res.status(404).send({ message: "Persona no encontrada" });
        return;
    }

    if(!req.body.nombres){
        res.status(400).send({
            message: "El nombre es requerido"
        });
        return;
    }
    if(!req.body.apellidos){
        res.status(400).send({
            message: "El apellido es requerido"
        });
        return;
    }
    if(!req.body.edad){
        res.status(400).send({
            message: "La edad es requerido"
        });
        return;
    }
    if(!req.body.fechaNacimiento){
        res.status(400).send({
            message: "La fecha de nacimiento es requerido"
        });
        return;
    }
    if(!req.body.ciudad){
        res.status(400).send({
            message: "La ciudad es requerido"
        });
        return;
    }
    persona.nombres = req.body.nombres;
    persona.apellidos = req.body.apellidos;
    persona.edad = req.body.edad;
    persona.fechaNacimiento = req.body.fechaNacimiento;
    persona.ciudad = req.body.ciudad;
    await persona.save();

    res.send(persona);
}
exports.delete = async (req, res) => {
    if(!req.params.personaid){
        res.status(400).send({
            message: "El id de la persona es requerido"
        });
        return;
    }
    const persona = await db.personas.findByPk(req.params.personaid);
    if (persona == null) {
        res.status(404).send({ message: "Persona no encontrada" });
        return;
    }
    await persona.destroy();
    res.send({});
}
exports.show = async (req, res) => {
    if(!req.params.personaid){
        res.status(400).send({
            message: "El id de la persona es requerido"
        });
        return;
    }
    const persona = await db.personas.findByPk(req.params.personaid);
    if (persona == null) {
        res.status(404).send({ message: "Persona no encontrada" });
        return;
    }
    res.send(persona);
}
