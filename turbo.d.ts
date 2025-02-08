export interface TurboTaskConfig {
    command?: string,
    env?: string[],
    dependsOn?: string[],
}

export interface TurboConfig {
    $schema?: string,
    globalEnv?: string[],
    globalDependencies?: string[],
    tasks: {
        [taskName: string]: TurboTaskConfig
    }
}