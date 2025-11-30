import { Element, useNode } from "@craftjs/core";
import type { ElementType, HTMLAttributes, JSX, ReactNode } from "react";
import {
  Container,
  ContainerDefaultProps,
  ContainerSettings,
} from "./Container";
import { Text } from "./Text";
import { Button } from "./Button";

interface CardTopProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardTop = ({ children, ...props }: CardTopProps): JSX.Element => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(ref);
        }
      }}
      className="text-only"
      style={{
        padding: "10px",
        marginBottom: "10px",
        borderBottom: "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    canMoveIn: (incomingNodes: any) =>
      incomingNodes.every(
        (incomingNode: any) => incomingNode.data.type === Text
      ),
  },
};

// -----------------------------------------------------------------

interface CardBottomProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardBottom = ({
  children,
  ...props
}: CardBottomProps): JSX.Element => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      {...props}
      style={{ padding: "10px 0" }}
      ref={(ref) => {
        if (ref) {
          connect(ref);
        }
      }}
    >
      {children}
    </div>
  );
};

CardBottom.craft = {
  rules: {
    canMoveIn: (incomingNodes: any) =>
      incomingNodes.every(
        (incomingNode: any) => incomingNode.data.type === Button
      ),
  },
};

// ---------------------------------------------------------------------------------

interface CardProps {
  background?: string;
  padding?: number;
}

export const Card = ({
  background = "#fff",
  padding = 20,
  ...props
}: CardProps) => {
  return (
    <Container {...props} background={background} padding={padding}>
      <Element canvas id="text" is={CardTop as ElementType} data-cy="card-top">
        <Text text="Only texts" fontSize={20} data-cy="card-top-text-1" />
        <Text
          text="are allowed up here"
          fontSize={15}
          data-cy="card-top-text-2"
        />
      </Element>
      <Element
        canvas
        id="buttons"
        is={CardBottom as ElementType}
        data-cy="card-bottom"
      >
        <Button
          size="sm"
          variant="default"
          text="Only buttons down here"
          data-cy="card-bottom-button"
        />
      </Element>
    </Container>
  );
};

Card.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
