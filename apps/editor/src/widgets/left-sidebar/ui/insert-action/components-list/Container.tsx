/* eslint-disable react-refresh/only-export-components */

import { useNode } from "@craftjs/core";
import { Label, Separator } from "@repo/ui";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@repo/ui/lib/utils";
import { pagesStore } from "@/shared/store";
import {
  isVisibleOnBreakpoint,
  getResponsiveVisibilityClasses,
  ResponsiveVisibilityControl,
  type ResponsiveVisibility,
} from "@/components";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  background: string;
  padding: number;
  children: ReactNode;
  responsiveVisibility?: ResponsiveVisibility;
}

export const Container = ({
  background,
  padding,
  children,
  responsiveVisibility,
  ...props
}: ContainerProps) => {
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
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={cn(responsiveClasses, props.className)}
      style={{ margin: "5px 0", background, padding: `${padding}px` }}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label>Background</Label>
        <input
          type="color"
          name="background-color"
          value={background}
          onChange={(e) => {
            setProp(
              (props: Record<string, unknown>) =>
                (props.background = e.target.value),
              500,
            );
          }}
        />
      </div>
      <div>
        <Label>Padding</Label>
        <input
          type="range"
          defaultValue={padding}
          onChange={(e) =>
            setProp(
              (props: Record<string, unknown>) =>
                (props.padding = e.target.value),
              500,
            )
          }
        />
      </div>

      <Separator />

      <ResponsiveVisibilityControl />
    </div>
  );
};

export const ContainerDefaultProps = {
  background: "#ffffff",
  padding: 3,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
