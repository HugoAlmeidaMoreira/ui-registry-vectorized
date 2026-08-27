import * as React from "react"
import {
  SwitchVectorized,
  type SwitchVectorizedProps,
} from "@/registry/ui/switch-vectorized"

export type SwitchProps = SwitchVectorizedProps

/**
 * Radix-backed drop-in switch with the reference skeuomorphic treatment enabled
 * by default. Pass `appearance="default"` for the compact shadcn treatment.
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ appearance = "reference", ...props }, ref) => (
    <SwitchVectorized ref={ref} appearance={appearance} {...props} />
  )
)

Switch.displayName = "Switch"
