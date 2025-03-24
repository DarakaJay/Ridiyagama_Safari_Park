document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item h4');

  faqItems.forEach((item) => {
    item.addEventListener('click', () => {
      const answer = item.nextElementSibling;
      const isVisible = answer.style.display === 'block';
      answer.style.display = isVisible ? 'none' : 'block';
    });
  });
});
