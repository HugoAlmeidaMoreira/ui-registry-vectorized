import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/registry/lib/utils"

/**
 * Reference canvas geometry, in the 160x80 space the original CSS was drawn in
 * (see landing/switch.txt). Every nested offset, radius and effect below is
 * expressed in that space and scaled uniformly by --skeuomorphic-scale.
 *
 * Both appearances are shortened by 20 against the original drawing, taken off
 * the length only and split evenly at both ends, so the thumb keeps its margins
 * to the window edges and only its travel shrinks.
 *
 *   reference  window x  10..150  y  0..80  (140x80)
 *              body   x  30..130  y 15..65  (100x50, radius 25)
 *              thumb  x  25..136  y 10..70  (60x60, off at 25, on at 76,
 *                     travel 51, overhanging the body by 5 left and 6 right)
 *
 * The "bare" appearance drops the outer rim and shell, so its body fills the
 * whole window. Its thumb is 66 -- taller than the 60-tall body, so it overhangs
 * by 3 above and below, exactly as the reference thumb overhangs its own body:
 *
 *   bare       window x  24..136  y  7..73  (112x66)
 *              body   x  24..136  y 10..70  (112x60, radius 30, padding 2)
 *              inset  108x56 (radius 28)
 *              thumb  x  24..136  y  7..73  (66x66, off at 24, on at 70,
 *                     travel 46)
 *
 * Every window shares the 160x80 canvas centre (80, 40), so the canvas stays
 * centred and needs no re-origin. The bare thumb's inner disc and drop shadow
 * are scaled by 66/60 = 1.1 from the reference values, per rule 6 in AGENTS.md.
 *
 *   size | scale | reference 160x80 | bare 132x60
 *   sm   | 0.20  |      32 x 16     |  26.4 x 12
 *   md   | 0.30  |      48 x 24     |  39.6 x 18
 *   lg   | 0.35  |      56 x 28     |  46.2 x 21
 */
const SKEUOMORPHIC_THUMB_BASE =
  "absolute z-10 !bg-[linear-gradient(to_top,#9e9e9e_20%,#f4f4f4)] transition-[left,color] duration-200 after:pointer-events-none after:absolute after:z-0 after:rounded-full after:bg-[#d5d4d4] after:content-[''] data-[state=unchecked]:text-[#6b6b6b] data-[state=checked]:text-emerald-700 [&_svg]:relative [&_svg]:z-10 [&_svg]:h-[42%] [&_svg]:w-[42%]"

const REFERENCE_THUMB =
  `${SKEUOMORPHIC_THUMB_BASE} top-[10px] h-[60px] w-[60px] shadow-[0_5px_10px_0_rgba(0,0,0,0.7)] after:top-[4px] after:left-[4px] after:h-[52px] after:w-[52px] data-[state=unchecked]:left-[25px] data-[state=checked]:left-[76px]`

const BARE_THUMB =
  `${SKEUOMORPHIC_THUMB_BASE} top-[7px] h-[66px] w-[66px] shadow-[0_5.5px_11px_0_rgba(0,0,0,0.7)] after:top-[4.4px] after:left-[4.4px] after:h-[57.2px] after:w-[57.2px] data-[state=unchecked]:left-[24px] data-[state=checked]:left-[70px]`

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
        // No outer rim and no outer shell: the root carries no surface of its
        // own, only the focus ring. overflow-visible lets the thumb shadow
        // spill past the cropped canvas without affecting the layout box.
        bare: "relative appearance-none overflow-visible rounded-full border-0 bg-transparent",
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

const skeuomorphicSizeVariants = cva(
  "w-[calc(var(--skeuomorphic-canvas-w)_*_var(--skeuomorphic-scale))] h-[calc(var(--skeuomorphic-canvas-h)_*_var(--skeuomorphic-scale))]",
  {
    variants: {
      size: {
        sm: "[--skeuomorphic-scale:0.2]",
        md: "[--skeuomorphic-scale:0.3]",
        lg: "[--skeuomorphic-scale:0.35]",
      },
      appearance: {
        default: "",
        reference:
          "[--skeuomorphic-canvas-w:140px] [--skeuomorphic-canvas-h:80px]",
        bare: "[--skeuomorphic-canvas-w:112px] [--skeuomorphic-canvas-h:66px]",
      },
    },
    defaultVariants: {
      size: "md",
      appearance: "reference",
    },
  }
)

const skeuomorphicCanvasVariants = cva(
  "pointer-events-none absolute top-1/2 left-1/2 h-[80px] w-[160px] -translate-x-1/2 -translate-y-1/2 scale-[var(--skeuomorphic-scale)] [transform-origin:center]"
)

const trackVariants = cva(
  "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible bg-[linear-gradient(to_bottom,#8b8c8e_20%,#f4f4f4)] p-[2px]",
  {
    variants: {
      appearance: {
        default: "h-[50px] w-[120px] rounded-[18px]",
        reference: "h-[50px] w-[100px] rounded-[25px]",
        // No shell to sit inside, so the body fills the cropped canvas.
        bare: "h-[60px] w-[112px] rounded-[30px]",
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
        bare: "rounded-[28px]",
      },
      variant: {
        default:
          "bg-[#828080] shadow-[inset_0_0_30px_0_rgba(0,0,0,0.8)] data-[state=checked]:bg-[#f7931e] data-[state=checked]:shadow-[inset_0_0_30px_0_rgba(0,0,0,0.6)]",
        success:
          "bg-[#828080] shadow-[inset_0_0_30px_0_rgba(0,0,0,0.8)] data-[state=checked]:bg-emerald-600 data-[state=checked]:shadow-[inset_0_0_30px_0_rgba(0,0,0,0.6)]",
        warning:
          "bg-[#828080] shadow-[inset_0_0_30px_0_rgba(0,0,0,0.8)] data-[state=checked]:bg-amber-600 data-[state=checked]:shadow-[inset_0_0_30px_0_rgba(0,0,0,0.6)]",
        destructive:
          "bg-[#828080] shadow-[inset_0_0_30px_0_rgba(0,0,0,0.8)] data-[state=checked]:bg-destructive data-[state=checked]:shadow-[inset_0_0_30px_0_rgba(0,0,0,0.6)]",
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
        reference: REFERENCE_THUMB,
        bare: BARE_THUMB,
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
   * pass "bare" for the same drawing without the outer rim and shell, or
   * "default" for the compact shadcn treatment.
   */
  appearance?: "default" | "reference" | "bare"
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
    const isSkeuomorphic = appearance === "reference" || appearance === "bare"
    // Every layer carries the state, so each one can be styled off its own
    // data-state and shows up in the DOM for external CSS to target.
    const dataState = isChecked ? "checked" : "unchecked"

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
          isSkeuomorphic ? skeuomorphicSizeVariants({ size, appearance }) : null,
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
          <span
            aria-hidden="true"
            data-state={dataState}
            className={cn(skeuomorphicCanvasVariants())}
          >
            <span data-state={dataState} className={cn(trackVariants({ appearance }))}>
              <span
                data-state={dataState}
                className={cn(trackInnerVariants({ variant, appearance }))}
              />
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
