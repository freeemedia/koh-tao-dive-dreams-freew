const { exec } = require('child_process');

const SPACE_ID = 'tir2z79k6zhh';
const MANAGEMENT_TOKEN = 'OUbFbvf7D_ncFJuYAbDAwXT_MXtt_kxdTbre9cN2nL0';

const cmd = `contentful space export \
  --space-id ${SPACE_ID} \
  --management-token ${MANAGEMENT_TOKEN} \
  --content-only \
  --content-file pages-export.json \
  --content-model-only false \
  --include-drafts \
  --query-entries 'content_type=pages'`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Export error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Export stderr: ${stderr}`);
    return;
  }
  console.log(`Export stdout: ${stdout}`);
});
