import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CreateProjectOptions {
  projectName: string;
  platform: string;
  backend: string;
  payments: string;
}

export async function createProject(options: CreateProjectOptions): Promise<string> {
  const { projectName } = options;
  const projectDir = path.join(process.cwd(), projectName);
  
  const spinner = ora('Creating project directory...').start();
  
  try {
    // Check if directory already exists
    try {
      await fs.access(projectDir);
      spinner.fail(`Directory ${projectName} already exists`);
      throw new Error(`Directory ${projectName} already exists`);
    } catch {
      // Directory doesn't exist, which is what we want
    }
    
    // Create project directory
    await fs.mkdir(projectDir, { recursive: true });
    
    // Copy template files
    spinner.text = 'Copying template files...';
    const templateDir = path.join(__dirname, '..', '..', 'templates', 'web');
    
    // For now, just create a basic structure
    // In the future, this will copy from templates directory
    await createBasicStructure(projectDir);
    
    spinner.succeed('Project created successfully');
    
    return projectDir;
  } catch (error) {
    spinner.fail('Failed to create project');
    throw error;
  }
}

async function createBasicStructure(projectDir: string) {
  // Create basic directories
  const dirs = [
    'src',
    'src/app',
    'src/components',
    'src/lib',
    'public'
  ];
  
  for (const dir of dirs) {
    await fs.mkdir(path.join(projectDir, dir), { recursive: true });
  }
  
  // Create placeholder files (these will be replaced with actual templates)
  const packageJson = {
    name: path.basename(projectDir),
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint'
    },
    dependencies: {
      next: '^14.0.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      '@supabase/supabase-js': '^2.38.0',
      stripe: '^14.0.0'
    },
    devDependencies: {
      '@types/node': '^20.0.0',
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      typescript: '^5.0.0',
      tailwindcss: '^3.3.0',
      autoprefixer: '^10.4.0',
      postcss: '^8.4.0'
    }
  };
  
  await fs.writeFile(
    path.join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}