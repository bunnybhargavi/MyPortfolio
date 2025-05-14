// =============== PRELOADER ===============
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader-container');
  setTimeout(() => {
      loader.classList.add('hidden');
      // Initialize AOS after loader hides
      AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: false,
          mirror: false
      });
  }, 1000);
});



// =============== TYPING ANIMATION ===============
document.addEventListener('DOMContentLoaded', () => {
  const typed = new Typed('.typing', {
      strings: ['Frontend Developer', 'Coder','Student'],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
  });


  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
   // Custom cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });

    document.querySelectorAll('a, .cta-button, .burger').forEach(link => {
        link.addEventListener('mouseover', () => {
            document.body.classList.add('hovered');
        });
        link.addEventListener('mouseout', () => {
            document.body.classList.remove('hovered');
        });
    });


});

// =============== STICKY NAVBAR ===============
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
      navbar.classList.add('sticky');
  } else {
      navbar.classList.remove('sticky');
  }
});

// =============== MOBILE MENU TOGGLE ===============
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
  
  // Animate the hamburger icon
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bar => bar.classList.toggle('active'));
  
  // Transform bars into X shape
  if (document.querySelector('.nav-links').classList.contains('active')) {
      bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
  } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.remove('active');
      
      // Reset hamburger icon
      const bars = document.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
  });
});

// =============== ACTIVE LINK ON SCROLL ===============
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id');
      }
  });
  
  navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
      }
  });
});

// =============== SKILLS PROGRESS ANIMATION ===============


 // ********** CIRCULAR SKILL BARS **********
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percent'));
        const perimeter = circle.getAttribute('r') * 2 * Math.PI;
        const offset = perimeter - (perimeter * percent) / 100;
        
        // Set custom property for the stroke-dashoffset animation
        circle.style.setProperty('--offset', offset);
    });
    
    // Animate skill bars when scrolled into view
    const skillsSection = document.getElementById('skills');
    const progressLines = document.querySelectorAll('.prog-line');
    
    const animateSkillBars = function() {
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            progressLines.forEach(line => {
                const percent = line.getAttribute('data-percent');
                line.style.width = percent;
            });
            
            // Remove the scroll event once animation is triggered
            window.removeEventListener('scroll', animateSkillBars);
        }
    };
    
    window.addEventListener('scroll', animateSkillBars);




// =============== PROJECT FILTERING ===============
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
      // Active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.dataset.filter;
      
      projectCards.forEach(card => {
          // Show/hide projects based on category
          if (filterValue === 'all' || card.dataset.category === filterValue) {
              card.style.display = 'block';
              
              // Add animation
              setTimeout(() => {
                  card.style.transform = 'translateY(0)';
                  card.style.opacity = '1';
              }, 200);
          } else {
              card.style.transform = 'translateY(20px)';
              card.style.opacity = '0';
              
              setTimeout(() => {
                  card.style.display = 'none';
              }, 300);
          }
      });
  });
});

// =============== FORM VALIDATION AND SUBMISSION ===============
const contactForm = document.querySelector('.contact-form');

// contactForm.addEventListener('submit', (e) => {
//   e.preventDefault();
  
//   // Basic validation
//   const name = document.getElementById('name').value.trim();
//   const email = document.getElementById('email').value.trim();
//   const subject = document.getElementById('subject').value.trim();
//   const message = document.getElementById('message').value.trim();
  
//   let isValid = true;
  
//   if (!name || !email || !subject || !message) {
//       isValid = false;
//       showAlert('Please fill in all fields', 'error');
//   }
  
//   // Simple email validation
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(email)) {
//       isValid = false;
//       showAlert('Please enter a valid email address', 'error');
//   }
  
//   if (isValid) {
//       // Here you would typically send the form data to a server
//       // For now, we'll just simulate a successful submission
//       showAlert('Message sent successfully!', 'success');
//       contactForm.reset();
//   }
// });

// // Function to show alert message
// function showAlert(message, type) {
//   // Create alert element
//   const alertElement = document.createElement('div');
//   alertElement.className = `form-alert ${type}`;
//   alertElement.textContent = message;
  
//   // Add to form
//   contactForm.appendChild(alertElement);
  
//   // Remove after 3 seconds
//   setTimeout(() => {
//       alertElement.style.opacity = '0';
//       setTimeout(() => {
//           alertElement.remove();
//       }, 300);
//   }, 3000);
// }

// =============== BACK TO TOP BUTTON ===============
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
  } else {
      backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

// =============== NEWSLETTER FORM ===============
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = newsletterForm.querySelector('input').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (email && emailPattern.test(email)) {
          // Success animation
          newsletterForm.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
      } else {
          // Add error class to input
          newsletterForm.querySelector('input').classList.add('error');
          
          // Remove error class after 3 seconds
          setTimeout(() => {
              newsletterForm.querySelector('input').classList.remove('error');
          }, 3000);
      }
  });
}

