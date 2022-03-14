/**
 * Delay function. Makes JS sleep for a period of milliseconds
 *
 * @export
 * @param {number} ms Milliseconds we want to wait
 * @returns A promise to `await`
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms || 1000));
}

/**
 * Reads file's content
 *
 * @export
 * @param {File} file File we want to read its content
 * @returns {func} Promise
 */
export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      resolve({
        name: file.name,
        value: event.target.result,
      });
    };
    if (!file) {
      reject('Please provide a file'); // eslint-disable-line
    }
    reader.readAsText(file);
  });
}

export default {};
