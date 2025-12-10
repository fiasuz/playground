import { Separator } from "@repo/ui";
import { Collections } from "./collections/Collections";
import { Fields } from "./fields/Fields";
import { Menus } from "./menus/Menus";
import { Navigations } from "./navigations/Navigations";
import { Sections } from "./sections/Sections";
import { TogglerGroup } from "./togglers";
import { IconsList } from "./icons-list/IconsList";
import { Media } from "./media/Media";
import { Forms } from "./forms/Forms";
import { Interactive } from "./interactive/Interactive";
import { Utilities } from "./utilities/Utilities";

export function InsertAction() {
  return (
    <div>
      <ul className="space-y-4">
        <li>
          <TogglerGroup title="Basics">
            <Sections />
            <Navigations />
            <Menus />
          </TogglerGroup>
        </li>
        <Separator />
        <li>
          <TogglerGroup title="CMS">
            <Collections />
            <Fields />
          </TogglerGroup>
        </li>
        <Separator />
        <li>
          <TogglerGroup title="Elements">
            <IconsList />
            <Media />
            <Forms />
            <Interactive />
            <Utilities />
          </TogglerGroup>
        </li>
      </ul>
    </div>
  );
}
