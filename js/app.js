// app.js

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('tbody');
  const gameValueField = document.getElementById('game-value');
  const versionNumberElement = document.getElementById('version-number');
  const scrollPositionInput = document.getElementById('scroll-position');
  const setScrollButton = document.getElementById('set-scroll');

  // Initial data
  const initialData = Array.from({ length: 8 }, () => ({
    wins: '',
    players: '',
    w: '',
    money: '',
    d: '',
  }));

  // Generate table rows
  initialData.forEach((row) => {
    const tr = document.createElement('tr');

    Object.keys(row).forEach((column) => {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = row[column];
      input.addEventListener('input', (e) => {
        row[column] = e.target.value;
      });
      td.appendChild(input);
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });

  // Add click event to chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const value = chip.getAttribute('data-value');
      gameValueField.value = value;
    });
  });

  // Highlight all text when clicking on the game-value field
  gameValueField.addEventListener('click', () => {
    gameValueField.select();
  });

  // Add dollar sign automatically in front of new value
  gameValueField.addEventListener('input', (e) => {
    if (!gameValueField.value.startsWith('$')) {
      gameValueField.value = '$' + gameValueField.value.replace(/^\$?/, '');
    }
  });

  // Handle version increment only when attributes change
  const currentVersion = localStorage.getItem('version') ? parseInt(localStorage.getItem('version')) : 1;
  const lastUpdated = localStorage.getItem('lastUpdated') || '';

  // Function to check for attribute changes
  const checkForChanges = () => {
    // Example: Check if the number of chips has changed
    const chips = document.querySelectorAll('.chip');
    const chipsData = Array.from(chips).map(chip => chip.getAttribute('data-value')).join(',');

    if (chipsData !== lastUpdated) {
      localStorage.setItem('lastUpdated', chipsData);
      localStorage.setItem('version', currentVersion + 1);
      return true;
    }
    return false;
  };

  if (checkForChanges()) {
    versionNumberElement.textContent = `V${currentVersion + 1}`;
  } else {
    versionNumberElement.textContent = `V${currentVersion}`;
  }

  // Scroll to the position specified in the scroll position input field
  const container = document.querySelector('.container');
  const scrollPosition = localStorage.getItem('scrollPosition') ? parseInt(localStorage.getItem('scrollPosition')) : 0;
  container.scrollTop = scrollPosition;

  // Set scroll position on button click
  setScrollButton.addEventListener('click', () => {
    const newPosition = parseInt(scrollPositionInput.value);
    localStorage.setItem('scrollPosition', newPosition);
    container.scrollTop = newPosition;
  });
  
  // Ensure the initial view is locked from FRANKIE'S POKER FLIPS downwards
  const headerHeight = document.querySelector('.header').offsetHeight;
  container.scrollTop = headerHeight;
  localStorage.setItem('scrollPosition', headerHeight);
});
