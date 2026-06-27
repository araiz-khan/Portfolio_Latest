import {
  User,
  Mail,
  Phone,
  MapPin,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { SocialIcon } from '../social-icon';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-20 md:py-32 bg-[var(--projects-bg)] transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About Me
            </h2>
            <div
              className="flex items-center justify-center py-4 md:hidden"
            >
              <Image
                src="/images/profile-pic.png"
                alt="Profile Avatar"
                width={150}
                height={150}
                sizes="150px"
                className="w-[150px] h-[150px] rounded-full object-cover shadow-lg"
              />
            </div>
            <p className="text-muted-foreground md:text-lg">
              I am a results-oriented software developer with a passion for
              creating elegant and efficient solutions. With a strong foundation
              in modern web technologies, I thrive on tackling complex
              challenges and turning ideas into reality. I am a lifelong
              learner, constantly exploring new tools and techniques to push the
              boundaries of what&apos;s possible.
            </p>
            <p className="text-muted-foreground md:text-lg">
              When I&apos;m not coding, I enjoy traveling, photography, and
              exploring new food points.
            </p>
            <div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-8"
            >
              <div className="flex items-center gap-4">
                <User className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold">Araiz Khan</p>
                </div>
              </div>
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
            <div className="pt-8 flex items-center gap-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full" asChild>
                  <Link href="https://github.com/araiz-khan" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile">
                    <SocialIcon brand="github" className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" asChild>
                  <Link href="https://www.linkedin.com/in/araiz-khan/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile">
                    <SocialIcon brand="linkedin" className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" asChild>
                  <Link href="https://x.com/araiz_exe" target="_blank" rel="noopener noreferrer" aria-label="Visit X (Twitter) profile">
                    <SocialIcon brand="x" className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" asChild>
                  <Link href="https://stackoverflow.com/users/21872928/araiz-khan" target="_blank" rel="noopener noreferrer" aria-label="Visit Stack Overflow profile">
                    <SocialIcon brand="stackoverflow" className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <Button asChild>
                <Link href="/CV.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Link>
              </Button>
            </div>
          </div>
          <div
            className="hidden items-center justify-center md:flex"
          >
            <Image
              src="/images/profile-pic.png"
              alt="Profile Avatar"
              width={300}
              height={300}
              sizes="(min-width: 768px) 300px, 0px"
              className="w-[300px] h-[300px] rounded-full object-cover shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
