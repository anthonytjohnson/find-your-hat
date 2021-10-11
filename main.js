const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    this.field[0][0] = pathCharacter;
  }
  print() {
    const displayString = this.field.map(row => {
      return row.join('');
    }).join('/n');
    console.log(displayString);
  }
  askQuestion() {
    const answer = prompt('Which way? ').toUpperCase();
    switch (answer) {
      case 'U':
        this.locationY -= 1;
        break;
      case 'D':
        this.locationY += 1;
        break;
      case 'L':
        this.locationX -= 1;
        break;
      case 'R':
        this.locationX += 1;
        break;
      default:
        console.log('Enter U, D, L, or R');
        this.askQuestion();
        break;
    }
  }
  isInBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }
  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }
  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }
  static generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map(el => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocatiom.y = Math.floor(Math.random() * height);
    }
    field[hatLocation.y][hat.Location.x] = hat;
    return field;
  }
}