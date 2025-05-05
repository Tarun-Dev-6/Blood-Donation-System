document.addEventListener("DOMContentLoaded", function() {
    let stats = document.querySelectorAll(".stat h3");
    let values = [5000, 3000, 1000];
    
    stats.forEach((stat, index) => {
        let count = 0;
        let interval = setInterval(() => {
            if (count < values[index]) {
                count += 10;
                stat.textContent = count + "+";
            } else {
                clearInterval(interval);
                stat.textContent = values[index] + "+";
            }
        }, 50);
    });
});
