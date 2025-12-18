import { useNode } from "@craftjs/core";
import { Label, Button, ButtonGroup } from "@repo/ui";
import { pagesStore } from "@/shared/store";
import { breakpoints } from "@/shared/constants";
import { MonitorIcon, TabletIcon, SmartphoneIcon } from "lucide-react";

const BREAKPOINT_ICONS = {
  desktop: MonitorIcon,
  tablet: TabletIcon,
  mobile: SmartphoneIcon,
};

/**
 * Responsive visibility control for current active breakpoint
 * Shows Yes/No buttons to toggle visibility on the active breakpoint
 */
export function ResponsiveVisibilityControl() {
  const {
    actions: { setProp },
    responsiveVisibility = {},
  } = useNode((node) => ({
    responsiveVisibility: node.data.props.responsiveVisibility,
  }));

  const { activeBreakpoint } = pagesStore((state) => state);

  // Get current breakpoint's visibility (default: true)
  const isVisible = responsiveVisibility[activeBreakpoint] !== false;

  const Icon = BREAKPOINT_ICONS[activeBreakpoint];
  const breakpointLabel = activeBreakpoint.charAt(0).toUpperCase() + activeBreakpoint.slice(1);
  const breakpointWidth = breakpoints[activeBreakpoint].width;

  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold">Visibility</Label>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Icon className="size-4" />
        <span>
          {breakpointLabel} <span className="opacity-50">({breakpointWidth}px)</span>
        </span>
      </div>

      <ButtonGroup className="w-full">
        <Button
          variant={isVisible ? "default" : "outline"}
          className="flex-1"
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
          variant={!isVisible ? "destructive" : "outline"}
          className="flex-1"
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
