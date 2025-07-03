'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

interface FeatureShowcaseProps {
  ecosystem: 'patient' | 'therapist' | 'academic' | 'student' | 'business';
  title: string;
  subtitle: string;
  features: Feature[];
}

export function FeatureShowcase({ ecosystem, title, subtitle, features }: FeatureShowcaseProps) {
  const ecosystemColors = {
    patient: 'border-l-patient bg-gradient-to-r from-patient/5 to-transparent',
    therapist: 'border-l-therapist bg-gradient-to-r from-therapist/5 to-transparent',
    academic: 'border-l-academic bg-gradient-to-r from-academic/5 to-transparent',
    student: 'border-l-student bg-gradient-to-r from-student/5 to-transparent',
    business: 'border-l-warm bg-gradient-to-r from-warm/5 to-transparent'
  };

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-therapeutic-h2 font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-therapeutic-body text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`border-l-4 ${ecosystemColors[ecosystem]} hover:shadow-therapeutic-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-therapeutic-body">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-healing mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
