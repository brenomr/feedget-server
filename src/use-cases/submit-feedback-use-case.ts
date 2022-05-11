import { MailAdapter } from "../adapters/email-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string;
};

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ){};

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        await this.feedbacksRepository.create({
            type, comment, screenshot
        });

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div>`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Seu comentário: ${comment}</p>`,
                `</div>`
            ].join('\n'),
        });
    };
};