/**
 * @description
 * HTTPoison Elixir HTTP client code snippet generator.
 *
 * @author
 * @danirukun
 *
 * For any questions or issues regarding the generated code snippet,
 * please open an issue mentioning the author.
 */

'use strict'

const CodeBuilder = require('../../helpers/code-builder')

/**
   Converts an ES6 list of objects to an Elixir KW list
*/
const jsListToKwList = (jsList) => {
  if (jsList.length === 0) return '[]'

  const kwList = jsList
    .map(obj => `{"${obj.name}", "${obj.value}"}`)
    .join(', ')
  return `[${kwList}]`
}

/**
   Converts a list containing cookies objects into an
   HTTPoison `cookie` parameter argument.
*/
const jsCookiesToExBin = (jsCookiesList) => {
  if (jsCookiesList.length === 0) return '""'

  const exBinary = jsCookiesList
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ')
  return `"${exBinary}"`
}

/**
   Converts a list of params to a Poison multipart form payload.
*/
const jsMultiPartParamsToPoisonPayload = (jsMultiParams) => {
  const [params] = jsMultiParams
  const isFileUpload = 'fileName' in params
  let multiPart

  if (isFileUpload) {
    const { fileName, name } = params
    const formData = [
      { name: 'name', value: name },
      { name: 'filename', value: fileName }]
    const formDataKwList = jsListToKwList(formData)
    const headers = jsListToKwList([{ name: 'content-type', value: 'multipart/form-data' }])

    multiPart = `[{:file, "${fileName}", {"form-data", ${formDataKwList}}, ${headers}}]`
  } else {
    multiPart = jsListToKwList(jsMultiParams)
  }

  return `{:multipart, ${multiPart}}`
}

const isJson = (mimeType) => {
  return [
    'application/json',
    'application/x-json',
    'text/json'
  ].includes(mimeType)
}

const isMultiPartForm = (mimeType) => {
  return mimeType === 'multipart/form-data'
}

const escapeExString = (text) => {
  return `~s(${text})`
}

module.exports = (source, _options) => {
  const code = new CodeBuilder()

  const { method, headers, cookies, postData: { mimeType, params } } = source
  const text = `"${(source.postData.text || '')}"`
  const escapedText = isJson(mimeType)
    ? escapeExString(text)
    : text
  const payload = isMultiPartForm(mimeType)
    ? jsMultiPartParamsToPoisonPayload(params)
    : escapedText

  function appendHeaders (headers) {
    const exHeaders = jsListToKwList(headers)

    argPlaceholders += ',\n  %s'
    poisonArgs = poisonArgs.concat([exHeaders])
  }

  function appendCookies (cookies) {
    const exCookies = jsCookiesToExBin(cookies)
    const poisonOpts = `hackney: [cookie: ${exCookies}]`

    argPlaceholders += ',\n  %s'
    poisonArgs = poisonArgs.concat([poisonOpts])
  }

  function appendPayload (payload) {
    argPlaceholders += ',\n  %s'
    poisonArgs = poisonArgs.concat([payload])
  }

  let argPlaceholders = '\n  :%s,\n  "%s"'
  let poisonArgs = [method.toLowerCase(), source.fullUrl]

  appendPayload(payload)

  if (headers.length > 0) appendHeaders(headers)
  if (cookies.length > 0) {
    if (headers.length === 0) appendHeaders([])
    appendCookies(cookies)
  }

  argPlaceholders += '\n'

  code.push(`HTTPoison.request(${argPlaceholders})`, ...poisonArgs)

  return code.join()
}

module.exports.info = {
  key: 'httpoison',
  title: 'HTTPoison',
  link: 'https://github.com/edgurgel/httpoison',
  description: 'HTTP client for Elixir, based on HTTPotion.'
}
