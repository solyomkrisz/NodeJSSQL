const p1 = Promise.resolve(12);
console.log(p1);
const p2 = p1.then(() => Promise.resolve(1));
queueMicrotask(() => console.log('p2: ', p2));
setTimeout(() => {
    console.log(p2);
});
