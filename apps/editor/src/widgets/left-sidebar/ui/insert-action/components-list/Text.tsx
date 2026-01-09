/* eslint-disable */

import { useNode } from "@craftjs/core";
import { Label, Separator } from "@repo/ui";
import { useState, useEffect, useRef, type HTMLAttributes } from "react";
import ContentEditable from "react-contenteditable";
import { cn } from "@repo/ui/lib/utils";
import { pagesStore } from "@/shared/store";
import {
  isVisibleOnBreakpoint,
  getResponsiveVisibilityClasses,
  ResponsiveVisibilityControl,
  type ResponsiveVisibility,
} from "@/components";

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  fontSize: number;
  textAlign?: string;
  responsiveVisibility?: ResponsiveVisibility;
}

export const Text = ({
  text,
  fontSize,
  textAlign,
  responsiveVisibility,
  ...props
}: TextProps) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const { activeBreakpoint } = pagesStore((state) => state);

  const [editable, setEditable] = useState(false);
  const contentEditableRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (selected) {
      if (text === "") {
        setEditable(true);
      }
      return;
    }

    setEditable(false);
  }, [selected, text]);

  // Make if focused for editing
  useEffect(() => {
    if (editable && contentEditableRef.current) {
      const element = contentEditableRef.current;
      element.focus();

      // Place cursor at the end of text
      const range = document.createRange();
      const selection = window.getSelection();

      if (element.childNodes.length > 0) {
        range.setStart(element.childNodes[0], element.textContent?.length || 0);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, [editable]);

  const isVisible = isVisibleOnBreakpoint(
    responsiveVisibility,
    activeBreakpoint,
  );

  if (!isVisible) {
    return null;
  }

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
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        innerRef={contentEditableRef as React.RefObject<HTMLElement>}
        html={text}
        disabled={!editable}
        onChange={(e) =>
          setProp(
            (props: Record<string, unknown>) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
            500,
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign }}
      />
    </div>
  );
};

// -----------------------------------------------------------------------------

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label>Font size</Label>
        <input
          type="range"
          value={fontSize || 7}
          step={7}
          min={1}
          max={50}
          onChange={(e) => {
            setProp(
              (props: Record<string, unknown>) =>
                (props.fontSize = e.target.value),
              1000,
            );
          }}
        />
      </div>

      <Separator />

      <ResponsiveVisibilityControl />
    </div>
  );
};

// -----------------------------------------------------------------------------

const TextDefaultProps = {
  text: "Hi",
  fontSize: 20,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
