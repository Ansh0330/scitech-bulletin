import React from "react";
import Blog from "../components/common/Blog";

const BlogPage = () => {
  const sampleBlogData = {
    heading: "Breakthrough in Quantum Computing",
    content: `
    <p>
      Scientists have recently developed a revolutionary quantum chip that significantly enhances qubit stability and coherence times, overcoming one of the biggest hurdles in quantum computing technology. This breakthrough paves the way for more reliable quantum processors capable of solving complex problems currently impossible for classical computers.
    </p>
    <img src="https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg" alt="Quantum Chip" style="width: 100%; margin: 20px 0; border-radius: 8px;" />
    <p>
      The new chip utilizes advanced materials and architectural designs to reduce decoherence and error rates dramatically. Researchers demonstrated the chip’s performance through intensive testing, showing it maintains quantum states longer than previous models. This advances the field towards practical quantum computers for applications in cryptography, optimization, and drug discovery.
    </p>
    <p>
      While challenges remain in scaling up quantum systems, this innovation marks a pivotal step in realizing their full potential. The scientific community is optimistic about integrating this chip into larger quantum networks and exploring novel algorithms designed specifically for enhanced quantum hardware.
    </p>
  `,
    references: [
      {
        title: "Original Research Paper",
        url: "https://example.com/research-paper",
      },
      {
        title: "Quantum Computing Explained",
        url: "https://example.com/quantum-explained",
      },
    ],
    createdAt: "2025-09-07T14:30:00Z",
  };

  return (
    <div>
      <Blog
        heading={sampleBlogData.heading}
        content={sampleBlogData.content}
        references={sampleBlogData.references}
        createdAt={sampleBlogData.createdAt}
      />
    </div>
  );
};

export default BlogPage;
