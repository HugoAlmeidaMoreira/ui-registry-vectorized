import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/registry/lib/utils"

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
      variant: {
        default: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        success: "data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-input",
        warning: "data-[state=checked]:bg-amber-600 data-[state=unchecked]:bg-input",
        destructive: "data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

const thumbVariants = cva(
  "pointer-events-none flex items-center justify-center rounded-full bg-background shadow-sm ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0 [&_svg]:size-2",
        md: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 [&_svg]:size-3",
        lg: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0 [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface CustomSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  /**
   * Element or render function to display inside the moving thumb.
   */
  thumbIcon?: React.ReactNode | ((checked: boolean) => React.ReactNode)
  /**
   * Icon displayed when checked (state = true).
   */
  checkedIcon?: React.ReactNode
  /**
   * Icon displayed when unchecked (state = false).
   */
  uncheckedIcon?: React.ReactNode
  /**
   * If true, shows a subtle spinner and prevents interaction.
   */
  loading?: boolean
}

export const CustomSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  CustomSwitchProps
>(
  (
    {
      className,
      size,
      variant,
      thumbIcon,
      checkedIcon,
      uncheckedIcon,
      loading = false,
      disabled,
      checked,
      defaultChecked,
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = React.useState<boolean>(
      defaultChecked ?? false
    )

    const isChecked = isControlled ? Boolean(checked) : internalChecked

    const handleChange = (newChecked: boolean) => {
      if (loading) return
      if (!isControlled) {
        setInternalChecked(newChecked)
      }
      onCheckedChange?.(newChecked)
    }

    let renderedIcon: React.ReactNode = null
    if (loading) {
      renderedIcon = (
        <svg
          className="animate-spin text-muted-foreground"
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
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )
    } else if (typeof thumbIcon === "function") {
      renderedIcon = thumbIcon(isChecked)
    } else if (thumbIcon) {
      renderedIcon = thumbIcon
    } else if (isChecked && checkedIcon) {
      renderedIcon = checkedIcon
    } else if (!isChecked && uncheckedIcon) {
      renderedIcon = uncheckedIcon
    }

    return (
      <SwitchPrimitives.Root
        className={cn(switchVariants({ size, variant, className }))}
        checked={isChecked}
        onCheckedChange={handleChange}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        ref={ref}
        {...props}
      >
        <SwitchPrimitives.Thumb className={cn(thumbVariants({ size }))}>
          {renderedIcon}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    )
  }
)

CustomSwitch.displayName = "CustomSwitch"
