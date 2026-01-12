import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Separator,
  Textarea,
} from "@repo/ui";
import { ContentWrapper } from "./content-wrapper";

export function GeneralSettings() {
  return (
    <ContentWrapper>
      <header className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold">Site settings</h1>
        <Button>Save</Button>
      </header>
      <Separator />
      <div>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Site title</FieldLabel>
              <Input id="title" placeholder="My website" />
              <FieldDescription>The Title for site</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Site Description</FieldLabel>
              <Textarea
                id="description"
                placeholder="Site Description"
                rows={4}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </ContentWrapper>
  );
}
