import {ItemType} from './item-type.enum';

export class CreateItemDto {
  public title!: string;
  public description!: string;
  public listsIds!: string[];
  public consistsOfItemsIds!: string[];
  public deadline!: string | null;
  public type!: ItemType;
}
