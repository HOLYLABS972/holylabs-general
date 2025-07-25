import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "cta-primary": 
          "text-black rounded-md border-0 transition-all duration-200 shadow-lg shadow-black/20",
        "cta-secondary": 
          "text-white rounded-md border-0 transition-all duration-200 shadow-lg shadow-black/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-10 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-11 w-11",
        cta: "px-6 py-3 h-auto text-lg tracking-[-0.36px] leading-[20.5px] rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Custom styles for CTA buttons (background only, no boxShadow to allow Tailwind shadows)
const ctaStyles = {
  primary: {
    background: 'linear-gradient(125deg, #FBFCFF -4%, #FBFCFF 100%)',
  },
  secondary: {
    background: 'linear-gradient(125deg, rgb(17, 24, 39) -4%, rgb(75, 85, 99)',
  }
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Apply CTA styles if using CTA variants
    const ctaStyle = variant === "cta-primary" ? ctaStyles.primary :
                     variant === "cta-secondary" ? ctaStyles.secondary :
                     {};
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ ...ctaStyle, ...style }}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
