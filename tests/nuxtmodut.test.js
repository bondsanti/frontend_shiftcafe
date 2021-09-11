import { setupTest, expectModuleToBeCalledWith, getNuxt } from '@nuxt/test-utils'
import {jest} from '@jest/globals';
jest.useFakeTimers();
describe('module', () => {
  setupTest({
    testDir: __dirname,
    fixture: 'example',
    config: {
      myModule: {
        test: 123
      }
    }
  })

  test('should inject plugin', () => {
    expectModuleToBeCalledWith('addPlugin', {
      src: expect.stringContaining('templates/plugin.js'),
      fileName: 'myPlugin.js',
      options: getNuxt().options.myModule
    })
  })
})