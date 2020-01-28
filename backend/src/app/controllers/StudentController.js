import * as Yup from 'yup';

import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { name, page = 1, order_field } = req.query;

    const students = await Student.findAll({
      where: name ? { name: { [Op.startsWith]: name } } : null,
      order: order_field ? [order_field] : ['id'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json(students);
  }

  async auth(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id, {
      attributes: ['id'],
    });

    return res.json(student);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id, {
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .positive()
        .required(),
      weight: Yup.number()
        .max(999)
        .positive()
        .required(),
      height: Yup.number()
        .max(9)
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.status(201).json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .integer()
        .positive(),
      weight: Yup.number()
        .max(999)
        .positive(),
      height: Yup.number()
        .max(9)
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const { id, name, email, age, weight, height } = await student.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    await Student.destroy({ where: { id: req.params.id } });

    return res.send();
  }
}

export default new StudentController();
