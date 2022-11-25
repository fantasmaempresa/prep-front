import { EntityDto } from "o2c_core";
import { SectionDto } from "./Section.dto";

export interface ZoneDto extends EntityDto {
  name: string;
  description: string;
  sections: SectionDto[]
}
