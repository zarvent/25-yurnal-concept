import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Yurnal Therapeutic Card System
 * Inspired by Headspace's calming, organized content presentation
 * Designed for therapeutic interfaces with depth and warmth
 */
const cardVariants = cva(
  "bg-card text-card-foreground transition-all duration-200 ease-in-out border border-border shadow-therapeutic",
  {
    variants: {
      variant: {
        // Default therapeutic card
        default: "rounded-therapeutic-lg hover:shadow-therapeutic-md hover:border-primary/20 hover:-translate-y-1",

        // Interactive card for clickable content
        interactive: "rounded-therapeutic-lg cursor-pointer hover:shadow-therapeutic-lg hover:border-primary/30 hover:-translate-y-2 active:translate-y-0 active:shadow-therapeutic",

        // Glass morphism for modern touch
        glass: "rounded-therapeutic-lg backdrop-blur-sm bg-white/80 border-white/20 hover:backdrop-blur-md hover:bg-white/90 hover:border-white/30",

        // Elevated card for important content
        elevated: "rounded-therapeutic-xl shadow-therapeutic-lg hover:shadow-therapeutic-xl hover:-translate-y-1",

        // Flat card for minimal design
        flat: "rounded-therapeutic border-0 shadow-none hover:shadow-therapeutic-sm",

        // Ecosystem-specific cards
        patient: "rounded-therapeutic-lg border-l-4 border-l-patient bg-gradient-to-r from-patient/5 to-transparent hover:from-patient/10",
        therapist: "rounded-therapeutic-lg border-l-4 border-l-therapist bg-gradient-to-r from-therapist/5 to-transparent hover:from-therapist/10",
        academic: "rounded-therapeutic-lg border-l-4 border-l-academic bg-gradient-to-r from-academic/5 to-transparent hover:from-academic/10",
        student: "rounded-therapeutic-lg border-l-4 border-l-student bg-gradient-to-r from-student/5 to-transparent hover:from-student/10",
      },
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  loading?: boolean
}

export function Card({ className, variant, padding, loading = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    >
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
          <div className="h-3 bg-muted rounded w-2/3"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  padding = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { padding?: "none" | "sm" | "default" | "lg" | "xl" }) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
    xl: "p-10",
  }

  return (
    <div
      className={cn(paddingClasses[padding], className)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-therapeutic-h3 font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-therapeutic-caption text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

export { CardDescription, CardTitle, cardVariants };

