import { useNode } from "@craftjs/core";
import { Label, Separator } from "@repo/ui";
import { pagesStore } from "@/shared/store";
import {
  isVisibleOnBreakpoint,
  getResponsiveVisibilityClasses,
  ResponsiveVisibilityControl,
  type ResponsiveVisibility,
} from "@/components";

interface HeadingProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  text: string;
  fontSize?: number;
  color?: string;
  textAlign?: "left" | "center" | "right";
  responsiveVisibility?: ResponsiveVisibility;
}

export const Heading = ({
  tag = "h2",
  text = "Heading",
  fontSize,
  color = "#000000",
  textAlign = "left",
  responsiveVisibility,
}: HeadingProps) => {
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

  // Default font sizes for each heading level
  const defaultFontSizes = {
    h1: 48,
    h2: 36,
    h3: 28,
    h4: 24,
    h5: 20,
    h6: 16,
  };

  const Tag = tag;

  return (
    <Tag
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={responsiveClasses}
      style={{
        fontSize: fontSize || defaultFontSizes[tag],
        color,
        textAlign,
        margin: "10px 0",
        fontWeight: "bold",
      }}
    >
      {text}
    </Tag>
  );
};

export const HeadingSettings = () => {
  const {
    tag,
    text,
    fontSize,
    color,
    textAlign,
    actions: { setProp },
  } = useNode((node) => ({
    tag: node.data.props.tag as HeadingProps["tag"],
    text: node.data.props.text as string,
    fontSize: node.data.props.fontSize as number | undefined,
    color: node.data.props.color as string,
    textAlign: node.data.props.textAlign as HeadingProps["textAlign"],
  }));

  const defaultFontSizes = {
    h1: 48,
    h2: 36,
    h3: 28,
    h4: 24,
    h5: 20,
    h6: 16,
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Text</Label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          value={text}
          onChange={(e) =>
            setProp((props: HeadingProps) => (props.text = e.target.value))
          }
        />
      </div>

      <div>
        <Label>Heading Level</Label>
        <select
          className="w-full px-3 py-2 border rounded"
          value={tag}
          onChange={(e) =>
            setProp(
              (props: HeadingProps) =>
                (props.tag = e.target.value as HeadingProps["tag"]),
            )
          }
        >
          <option value="h1">H1 - Main Title</option>
          <option value="h2">H2 - Section Title</option>
          <option value="h3">H3 - Subsection</option>
          <option value="h4">H4 - Smaller Heading</option>
          <option value="h5">H5 - Minor Heading</option>
          <option value="h6">H6 - Smallest Heading</option>
        </select>
      </div>

      <div>
        <Label>Font Size (default: {defaultFontSizes[tag]}px)</Label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded"
          value={fontSize || defaultFontSizes[tag]}
          onChange={(e) =>
            setProp(
              (props: HeadingProps) =>
                (props.fontSize = parseInt(e.target.value)),
            )
          }
        />
      </div>

      <div>
        <Label>Color</Label>
        <input
          type="color"
          className="w-full h-10 border rounded"
          value={color}
          onChange={(e) =>
            setProp((props: HeadingProps) => (props.color = e.target.value))
          }
        />
      </div>

      <div>
        <Label>Text Align</Label>
        <select
          className="w-full px-3 py-2 border rounded"
          value={textAlign}
          onChange={(e) =>
            setProp(
              (props: HeadingProps) =>
                (props.textAlign = e.target.value as HeadingProps["textAlign"]),
            )
          }
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <Separator />

      <ResponsiveVisibilityControl />
    </div>
  );
};

const HeadingDefaultProps: HeadingProps = {
  tag: "h2",
  text: "Heading",
  color: "#000000",
  textAlign: "left",
};

Heading.craft = {
  props: HeadingDefaultProps,
  related: {
    settings: HeadingSettings,
  },
};
