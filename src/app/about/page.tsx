import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Lightbulb, Target, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                About QuizWiz
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline">
                <span className="gradient-text">Empowering</span> Education
                <br />
                Through Interactive Learning
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We're on a mission to make learning engaging, accessible, and fun for everyone through the power of interactive quizzes.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
                      Our Story
                    </h2>
                    <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
                      <p>
                        QuizWiz was born from a simple observation: traditional learning methods often fail to engage today's learners. We saw educators struggling with outdated tools and students losing interest in static content.
                      </p>
                      <p>
                        Our team of passionate educators and technologists came together to create something different – a platform that makes creating interactive quizzes as easy as writing a text message, yet powerful enough for professional use.
                      </p>
                      <p>
                        Today, QuizWiz serves thousands of educators, trainers, and learners worldwide, transforming how knowledge is shared and assessed.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl transform rotate-3"></div>
                  <Image
                    src="https://placehold.co/600x400/4F46E5/FFFFFF.png?text=Quiz+Creation"
                    width="600"
                    height="400"
                    alt="QuizWiz platform interface"
                    className="relative rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
                  Our Values
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide everything we do at QuizWiz
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="text-center p-6 card-hover border-2">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <GraduationCap className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-bold">Education First</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Every feature we build is designed with educators and learners in mind
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center p-6 card-hover border-2">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-accent" />
                    </div>
                    <CardTitle className="text-lg font-bold">Inclusive Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Learning should be accessible to everyone, everywhere
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center p-6 card-hover border-2">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                      <Lightbulb className="w-8 h-8 text-green-500" />
                    </div>
                    <CardTitle className="text-lg font-bold">Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      We continuously push the boundaries of what's possible in education technology
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center p-6 card-hover border-2">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-lg font-bold">Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Building a supportive community of educators and learners worldwide
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
                <Target className="w-4 h-4 mr-2" />
                Our Mission
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Making Learning Engaging for Everyone
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                We believe that learning should be interactive, engaging, and accessible to all. 
                Our mission is to provide educators with powerful, easy-to-use tools that transform 
                traditional assessment into engaging experiences that motivate and inspire learners.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 pt-8">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Quizzes Created</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-accent">50K+</div>
                  <div className="text-sm text-muted-foreground">Learners Engaged</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-500">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
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
