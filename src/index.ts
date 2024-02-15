#!/usr/bin/env node

// ====================== main executer ==================== //
import {
  getCurrentPackageManager,
  getProjectName,
  getSelectedLanguage,
  getSupportedProjectGen,
} from "@/questions";
import projectGenerator from "@/operation/projectGenerator";
import logger, { initiatorLog } from "@/utils/logger";

async function main() {
  try {
    initiatorLog("------------- Starting, Please Wait ! ---------------");

    const currentPackageManager = await getCurrentPackageManager();

    const selectedLanguage = await getSelectedLanguage();

    const projectName = await getProjectName();

    const selectedProjectType = await getSupportedProjectGen();

    await projectGenerator(
      currentPackageManager,
      selectedLanguage,
      projectName,
      selectedProjectType
    );

    logger("green", "😊 Boilerplate generated successfully !");
  } catch (error) {
    logger("red", "An Error Ocurred !");
  }
}

main();
