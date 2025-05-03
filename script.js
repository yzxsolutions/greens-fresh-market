document.querySelectorAll('.nav-underline-js').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.classList.add('underline-animate');
  });
  item.addEventListener('mouseleave', function() {
    this.classList.remove('underline-animate');
  });
});
// Card mount animation
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card-animate').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform += ' translateY(40px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
      el.style.opacity = 1;
      el.style.transform = el.style.transform.replace(' translateY(40px)', '');
    }, 200 + i * 180);
  });
});
// Card details scroll-in animation
function animateCardDetails(card, details) {
  anime({
    targets: details,
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 700,
    easing: 'easeOutCubic',
    begin: () => {
      details.classList.remove('pointer-events-none');
    }
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const details = entry.target.querySelector('.card-details');
      if (details && details.style.opacity !== '1') {
        animateCardDetails(entry.target, details);
        observer.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.card-animate').forEach(card => {
  observer.observe(card);
});
// Make cards draggable with interact.js
interact('.draggable-card').draggable({
  inertia: true,
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: true
    })
  ],
  listeners: {
    move (event) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      // Remove any previous translate, then add new
      let baseTransform = target.style.transform.replace(/translate\([^)]+\)/, '');
      target.style.transform = `${baseTransform} translate(${x}px, ${y}px)`;
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  }
});
const abouts = [
  `Established in 2014 by Mr. Shareef V.K. in the vibrant city of Bangalore, Greens Fresh Market has grown into a trusted name for everyday essentials. What began as a local initiative to provide fresh and affordable groceries has now become a preferred destination for thousands of customers who seek quality, convenience, and reliability under one roof.`,
  `At Greens Fresh Market, we specialize in providing a wide range of daily necessities—including fresh fruits, vegetables, grains, pulses, packaged foods, dairy products, beverages, personal care items, cleaning supplies, and much more. Every item is carefully selected to meet the needs of our diverse customer base, ensuring freshness, affordability, and value in every purchase.`,
  `We are committed to supporting local farmers and sustainable agriculture. By sourcing much of our produce directly from local growers, we ensure not only the freshest products for our customers but also contribute to the well-being of our community and environment.`,
  `Our stores are designed to offer a pleasant and convenient shopping experience. With spacious aisles, friendly staff, and a focus on cleanliness and organization, we make it easy for you to find everything you need in one place—making Greens Fresh Market your go-to destination for all your grocery needs.`
];
let aboutIndex = 0;
const aboutText = document.getElementById('about-text');
const dots = [
  document.getElementById('about-dot-0'),
  document.getElementById('about-dot-1'),
  document.getElementById('about-dot-2'),
  document.getElementById('about-dot-3')
];
function updateAbout(idx) {
  aboutText.innerHTML = abouts[idx];
  dots.forEach((dot, i) => {
    dot.classList.toggle('bg-[#00FF23]', i === idx);
    dot.classList.toggle('bg-[#b6eec2]', i !== idx);
  });
}
document.querySelector('#about-next').addEventListener('click', () => {
  aboutIndex = (aboutIndex + 1) % abouts.length;
  updateAbout(aboutIndex);
});
document.querySelector('#about-prev').addEventListener('click', () => {
  aboutIndex = (aboutIndex - 1 + abouts.length) % abouts.length;
  updateAbout(aboutIndex);
});
// Auto-advance
setInterval(() => {
  aboutIndex = (aboutIndex + 1) % abouts.length;
  updateAbout(aboutIndex);
}, 6000);
// Initial
updateAbout(aboutIndex); 