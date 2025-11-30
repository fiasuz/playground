import { useNode } from "@craftjs/core";
import { Label } from "@repo/ui";
import { useState, useEffect, type HTMLAttributes } from "react";
import ContentEditable from "react-contenteditable";

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  fontSize: number;
  textAlign?: string;
}

export const Text = ({ text, fontSize, textAlign, ...props }: TextProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  return (
    <div
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e: any) =>
          setProp(
            (props: any) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
            500
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
  }));

  return (
    <>
      <div>
        <Label>Font size</Label>
        <input
          type="range"
          value={fontSize || 7}
          step={7}
          min={1}
          max={50}
          onChange={(e: any) => {
            setProp((props: any) => (props.fontSize = e.target.value), 1000);
          }}
        />
      </div>
    </>
  );
};

export const TextDefaultProps = {
  text: "Hi",
  fontSize: 20,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
