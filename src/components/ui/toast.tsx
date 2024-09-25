import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X } from "lucide-react"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    style={{
      position: "fixed",
      top: 0,
      zIndex: 100,
      display: "flex",
      maxHeight: "100vh",
      width: "100%",
      // flexDirection: "column-reverse",
      padding: "1rem",
      bottom: "auto",
      right: 0,
      flexDirection: "column",
      maxWidth: "420px",
    }}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = (variant: string) => {
  switch (variant) {
    case "destructive":
      return {
        border: "1px solid #F87171", // equivalent to `border-destructive`
        backgroundColor: "#F87171",  // equivalent to `bg-destructive`
        color: "#FFF",               // equivalent to `text-destructive-foreground`
      };
    default:
      return {
        border: "1px solid #E5E7EB", // equivalent to `border`
        backgroundColor: "#F9FAFB",  // equivalent to `bg-background`
        color: "#1F2937",            // equivalent to `text-foreground`
      };
  }
};

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & { variant?: string }
>(({ variant = "default", ...props }, ref) => {
  const toastStyles = toastVariants(variant);

  return (
    <ToastPrimitives.Root
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.5rem",
        paddingRight: "2rem",
        borderRadius: "0.375rem",
        overflow: "hidden",
        transition: "all 0.3s ease",
        ...toastStyles,  // Apply dynamic bg, border, and text colors here
      }}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    style={{
      display: "inline-flex",
      height: "2rem",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 0.75rem",
      fontSize: "0.875rem",
      borderRadius: "0.375rem",
      backgroundColor: "transparent",
      border: "1px solid #E5E7EB",
      transition: "all 0.3s ease",
    }}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    style={{
      position: "absolute",
      top: "2rem",
      right: "2rem",
      padding: "0.25rem",
      borderRadius: "0.375rem",
      opacity: 0.5,
      transition: "opacity 0.3s ease",
      color: "#1F2937",  // `text-foreground`
    }}
    {...props}
  >
    <X style={{ width: "1rem", height: "1rem" }} />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    style={{
      fontSize: "0.875rem",
      fontWeight: 600,
    }}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    style={{
      fontSize: "0.875rem",
      opacity: 0.9,
    }}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
