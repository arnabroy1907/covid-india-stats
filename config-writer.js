const fs = require('fs');
fs.writeFileSync(
    './.env',
    `NODE_ENV=production\nREACT_APP_NFL_VAR=${process.env.NFL_VAR}\nREACT_APP_COVID_API_KEY=${process.env.COVID_API_KEY}'\n`,
);
console.log('env var data written');