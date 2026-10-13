'use client';

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Accordion built on native <details> and <summary>, so every answer is in the server HTML
 * for search engines and AI assistants (brief 7.1), and keyboard access comes free.
 * Same API as the old Radix version. type="single" keeps one item open at a time through the
 * details name attribute; the old `collapsible`, `defaultValue` and `value` props are accepted
 * and ignored.
 */
const AccordionGroupContext = React.createContext(undefined)

const Accordion = React.forwardRef(({ type = "single", collapsible, defaultValue, className, children, ...props }, ref) => {
  const groupName = React.useId()
  return (
    <AccordionGroupContext.Provider value={type === "single" ? groupName : undefined}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </AccordionGroupContext.Provider>
  )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, value, ...props }, ref) => {
  const groupName = React.useContext(AccordionGroupContext)
  return <details ref={ref} name={groupName} className={cn("group border-b", className)} {...props} />
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <summary
    ref={ref}
    className={cn(
      "flex flex-1 cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium transition-all hover:underline text-left [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1044ff] rounded-lg",
      className
    )}
    {...props}>
    {children}
    <ChevronDown
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
  </summary>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className="text-sm" {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </div>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
