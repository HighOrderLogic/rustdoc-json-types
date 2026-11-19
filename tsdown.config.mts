import { readdirSync, writeFileSync } from 'node:fs'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { bindings: './bindings/index.ts' },
  dts: true,
  outExtensions: () => ({ js: '.mjs', dts: '.d.ts' }),
  hooks: {
    'build:prepare': () => {
      const content = readdirSync('./bindings')
        .filter(n => n !== 'index.ts')
        .map(n => `export * from './${n.replace('.ts', '')}';\n`)
        .join('')
      writeFileSync('./bindings/index.ts', content)
    },
  },
})
