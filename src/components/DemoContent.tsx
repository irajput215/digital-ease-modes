import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DemoContentProps {
  dyslexiaMode: boolean;
  adhdMode: boolean;
  lowVisionMode: boolean;
}

const DemoContent: React.FC<DemoContentProps> = ({ dyslexiaMode, adhdMode, lowVisionMode }) => {
  const contentClass = `
    ${dyslexiaMode ? 'dyslexia-font' : ''}
    ${lowVisionMode ? 'low-vision-text' : ''}
  `.trim();

  const cardClass = `
    ${adhdMode ? 'adhd-focus' : ''}
    transition-all duration-300
  `.trim();

  return (
    <div className={contentClass}>
      <Card className={cardClass}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold">
                Sample Article: Web Accessibility Matters
              </CardTitle>
              <CardDescription className="mt-2">
                Understanding how different users experience the web
              </CardDescription>
            </div>
            <Badge variant="secondary">Featured</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-relaxed">
            Web accessibility ensures that websites and applications are usable by everyone, 
            including people with disabilities. This includes visual, auditory, motor, and 
            cognitive impairments that affect how people interact with digital content.
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Key Benefits:</h3>
            <ul className="space-y-1 text-sm">
              <li>• Improved user experience for everyone</li>
              <li>• Better SEO and search rankings</li>
              <li>• Compliance with legal requirements</li>
              <li>• Increased market reach</li>
            </ul>
          </div>

          <p className="text-base leading-relaxed">
            By implementing accessibility features, we create more inclusive digital experiences 
            that benefit all users, not just those with disabilities. Simple changes like proper 
            color contrast, alternative text for images, and keyboard navigation can make a 
            significant difference.
          </p>

          <div className="flex gap-3 pt-2">
            <Button variant="default">
              Learn More
            </Button>
            <Button variant="outline">
              Share Article
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoContent;