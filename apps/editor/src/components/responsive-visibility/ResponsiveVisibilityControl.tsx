import { useNode } from "@craftjs/core";
import { Label, Button, ButtonGroup } from "@repo/ui";
import { pagesStore } from "@/shared/store";

export function ResponsiveVisibilityControl() {
  const {
    actions: { setProp },
    responsiveVisibility = {},
  } = useNode((node) => ({
    responsiveVisibility: node.data.props.responsiveVisibility,
  }));

  const { activeBreakpoint } = pagesStore((state) => state);
  const isVisible = responsiveVisibility[activeBreakpoint] !== false;

  return (
    <div className="flex flex-row items-enter justify-between">
      <Label className="text-xs opacity-50">Visibility</Label>

      <ButtonGroup>
        <Button
          size="sm"
          variant={isVisible ? "outline" : "secondary"}
          onClick={() => {
            setProp((props: Record<string, unknown>) => {
              if (!props.responsiveVisibility) {
                props.responsiveVisibility = {};
              }
              (props.responsiveVisibility as Record<string, boolean>)[
                activeBreakpoint
              ] = true;
            });
          }}
        >
          Visible
        </Button>
        <Button
          size="sm"
          variant={!isVisible ? "outline" : "secondary"}
          onClick={() => {
            setProp((props: Record<string, unknown>) => {
              if (!props.responsiveVisibility) {
                props.responsiveVisibility = {};
              }
              (props.responsiveVisibility as Record<string, boolean>)[
                activeBreakpoint
              ] = false;
            });
          }}
        >
          Hidden
        </Button>
      </ButtonGroup>
    </div>
  );
}
