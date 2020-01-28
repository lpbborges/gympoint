import { Op } from 'sequelize';
import { startOfDay, endOfDay, subDays } from 'date-fns';

import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
      order: [['created_at', 'DESC']],
      attributes: ['id', 'created_at', 'student_id'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const student_id = req.params.id;

    const countCheckin = await Checkin.findAndCountAll({
      where: {
        created_at: {
          [Op.and]: {
            [Op.between]: [
              startOfDay(subDays(new Date(), 5)),
              endOfDay(new Date()),
            ],
          },
        },
      },
    }).then(result => {
      return result.count;
    });

    if (countCheckin >= 5) {
      return res.status(400).json({ error: 'Permission denied' });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
