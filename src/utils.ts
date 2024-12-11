import js_beautify from "js-beautify"
import clc from 'cli-color'

export const log_warn = (name: string, description: string) => console.log(clc.bgBlack.green(` MCBE`) + clc.bgBlack.blue(` ${name} `) + " " + description)
export const log = (value: string) => console.log(clc.bgBlack.green(" MCBE ") + " " + value)
export const log_error = (value: string) => {
  console.log(clc.bgBlack.green(" MCBE ") + clc.bgBlack.red("ERROR ") + " " + value)
  process.exit()
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const formatVersion = "1.21.40"

export function stringify(object: object, build?: boolean) {
  return build ? JSON.stringify(object) : JSON.stringify(object, null, 2)
}

export function js_stringify(object: string, build?: boolean) {
  return build ? js_beautify(String(object), { indent_size: 0, space_in_empty_paren: false }).replaceAll("\n", "") : js_beautify(String(object), { indent_size: 2, space_in_empty_paren: true })
}
