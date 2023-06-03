export enum ItemType {
  Task = 'TASK',
  TODOList = 'TODO_LIST',
  CheckListItem = 'CHECKLIST_ITEM',
  CheckList = 'CHECKLIST'
}

export const ItemTypeMap = {
  [ItemType.Task]: 'Задача',
  [ItemType.TODOList]: 'Список задач',
  [ItemType.CheckListItem]: 'Элемент контрольного списка',
  [ItemType.CheckList]: 'Контрольный список'
};
