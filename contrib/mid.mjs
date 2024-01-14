import { customAlphabet } from "nanoid";

const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

do {
  const id = customAlphabet(alphabet, 30)();
  if (id.match(/^[A-Za-z]/)) {
    process.stdout.write(id);
    process.exit();
  }
} while (true);
