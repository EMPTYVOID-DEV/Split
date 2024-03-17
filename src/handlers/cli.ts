import inquirer from "inquirer";
import { settings } from "../types.js";
import { defaultSettings } from "../const.js";
import { validateProjectName } from "../utils/validateName.js";
import { removeTrailingSlash } from "../utils/removingTrailingSlash.js";

export async function cli(): Promise<settings> {
  const settings: settings = structuredClone(defaultSettings);
  settings.name = await namePrompt();
  settings.tailwind = await tailwind();
  settings.lucia = await lucia();
  settings.database = await database();
  settings.express = await express();
  settings.git = await git();
  settings.installPackages = await installPackages();
  return settings;
}

async function namePrompt() {
  const { projectName } = await inquirer.prompt({
    name: "projectName",
    type: "input",
    message: "Enter your project name that will also be your directory name",
    default: defaultSettings.name,
    validate: validateProjectName,
    transformer: (name: string) => name.trim(),
  });
  return projectName;
}

async function tailwind() {
  const { isTailwind } = await inquirer.prompt({
    name: "isTailwind",
    type: "confirm",
    message: "Do you want to use tailwind",
    default: defaultSettings.tailwind,
  });
  return isTailwind;
}

async function git() {
  const { isGit } = await inquirer.prompt({
    name: "isGit",
    type: "confirm",
    message: "Do you want to init a git repository",
    default: defaultSettings.git,
  });
  return isGit;
}

async function installPackages() {
  const { isInstall } = await inquirer.prompt({
    name: "isInstall",
    type: "confirm",
    message: "Do you want split to install the needed packages",
    default: defaultSettings.installPackages,
  });
  return isInstall;
}

async function lucia() {
  const { isLucia } = await inquirer.prompt({
    name: "isLucia",
    type: "confirm",
    message: "Do you want to use lucia",
    default: defaultSettings.lucia,
  });
  return isLucia;
}

async function express() {
  const { isExpress } = await inquirer.prompt({
    name: "isExpress",
    type: "confirm",
    message: "Do you want to use socket-io with express",
    default: defaultSettings.express,
  });
  return isExpress;
}

async function database() {
  const { database } = await inquirer.prompt<{
    database: "base-sqlite" | "prisma" | "drizzle";
  }>({
    name: "database",
    type: "list",
    choices: ["base-sqlite", "prisma", "drizzle"],
    message: "Which database adapter you want to use",
    default: defaultSettings.database,
  });
  return database;
}
