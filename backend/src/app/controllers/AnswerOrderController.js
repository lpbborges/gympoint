import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import AnswerMail from '../jobs/AnswerMail';

import Queue from '../../lib/Queue';

class AnswerOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helpOrders = await HelpOrder.findAll({
      where: { answer: null, answer_at: null },
      order: ['created_at'],
      attributes: ['id', 'student_id', 'question'],
      include: [
        {
          model: Student,
          attributes: ['name'],
        },
      ],
      offset: (page - 1) * 10,
      limit: 10,
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          attributes: ['name', 'email'],
        },
      ],
    });

    const { id, student_id, question, answer_at } = await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    await Queue.add(AnswerMail.key, {
      helpOrder,
      answer,
    });

    return res.json({
      id,
      student_id,
      question,
      answer,
      answer_at,
    });
  }
}

export default new AnswerOrderController();
