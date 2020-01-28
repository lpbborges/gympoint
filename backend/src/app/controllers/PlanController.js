import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Plan.findAll({
      order: ['id'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async show(req, res) {
    const plan = await Plan.findByPk(req.params.id, {
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .max(9999)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(401).json({ error: 'Plan already exists' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number()
        .integer()
        .positive(),
      price: Yup.number()
        .positive()
        .max(9999),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { title } = req.body;

    const plan = await Plan.findByPk(req.params.id);

    if (title !== plan.title) {
      const planExists = await Plan.findOne({ where: { title } });

      if (planExists) {
        return res.status(401).json({ error: 'Title already exists' });
      }
    }

    const { id, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    await Plan.destroy({ where: { id: req.params.id } });

    return res.send();
  }
}

export default new PlanController();
