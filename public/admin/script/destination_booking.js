// Select all progress bars
const progressBars = document.querySelectorAll('.progress-bar');

progressBars.forEach((bar) => {
    // Get the percentage from the data attribute
    const percentage = bar.getAttribute('data-percentage');

    // Create the inner fill bar
    const fill = document.createElement('div');
    fill.classList.add('progress-fill');
    fill.style.width = '0'; // Initially, width is 0
    bar.appendChild(fill);

    // Simulate animation by setting the width dynamically
    setTimeout(() => {
        fill.style.width = `${percentage}%`;
    }, 200); // Delay for smoother effect
});