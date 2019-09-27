/*
* @adonisjs/ace
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import paramCase from 'param-case'
import { CommandFlag, FlagTypes } from '../Contracts'

type DecoratorFlag = Partial<Pick<CommandFlag, Exclude<keyof CommandFlag, 'type'>>>

/**
 * Pushes flag to the list of command flags with predefined
 * types.
 */
function addFlag (type: FlagTypes, options: DecoratorFlag) {
  return function flag (target: any, propertyName: string) {
    const flag: CommandFlag = Object.assign({
      name: paramCase(propertyName),
      propertyName,
      type,
    }, options)

    if (!target.constructor.hasOwnProperty('flags')) {
      Object.defineProperty(target.constructor, 'flags', { value: [] })
    }

    target.constructor.flags.push(flag)
  }
}

export const flags = {
  /**
   * Create a flag that excepts string values
   */
  string (options?: DecoratorFlag) {
    return addFlag('string', options || {})
  },

  /**
   * Create a flag that excepts numeric values
   */
  number (options?: DecoratorFlag) {
    return addFlag('number', options || {})
  },

  /**
   * Create a flag that excepts boolean values
   */
  boolean (options?: DecoratorFlag) {
    return addFlag('boolean', options || {})
  },

  /**
   * Create a flag that excepts array of string values
   */
  array (options?: DecoratorFlag) {
    return addFlag('array', options || {})
  },

  /**
   * Create a flag that excepts array of numeric values
   */
  numArray (options?: DecoratorFlag) {
    return addFlag('numArray', options || {})
  },
}
