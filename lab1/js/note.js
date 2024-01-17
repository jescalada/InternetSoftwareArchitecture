// Note class

export class Note {
  /**
   * Creates a new note
   * @param {*} title title of the note
   * @param {*} content text content of the note
   */
  constructor(title, content) {
    this.id = Date.now();
    this.title = title;
    this.content = content;
  }

  toString() {
    return "Note: " + this.id + "\n" + this.title + "\n" + this.content;
  }
}