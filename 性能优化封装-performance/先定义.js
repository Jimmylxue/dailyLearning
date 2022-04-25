let obj = {
  name: "",
  text: "hello",
};

console.log(obj.name ?? obj.text);
console.log(obj.name || obj.text);
