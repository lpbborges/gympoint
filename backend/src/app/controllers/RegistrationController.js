import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const registrations = await Registration.findAll({
      order: ['end_date'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      include: [
        {
          model: Student,
          attributes: ['name'],
        },
        {
          model: Plan,
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    return res.json(registrations);
  }

  async show(req, res) {
    const registration = await Registration.findByPk(req.params.id, {
      attributes: ['id', 'student_id', 'plan_id', 'start_date'],
      include: [
        {
          model: Student,
          attributes: ['name'],
        },
        {
          model: Plan,
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    return res.json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const price = plan.duration * plan.price;

    const { active } = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    const student = await Student.findByPk(student_id);

    await Queue.add(RegistrationMail.key, {
      student,
      plan,
      end_date,
    });

    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      active,
    });
  }

  async update(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    const { plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const price = plan.duration * plan.price;

    const { id, student_id, active } = await registration.update({
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      active,
    });
  }

  async delete(req, res) {
    await Registration.destroy({ where: { id: req.params.id } });

    return res.send();
  }
}

export default new RegistrationController();
