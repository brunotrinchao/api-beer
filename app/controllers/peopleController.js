const People = require('../models/peopleModel');


exports.createPeople = async (req, res, next) => {
  try {
    const { name } = req.body;
    const people = await People.create({ name });
    res.status(201).json({ message: 'People created!', people });
  } catch (error) {
    next(error);
  }
};

exports.getPeople = async (req, res, next) => {
  try {
    const people = await People.findAll();
    res.status(200).json({
      message: 'People fetched!',
      count: people.length,
      data: people.map((people) => {
        return {
          id: people.id,
          name: people.name,
          request: {
            type: 'GET',
            url: `${process.env.BASE_URL}/people/${people.id}`,
          },
        };
      }),
    });
  } catch (error) {
    next(error);
  }
};

exports.getPeopleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const people = await People.findByPk(id);
    if (!people) {
      const error = new Error('People not found!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'People fetched!',
      data: {
        id: people.id,
        name: people.name,
        request: {
          type: 'GET',
          url: `${process.env.BASE_URL}/people/${people.id}`,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePeople = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const people = await People.findByPk(id);
    if (!people) {
      const error = new Error('People not found!');
      error.statusCode = 404;
      throw error;
    }
    await people.update({ name });
    res.status(200).json({ message: 'People updated!', people });
  } catch (error) {
    next(error);
  }
};

exports.deletePeople = async (req, res, next) => {
  try {
    const { id } = req.params;
    const people = await People.findByPk(id);
    if (!people) {
      const error = new Error('People not found!');
      error.statusCode = 404;
      throw error;
    }
    await people.destroy();
    res.status(200).json({ message: 'People deleted!' });
  } catch (error) {
    next(error);
  }
};

