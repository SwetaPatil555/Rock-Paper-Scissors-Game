const rulesBtn = document.querySelector('.rules-btn');
const rulesBox = document.querySelector('.rulesContainer');
const cancelBtn = document.querySelector('.cancel');

rulesBtn.addEventListener('click', () => {
  rulesBox.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
  rulesBox.style.display = 'none';
});
