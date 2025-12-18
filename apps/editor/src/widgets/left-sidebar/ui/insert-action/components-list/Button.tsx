import { useNode } from "@craftjs/core";
import {
  Label,
  RadioGroup,
  RadioGroupItem,
  Button as ShadcnButton,
  Separator,
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
  const responsiveClasses = getResponsiveVisibilityClasses(responsiveVisibility);

  return (
    <ShadcnButton
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={cn(responsiveClasses)}
      style={{ margin: "5px" }}
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
    <div className="space-y-4">
      <div>
        <Label>Size</Label>
        <RadioGroup
          defaultValue={props.size}
          onValueChange={(e: string) =>
            setProp((props: any) => (props.size = e))
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="default" />
            <Label htmlFor="default">default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sm" id="sm" />
            <Label htmlFor="sm">sm</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lg" id="lg" />
            <Label htmlFor="lg">lg</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="icon" id="icon" />
            <Label htmlFor="icon">icon</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="icon-sm" id="icon-sm" />
            <Label htmlFor="icon-sm">icon sm</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="icon-lg" id="icon-lg" />
            <Label htmlFor="icon-lg">icon lg</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label>Variant</Label>
        <RadioGroup
          defaultValue={props.variant}
          onValueChange={(e: string) => {
            setProp((props: any) => (props.variant = e));
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="default" />
            <Label htmlFor="default">default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="destructive" id="destructive" />
            <Label htmlFor="destructive">destructive</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="outline" id="outline" />
            <Label htmlFor="outline">outline</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="secondary" id="secondary" />
            <Label htmlFor="secondary">secondary</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ghost" id="ghost" />
            <Label htmlFor="ghost">ghost</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="link" id="link" />
            <Label htmlFor="link">link</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <ResponsiveVisibilityControl />
    </div>
  );
};

export const ButtonDefaultProps = {
  size: "small",
  variant: "contained",
  color: "primary",
  text: "Click me",
};

Button.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: ButtonSettings,
  },
};
