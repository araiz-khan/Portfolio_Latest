'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

const ContactForm = dynamic(() => import('@/components/contact-form').then(mod => ({ default: mod.ContactForm })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-muted rounded-lg h-96"></div>
});

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-background py-20 md:py-32 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Have a project in mind, a question, or just want to say hi? I&apos;d love to hear from you. Fill out the form, and I&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:araizkhaan@gmail.com"
                    className="font-semibold hover:underline"
                  >
                    araizkhaan@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+923393939399" className="font-semibold hover:underline">
                    +92 339 3939399
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">Lahore, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button variant="outline" size="icon" asChild className="rounded-full">
                <Link href="https://github.com/araiz-khan" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile"><Github className="h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="rounded-full">
                <Link href="https://www.linkedin.com/in/araiz-khan/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile"><Linkedin className="h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="rounded-full">
                <Link href="https://x.com/araiz_exe" target="_blank" rel="noopener noreferrer" aria-label="Visit X (Twitter) profile"><Twitter className="h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
