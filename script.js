const form = document.getElementById('sizeForm');
const resultsDiv = document.getElementById('results');
const sizeTableBody = document.getElementById('sizeTableBody');

// Convert cm to inches
function cmToInches(cm) {
  return cm / 2.54;
}

// General size based on chest inches
function getGeneralSize(chestInches) {
  if (chestInches < 36) return 'S';
  if (chestInches < 40) return 'M';
  if (chestInches < 44) return 'L';
  return 'XL';
}

// Size charts (simplified)
const sizeCharts = {
  men: {
    hm: [
      { min: 34, max: 36, size: 'S' },
      { min: 37, max: 39, size: 'M' },
      { min: 40, max: 42, size: 'L' },
      { min: 43, max: 45, size: 'XL' },
    ],
    zara: [
      { min: 34, max: 36, size: '36' },
      { min: 37, max: 39, size: '38' },
      { min: 40, max: 42, size: '40' },
      { min: 43, max: 45, size: '42' },
    ],
    levis: [
      { min: 34, max: 36, size: 'S' },
      { min: 37, max: 39, size: 'M' },
      { min: 40, max: 42, size: 'L' },
      { min: 43, max: 45, size: 'XL' },
    ]
  },
  women: {
    hm: [
      { min: 32, max: 34, size: 'S' },
      { min: 35, max: 37, size: 'M' },
      { min: 38, max: 40, size: 'L' },
      { min: 41, max: 43, size: 'XL' },
    ],
    zara: [
      { min: 32, max: 34, size: '34' },
      { min: 35, max: 37, size: '36' },
      { min: 38, max: 40, size: '38' },
      { min: 41, max: 43, size: '40' },
    ],
    levis: [
      { min: 32, max: 34, size: 'S' },
      { min: 35, max: 37, size: 'M' },
      { min: 38, max: 40, size: 'L' },
      { min: 41, max: 43, size: 'XL' },
    ]
  }
};

// Find size helper
function findSize(category, store, chestInches) {
  const chart = sizeCharts[category][store];
  for (const entry of chart) {
    if (chestInches >= entry.min && chestInches <= entry.max) {
      return entry.size;
    }
  }
  return 'N/A';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const category = form.category.value;
  const units = form.units.value;
  let chest = parseFloat(form.chest.value);
  let waist = parseFloat(form.waist.value);
  let hips = parseFloat(form.hips.value);

  if (!category || !units || isNaN(chest) || isNaN(waist) || isNaN(hips)) {
    alert('Please fill all fields correctly');
    return;
  }

  // Convert to inches if needed
  if (units === 'cm') {
    chest = cmToInches(chest);
    waist = cmToInches(waist);
    hips = cmToInches(hips);
  }

  // General size label based on chest
  const generalSize = getGeneralSize(chest);

  // Store sizes based on chest
  const hmSize = findSize(category, 'hm', chest);
  const zaraSize = findSize(category, 'zara', chest);
  const levisSize = findSize(category, 'levis', chest);

  // Build table rows
  sizeTableBody.innerHTML = `
    <tr><td>General Size (S, M, L, XL)</td><td>${generalSize}</td></tr>
    <tr><td>H&M Size</td><td>${hmSize}</td></tr>
    <tr><td>Zara Size</td><td>${zaraSize}</td></tr>
    <tr><td>Levi’s Size</td><td>${levisSize}</td></tr>
  `;

  resultsDiv.style.display = 'block';
});
