import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Zap, 
  Shield,
  Clock,
  Star,
  Award,
  BarChart3,
  Target,
  Rocket,
  CheckCircle,
  PlayCircle,
  Globe,
  Layers,
  Brain,
  Palette,
  Share2,
  Trophy,
  ChevronRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-purple-500/5 min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.02)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
          </div>
          
          <div className="relative container mx-auto px-4 md:px-6 py-20 md:py-32">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-8 flex flex-col items-center">
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium mx-auto">
                  <Sparkles className="w-4 h-4 mr-2" />
                  The Future of Quiz Creation
                </Badge>
                
                <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center">
                  <span className="bg-gradient-to-r from-primary via-accent to-purple-500 bg-clip-text text-transparent">
                    Transform Learning
                  </span>
                  <br />
                  <span className="text-foreground">With Interactive Quizzes</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                  Create stunning, interactive quizzes in minutes. Engage your audience, track insights, 
                  and revolutionize how you teach, train, and assess knowledge.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 w-full">
                  <Button asChild size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    <Link href="/create-quiz" className="flex items-center justify-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      Start Creating Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-2xl font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    <Link href="#demo" className="flex items-center justify-center">
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>
                
                <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Free Forever Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Setup in 2 Minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30 w-full">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2 flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Quizzes Created</div>
              </div>
              <div className="text-center space-y-2 flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-accent">2M+</div>
                <div className="text-sm text-muted-foreground">Questions Answered</div>
              </div>
              <div className="text-center space-y-2 flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-green-500">150+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center space-y-2 flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-500">98%</div>
                <div className="text-sm text-muted-foreground">User Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 w-full">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-20 flex flex-col items-center">
              <Badge variant="outline" className="mb-4 mx-auto">
                <Star className="w-4 h-4 mr-2" />
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 text-center">
                Everything You Need to Create
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Amazing Quizzes
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center">
                From simple knowledge checks to complex assessments, QuizWiz provides all the tools you need
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="flex justify-center">
                <Card className="group relative overflow-hidden p-8 hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/20 hover:-translate-y-2 w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative pb-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-headline">Lightning Fast Creation</CardTitle>
                  </CardHeader>
                  <CardContent className="relative text-center">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Build professional quizzes in minutes with our intuitive drag-and-drop interface and smart templates.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Template Library</span>
                      </li>
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Bulk Import</span>
                      </li>
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Auto-save</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center">
                <Card className="group relative overflow-hidden p-8 hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/20 hover:-translate-y-2 w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative pb-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <Share2 className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-headline">Share & Collaborate</CardTitle>
                  </CardHeader>
                  <CardContent className="relative text-center">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Share your quizzes anywhere with powerful distribution options and real-time collaboration.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Public Links</span>
                      </li>
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>QR Codes</span>
                      </li>
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Social Media</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center">
                <Card className="group relative overflow-hidden p-8 hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/20 hover:-translate-y-2 w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative pb-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-headline">Advanced Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="relative text-center">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Get deep insights into performance with detailed analytics and automated reporting.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Real-time Results</span>
                      </li>
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Performance Tracking</span>
                      </li>
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Export Reports</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-32 bg-muted/30 w-full">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-20 flex flex-col items-center">
              <Badge variant="outline" className="mb-4 mx-auto">
                <Target className="w-4 h-4 mr-2" />
                How It Works
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-center">
                Create Your First Quiz in
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  3 Simple Steps
                </span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-6 flex flex-col items-center">
                <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-headline">Design Your Quiz</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Choose from our template library or start from scratch. Add questions, images, and customize the design to match your brand.
                </p>
              </div>
              
              <div className="text-center space-y-6 flex flex-col items-center">
                <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                  <Share2 className="w-10 h-10 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-headline">Share & Distribute</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Share your quiz via link, QR code, or social media. Set up access controls and scheduling for maximum engagement.
                </p>
              </div>
              
              <div className="text-center space-y-6 flex flex-col items-center">
                <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-headline">Analyze Results</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Track performance in real-time with detailed analytics. Export results and generate reports for deeper insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-32 w-full">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-20 flex flex-col items-center">
              <Badge variant="outline" className="mb-4 mx-auto">
                <Trophy className="w-4 h-4 mr-2" />
                Testimonials
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-center">
                Loved by Educators
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Around the World
                </span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="flex justify-center">
                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 w-full max-w-sm">
                  <CardContent className="space-y-6 text-center">
                    <div className="flex items-center gap-1 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      "QuizWiz has revolutionized how I engage with my students. The analytics help me understand exactly where they're struggling."
                    </p>
                    <div className="flex items-center gap-4 justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                        SK
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">Sarah Kim</div>
                        <div className="text-sm text-muted-foreground">High School Teacher</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center">
                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 w-full max-w-sm">
                  <CardContent className="space-y-6 text-center">
                    <div className="flex items-center gap-1 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      "The best quiz platform I've used. Creating interactive content has never been easier. My team loves the collaboration features."
                    </p>
                    <div className="flex items-center gap-4 justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        MR
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">Marcus Rodriguez</div>
                        <div className="text-sm text-muted-foreground">Training Manager</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center">
                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 w-full max-w-sm">
                  <CardContent className="space-y-6 text-center">
                    <div className="flex items-center gap-1 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      "QuizWiz made our company training engaging and measurable. The real-time analytics give us insights we never had before."
                    </p>
                    <div className="flex items-center gap-4 justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        LW
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">Lisa Wang</div>
                        <div className="text-sm text-muted-foreground">HR Director</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-accent to-purple-500 text-white relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%)] bg-[length:60px_60px] animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float-delayed-3s"></div>
          </div>
          
          <div className="relative container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-8 flex flex-col items-center">
                <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30 mx-auto">
                  <Rocket className="w-4 h-4 mr-2" />
                  Ready to Start?
                </Badge>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline leading-tight text-center">
                  Transform Your Teaching Today
                </h2>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed text-center">
                  Join over 50,000 educators who've already discovered the power of interactive learning with QuizWiz.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 w-full">
                  <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-12 py-6 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white text-primary hover:bg-white/90">
                    <Link href="/create-quiz" className="flex items-center justify-center">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-lg px-12 py-6 rounded-2xl font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300">
                    <Link href="/features" className="flex items-center justify-center">
                      Explore Features
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                
                <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Free Forever Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>No Setup Fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Cancel Anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
