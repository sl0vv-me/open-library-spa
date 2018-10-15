export class FavoriteBook {
  public olid: string;
  public title: string;
  public tags: string[];

  constructor(olid: string, title: string, tags: string[]) {
    this.olid = olid;
    this.title = title;
    this.tags = tags;
  }
}
