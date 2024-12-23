const fs = require('fs');
const { execSync } = require('child_process');

// Получение зависимостей
const dependencies = JSON.parse(execSync('npm list --depth=0 --json').toString());

// Формирование строки для записи в README.md
let dependenciesText = '## Зависимости проекта\n\n';
for (const [pkg, version] of Object.entries(dependencies.dependencies)) {
  dependenciesText += `- **${pkg}**: версия ${version.version}\n`;
}

// Чтение и добавление в README.md
const readmePath = './README.md';
let readmeContent = fs.readFileSync(readmePath, 'utf8');
readmeContent += '\n' + dependenciesText;

// Запись обратно в README.md
fs.writeFileSync(readmePath, readmeContent);
console.log('README.md обновлен!');
