import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/registry/lib/utils"

const switchVariants = cva(
  "group peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
      variant: {
        default: "",
        success: "",
        warning: "",
        destructive: "",
      },
      appearance: {
        default: "",
        reference:
          "relative appearance-none rounded-full border-0 bg-[linear-gradient(to_bottom,#969494,#fff)] shadow-[0_2px_0_0_#fff,0_-2px_0_0_#969494] before:pointer-events-none before:absolute before:[inset:calc(2px_*_var(--skeuomorphic-scale,0.3))] before:rounded-full before:bg-[linear-gradient(to_bottom,#9e9e9e_30%,#f4f4f4)]",
      },
    },
    compoundVariants: [
      {
        appearance: "default",
        variant: "default",
        class: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      },
      {
        appearance: "default",
        variant: "success",
        class: "data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-input",
      },
      {
        appearance: "default",
        variant: "warning",
        class: "data-[state=checked]:bg-amber-600 data-[state=unchecked]:bg-input",
      },
      {
        appearance: "default",
        variant: "destructive",
        class: "data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "success",
      appearance: "reference",
    },
  }
)

const skeuomorphicSizeVariants = cva("", {
  variants: {
    size: {
      sm: "h-4 w-8 [--skeuomorphic-scale:0.2]",
      md: "h-6 w-12 [--skeuomorphic-scale:0.3]",
      lg: "h-7 w-14 [--skeuomorphic-scale:0.35]",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const skeuomorphicCanvasVariants = cva(
  "pointer-events-none absolute top-1/2 left-1/2 h-[80px] w-[160px] -translate-x-1/2 -translate-y-1/2 scale-[var(--skeuomorphic-scale)] [transform-origin:center]"
)

const trackVariants = cva(
  "pointer-events-none absolute top-1/2 left-1/2 h-[50px] w-[120px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(to_bottom,#8b8c8e_20%,#f4f4f4)] p-[2px]",
  {
    variants: {
      appearance: {
        default: "overflow-visible rounded-[18px]",
        reference: "overflow-visible rounded-[25px]",
      },
    },
    defaultVariants: {
      appearance: "reference",
    },
  }
)

const trackInnerVariants = cva(
  "block h-full w-full transition-[background-color,box-shadow] duration-200",
  {
    variants: {
      appearance: {
        default: "rounded-[16px]",
        reference: "rounded-[23px]",
      },
      variant: {
        default:
          "bg-[#828080] shadow-[inset_0_0_30px_0_rgba(0,0,0,0.8)] group-data-[state=checked]:bg-[#f7931e] group-data-[state=checked]:shadow-[inset_0_0_30px_0_rgba(0,0,0,0.6)]",
        success:
          "bg-[#828080] shadow-[inset_0_0_30px_0_rgba(0,0,0,0.8)] group-data-[state=checked]:bg-emerald-600 group-data-[state=checked]:shadow-[inset_0_0_30px_0_rgba(0,0,0,0.6)]",
        warning:
          "bg-[#828080] shadow-[inset_0_0_30px_0_rgba(0,0,0,0.8)] group-data-[state=checked]:bg-amber-600 group-data-[state=checked]:shadow-[inset_0_0_30px_0_rgba(0,0,0,0.6)]",
        destructive:
          "bg-[#828080] shadow-[inset_0_0_30px_0_rgba(0,0,0,0.8)] group-data-[state=checked]:bg-destructive group-data-[state=checked]:shadow-[inset_0_0_30px_0_rgba(0,0,0,0.6)]",
      },
    },
    defaultVariants: {
      appearance: "reference",
      variant: "success",
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
      appearance: {
        default: "",
        reference:
          "absolute top-[10px] left-[15px] z-10 h-[60px] w-[60px] !bg-[linear-gradient(to_top,#9e9e9e_20%,#f4f4f4)] shadow-[0_5px_10px_0_rgba(0,0,0,0.7)] transition-[left] duration-200 after:pointer-events-none after:absolute after:top-1 after:left-1 after:z-0 after:h-[52px] after:w-[52px] after:rounded-full after:bg-[#d5d4d4] after:content-[''] data-[state=checked]:left-[86px] data-[state=unchecked]:left-[15px] [&_svg]:relative [&_svg]:z-10",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "default",
    },
  }
)

export interface SwitchVectorizedProps
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
  /**
   * Visual treatment for the switch. The reference treatment is the default;
   * pass "default" for the compact shadcn treatment.
   */
  appearance?: "default" | "reference"
}

export const SwitchVectorized = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchVectorizedProps
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
      appearance = "reference",
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
    const isSkeuomorphic = appearance === "reference"

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
        className={cn(
          switchVariants({
            size: isSkeuomorphic ? null : size,
            variant,
            appearance,
          }),
          isSkeuomorphic ? skeuomorphicSizeVariants({ size }) : null,
          className,
        )}
        checked={isChecked}
        onCheckedChange={handleChange}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        ref={ref}
        {...props}
      >
        {isSkeuomorphic ? (
          <span aria-hidden="true" className={cn(skeuomorphicCanvasVariants())}>
            <span className={cn(trackVariants({ appearance }))}>
              <span className={cn(trackInnerVariants({ variant, appearance }))} />
            </span>
            <SwitchPrimitives.Thumb
              className={cn(thumbVariants({ size: null, appearance }))}
            >
              {renderedIcon ? (
                <span className="relative z-10 flex items-center justify-center">
                  {renderedIcon}
                </span>
              ) : null}
            </SwitchPrimitives.Thumb>
          </span>
        ) : (
          <SwitchPrimitives.Thumb className={cn(thumbVariants({ size, appearance }))}>
            {renderedIcon ? (
              <span className="relative z-10 flex items-center justify-center">
                {renderedIcon}
              </span>
            ) : null}
          </SwitchPrimitives.Thumb>
        )}
      </SwitchPrimitives.Root>
    )
  }
)

SwitchVectorized.displayName = "SwitchVectorized"
