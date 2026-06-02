import bcrypt, { hash } from "bcryptjs"

let hp = "$2b$10$zN7Q5UWhKXW2pSLCvqQ9pOjWgEVmH/d9OCBy/9QmVOD/TPY0Y0sXm"
console.log(bcrypt.hashSync("123456",10))
console.log(bcrypt.compareSync("123",hp));
