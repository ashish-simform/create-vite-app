import path from "path";
import cmdRunner from "@/utils/cmdRunner";
import logger from "@/utils/logger";
import {
  NodePackageManager,
  SupportedLanguage,
  SupportedProjectGenerator,
} from "@/types";
import { input, select } from "@inquirer/prompts";
import { isEmptyDir } from "@/utils/file";

/**
 * Asynchronously prompts user to select a supported package manager.
 * @returns A Promise that resolves to the selected package manager.
 */
export async function getCurrentPackageManager() {
  const selectedPackageMng = await select<NodePackageManager>({
    message: "Which package manager are you using?",
    choices: [
      {
        name: "npm",
        value: NodePackageManager.NPM,
      },
      {
        name: "yarn",
        value: NodePackageManager.YARN,
      },
      {
        name: "pnpm",
        value: NodePackageManager.PNPM,
      },
    ],
  });

  //check package manager
  try {
    await cmdRunner(selectedPackageMng, ["--version"]);
  } catch (error) {
    logger(
      "red",
      `${selectedPackageMng} package manager not found ! please install it or select appropriate one.`
    );

    process.exit(1);
  }

  return selectedPackageMng;
}

/**
 * Asynchronously prompts user to select a supported project language.
 * @returns A Promise that resolves to the selected language.
 */
export async function getSelectedLanguage() {
  const selectedLanguage = await select<SupportedLanguage>({
    message: "Select project language",
    choices: [
      {
        name: "Typescript (Recommended)",
        value: SupportedLanguage.TS,
      },
      {
        name: "Javascript",
        value: SupportedLanguage.JS,
      },
    ],
  });

  return selectedLanguage;
}

/**
 * Asynchronously prompts user to give the project name
 * @returns A Promise that resolves to project name.
 */
export async function getProjectName() {
  //getting currentProjectName with validation dir empty or not
  const projectName = await input({
    message: "What is the name of the project ?",
    default: ".",
    validate: val => {
      return isEmptyDir(path.join(process.cwd(), val))
        ? true
        : "Current working directory is not empty ! please enter name or remove everything from this directory";
    },
  });

  return projectName.toLowerCase();
}

/**
 * Asynchronously prompts user to select a supported project generator.
 * @returns A Promise that resolves to the selected project generator.
 */
export async function getSupportedProjectGen() {
  const selectedProjectType = await select<SupportedProjectGenerator>({
    message: "Select the Generator",
    choices: [
      {
        name: "React + Vite (Recommended)",
        value: SupportedProjectGenerator.REACT_VITE,
      },
      {
        name: "None",
        value: SupportedProjectGenerator.NONE,
      },
    ],
  });
  return selectedProjectType;
}
