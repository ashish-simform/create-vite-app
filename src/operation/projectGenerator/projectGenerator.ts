import {
  NodePackageManager,
  SupportedLanguage,
  SupportedProjectGenerator,
} from "@/types";
import cmdRunner from "@/utils/cmdRunner";

//Main function to init project generation
export default async function projectGenerator(
  currentPackageManager: NodePackageManager,
  selectedLanguage: SupportedLanguage,
  projectName: string,
  selectedProjectType: SupportedProjectGenerator
) {
  switch (selectedProjectType) {
    case SupportedProjectGenerator.REACT_VITE:
      await initReactViteProject(
        projectName,
        currentPackageManager,
        selectedLanguage
      );
      break;

    default:
      break;
  }
}

//init react-vite boiler plate generation
async function initReactViteProject(
  projectName: string,
  packageManager: NodePackageManager,
  selectedLanguage: SupportedLanguage
) {
  const viteCommand =
    packageManager === NodePackageManager.NPM ? "vite@latest" : "vite";
  const tsProjectOrNot =
    selectedLanguage === SupportedLanguage.TS ? "react-ts" : "react";

  try {
    await cmdRunner(packageManager, [
      "create",
      viteCommand,
      projectName,
      `${packageManager === NodePackageManager.NPM ? "--" : ""}`,
      `--template`,
      tsProjectOrNot,
    ]);
  } catch (error) {
    process.exit(1);
  }
}
