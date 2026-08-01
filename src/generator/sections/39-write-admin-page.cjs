/* EMY generator section: 39-write-admin-page.cjs (source lines 101227-101230) */
const emyAdminBackendHtml = emyAdminBackendPageTemplateClean();
fs.writeFileSync(path.join(outDir, 'emy-admin-backend.html'), emyAdminBackendHtml, 'utf8');
manifest.push({ page: 'emy-admin-backend.html', component: 'StaticEMYAdminBackend', bytes: Buffer.byteLength(emyAdminBackendHtml) });

