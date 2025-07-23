import * as p from '@clack/prompts';
import { Command } from 'commander';
import { validateAppName } from './utils/validateAppName.js';

export interface CliResults {
  projectName: string;
  platform: 'web' | 'mobile' | 'desktop';
  backend: 'supabase' | 'firebase' | 'custom';
  payments: 'stripe' | 'lemonsqueezy' | 'none';
  typescript: boolean;
  styling: 'tailwind' | 'css';
}

export async function runCli(): Promise<CliResults> {
  const program = new Command()
    .name('create-startdown-app')
    .description('Create a new MF² Stack application')
    .argument('[project-name]')
    .option('--use-npm', 'Use npm as package manager')
    .option('--use-yarn', 'Use yarn as package manager')
    .option('--use-pnpm', 'Use pnpm as package manager')
    .option('--use-bun', 'Use bun as package manager')
    .parse(process.argv);

  const providedName = program.args[0];

  // Interactive prompts
  const project = await p.group({
    projectName: () => 
      providedName 
        ? p.text({
            message: 'Project name',
            initialValue: providedName,
            validate: validateAppName
          })
        : p.text({
            message: 'What will your project be called?',
            placeholder: 'my-startup',
            validate: validateAppName
          }),
    
    platform: () => p.select({
      message: 'What platform are you building for?',
      options: [
        { value: 'web', label: 'Web App (SaaS)' },
        { value: 'mobile', label: 'Mobile App (Coming Soon)', hint: 'Will use web template for now' },
        { value: 'desktop', label: 'Desktop App (Coming Soon)', hint: 'Will use web template for now' }
      ],
      initialValue: 'web'
    }),
    
    backend: () => p.select({
      message: 'Choose your backend',
      options: [
        { value: 'supabase', label: 'Supabase (Recommended)', hint: 'Easiest to start' },
        { value: 'firebase', label: 'Firebase (Coming Soon)' },
        { value: 'custom', label: 'Custom API (Coming Soon)' }
      ],
      initialValue: 'supabase'
    }),
    
    payments: () => p.select({
      message: 'Payment provider',
      options: [
        { value: 'stripe', label: 'Stripe', hint: 'Most flexible' },
        { value: 'lemonsqueezy', label: 'Lemonsqueezy (Coming Soon)' },
        { value: 'none', label: 'No payments (Coming Soon)' }
      ],
      initialValue: 'stripe'
    }),
    
    typescript: () => p.confirm({
      message: 'Use TypeScript?',
      initialValue: true
    }),
    
    styling: () => p.select({
      message: 'Styling solution',
      options: [
        { value: 'tailwind', label: 'Tailwind CSS' },
        { value: 'css', label: 'Plain CSS (Coming Soon)' }
      ],
      initialValue: 'tailwind'
    })
  }, {
    onCancel: () => {
      p.cancel('Operation cancelled');
      process.exit(0);
    }
  }) as CliResults;

  return project;
}