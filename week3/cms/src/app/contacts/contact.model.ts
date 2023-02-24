export class Contact {
public id: number;
public name: string;
public email: string;
public phone: string;
public imagePath: string;
public group: [];

constructor(id: number, name: string, email: string, phone: string, imagePath: string, group: []) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.phone = phone;
  this.imagePath = imagePath;
  this.group = [];
}
}

