import { Page } from "src/entities/Page";

export class StoreasyTemplateListResponseDto {
  id: number;
  title: string;

  public static ofPage(page: Page) {
    return {
      id: page.id,
      title: page.title,
    }
  }
}