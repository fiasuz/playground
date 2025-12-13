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

  return (
    <div
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      style={{ margin: "5px 0", background, padding: `${padding}px` }}
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
            setProp((props: any) => (props.background = e.target.value), 500);
          }}
        />
      </div>
      <div>
        <Label>Padding</Label>
        <input
          type="range"
          defaultValue={padding}
          onChange={(e: any) =>
            setProp((props: any) => (props.padding = e.target.value), 500)
          }
        />
      </div>
    </div>
  );
};

export const BreakpointerDefaultProps = {
  background: "#ffffff",
  padding: 3,
};

Breakpointer.craft = {
  props: BreakpointerDefaultProps,
  related: {
    settings: BreakpointerSettings,
  },
};
