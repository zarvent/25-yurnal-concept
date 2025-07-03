import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import clsx from 'clsx'
import * as React from "react"

/**
 * Yurnal Therapeutic Button System
 * Inspired by Headspace's calming, trustworthy design principles
 * Optimized for therapeutic interfaces with accessibility-first approach
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 ease-in-out ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 hover:-translate-y-0.5 active:translate-y-0",
  {
    variants: {
      variant: {
        // Primary - Trust & Action (Headspace-inspired blue)
        default: "bg-primary text-primary-foreground rounded-therapeutic shadow-therapeutic hover:bg-primary/90 hover:shadow-therapeutic-md",

        // Healing - Growth & Support (Therapeutic green)
        healing: "bg-healing text-healing-foreground rounded-therapeutic shadow-healing-glow hover:bg-healing/90 hover:shadow-therapeutic-md",

        // Warm - Energy & Encouragement (Therapeutic amber)
        warm: "bg-warm text-warm-foreground rounded-therapeutic shadow-warm-glow hover:bg-warm/90 hover:shadow-therapeutic-md",

        // Calm - Mindfulness & Peace (Therapeutic purple)
        calm: "bg-calm text-calm-foreground rounded-therapeutic shadow-calm-glow hover:bg-calm/90 hover:shadow-therapeutic-md",

        // Secondary - Professional & Subtle
        secondary: "bg-secondary text-secondary-foreground rounded-therapeutic border border-border hover:bg-secondary/80 hover:shadow-therapeutic-sm",

        // Destructive - Critical actions with care
        destructive: "bg-destructive text-destructive-foreground rounded-therapeutic shadow-therapeutic hover:bg-destructive/90 hover:shadow-therapeutic-md",

        // Outline - Gentle emphasis
        outline: "border border-input bg-background rounded-therapeutic hover:bg-accent hover:text-accent-foreground hover:shadow-therapeutic-sm",

        // Ghost - Minimal interference
        ghost: "rounded-therapeutic hover:bg-accent hover:text-accent-foreground",

        // Link - Text-only actions
        link: "text-primary underline-offset-4 hover:underline rounded-sm",

        // Ecosystem-specific variants for personalized experiences
        patient: "bg-patient text-white rounded-therapeutic shadow-primary-glow hover:bg-patient/90 hover:shadow-therapeutic-md",
        therapist: "bg-therapist text-white rounded-therapeutic shadow-calm-glow hover:bg-therapist/90 hover:shadow-therapeutic-md",
        academic: "bg-academic text-white rounded-therapeutic shadow-healing-glow hover:bg-academic/90 hover:shadow-therapeutic-md",
        student: "bg-student text-white rounded-therapeutic shadow-warm-glow hover:bg-student/90 hover:shadow-therapeutic-md",
      },
      size: {
        sm: "h-9 px-3 py-1.5 text-xs rounded-therapeutic",
        default: "h-11 px-6 py-3 text-sm rounded-therapeutic",
        lg: "h-12 px-8 py-4 text-base rounded-therapeutic-lg",
        xl: "h-14 px-10 py-5 text-lg rounded-therapeutic-xl",
        icon: "h-10 w-10 rounded-therapeutic",
        "icon-sm": "h-8 w-8 rounded-therapeutic",
        "icon-lg": "h-12 w-12 rounded-therapeutic-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
