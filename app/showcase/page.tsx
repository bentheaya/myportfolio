'use client';

import React from 'react';
import { SurveillanceHero } from '@/components/project-heroes/surveillance-hero';
import { PullQuote } from '@/components/ui/pull-quote';
import { StackPill } from '@/components/ui/stack-pill';
import { CodeBlock } from '@/components/ui/code-block';
import { MetricsBanner } from '@/components/ui/metrics-banner';
import { NextProjectTeaser } from '@/components/ui/next-project-teaser';
import { HueControl } from '@/components/ui/hue-control';

/**
 * Showcase Page
 * Complete example of a polished project page using all components and sections.
 * 
 * Demonstrates:
 * - ProjectHero variants (Surveillance aesthetic shown)
 * - Asymmetric origin section with pull quote
 * - Interactive canvas container stub
 * - Architecture code sections
 * - Project metrics
 * - Next project navigation
 * - Full responsive design
 * - Dynamic accent system
 * 
 * Route: /showcase
 */
export default function ShowcasePage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <SurveillanceHero
        title="AI-Powered Content Detection System"
        domain="AI / Detection"
        subtitle="Real-time analysis with sub-100ms latency"
        accentHue={0} // Red accent
      />

      {/* Section 02: The Origin */}
      <section className="w-full py-20 md:py-32 px-4 border-t border-canvas-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Left column - Pull quote */}
            <div className="md:col-span-2">
              <PullQuote
                text="Technology should amplify human judgment, not replace it."
                author="—Building with Purpose"
                className="relative"
              />
            </div>

            {/* Right column - Technical content */}
            <div className="md:col-span-3 space-y-6">
              <p className="text-base md:text-lg text-canvas-text-secondary leading-relaxed">
                This project explores the intersection of machine learning and user experience, 
                creating a system that processes visual and textual content in real-time while 
                maintaining transparency in its decision-making process.
              </p>

              <p className="text-base md:text-lg text-canvas-text-secondary leading-relaxed">
                The core innovation lies in the hybrid architecture that combines traditional 
                computer vision with neural networks, optimized for edge deployment without 
                sacrificing accuracy.
              </p>

              {/* Tech stack */}
              <div className="pt-6 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wide text-canvas-text-tertiary">
                  Technology Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  <StackPill name="React" tooltip="UI Framework" variant="accent" />
                  <StackPill name="Next.js" tooltip="Full-stack" variant="default" />
                  <StackPill name="TensorFlow" tooltip="ML inference" variant="subtle" />
                  <StackPill name="WebGL" tooltip="GPU rendering" variant="accent" />
                  <StackPill name="TypeScript" tooltip="Type safety" variant="default" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: The Interaction Shell */}
      <section className="w-full py-20 md:py-32 px-4 border-t border-canvas-border/20">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-canvas-text">
              Interactive Visualization
            </h2>
            <p className="text-sm text-canvas-text-secondary font-mono uppercase tracking-wide">
              Real-time Detection Pipeline
            </p>
          </div>

          {/* Canvas container stub - READY FOR CUSTOM ELEMENTS */}
          <div
            id="signature-canvas-stage"
            className="relative w-full h-[500px] bg-gradient-to-br from-canvas-elevated/50 to-canvas-card/30 border border-canvas-border rounded-2xl overflow-hidden flex items-center justify-center"
          >
            {/* Placeholder content - Replace with Three.js, D3, Canvas API, or Web Components */}
            <div className="text-center space-y-4">
              <div className="inline-block p-8 rounded-lg bg-canvas-elevated/50 border border-canvas-border/50">
                <p className="text-sm font-mono text-canvas-text-secondary">
                  [INTERACTIVE ELEMENT]
                </p>
                <p className="text-xs text-canvas-text-tertiary mt-2">
                  Drop your Three.js, D3, Canvas API, or Web Components here
                </p>
              </div>
            </div>

            {/* Corner accent lines for visual interest */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-accent-bright/40" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-accent-bright/40" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-accent-bright/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-accent-bright/40" />
          </div>

          {/* Integration note */}
          <div className="text-xs font-mono text-canvas-text-tertiary p-3 rounded bg-canvas-elevated/40 border border-canvas-border/30">
            ID: "signature-canvas-stage" • Ready for GSAP, Lenis, Three.js, D3, custom cursor, or animation libraries
          </div>
        </div>
      </section>

      {/* Section 04: Architecture */}
      <section className="w-full py-20 md:py-32 px-4 border-t border-canvas-border/20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-canvas-text">
              System Architecture
            </h2>
            <p className="text-sm text-canvas-text-secondary font-mono uppercase tracking-wide">
              Technical Implementation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Code block */}
            <CodeBlock
              filename="pipeline.ts"
              language="typescript"
              code={`export async function detectContent(
  input: ContentInput
): Promise<DetectionResult> {
  // 1. Preprocess input
  const normalized = await preprocess(input);
  
  // 2. Feature extraction
  const features = extractor.extract(normalized);
  
  // 3. Inference
  const prediction = await model.predict(features);
  
  // 4. Post-process results
  return postprocess(prediction);
}`}
              highlightLines={[8, 11]}
            />

            {/* Explanation */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-canvas-text mb-3">
                  Processing Pipeline
                </h3>
                <p className="text-base text-canvas-text-secondary leading-relaxed">
                  The detection pipeline processes content through four distinct stages, 
                  each optimized for specific computational characteristics.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-heading font-bold text-canvas-text mb-3">
                  Performance Metrics
                </h3>
                <ul className="space-y-2 text-sm text-canvas-text-secondary">
                  <li>• Throughput: 1,000+ requests/second</li>
                  <li>• P95 Latency: 45ms</li>
                  <li>• Model Accuracy: 98.7%</li>
                  <li>• GPU Memory: 2.1GB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 05: Hard Parts */}
      <section className="w-full py-20 md:py-32 px-4 border-t border-canvas-border/20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-canvas-text">
              The Hard Parts
            </h2>
            <p className="text-sm text-canvas-text-secondary font-mono uppercase tracking-wide">
              Challenges & Solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Explanation */}
            <div className="space-y-6 md:order-2">
              <div>
                <h3 className="text-lg font-heading font-bold text-canvas-text mb-3">
                  Scaling Inference
                </h3>
                <p className="text-base text-canvas-text-secondary leading-relaxed">
                  Running neural networks at scale requires careful optimization. We implemented 
                  batch processing with dynamic allocation and model quantization for 40% latency reduction.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-heading font-bold text-canvas-text mb-3">
                  Explainability
                </h3>
                <p className="text-base text-canvas-text-secondary leading-relaxed">
                  Building trust in AI systems requires transparency. We added attention visualization 
                  layers and confidence scoring to make decisions interpretable.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-heading font-bold text-canvas-text mb-3">
                  Edge Deployment
                </h3>
                <p className="text-base text-canvas-text-secondary leading-relaxed">
                  Moving models off-cloud reduces latency and improves privacy. Model pruning and 
                  ONNX conversion enabled sub-50MB deployments.
                </p>
              </div>
            </div>

            {/* Code block */}
            <CodeBlock
              filename="optimization.ts"
              language="typescript"
              code={`// Model quantization strategy
const quantizeModel = (model: TensorFlow.Model) => {
  return tf.quantization.quantize(model, {
    inputRange: [0, 255],
    outputRange: [0, 1],
  });
};

// Batch inference optimization
const batchInference = async (inputs: Tensor[]) => {
  const batched = tf.stack(inputs);
  const results = await model.predict(batched);
  return tf.unstack(results);
};`}
              highlightLines={[2, 9]}
            />
          </div>
        </div>
      </section>

      {/* Section 06: Footer Bridge with Metrics */}
      <section className="w-full border-t border-canvas-border/20">
        {/* Metrics Banner */}
        <MetricsBanner
          layout="grid"
          metrics={[
            { label: 'Accuracy', value: 98.7, unit: '%' },
            { label: 'Latency P95', value: 45, unit: 'ms' },
            { label: 'Throughput', value: '1K+', unit: 'req/s' },
            { label: 'Uptime', value: 99.99, unit: '%' },
          ]}
        />

        {/* Next Project Teaser */}
        <div className="w-full py-20 md:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <NextProjectTeaser
              title="Next: Spatial UI System"
              description="Building AR experiences with perspective transforms and spatial interactions"
              domain="AR / Spatial"
              href="/showcase"
              accentHue={180} // Cyan for next project
            />
          </div>
        </div>
      </section>

      {/* Hue Control (desktop only) */}
      <HueControl initialHue={0} />
    </main>
  );
}
