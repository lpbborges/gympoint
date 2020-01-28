import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, plan, end_date } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula realizada!',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        endDate: format(parseISO(end_date), "dd'/'MM'/'yyyy", {
          locale: pt,
        }),
        price: plan.price,
      },
    });
  }
}

export default new RegistrationMail();
