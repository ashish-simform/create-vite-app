import fs, { readdirSync } from "fs";
import logger from "../logger";

/**
 * Checks whether the directory is empty or not.
 * @param  path - The path to the directory to be checked.
 * @returns  - Returns `true` if the directory is empty, `false` if it contains files or subdirectories.
 */
export function isEmptyDir(path: string) {
  try {
    return fs.readdirSync(path).length === 0;
  } catch (error) {
    /** */
  }
  return true;
}

/**
 * Checks whether the required file is present in the current directory or not.
 * @param filepath - The path of the directory to be checked.
 * @param file - The file name that we want to check.
 * @returns - Returns `true` if the file is found, `false` if it is not found.
 */
export function isFileExists(filepath: string, file: string) {
  const fileList: boolean =
    readdirSync(filepath).some((val: string) => {
      return val.includes(file);
    }) || false;
  return fileList;
}

/**
 * Checks if the project exists or not with the help of the presence of a package.json file.
 * If the package.json file is not present, then it forces the process to exit.
 */
export async function isProjectExists() {
  const isProjectDir = isFileExists(process.cwd(), "package.json");
  if (!isProjectDir) {
    logger(
      "red",
      "Please initialize project in current working directory to install !"
    );
    process.exit(1);
  }
}

/**
 * Changes the directory to the generated project name and detects if the directory exists.
 * If the directory does not exist, it forces an exit.
 */
export async function changeDirAndDetectProject(projectName: string) {
  try {
    // Change the current working directory to the project name
    process.chdir(projectName);
    // Check if the project directory exists
    await isProjectExists();
  } catch (error) {
    // If an error occurs, force an exit with an exit code of 1
    process.exit(1);
  }
}
