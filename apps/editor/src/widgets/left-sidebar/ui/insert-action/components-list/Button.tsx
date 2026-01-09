import { useNode } from "@craftjs/core";
import {
  Label,
  Button as ShadcnButton,
  Separator,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
} from "@repo/ui";
import type { ReactNode } from "react";
import { cn } from "@repo/ui/lib/utils";
import { pagesStore } from "@/shared/store";
import {
  isVisibleOnBreakpoint,
  getResponsiveVisibilityClasses,
  ResponsiveVisibilityControl,
  type ResponsiveVisibility,
} from "@/components";

interface ButtonProps {
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  text: ReactNode;
  responsiveVisibility?: ResponsiveVisibility;
}

export const Button = ({
  size = "default",
  variant = "default",
  text,
  responsiveVisibility,
  ...props
}: ButtonProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const { activeBreakpoint } = pagesStore((state) => state);

  // Check if component should be visible on current breakpoint
  const isVisible = isVisibleOnBreakpoint(
    responsiveVisibility,
    activeBreakpoint,
  );

  if (!isVisible) {
    return null;
  }

  // Generate responsive visibility CSS classes
  const responsiveClasses =
    getResponsiveVisibilityClasses(responsiveVisibility);

  return (
    <ShadcnButton
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={cn(responsiveClasses)}
      size={size}
      variant={variant}
      {...props}
    >
      {text}
    </ShadcnButton>
  );
};

// ---------------------------------------------------------------------

export const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-3">
      {/* Button Text */}
      <div className="space-y-2">
        <Label>Button Text</Label>
        <Input
          value={props.text}
          onChange={(e) =>
            setProp(
              (props: Record<string, unknown>) => (props.text = e.target.value),
            )
          }
          placeholder="Enter button text"
        />
      </div>

      <Separator />

      {/* Size */}
      <div className="flex flex-row items-center gap-1 justify-between">
        <Label>Size</Label>
        <Select
          defaultValue={props.size}
          onValueChange={(e) =>
            setProp((props: Record<string, unknown>) => (props.size = e))
          }
        >
          <SelectTrigger className="w-[140px]" size="sm">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent className="z-101">
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
            <SelectItem value="icon">Icon</SelectItem>
            <SelectItem value="icon-sm">Icon small</SelectItem>
            <SelectItem value="icon-lg">Icon large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Variant */}
      <div className="flex flex-row items-center gap-1 justify-between">
        <Label>Variant</Label>
        <Select
          defaultValue={props.variant}
          onValueChange={(e: string) => {
            setProp((props: Record<string, unknown>) => (props.variant = e));
          }}
        >
          <SelectTrigger className="w-[140px]" size="sm">
            <SelectValue placeholder="Variant" />
          </SelectTrigger>
          <SelectContent className="z-101">
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="destructive">Destructive</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
            <SelectItem value="ghost">Ghost</SelectItem>
            <SelectItem value="link">Link</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Responsive Visibility */}
      <div className="space-y-3">
        <Label>Responsive Visibility</Label>
        <ResponsiveVisibilityControl />
      </div>
    </div>
  );
};

const ButtonDefaultProps = {
  size: "small",
  variant: "default",
  color: "primary",
  text: "Click me",
};

Button.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: ButtonSettings,
  },
};
