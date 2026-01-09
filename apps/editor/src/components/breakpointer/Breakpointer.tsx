import { breakpoints } from "@/shared/constants";
import { pagesStore } from "@/shared/store";
import { useNode } from "@craftjs/core";
import { Label } from "@repo/ui";
import type { HTMLAttributes, ReactNode } from "react";

interface BreakpointerProps extends HTMLAttributes<HTMLDivElement> {
  background: string;
  padding: number;
  children: ReactNode;
}

export const Breakpointer = ({
  background,
  padding,
  children,
  ...props
}: BreakpointerProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const { activeBreakpoint } = pagesStore();

  return (
    <div
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      style={{
        background,
        padding: `${padding}px`,
        width: breakpoints[activeBreakpoint].width,
        minHeight: breakpoints[activeBreakpoint].defaultHeight,
      }}
    >
      {children}
    </div>
  );
};

export const BreakpointerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
  }));

  return (
    <div>
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
    </div>
  );
};
Breakpointer.craft = {
  related: {
    settings: BreakpointerSettings,
  },
};
