import fs from "fs";
import dotenvx from "@dotenvx/dotenvx";
import path from "path";
import chalk from "chalk";
import { TurboConfig, TurboTaskConfig } from "./turbo";

dotenvx.config({
    path: path.resolve(__dirname, "./.env")
})

const turboConfigPath = path.resolve(__dirname, "./turbo.json")

if(!fs.existsSync(turboConfigPath)) {
    console.log(chalk.red('❌ turbo.json not found at the root of the monorepo.'));
    process.exit(1)
}

let turboConfig: TurboConfig

try {
    const turboConfigContent = JSON.parse(fs.readFileSync(turboConfigPath, 'utf-8'))
    turboConfig = turboConfigContent;   
} catch (error) {
  console.error(chalk.red('❌ Failed to parse turbo.json.'));
  console.error(error);
  process.exit(1);
}
console.log(turboConfig, "checking tasks")

if(!turboConfig.tasks) {
    console.error(chalk.red('❌ "tasks" property not found in turbo.json.'))
    process.exit(1)
}

const tasksWithEnv = Object.entries(turboConfig.tasks).filter(
    ([, taskConfig]) => Array.isArray(taskConfig.env)
);

// Collect required environment variables per task
interface EnvValidation {
    task: string;
    requiredVars: string[];
}

const validations: EnvValidation[] = tasksWithEnv.map(([task, taskConfig]) => ({
    task,
    requiredVars: taskConfig.env as string[]
}))

function validateEnvVars() {
    let hasError = false;
    validations.forEach(({task, requiredVars}) => {
        const missingVars = requiredVars.filter((varName) => !process.env[varName])
        if(missingVars.length > 0) {
            hasError = true;
            console.error(chalk.red(`Missing env variables for task ${task}: ${missingVars.join(', ')}`))
        }
        else {
            console.log(chalk.green(`✅ All required environment variables are set for task "${task}".`))
        }
    })
    if(hasError) {
        process.exit(1)
    } else {
        process.exit(0)
    }
}

validateEnvVars()


