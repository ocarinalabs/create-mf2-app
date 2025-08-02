"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";

export function BentoFeatures() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <BlurFade delay={0.1} inView={true}>
            <h2 className="font-sans text-3xl font-light mb-4 lg:text-5xl">
              Features that make your product stand out
            </h2>
          </BlurFade>
        </div>

        <div className="relative max-w-[840px] mx-auto">
          <div className="relative z-10 grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="col-span-2 lg:col-span-1 space-y-4">
              {/* Feature 1 */}
              <BlurFade delay={0.15} inView={true}>
                <Card className="relative overflow-hidden h-[460px] group border-0 rounded-[28px]">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url(/bento-1.png)" }}
                  />

                  {/* Content Overlay */}
                  <CardContent className="relative h-full p-0 flex flex-col">
                    {/* Bottom Text Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 pb-0 z-10">
                      <h3 className="text-xl font-medium font-sans mb-2 text-black">
                        Feature 1
                      </h3>
                      <p
                        className="text-sm text-black/60 font-sans"
                        style={{
                          letterSpacing: "-0.02em",
                          lineHeight: "1.3em",
                        }}
                      >
                        This is where you explain your first key feature. Make
                        it compelling and clear.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Feature 3 */}
              <BlurFade delay={0.25} inView={true}>
                <Card className="relative overflow-hidden h-[280px] sm:h-[220px] group border-0 rounded-[28px]">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url(/bento-3.png)" }}
                  />

                  {/* Content Overlay */}
                  <CardContent className="relative h-full p-0 flex flex-col">
                    {/* Bottom Text Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 pb-0">
                      <h3 className="text-xl font-medium font-sans mb-2 text-black">
                        Feature 3
                      </h3>
                      <p
                        className="text-sm text-black/60 font-sans"
                        style={{
                          letterSpacing: "-0.02em",
                          lineHeight: "1.3em",
                        }}
                      >
                        Describe another core capability. Keep it concise but
                        impactful.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            </div>

            {/* Right Column */}
            <div className="col-span-2 lg:col-span-1 space-y-4">
              {/* Feature 2 */}
              <BlurFade delay={0.2} inView={true}>
                <Card className="relative overflow-hidden h-[370px] sm:h-[280px] group border-0 rounded-[28px]">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url(/bento-2.png)" }}
                  />

                  {/* Content Overlay */}
                  <CardContent className="relative h-full p-0 flex flex-col">
                    {/* Bottom Text Content */}
                    <div className="absolute bottom-0 left-0 right-0 px-6">
                      <h3 className="text-xl font-medium font-sans mb-2 text-black">
                        Feature 2
                      </h3>
                      <p
                        className="text-sm text-black/60 font-sans"
                        style={{
                          letterSpacing: "-0.02em",
                          lineHeight: "1.3em",
                        }}
                      >
                        Highlight what makes your product special. Focus on the
                        value it brings.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Feature 4 */}
              <BlurFade delay={0.3} inView={true}>
                <Card className="relative overflow-hidden h-[400px] group border-0 rounded-[28px]">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url(/bento-4.png)" }}
                  />

                  {/* Content Overlay */}
                  <CardContent className="relative h-full p-0 flex flex-col">
                    {/* Bottom Text Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 pb-0">
                      <h3 className="text-xl font-medium font-sans mb-2 text-black">
                        Feature 4
                      </h3>
                      <p
                        className="text-sm text-black/60 font-sans"
                        style={{
                          letterSpacing: "-0.02em",
                          lineHeight: "1.3em",
                        }}
                      >
                        Round out your features with something that sets you
                        apart from competitors.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
