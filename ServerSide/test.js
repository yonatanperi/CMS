function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("hi");
sleep(3000);
console.log("there");





/*let add = "http://api.positionstack.com/v1/forward?access_key=1690b563e94702e57cf1bd7ec33d5b0e&query=israel& output = json";

const userAction = async () => {
    const response = await fetch(add);
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
}
userAction();*/