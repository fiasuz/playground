import { useNode } from "@craftjs/core";
import {
  Label,
  RadioGroup,
  RadioGroupItem,
  Button as ShadcnButton,
} from "@repo/ui";
import type { ReactNode } from "react";

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
}

export const Button = ({
  size = "default",
  variant = "default",
  text,
  ...props
}: ButtonProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <ShadcnButton
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
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
    <div>
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
