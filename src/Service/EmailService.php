<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EmailService
{
    private MailerInterface $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendReply(string $recipientEmail, string $subject, string $content): void
    {
        $email = (new Email())
            ->from('admin@monsite.com')
            ->to($recipientEmail)
            ->subject($subject)
            ->text($content)
            ->html("<p>$content</p>");

        $this->mailer->send($email);
    }
}
