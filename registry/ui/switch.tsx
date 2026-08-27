import * as React from "react"
import {
  CustomSwitch,
  type CustomSwitchProps,
} from "@/registry/ui/custom-switch"

export type SwitchProps = CustomSwitchProps

/**
 * Radix-backed drop-in switch with the reference skeuomorphic treatment enabled
 * by default. Pass `appearance="default"` for the compact shadcn treatment.
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ appearance = "reference", ...props }, ref) => (
    <CustomSwitch ref={ref} appearance={appearance} {...props} />
  )
)

Switch.displayName = "Switch"
