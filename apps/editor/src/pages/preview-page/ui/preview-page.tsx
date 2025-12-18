import { useEffect, useState } from "react";
import { useEditor, Frame } from "@craftjs/core";
import { useSearchParams } from "react-router-dom";
import lz from "lzutf8";

export function PreviewPage() {
  const [searchParams] = useSearchParams();
  const { actions, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Disable editing mode
    if (enabled) {
      actions.setOptions((options) => (options.enabled = false));
    }
  }, [enabled, actions]);

  useEffect(() => {
    const stateParam = searchParams.get("state");
    if (stateParam) {
      try {
        const decompressed = lz.decompress(
          lz.decodeBase64(decodeURIComponent(stateParam)),
        );
        const json = JSON.parse(decompressed);
        actions.deserialize(json);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load state:", error);
        setIsLoaded(true);
      }
    } else {
      setIsLoaded(true);
    }
  }, [searchParams, actions]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Frame>
      <div className="w-full h-full" />
    </Frame>
  );
}
