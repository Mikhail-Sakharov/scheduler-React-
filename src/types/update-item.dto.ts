export class UpdateItemDto {
  public title?: string;
  public description?: string;
  public listsIds?: string[];
  // public consistsOfItemsIds?: string[];
  public deadline?: string | null;
}