// =============== INTERSECTION OBSERVER FOR ANIMATIONS ===============
// This complements AOS animations with custom behavior
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('animate');
      } else {
          // Uncomment the following line if you want animations to replay when scrolling back up
          entry.target.classList.remove('animate');
      }
  });
}, { threshold: 0.1 });

// Apply to elements with custom animations
document.querySelectorAll('.custom-animation').forEach(element => {
  animationObserver.observe(element);
});

// =============== SMOOTH SCROLL FOR ANCHOR LINKS ===============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      
      if (href !== '#') {
          const targetElement = document.querySelector(href);
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          
          window.scrollTo({
              top: targetElement.offsetTop - navbarHeight,
              behavior: 'smooth'
          });
      }
  });
});

// =============== CUSTOM CURSOR (OPTIONAL FEATURE) ===============
const enableCustomCursor = () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);
  
  document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  // Cursor effects on interactive elements
  document.querySelectorAll('a, button, .hover-effect').forEach(item => {
      item.addEventListener('mouseenter', () => {
          cursor.classList.add('expand');
      });
      
      item.addEventListener('mouseleave', () => {
          cursor.classList.remove('expand');
      });
  });
};

// Uncomment to enable custom cursor
if (window.innerWidth > 768) {
   enableCustomCursor();
}

// =============== PARALLAX SCROLLING EFFECT ===============
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
  parallaxElements.forEach(element => {
      let speed = element.dataset.speed || 0.3;
      element.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});

// =============== ANIMATE PROJECT CARDS ON HOVER ===============
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
      card.querySelector('.project-overlay').style.opacity = '1';
  });
  
  card.addEventListener('mouseleave', () => {
      card.querySelector('.project-overlay').style.opacity = '0';
  });
});


// Add gradient definition for circular progress bars
document.addEventListener('DOMContentLoaded', function() {
    // Create SVG namespace
    const svgNS = "http://www.w3.org/2000/svg";
    
    // Create a gradient definition for circular progress bars
    const svgElements = document.querySelectorAll('.skill-circle-svg');
    
    svgElements.forEach((svg, index) => {
        // Create defs element
        const defs = document.createElementNS(svgNS, "defs");
        
        // Create linearGradient element
        const linearGradient = document.createElementNS(svgNS, "linearGradient");
        linearGradient.setAttribute("id", "gradient");
        linearGradient.setAttribute("x1", "0%");
        linearGradient.setAttribute("y1", "0%");
        linearGradient.setAttribute("x2", "100%");
        linearGradient.setAttribute("y2", "0%");
        
        // Create gradient stops
        const stop1 = document.createElementNS(svgNS, "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "#6c63ff");
        
        const stop2 = document.createElementNS(svgNS, "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", "#43cea2");
        
        // Append stops to linearGradient
        linearGradient.appendChild(stop1);
        linearGradient.appendChild(stop2);
        
        // Append linearGradient to defs
        defs.appendChild(linearGradient);
        
        // Append defs to SVG
        svg.insertBefore(defs, svg.firstChild);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  emailjs.init("OQvb1F-Xx9QoWXyQZ"); // ✅ Replace with your actual public key

  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
      email: 'bunny123bhargavi@gmail.com'
    };

    console.log('Sending templateParams:', templateParams);

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    emailjs.send("service_r1k1ve7", "template_4w6d49y", templateParams)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        form.reset();
      })
      .catch(function (error) {
        console.error('FAILED...', error);
        showNotification('Failed to send message. Please try again later.', 'error');
      })
      .finally(function () {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
  });
});

// ✅ Notification Helper
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <p>${message}</p>
    </div>
    <button class="notification-close"><i class="fas fa-times"></i></button>
  `;

  document.body.appendChild(notification);

  notification.querySelector('.notification-close').addEventListener('click', function () {
    notification.remove();
  });

  setTimeout(function () {
    notification.classList.add('fade-out');
    setTimeout(function () {
      notification.remove();
    }, 500);
  }, 5000);
}
