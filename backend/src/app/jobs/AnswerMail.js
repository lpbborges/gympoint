import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { helpOrder, answer } = data;
    await Mail.sendMail({
      to: `${helpOrder.Student.name} <${helpOrder.Student.email}>`,
      subject: 'Dúvida respondida!',
      template: 'answer',
      context: {
        student: helpOrder.Student.name,
        question: helpOrder.question,
        answer,
      },
    });
  }
}

export default new AnswerMail();
