"use client"

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { AnimatedProgressBar } from "@/components/ui/animated-progress-bar"
import { useEffect, useState } from "react"
import { getAnalyticsData } from "@/app/actions/quiz.actions"
import { RefreshCw } from "lucide-react"

const chartConfig = {
  desktop: {
    label: "Desktop Quizzes",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile Quizzes",
    color: "hsl(var(--chart-2))",
  },
}

interface AnalyticsData {
  totalQuizzes: number;
  totalQuestions: number;
  averageScore: number;
  totalTakers: number;
  monthlyData: { month: string; desktop: number; mobile: number }[];
}

export default function AnalysisPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAnalyticsData = async () => {
    try {
      const data = await getAnalyticsData();
      setAnalyticsData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAnalyticsData();
  };

  useEffect(() => {
    fetchAnalyticsData();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchAnalyticsData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto py-8 px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-headline">Quiz Analysis</h1>
            <p className="text-muted-foreground mt-2">Real-time insights into your quiz performance and engagement.</p>
            {lastUpdated && (
              <p className="text-sm text-muted-foreground mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
                <CardHeader>
                    <CardTitle>Total Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{analyticsData?.totalQuizzes || 0}</p>
                    <AnimatedProgressBar 
                      value={analyticsData?.totalQuizzes || 0}
                      maxValue={50}
                      color="bg-primary"
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Total Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{analyticsData?.totalQuestions || 0}</p>
                    <AnimatedProgressBar 
                      value={analyticsData?.totalQuestions || 0}
                      maxValue={200}
                      color="bg-blue-500"
                    />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Avg. Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{analyticsData?.averageScore || 0}</p>
                    <p className="text-xs text-muted-foreground">Questions per quiz</p>
                    <AnimatedProgressBar 
                      value={analyticsData?.averageScore || 0}
                      maxValue={100}
                      color="bg-green-500"
                    />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Quiz Views</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{analyticsData?.totalTakers?.toLocaleString() || 0}</p>
                     <p className="text-xs text-muted-foreground">Estimated views</p>
                     <AnimatedProgressBar 
                      value={analyticsData?.totalTakers || 0}
                      maxValue={100}
                      color="bg-purple-500"
                    />
                </CardContent>
            </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Quiz Creation Activity</CardTitle>
            <CardDescription>
              Quiz creation by device type - Last 6 months ({analyticsData?.monthlyData?.length || 0} data points)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={analyticsData?.monthlyData || []}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
