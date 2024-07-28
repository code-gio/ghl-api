export function checkRequiredEnvVariables(requiredVars: string[]): void {
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    const missingVarsString = missingVars.join(", ");
    throw new Error(
      `Missing required environment variables: ${missingVarsString}`
    );
  }
}
