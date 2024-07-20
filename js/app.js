// app.js

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('tbody');
  const gameValueField = document.getElementById('game-value');
  const versionNumberElement = document.getElementById('version-number');

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

  // Handle version increment only when app code changes
  const currentVersion = localStorage.getItem('version') ? parseInt(localStorage.getItem('version')) : 1;
  const lastUpdated = localStorage.getItem('lastUpdated') || '';

  // Function to check for app code changes
  const checkForChanges = () => {
    // Example: Check if the app.js file content has changed
    const appCode = document.querySelector('script[src="js/app.js"]').textContent;
    if (appCode !== lastUpdated) {
      localStorage.setItem('lastUpdated', appCode);
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

  // Ensure the initial view is locked from FRANKIE'S POKER FLIPS downwards
  const container = document.querySelector('.container');
  const headerHeight = document.querySelector('.header').offsetHeight;
  container.scrollTop = headerHeight;
});
