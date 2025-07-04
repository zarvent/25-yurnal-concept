import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

/**
 * Yurnal Therapeutic Input System
 * Inspired by Headspace's gentle, approachable form design
 * Optimized for therapeutic interactions with clear feedback
 */
const inputVariants = cva(
  "flex w-full bg-background text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default: "border border-input rounded-therapeutic px-4 py-3 hover:border-primary/50 focus:border-primary/50 focus:shadow-therapeutic-sm",
        therapeutic: "border border-input rounded-therapeutic-lg px-5 py-4 hover:border-primary/50 focus:border-primary/50 focus:shadow-therapeutic-md focus:glow-primary",
        minimal: "border-0 border-b-2 border-b-input rounded-none px-2 py-3 hover:border-b-primary/50 focus:border-b-primary focus:shadow-none",
        filled: "border border-muted bg-muted rounded-therapeutic px-4 py-3 hover:bg-muted/80 focus:bg-background focus:border-primary/50",
        glass: "border border-white/20 bg-white/10 backdrop-blur-sm rounded-therapeutic-lg px-5 py-4 hover:bg-white/20 focus:bg-white/30 focus:border-white/40",
      },
      inputSize: {
        sm: "h-9 text-sm",
        default: "h-11 text-base",
        lg: "h-12 text-lg",
        xl: "h-14 text-xl",
      },
      state: {
        default: "",
        error: "border-destructive focus:border-destructive focus:ring-destructive",
        success: "border-healing focus:border-healing focus:ring-healing",
        warning: "border-warm focus:border-warm focus:ring-warm",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      state: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  helperText?: string
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    variant,
    inputSize,
    state,
    leftIcon,
    rightIcon,
    loading = false,
    helperText,
    label,
    id,
    ...props
  }, ref) => {
    const inputId = id || React.useId()

    const inputElement = (
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          className={cn(
            inputVariants({ variant, inputSize, state }),
            leftIcon && "pl-10",
            (rightIcon || loading) && "pr-10",
            className
          )}
          ref={ref}
          disabled={loading || props.disabled}
          {...props}
        />

        {(rightIcon || loading) && (
          <div className="absolute right-3 flex items-center pointer-events-none text-muted-foreground">
            {loading ? (
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
            ) : (
              rightIcon
            )}
          </div>
        )}
      </div>
    )

    if (label || helperText) {
      return (
        <div className="space-y-2">
          {label && (
            <label
              htmlFor={inputId}
              className="text-sm font-medium text-foreground block"
            >
              {label}
            </label>
          )}
          {inputElement}
          {helperText && (
            <p className={cn(
              "text-xs",
              state === "error" && "text-destructive",
              state === "success" && "text-healing",
              state === "warning" && "text-warm",
              state === "default" && "text-muted-foreground"
            )}>
              {helperText}
            </p>
          )}
        </div>
      )
    }

    return inputElement
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
