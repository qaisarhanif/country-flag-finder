// full_site_generator.js
// Node.js script to generate country pages and homepage

const fs = require('fs');
const path = require('path');

// Sample countries.json content
const countries = [
  {
    name: "Japan",
    capital: "Tokyo",
    currency: { name: "Japanese yen", symbol: "¥" },
    flag: "https://flagcdn.com/w320/jp.png",
    description: "Japan's flag is white with a red circle. Tokyo is the capital. Japanese yen (¥) is the currency."
  },
  {
    name: "France",
    capital: "Paris",
    currency: { name: "Euro", symbol: "€" },
    flag: "https://flagcdn.com/w320/fr.png",
    description: "France's flag is blue, white, and red. Paris is the capital. Euro (€) is the currency."
  },
  {
    name: "Brazil",
    capital: "Brasília",
    currency: { name: "Brazilian real", symbol: "R$" },
    flag: "https://flagcdn.com/w320/br.png",
    description: "Brazil's flag is green with a yellow diamond and a blue globe. Brasília is the capital. Brazilian real (R$) is the currency."
  }
  // Add more countries here
];

// Ensure flags folder exists
const flagsDir = path.join(__dirname, 'flags');
if (!fs.existsSync(flagsDir)) fs.mkdirSync(flagsDir);

// Generate individual country pages
countries.forEach(c => {
  const fileName = c.name.toLowerCase().replace(/\s+/g, '-') + '.html';
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${c.name} - Flag, Capital & Currency</title>
    <meta name="description" content="${c.description}">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-gray-100 font-sans">
    <header class="bg-blue-600 text-white p-6 text-center text-3xl font-bold">${c.name}</header>
    <main class="max-w-3xl mx-auto p-6 text-center bg-white rounded shadow mt-6">
      <img src="${c.flag}" alt="Flag of ${c.name}" class="mx-auto mb-4 h-40 object-cover">
      <h2 class="text-2xl font-semibold mb-2">Capital: ${c.capital}</h2>
      <h3 class="text-xl font-medium mb-4">Currency: ${c.currency.name} (${c.currency.symbol})</h3>
      <p class="text-gray-700 mb-4">${c.description}</p>
      <a href="../index.html" class="text-blue-600 hover:underline">Back to homepage</a>
    </main>
  </body>
  </html>`;

  fs.writeFileSync(path.join(flagsDir, fileName), htmlContent);
});

// Generate homepage
const homepageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Country Flag Finder - Capitals & Currencies</title>
  <meta name="description" content="Search any country to see its flag, capital city, and currency. Explore popular countries and learn fun facts about each one!">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 font-sans">
<header class="bg-blue-600 text-white p-6 text-center text-3xl font-bold">Country Flag Finder</header>
<main class="max-w-5xl mx-auto p-6">
  <div class="mb-8">
    <input id="searchInput" type="text" placeholder="Enter country name..." class="w-full p-4 rounded shadow focus:outline-none" />
  </div>
  <h2 class="text-2xl font-semibold mb-4">Countries</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" id="countryGrid"></div>
  <div class="mt-10 text-gray-700 text-lg">
    Discover flags of countries from around the world. Learn about their capitals, currencies, and fun facts. Use the search above to quickly find any country and explore its unique history.
  </div>
</main>
<footer class="bg-gray-200 text-center p-4 mt-10">&copy; 2025 Country Flag Finder</footer>
<script>
const countries = ${JSON.stringify(countries)};
const grid = document.getElementById('countryGrid');
countries.forEach(c => {
  const card = document.createElement('a');
  card.href = 'flags/' + c.name.toLowerCase().replace(/\s+/g, '-') + '.html';
  card.className = "bg-white shadow rounded overflow-hidden text-center hover:shadow-lg transition duration-300";
  card.innerHTML = `<img src="${c.flag}" alt="Flag of ${c.name}" class="w-full h-40 object-cover mb-2"><div class="p-4 font-semibold text-lg">${c.name}</div>`;
  grid.appendChild(card);
});
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  grid.innerHTML = '';
  const filtered = countries.filter(c => c.name.toLowerCase().includes(query));
  filtered.forEach(c => {
    const card = document.createElement('a');
    card.href = 'flags/' + c.name.toLowerCase().replace(/\s+/g, '-') + '.html';
    card.className = "bg-white shadow rounded overflow-hidden text-center hover:shadow-lg transition duration-300";
    card.innerHTML = `<img src="${c.flag}" alt="Flag of ${c.name}" class="w-full h-40 object-cover mb-2"><div class="p-4 font-semibold text-lg">${c.name}</div>`;
    grid.appendChild(card);
  });
});
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), homepageContent);
console.log('All country pages and homepage generated successfully!');
