import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: req.params.id },
      order: [['updated_at', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'student_id',
        'question',
        'answer',
        'answer_at',
        'created_at',
      ],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .positive()
        .required(),
      question: Yup.string().required(),
    });

    const { question } = req.body;
    const student_id = req.params.id;

    if (!(await schema.isValid({ question, student_id }))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = await HelpOrder.create({
      student_id: req.params.id,
      question,
    });

    return res.json({ id, student_id, question });
  }
}

export default new HelpOrderController();
