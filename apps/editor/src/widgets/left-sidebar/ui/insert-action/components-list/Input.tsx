import { useNode } from "@craftjs/core";
import {
  Label,
  Input as ShadcnInput,
  Separator,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Switch,
} from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { pagesStore } from "@/shared/store";
import {
  isVisibleOnBreakpoint,
  getResponsiveVisibilityClasses,
  ResponsiveVisibilityControl,
  type ResponsiveVisibility,
} from "@/components";

interface InputProps {
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  label?: string;
  defaultValue?: string;
  disabled?: boolean;
  responsiveVisibility?: ResponsiveVisibility;
}

export const Input = ({
  placeholder = "",
  type = "text",
  label,
  defaultValue = "",
  disabled = false,
  responsiveVisibility,
  ...props
}: InputProps) => {
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
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={cn("space-y-2", responsiveClasses)}
    >
      {label && <Label>{label}</Label>}
      <ShadcnInput
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

// ---------------------------------------------------------------------

export const InputSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-3">
      {/* Label */}
      <div className="space-y-2">
        <Label>Label</Label>
        <ShadcnInput
          value={props.label || ""}
          onChange={(e) =>
            setProp(
              (props: Record<string, unknown>) =>
                (props.label = e.target.value),
            )
          }
          placeholder="Enter label text"
        />
      </div>

      <Separator />

      {/* Placeholder */}
      <div className="space-y-2">
        <Label>Placeholder</Label>
        <ShadcnInput
          value={props.placeholder || ""}
          onChange={(e) =>
            setProp(
              (props: Record<string, unknown>) =>
                (props.placeholder = e.target.value),
            )
          }
          placeholder="Enter placeholder text"
        />
      </div>

      <Separator />

      {/* Type */}
      <div className="flex flex-row items-center gap-1 justify-between">
        <Label>Type</Label>
        <Select
          defaultValue={props.type}
          onValueChange={(e: string) => {
            setProp((props: Record<string, unknown>) => (props.type = e));
          }}
        >
          <SelectTrigger className="w-[140px]" size="sm">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="z-101">
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="password">Password</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="tel">Tel</SelectItem>
            <SelectItem value="url">URL</SelectItem>
            <SelectItem value="search">Search</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Default Value */}
      <div className="space-y-2">
        <Label>Default Value</Label>
        <ShadcnInput
          value={props.defaultValue || ""}
          onChange={(e) =>
            setProp(
              (props: Record<string, unknown>) =>
                (props.defaultValue = e.target.value),
            )
          }
          placeholder="Enter default value"
        />
      </div>

      <Separator />

      {/* Disabled */}
      <div className="flex flex-row items-center gap-1 justify-between">
        <Label>Disabled</Label>
        <Switch
          checked={props.disabled || false}
          onCheckedChange={(checked) =>
            setProp(
              (props: Record<string, unknown>) => (props.disabled = checked),
            )
          }
        />
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

const InputDefaultProps = {
  placeholder: "Enter text...",
  type: "text",
  label: "Input Label",
  defaultValue: "",
  disabled: false,
};

Input.craft = {
  props: InputDefaultProps,
  related: {
    settings: InputSettings,
  },
};
