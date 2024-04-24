for (var i = 0; i < 5; i++) {
  setTimeout(function() {
      console.log(i); // 5, 5, 5, 5, 5
  }, 1000);
}

for (let i = 0; i < 5; i++) {
  setTimeout(function() {
      console.log(i); // 0, 1, 2, 3, 4
  }, 1000);
}