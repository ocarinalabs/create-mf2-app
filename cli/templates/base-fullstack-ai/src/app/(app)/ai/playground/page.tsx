"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code } from "@/components/ui/code";
import { ExternalLink, Terminal, Globe, Key } from "lucide-react";
import Link from "next/link";

export default function PlaygroundPage() {
  const deploymentUrl =
    process.env.NEXT_PUBLIC_CONVEX_URL ||
    "https://your-deployment.convex.cloud";

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Agent Playground</h1>
        <p className="text-muted-foreground">
          Test your AI agents, browse threads, and explore message interactions
          in real-time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Thread Management</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Browse and manage user threads with ease
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Message Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              View detailed message metadata and tool calls
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Context Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Experiment with different context options
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hosted" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hosted">Hosted Playground</TabsTrigger>
          <TabsTrigger value="local">Local Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="hosted" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Use the Hosted Playground
              </CardTitle>
              <CardDescription>
                The quickest way to start testing your agents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold">Step 1: Generate an API Key</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  npx convex run --component agent apiKeys:issue '{"{"}
                  "name":"playground"{"}"}'
                </div>
                <p className="text-sm text-muted-foreground">
                  Run this command in your terminal to generate a secure API
                  key.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Step 2: Open the Playground</h3>
                <Button asChild>
                  <a
                    href="https://get-convex.github.io/agent/play"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Launch Playground
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Step 3: Configure Connection</h3>
                <div className="space-y-2">
                  <p className="text-sm">Enter your deployment URL:</p>
                  <Code className="block">{deploymentUrl}</Code>
                  <p className="text-sm text-muted-foreground">
                    This URL is found in your <code>.env.local</code> file.
                  </p>
                </div>
              </div>

              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription>
                  Keep your API key secure. You can generate multiple keys with
                  different names and revoke them by reissuing with the same
                  name.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="local" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Run Locally
              </CardTitle>
              <CardDescription>
                Set up the playground in your development environment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold">Step 1: Install the Package</h3>
                <p className="text-sm text-muted-foreground">
                  The playground package is already included in this template.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Step 2: Generate an API Key</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  npx convex run --component agent apiKeys:issue '{"{"}
                  "name":"local-dev"{"}"}'
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Step 3: Run the Playground</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                  npx @convex-dev/agent-playground
                </div>
                <p className="text-sm text-muted-foreground">
                  This will start a local server and open the playground in your
                  browser. It automatically uses the{" "}
                  <code>VITE_CONVEX_URL</code> from your <code>.env.local</code>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Available Agents</CardTitle>
          <CardDescription>
            These agents are configured and ready to test in the playground
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-1">Assistant Agent</h4>
            <p className="text-sm text-muted-foreground">
              General purpose AI assistant for various tasks including analysis,
              research, writing, and creative content generation.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-1">Support Agent</h4>
            <p className="text-sm text-muted-foreground">
              Professional customer support agent designed to help users with
              questions and resolve issues efficiently.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/ai/chat">Try Chat Interface</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/ai/support">Try Support Agent</Link>
        </Button>
      </div>
    </div>
  );
}
