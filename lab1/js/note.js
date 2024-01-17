// Note class

export class Note {
  /**
   * Creates a new note
   * 
   * @param {*} id unique id of the note
   * @param {*} title title of the note
   * @param {*} content text content of the note
   */
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  toString() {
    return "Note: " + this.id + "\n" + this.title + "\n" + this.content;
  }
}