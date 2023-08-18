export class Post {
  private id = '';
  private title;
  private text;
  private author_id = '';
  private date = '';

  constructor(title: string, text: string) {
    this.title = title;
    this.text = text;

  }

  getTitle() {
    return this.title;
  }

  getText() {
    return this.text;
  }

  setTitle(title: string) {
    this.title = title
  }

  setText(text: string) {
    this.text = text
  }

  setId(id: string) {
    this.id = id
  }

  getId() {
    return this.id;
  }

  getAuthor_id() {
    return this.author_id
  }
  getPostDate() {
    return this.date
  }
  setDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dateString = `${month} ${day}, ${year}`;
    this.date = dateString;
    return this.date
  }
}
