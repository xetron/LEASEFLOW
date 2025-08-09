import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart3, FileText, DollarSign, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <DollarSign className="h-5 w-5 text-primary" />
            <span>Leaseflow</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                    Enterprise-Grade Solution
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Modern Lease & Revenue Management
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Streamline your financial operations with intelligent document processing, advanced analytics, and seamless integrations.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="gap-2">
                      Get Started
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline">
                      Request Demo
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>GAAP Compliant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>SOC 2 Certified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>99.9% Uptime</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-xl border bg-card p-8 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="font-semibold">Revenue Overview</div>
                      <div className="text-sm text-muted-foreground">This Month</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-accent p-4">
                        <div className="text-sm text-muted-foreground">Active Leases</div>
                        <div className="text-2xl font-bold">142</div>
                        <div className="text-xs text-green-500">↑ 12% from last month</div>
                      </div>
                      <div className="rounded-lg bg-accent p-4">
                        <div className="text-sm text-muted-foreground">Revenue</div>
                        <div className="text-2xl font-bold">$1.2M</div>
                        <div className="text-xs text-green-500">↑ 8% from last month</div>
                      </div>
                      <div className="rounded-lg bg-accent p-4">
                        <div className="text-sm text-muted-foreground">Processed Docs</div>
                        <div className="text-2xl font-bold">876</div>
                        <div className="text-xs text-green-500">↑ 23% from last month</div>
                      </div>
                      <div className="rounded-lg bg-accent p-4">
                        <div className="text-sm text-muted-foreground">Compliance</div>
                        <div className="text-2xl font-bold">98.2%</div>
                        <div className="text-xs text-green-500">↑ 3% from last month</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="text-sm font-medium uppercase tracking-wider text-primary">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything you need to manage leases and revenue
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform combines powerful document processing, financial management, analytics, and integrations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Document Processing</h3>
                  <p className="text-muted-foreground">
                    Automated OCR with Google Document AI and GPT-4 powered contract analysis for fast, accurate document processing.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Financial Management</h3>
                  <p className="text-muted-foreground">
                    Comprehensive lease and revenue contract management with amortization schedules and revenue recognition workflows.
                  </p>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Analytics & Reporting</h3>
                  <p className="text-muted-foreground">
                    Self-service analytics dashboard with embedded DuckDB for real-time analysis and customizable reporting.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Integration Framework</h3>
                  <p className="text-muted-foreground">
                    Connect to your existing systems with REST and GraphQL APIs, webhooks, and dedicated ERP system integrations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <DollarSign className="h-5 w-5 text-primary" />
            <span>Leaseflow</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Leaseflow. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}